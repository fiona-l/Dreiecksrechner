window.addEventListener('DOMContentLoaded', function() {
  seitenAuswahl();

  document.querySelector('#seite').addEventListener('change', function() {
    seitenAuswahl();
  });

  document.querySelectorAll('#eingabe input').forEach(el => 
    el.addEventListener('change', inputAuslesen)   
  );

  document.querySelector('input[type="button"]').addEventListener('click', inputAuslesen);
});

function inputAuslesen() {
  let seiten_laenge = document.querySelector('#seiten_laenge').value,
      winkel_alpha  = document.querySelector('#winkel-alpha').value;

  inputValidieren(seiten_laenge, winkel_alpha);
};

// Funktion zum anzeigen der richtigen Ausgabefelder / Verstecken von nicht aktiven Feldern
function seitenAuswahl() {
  let seiten_auswahl = document.querySelector('#seite').value;

  document.querySelectorAll('#ausgabe > *').forEach(el => el.classList.remove('d-none'));

  switch (seiten_auswahl) {
    case 'hypothenuse':
      document.querySelectorAll('[data-hypothenuse]').forEach(el => el.classList.add('d-none'));
      break;
    case 'ankathete':
      document.querySelectorAll('[data-ankathete]').forEach(el => el.classList.add('d-none'));
      break;
    case 'gegenkathete':
      document.querySelectorAll('[data-gegenkathete]').forEach(el => el.classList.add('d-none'));
      break;
  }
};

// Inputs validieren
function inputValidieren(seiten_laenge, winkel_alpha) {
  // Validation, ob Winkel alpha im logischen Bereich zwischen 0° und 90°
  let min = +document.querySelector('#winkel-alpha').min,
      max = +document.querySelector('#winkel-alpha').max;  
  let min_seitenlaenge = +document.querySelector('#seiten_laenge').min; 
  if (winkel_alpha < min) {
    document.querySelector('#winkel-alpha').value = min;
  }
  if (winkel_alpha > max) {
    document.querySelector('#winkel-alpha').value = max;
  }
  if (winkel_alpha >= min && winkel_alpha <= max) {
    document.querySelector('#winkel-alpha').value = parseFloat(winkel_alpha).toFixed(2);
  }
  if (seiten_laenge < min_seitenlaenge){
    document.querySelector('#seiten_laenge').value = min_seitenlaenge;
  }   
  if (seiten_laenge >= min_seitenlaenge){
    document.querySelector('#seiten_laenge').value = parseFloat(seiten_laenge).toFixed(2);
  }  

  berechnen_beta(seiten_laenge, winkel_alpha);
};

//Berechnen von Winkel Beta
function berechnen_beta(seiten_laenge, winkel_alpha) {
  const winkel_gamma = 90;
  let winkel_beta = 180 - (+winkel_alpha + winkel_gamma);
  document.querySelector('#winkel-beta').value = parseFloat(winkel_beta).toFixed(2);

  berechnen_seiten(seiten_laenge, winkel_alpha);
};

function berechnen_seiten(seiten_laenge, winkel_alpha) { 
  let seiten_auswahl = document.querySelector('#seite').value;
  let ankathete = '',
      hypothenuse = '',
      gegenkathete = '';

  switch (seiten_auswahl) {
    case 'hypothenuse':
      //Ankathete berechnen
      ankathete = Math.cos(winkel_alpha*Math.PI /180) * seiten_laenge;
      //Gegenkathete berechnen
      gegenkathete = Math.sin(winkel_alpha*Math.PI /180) * seiten_laenge;
      //Hypothenuse setzen
      hypothenuse = seiten_laenge;
      break;
    case 'ankathete':
      //Hypothenuse berechnen
      hypothenuse = seiten_laenge / Math.cos(winkel_alpha*Math.PI /180);
      //Gegenkathete berechnen
      gegenkathete = Math.sin(winkel_alpha*Math.PI /180) * hypothenuse;
      //Ankathete setzen
      ankathete = seiten_laenge;
      break;
    case 'gegenkathete':
         //Hypothenuse berechnen
         hypothenuse = seiten_laenge / Math.sin(winkel_alpha*Math.PI /180);
         //Ankathete berechnen
         ankathete = Math.sin(winkel_alpha*Math.PI /180) * hypothenuse;
         //Gegenkathete setzen
         gegenkathete = seiten_laenge;
      break;
  }
  //Ausgabe der Seiten auf 2 Nachkommastellen gerundet
  document.querySelector('#hypothenuse').value = parseFloat(hypothenuse).toFixed(2);
  document.querySelector('#ankathete-alpha').value = parseFloat(ankathete).toFixed(2); 
  document.querySelector('#gegenkathete-alpha').value = parseFloat(gegenkathete).toFixed(2); 

  dreiech_zeichnen(winkel_alpha, ankathete, gegenkathete, hypothenuse);
}

function dreiech_zeichnen(winkel_alpha, ankathete, gegenkathete, hypothenuse) {
  let hoehe = Math.sin(winkel_alpha*Math.PI /180) * ankathete,
      Xachse = Math.cos(winkel_alpha*Math.PI /180) * ankathete;
  //Punkte berechnen 
  
  const leinwand = document.querySelector('#graf');
  const zeichnung = leinwand.getContext('2d');

  let leinwandBreite = +leinwand.clientWidth;
  let leinwandHoehe = +leinwand.clientWidth;
  leinwand.width = leinwandBreite;
  leinwand.height = leinwandHoehe;


  let Ax = 0,
      Ay = leinwandHoehe, 
      Bx = leinwandBreite,
      By = leinwandHoehe,
      Cx = (Xachse / hypothenuse) * leinwandBreite,
      Cy = leinwandBreite - ((hoehe / hypothenuse) * leinwandBreite);

      console.log(leinwandBreite);
      console.log(Cx);
      console.log(Xachse / hypothenuse);
      console.log(Cy);

  zeichnung.lineWidth = 3;
  zeichnung.strokeStyle = 'blue';
  zeichnung.beginPath();
  zeichnung.lineTo(Ax, Ay);
  zeichnung.lineTo(Bx, By); 
  zeichnung.lineTo(Cx, Cy);
  zeichnung.lineTo(Ax, Ay);
  zeichnung.stroke();
  /*
  zeichnung.lineWidth = 3;
  zeichnung.strokeStyle = 'blue';
  zeichnung.beginPath();
  zeichnung.moveTo(Ax, Ay);
  zeichnung.lineTo(Bx, By);
  zeichnung.lineTo(Cx, Cy);
  zeichnung.lineTo(Ax, Ay);
  zeichnung.stroke();
  */


}








/*
window.addEventListener('DOMContentLoaded', function() {
  console.log('Dokument geladen');
  leinwandBreite = rechnerfeld.clientWidth;
  leinwand.width = leinwandBreite;
  leinwand.height = leinwandHoehe;
  simpleTriangle();
});


document.querySelector('input[type="button"]').addEventListener('click', function() {
  let winkelumme = 180;
  let rechterwinkel = 90;
  let winkelalpha = document.querySelector('#alpha').value;
  winkelbeta.value = winkelumme - rechterwinkel - winkelalpha;
});


function simpleTriangle() {
  zeichnung.lineWidth = 3;
  zeichnung.strokeStyle = 'blue';
  zeichnung.beginPath();
  zeichnung.moveTo(leinwandBreite - randabstand, leinwandHoehe - randabstand);
  zeichnung.lineTo(300, randabstand);
  zeichnung.lineTo(randabstand, leinwandHoehe - randabstand);
  zeichnung.lineTo(leinwandBreite, leinwandHoehe);
  zeichnung.stroke();
}
*/