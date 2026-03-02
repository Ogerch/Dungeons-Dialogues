let oCanvasHTML = document.querySelector("canvas"),
    oContexte = oCanvasHTML.getContext("2d"),
    nHauteur = oCanvasHTML.height,
    nLargeur = oCanvasHTML.width,

    sEtatJeu = "intro",
    boutonAppuye = false;

let positionCurseurX 
let positionCurseurY 

let opaciteTexte = 0;
let tailleTexte = 30;
let direction = 0.01;
let directionOpacite = 0;
let direction2 = 1.2;
let positionXTexte = 400;
let direction3 = 1;

let nOpacity = 1;
let radius = 40;
let radius2 = 30;


let tailleTexte2 = 10;
let opaciteTexte2 = 0;

let sDialogues = "";

let nIndex = 0;

let mouseEvent;
 
let COM = 5
let CON = 5

bMenu = false;


// let mouseX = 0;
// let mouseY = 0;

let Sophisme = [
  { name: "Strawman", Description: "You misrepresented someone's argument to make it easier to attack.", image: "assets/img/Straw_Man_Fallacy_Icon.png"  },
  { name: "Tu quoque", Description: "You avoided having to engage with criticism by turning it back on the accuser - you answered criticism with criticism.", image: "assets/img/finger-png-43096.png" },
  { name: "Ad populum", Description: "You claim that a statement is true or good simply because a large number of people believe it", image: "assets/img/png-clipart-computer-icons-crown-symbol-crown-cdr-angle.png" },
  // { name: "Appeal to authority", image: "assets/img/authority.png" },
];



/// DIALOGUES


let sGoblinText = [
  "“1 I don’t need fancy gear to win a fight—just my fists,\n my boots, and a very unhealthy amount of confidence,”\n the goblin grins while cracking his knuckles. \n“Trust me, it gets the job done.”", // 0

  "“ 2Oi, if everyone in my gang says I’m the smartest goblin in the dungeon,\n then it must be true,” he snorts proudly while adjusting his patched leather jacket.\n “After all, so many goblins can’t be wrong, right?”",
   // 1
  "“ 3Last night I stole a war boar from a bandit camp just to prove I could,”\n he says, shrugging. “Honestly, the boar was\n more impressed than the bandits were.”",

  "“ 4I swear I wasn’t running away—I was tactically increasing the distance\n between my face and the ogre’s club,” the goblin says defensively.\n “Look, survival’s an art.”",

  "“ 5Last night I stole a war boar from a bandit camp just to prove I could,”\n he says, shrugging. “Honestly, the boar was\n more impressed than the bandits were.”",
];




let sSqueletteText = 

["1",
   "2",
    "3",
     "4"];
/// CREATURES

let creatures = {
oGoblinPunk: {
  image: new Image(),
  src: "assets/img/GoblinPunkRes.png",
  GoblinDialogues: sGoblinText,
  ReponseGoblinPunk: 1,
  SophismeGoblinPunk: Sophisme[2],
  nNombreDialogues: 3
},
oSqueletteMonk: {
  image: new Image(),
  src: "assets/img/MonkSkeleton.png",
  SqueletteDialogues: sSqueletteText,
  ReponseSqueletteMonk: 1,
  SophismeSqueletteMonk: Sophisme[2],
  nNombreDialogues: 3
}
}

creatures.oGoblinPunk.image.src = creatures.oGoblinPunk.src;
creatures.oSqueletteMonk.image.src = creatures.oSqueletteMonk.src;


// let CurrentCreature;
// let CurrentAnswer;
// let CurrentSophismes;
// let CurrentDialogues;
// let CurrentSprite;

// let CurrentCreature = creatures.oSqueletteMonk;
// let CurrentAnswer = creatures.oSqueletteMonk.ReponseSqueletteMonk;
// let CurrentSophismes = creatures.oSqueletteMonk.SophismeSqueletteMonk;
// let CurrentDialogues = creatures.oSqueletteMonk.SqueletteDialogues;
// let CurrentSprite = creatures.oSqueletteMonk.image;

let CurrentCreature = creatures.oGoblinPunk;
let CurrentAnswer = creatures.oGoblinPunk.ReponseGoblinPunk
let CurrentSophismes = creatures.oGoblinPunk.SophismeGoblinPunk
let CurrentDialogues = creatures.oGoblinPunk.GoblinDialogues//[nIndex] 
let CurrentSprite = creatures.oGoblinPunk.image;

let oImagePoster = new Image();
oImagePoster.src = "assets/img/Dungeon & Dialogues png.png";

/// CURRENT SPRITE



/// IMAGE

let oFondDonjon = new Image();
  oFondDonjon.src = "assets/img/Old Dungeon/OldDungeon.png"


let oDialogueBox = new Image();
  oDialogueBox.src = "assets/img/Dialogue Box.png"

let oFlecheDroite = new Image();
  oFlecheDroite.src = "assets/img/Fleche droite.png"


let oFlecheGauche = new Image();
  oFlecheGauche.src = "assets/img/Fleche gauche.png"

function initialiser() {


  setInterval(bouclejeu, 1000 / 60);
  oCanvasHTML.addEventListener("click", clicCanvas);
  oCanvasHTML.addEventListener("contextmenu", clicDroite);
  oCanvasHTML.addEventListener("click", BoiteDialogue);
  oCanvasHTML.addEventListener("mousemove", CollisionText )
  }











function reset() {
  sEtatJeu = "intro";
  nIndex = 0;
  sDialogues = "";
   bMenu = false;  
console.log(nIndex)
}














function bouclejeu() {
  oContexte.clearRect(0, 0, nLargeur, nHauteur);
  if (sEtatJeu == "intro") {
    afficherIntro();
  } else if (sEtatJeu == "jeu") {
    afficherJeu();
  }
}

























function afficherIntro() {
  

  oContexte.letterSpacing = "0px";
  oContexte.fillStyle = "rgba(29, 27, 22, 1)";
  oContexte.fillRect(0, 0, nLargeur, nHauteur);
  oContexte.drawImage(oImagePoster, 200, 0, 400, 600);

  oContexte.font = `30px MorkDungeon`;
  oContexte.fillStyle = `rgba(255, 255, 255, ${opaciteTexte})`;

  oContexte.fillStyle = "rgba(175, 188, 55, 0.73)";
  oContexte.fillRect(325, 225, 150, 30);

  oContexte.textAlign = "center";
  oContexte.fillStyle = "white";
  oContexte.font = "30px MorkDungeon";
  oContexte.fillText("Start", nLargeur / 2, 250);

  oContexte.fillStyle = `rgba(255,255,255,${opaciteTexte}`;
  oContexte.textAlign = "center";
  oContexte.font = `${tailleTexte}px MorkDungeon`;
  oContexte.fillText("Dungeons & Dialogues", positionXTexte, 100);

  oContexte.fillStyle = `rgba(255,255,255,${opaciteTexte2}`;
  oContexte.textAlign = "center";
  oContexte.font = `${tailleTexte2}px Arial`;
  oContexte.letterSpacing = "8px";
  oContexte.fillText("Your weapons are your words", positionXTexte, 130);
  oContexte.letterSpacing = "0px";

  // Premier cercle

  radius = radius + direction2; // 1: 20 * 0.01 = 0.2
  if (radius > 60) {
    direction2 = direction2 * -1; // 20 * (0.01 * -1) = -0.2
  } else if (radius < 30) {
    direction2 = direction2 * -1; // 20 * (0.01 * -1) = - 0.2
  }

  radius2 = radius2 + direction3; // 1: 20 * 0.01 = 0.2
  if (radius2 > 60) {
    direction3 = direction3 * -1;
  } else if (radius2 < 30) {
    direction3 = direction3 * -1;
  }

  // deuxieme cercle
  if (opaciteTexte < 1) {
    opaciteTexte += direction;
  }

  if (tailleTexte < 50) {
    tailleTexte += 0.1;
  }
if (tailleTexte >= 50){

  if (opaciteTexte2 < 1) {
    opaciteTexte2 += direction;
  }
  // if (tailleTexte2 < 50) {
  //   tailleTexte2 += 0.1;
  // }
}

  //             console.log(tailleTexte, opaciteTexte,
  // positionXTexte);

  oContexte.beginPath();
  oContexte.arc(550, 460, radius, 0, Math.PI * 2);
  oContexte.fillStyle = "#e2bb0b5e";
  oContexte.fill();
  oContexte.closePath();

  oContexte.beginPath();
  oContexte.arc(550, 460, radius2, 0, Math.PI * 2);
  oContexte.fillStyle = `rgba(248, 108, 0, 0.38)`;
  oContexte.fill();
  oContexte.closePath();
  oContexte.fillStyle = `rgba(1, 1, 1, ${nOpacity})`;
  oContexte.fillRect(0, 0, 800, 600);
  
  if (nOpacity > 0) {
    nOpacity -= 0.01;
  }

}



























function clicCanvas(evenement) {
  let nPositionCurseurX = evenement.offsetX;
  let nPositionCurseurY = evenement.offsetY;

  let collision = false;
  
  collision = verifierCollisions(
    nPositionCurseurX,
    nPositionCurseurY,
    325,
    225,
    150,
    30
  );
  if (collision == true) {
    sEtatJeu = "jeu";
  }
  // console.log (collision)
  // console.log (sEtatJeu)
for (let i = 0; i < Sophisme.length; i++) {
    

   collisionSophisme = verifierCollisions (
    nPositionCurseurX,
    nPositionCurseurY,
    (215 + (i % 5) * 80),
    100 + (Math.floor(i/5) ) * 80,
    50,
    50
  )

  if (bMenu == true && collisionSophisme == true) {

    // console.log(oGoblinPunk.ReponseGoblinPunk, Sophisme)
      if (nIndex == CurrentAnswer && Sophisme[i] == CurrentSophismes) {

  console.log("You Found it!", Sophisme[i]); 
  bMenu = false;
  reset();
  console.log(nIndex)

  }else{
    bMenu = false;
    console.log ("You lost one composure point!")
  }
}

}

}




























function clicDroite(evenement) {
  evenement.preventDefault();

if (bMenu == true) {
  bMenu = false;
} else {
  bMenu = true;
}

console.log(bMenu)
  
}


























function afficherJeu() {


  oContexte.fillStyle = "black";
  oContexte.fillRect(0, 0, nLargeur, nHauteur);

  oContexte.drawImage(oFondDonjon,0,0,800,600);
  
  oContexte.drawImage(CurrentSprite, nLargeur / 2 - 152, 100, 300, 300);

  oContexte.fillStyle = "rgba(122, 45, 0, 0.47)";
  oContexte.fillRect(nLargeur / 2 - 200, 350, 400, 200);

  oContexte.drawImage(oDialogueBox,nLargeur / 2 - 200,350,400,200);

  // oContexte.fillStyle = "green";
  // oContexte.fillRect(150, 425, 50, 50);

  // let oFlecheGauche = new Image();
  // oFlecheGauche.src = "assets/img/Fleche gauche.png"

   oContexte.drawImage(oFlecheGauche,150, 425, 50, 50);

  // oContexte.fillStyle = "green";
  // oContexte.fillRect(600, 425, 50, 50);

  // let oFlecheDroite = new Image();
  // oFlecheDroite.src = "assets/img/Fleche droite.png"

   oContexte.drawImage(oFlecheDroite,600, 425, 50, 50);

  oContexte.font = "12px Arial";
  oContexte.fillStyle = "yellow";
  oContexte.textAlign = "left";

  // oContexte.fillText(sDialogues, 400, 400);
  // oContexte.fillStyle = "white"
  // oContexte.fillText("Hello world", nLargeur/2, nHauteur/2)

  let lines = sDialogues.split("\n");

//THE MAIN TEXT
  // console.log(lines)
  
  for (let i = 0; i < lines.length; i++) {
    oContexte.fillText(lines[i], 225, 410 + i * 30);
  }

  if (bMenu == true) {
    oContexte.fillStyle = "rgba(129, 159, 204, 0.51)";
    oContexte.fillRect(nLargeur/2-200,90,400,250);

    for ( let i = 0; i < Sophisme.length; i++) {

      let sophisme = Sophisme[i];
      let SophismeImg = new Image();
      SophismeImg.src = sophisme.image;

      // oContexte.fillStyle = "rgba(255, 0, 0, 0.51)";
      // oContexte.fillRect( (215 + (i % 5) * 80),100 + (Math.floor(i/5) ) * 80,50,50);

      oContexte.drawImage(SophismeImg,(215 + (i % 5) * 80),100 + (Math.floor(i/5) ) * 80,50,50);

      
    }     
  // let sPhrase = sGoblinText[0].toString();
let nPositionCurseurX = mouseEvent.offsetX;
let nPositionCurseurY = mouseEvent.offsetY;

// console.log (nPositionCurseurX,nPositionCurseurY)
for ( let i = 0; i < Sophisme.length; i++) {


collisionText = verifierCollisions(
    nPositionCurseurX,
    nPositionCurseurY,
    (215 + (i % 5) * 80),
    100 + (Math.floor(i/5) ) * 80,
    50,
    50
  );


  if (bMenu == true && collisionText == true) {
    oContexte.font = "30px Arial";
    oContexte.fillStyle = "white"
    oContexte.fillText(Sophisme[i].name,400,50,400)
    oContexte.font = "italic 15px Arial";
    oContexte.fillText(Sophisme[i].Description,400,75,600)
  }
  // console.log (collisionText)

  

  }



}

}


















function CollisionText(evenement) {


mouseEvent = evenement

//   console.log ("Mouse moved!")
  
}

function verifierCollisions(
  positionXCurseur,
  positionYCurseur,
  positionXElement,
  positionYElement,
  largeurElement,
  hauteurElement
) {
  if (
    positionXCurseur > positionXElement &&
    positionXCurseur < positionXElement + largeurElement &&
    positionYCurseur > positionYElement &&
    positionYCurseur < positionYElement + hauteurElement
  ) {
    return true;
  } else {
    return false;
  }
}

























function BoiteDialogue(evenement) {

  // VARIABLE THAT PLACES DIALOGUE BASED ON THE COLLISION
  let nNombreDialogues;
  let bActive = true

  if (bActive == true) {
    sDialogues = CurrentDialogues[nIndex]                                       //sGoblinText[nIndex];
    nNombreDialogues = 4;
  }

  // if (creatures.oSqueletteMonk.bSquelette == true) {
  //   sDialogues = sSqueletteText[nIndex];
  //   CurrentSprite = creatures.oSqueletteMonk.image;
  //   nNombreDialogues = 4;
  // }
  
  /// DIALOGUE BOX FUNCTION
  
  let nPositionCurseurX = evenement.offsetX;
  let nPositionCurseurY = evenement.offsetY;
  
  collisionDroite = false;
  collisionGauche = false;

  //droite
  collisionDroite = verifierCollisions(
    nPositionCurseurX,
    nPositionCurseurY,
    600,
    425,
    50,
    50
  );
  // console.log(collisionDroite);
  if (collisionDroite == true) {
    nIndex = nIndex + 1;

    if (nIndex >= nNombreDialogues) {
      nIndex = nNombreDialogues - 1 ;
    }
  }
  //gauche
  collisionGauche = verifierCollisions(
    nPositionCurseurX,
    nPositionCurseurY,
    150,
    425,
    50,
    50
  );

  if (collisionGauche == true) {
    nIndex = nIndex - 1;

    if (nIndex == -1) {
      nIndex = 0;
    }

    //CLIC SUR SOPHISME

    //  collisionSophisme = verifierCollisions(
    // nPositionCurseurX,
    // nPositionCurseurY,
    // 150,
    // 425,
    // 50,
    // 50
  
  }

  ///// DIALOGUES DES MONSTRES

  //GOBLINPUNK
  if (
    bActive == true &&
    (collisionGauche == true || collisionDroite == true)
  ) {
    sDialogues = CurrentDialogues[nIndex]  //sGoblinText[nIndex];   
    console.log(nIndex);
    
  }
  //SKELETON
  // if (
  //   bActive == true &&
  //   (collisionGauche == true || collisionDroite == true)
  // ) {
  //   sDialogues = sSqueletteText[nIndex];
  //   console.log(nIndex);
  // }

  // console.log(collisionDroite, collisionGauche, oGoblinPunk.bGoblin);
}






window.addEventListener("load", initialiser);
// Appuyer boutton Gauche (le catalogue des sophismes)

// Appuyer boutton Droit

// ClicCanvas

// Afficher Intro
//menu

// Afficher les Niveaux

// Affiche Jeu
// text box
// fleche pour deplacer les dialogues
// Verificateur Reponse

// verifacteur collision
