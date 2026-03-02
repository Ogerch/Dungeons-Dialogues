
//// LES VARIABLES

let oCanvasHTML = document.querySelector("canvas")
let oContexte = oCanvasHTML.getContext("2d")
oContexte.imageSmoothingEnabled = false;
let nHauteur = oCanvasHTML.height
let nLargeur = oCanvasHTML.width

let sEtatJeu = "intro"
let boutonAppuye = false;

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

let commenceText = false
let nIndex = 0;

let mouseEvent;
 
let COM = 5
let CON = 5

bMenu = false;

let Bouger = {
  w: true,
  a: true,
  s: true,
  d: true,
  ArrowUp: true,
  ArrowDown: true,
  ArrowRight:true,
  ArrowLeft:true
}

let EnnemiesLeft = 0

nVie = 5 

nvIEmAX = 5

PeutBouger = true
let NPCVisible = true
let opa = 1;
let speed = 0.02


/// LA MAP

let carte = [
  //1  //2  //3  //4  //5  //6  //7  //8  //9  //10 //11
  [ "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X" ],
  [ "X", "X", "X", "0", "X", "0", "0", "0", "X", "0", "0", "0", "X" ], //1
  [ "X", "X", "0", "0", "X", "0", "X", "0", "X", "0", "0", "0", "X" ], //2
  [ "X", "0", "0", "0", "0", "0", "0", "0", "X", "0", "0", "0", "X" ], //3
  [ "X", "0", "0", "0", "X", "0", "X", "0", "X", "X", "0", "X", "X" ], //4
  [ "X", "X", "0", "0", "X", "0", "X", "0", "0", "0", "0", "0", "X" ], //5
  [ "X", "0", "0", "X", "X", "0", "X", "X", "X", "X", "X", "X", "X" ], //6
  [ "X", "X", "0", "0", "X", "0", "0", "0", "X", "0", "0", "0", "X" ], //7
  [ "X", "0", "0", "0", "X", "0", "X", "0", "X", "0", "X", "0", "X" ], //8
  [ "X", "0", "0", "0", "0", "0", "0", "0", "0", "0", "X", "0", "X" ], //9
  [ "X", "X", "0", "0", "X", "0", "X", "0", "X", "0", "X", "X", "X" ], //10
  [ "X", "X", "X", "0", "X", "0", "0", "0", "X", "0", "0", "0", "X" ], //11
  [ "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X" ], //12
];

/// LES SONS/MUSIC

let sons = {
  introMusic: new Audio("assets/img/Dungeon Assets/Exemple_Music/example_music_01.ogg"),
  finPartie: new Audio("assets/img/Dungeon Assets/Exemple_Music/example_music_02.ogg"),
  encounter: new Audio("assets/img/Dungeon Assets/Exemple_Music/example_music_03.ogg"),
  dungeonCrawl: new Audio("assets/img/Dungeon Assets/Exemple_Music/Dungeon-Crawler.wav"),
  Correct: new Audio("assets/img/Dungeon Assets/treasure-open.wav"),
  hit: new Audio("assets/img/Dungeon Assets/hit_player.wav"),
  died: new Audio("assets/img/Dungeon Assets/hit_00.wav"),
  walk: new Audio("assets/img/Dungeon Assets/wizard boss/boss_fireball.wav")
};

let tuiles = [];
let margePersonnage = 140
let bBonneReponse = false



/// LES SOPHISMES

let Sophisme = [
  { name: "Strawman", 
    Description: "You misrepresented someone's argument to make it easier to attack.", 
    image: "assets/img/StrawManLogo.png"  },

  { name: "Tu quoque", 
    Description: "You avoided having to engage with criticism by turning it back on the accuser - you answered criticism with criticism.", 
    image: "assets/img/TuQuoQue.png" },

  { name: "Ad populum", 
    Description: "You claim that a statement is true or good simply because a large number of people believe it.", 
    image: "assets/img/AdPopulum.png" },

  {name: "Special Pleading", 
    Description: "You moved the goalposts or made up an exception when your claim was shown to be false.", 
    image: "assets/img/SpecialPleading.png"},

{name: "Appeal to Nature", 
  Description: "You are making an argument that because something is 'natural' it is therefore valid, justified, inevitable,good, or ideal.", 
  image: "assets/img/Appeal to nature.png"},

{name: "False Dilemma", 
  Description: "You present two alternative states as the only possiblities, when in fact more possibilities exist", 
  image: "assets/img/Black or White.png" },

{name: "Hasty Generalization", 
  Description: "You jumps to a conclusion about all cases based on only a few examples or limited evidence.", 
  image: "assets/img/HastyGeneralization.png"},
  // { name: "Appeal to authority", image: "assets/img/authority.png" },

  {name: "Circular Reasoning",
    Description: "You assume the conclusion in your premise, making the argument go in a circle without proving anything.",
    image: "assets/img/CircularReasoning.png"},

  {name: "Appeal to Emotion",
    Description: "You manipulate emotions instead of presenting a logical argument.",
    image: "assets/img/AppealToEmotion.png"},

  {name: "Red Herring",
    Description: "You introduce irrelevant information to distract from the actual issue.",
    image: "assets/img/RedHerring.png"},

  
];



/// LES DIALOGUES


let sGoblinText = [
  "“I don’t need fancy gear to win a fight—just my fists, my boots, and a very unhealthy amount of confidence,” the goblin grins while cracking his knuckles. “Trust me, it gets the job done.”", // 0

  "“Oi, if everyone in my gang says I’m the smartest goblin in the dungeon, then it must be true,” he snorts proudly while adjusting his patched leather jacket.“After all, so many goblins can’t be wrong, right?”",
   // 1
  "“ Last night I stole a war boar from a bandit camp just to prove I could,” he says, shrugging. “Honestly, the boar was more impressed than the bandits were.”",

  "“I swear I wasn’t running away—I was tactically increasing the distance between my face and the ogre’s club,” the goblin says defensively. “Look, survival’s an art.”"
];




let sSqueletteText = 

["“Every bone must move in harmony with the others. Without strict practice, even the strongest skeleton falls apart. Discipline is the path to strength.”",

   "“Pain is the teacher of the soul. Those who endure hardship grow sharper and wiser. Comfort only leads to decay.”",

    "“The posture of my ancestors is perfect. Every skeleton that replicates it achieves balance and clarity. Deviation leads only to weakness.”",

     "“The bones were meant to move in certain ways, just as the wind flows along the mountains. Any attempt to change this natural motion is wrong and will lead to imbalance and ruin”",

    "“Those who master the form are naturally enlightened and disciplined. Those who fail simply lack dedication. Results are the truest measure of progress.”"
];

let sCorpoDevilText = [
  "“Our realm thrives because every soul has a precise function. Structure and incentives create order, and order creates prosperity. Chaos only emerges when effort is not rewarded.” ",

"“Some mortals say infinite growth is impossible. Yet our operations expand endlessly: the more souls we manage, the stronger we grow. Stagnation is merely a lack of ambition.”",

"“You can choose any path within our corporation — climb the hierarchy, specialize in logistics, or transfer divisions. Freedom is the ability to choose inside the system we crafted.”",

"“Oppose our system, and disorder will reign, productivity will vanish, and every plane will plunge into ruin. Rejecting us is effectively supporting universal collapse.”",

"“Those at the top of our hierarchy are disciplined, intelligent, and capable. Those who fail lack these qualities. Results are the clearest measure of ability.”"

]

let sBartenderEyeTyrantText = [

  "“Every customer who sits at my bar leaves wiser than when they arrived. Only those who listen and learn can enjoy the finer spirits. Ignorance is the true poison.”",
  "“I’ve tended to hundreds of adventurers, and every one of them has returned safely with a coin in hand. Following my advice always leads to success. Why gamble otherwise?”",
  "“All troublemakers start with a drink in hand. Disorder always begins in taverns. Avoid it, and your life stays smooth.”",
  "“The finest whiskey is served cold, neat, in a crystal glass. Any other way dulls its flavor and insults its essence. Taste is perfected only by tradition.”",
  "“The bar thrives because we honor the laws of the house. Those who bend the rules often regret it, while those who follow them prosper. Order ensures satisfaction for all.”"
]

let sEmoVampireText = [
  "“I stay in the shadows because the world out there is too loud and fake.”",
  "“Everyone smiles, but their happiness always seems hollow to me.”",
  "“I write my feelings in blood because words on paper just aren’t enough.”",
  "“People say I’m obsessed with the night, but they don’t understand its calm.”",
  "“You claim vampires don’t exist? Clearly, you think living creatures should just melt under the sun.”",
  "“If you can’t see the truth in darkness, then maybe the light blinds you.”"

];

let sGelatinousCubeText = [
 "“I absorb the debris of this dungeon so no one else has to step in it.”",  // neutral
  "“Every adventurer leaves a trail of chaos behind them. It’s my job to clean it up.”", // neutral
  "“The walls and floors are my domain; dirt fears me.”", // neutral
   "“I move through every room to keep it tidy.”", // neutral, observational
  "“I make sure the dungeon is clean because a clean dungeon must be maintained by me.”" // circular reasoning
];


/// LES CREATURES DURANT LE COMBAT

let creatures = {
oGoblinPunk: {
  image: new Image(),
  src: "assets/img/GoblinPunkRes.png",
  GoblinDialogues: sGoblinText,
  ReponseGoblinPunk: 1,
  SophismeGoblinPunk: Sophisme[2],
  nNombreDialogues: sGoblinText.length,
  RightAnswer: "The goblin thinks something is true just because everyone agrees—an appeal to popularity."
},
oSqueletteMonk: {
  image: new Image(),
  src: "assets/img/MonkSkeleton.png",
  SqueletteDialogues: sSqueletteText,
  ReponseSqueletteMonk: 3,
  SophismeSqueletteMonk: Sophisme[4],
  nNombreDialogues: sSqueletteText.length,
  RightAnswer: "The skeleton claims bones must follow the wind, assuming it reflects the natural order—an appeal to nature."
},
oCorpoDevil: {
  image: new Image(),
  src: "assets/img/CorpoDevil.png",
  CorpoDevilDialogues: sCorpoDevilText,
  ReponseCorpoDevil: 3,
  SophismeCorpoDevil: Sophisme[5],
  nNombreDialogues: sCorpoDevilText.length,
  RightAnswer: "The line wrongly assumes there are only two options—support or universal collapse—a false dilemma."

},

oBartenderEyeTyrant: {
  image: new Image(),
  src: "assets/img/beholder.png",
  BartenderEyeTyrantDialogues: sBartenderEyeTyrantText,
  ReponseBartenderEyeTyrant: 2,
  SophismeBartenderEyeTyrant: Sophisme[6],
  nNombreDialogues: sBartenderEyeTyrantText.length,
  RightAnswer: "He assumes every troublemaker drinks—hasty generalization."
},

oEmoVampire: {
  image: new Image(),
  src: "assets/img/Emo vampire.png",
  EmoVampireDialogues: sEmoVampireText,
  ReponseEmoVampire: 4,
  SophismeEmoVampire: Sophisme[0],
  nNombreDialogues: sEmoVampireText.length,
  RightAnswer: "Strawman! You didn’t say vampires should burn in sunlight."
},

oGelatinousJanitor: {
  image: new Image(),
  src: "assets/img/GelatinousJanitor.png",
  GelatinousCubeDialogues: sGelatinousCubeText,
  ReponseGelatinousCube: 4, // second dialogue has the fallacy
  SophismeGelatinousCube: Sophisme[7], // Hasty Generalization
  nNombreDialogues: sGelatinousCubeText.length,
  RightAnswer: "Their reasoning loops — they clean the dungeon because they must clean it."
}

}

/// LA STRUCTURE 

//creature: {
//  image: new Image(),
//   src: "assets/img/GoblinPunkRes.png",
//   GoblinDialogues: sCreatureText,
//   ReponseGoblinPunk: ?,
//   SophismeGoblinPunk: Sophisme[?],
//   nNombreDialogues: creature.length,
//   RightAnswer: 
// }

creatures.oGoblinPunk.image.src = creatures.oGoblinPunk.src;
creatures.oSqueletteMonk.image.src = creatures.oSqueletteMonk.src;
creatures.oCorpoDevil.image.src = creatures.oCorpoDevil.src;
creatures.oBartenderEyeTyrant.image.src = creatures.oBartenderEyeTyrant.src;
creatures.oEmoVampire.image.src = creatures.oEmoVampire.src;
creatures.oGelatinousJanitor.image.src = creatures.oGelatinousJanitor.src;

let monsterVisible = false;


/// LE JOUEUR

let personnage = {
  x: 10 * (40) + margePersonnage,
  y: 2 * 40, 
  largeur: 40,
  hauteur: 40,
  vitesse: 40,
  image: new Image(),
  src: "assets/img/32x32-pixelKnight/GIFs/Idle/idleDown.gif"
};
personnage.image.src = personnage.src



/// LES POSITIONMENT DES MONSTRES

let npcs = [
{ 
  name: "Goblin Punk",
  x: 10 * (40) + margePersonnage,
  y: 4 * (40),
  largeur: 40, 
  hauteur: 40, 
  image: new Image(),
  src: "assets/img/TileGoblinPunk.png",
  visible: true,
CurrentCreature: creatures.oGoblinPunk,
CurrentAnswer:creatures.oGoblinPunk.ReponseGoblinPunk,
CurrentSophismes: creatures.oGoblinPunk.SophismeGoblinPunk,
CurrentDialogues: creatures.oGoblinPunk.GoblinDialogues, 
CurrentSprite: creatures.oGoblinPunk.image,
RightAnswer: creatures.oGoblinPunk.RightAnswer
},
{ 
  name: "Skeleton Monk",
  x: 4 * (40) + margePersonnage,
  y: 3 * (40),
  largeur: 40, 
  hauteur: 40, 
  image: new Image(),
  src: "assets/img/TileSkeletonMonk.png",
  visible: true,
CurrentCreature: creatures.oSqueletteMonk,
CurrentAnswer:creatures.oSqueletteMonk.ReponseSqueletteMonk,
CurrentSophismes: creatures.oSqueletteMonk.SophismeSqueletteMonk,
CurrentDialogues: creatures.oSqueletteMonk.SqueletteDialogues,
CurrentSprite: creatures.oSqueletteMonk.image,
RightAnswer: creatures.oSqueletteMonk.RightAnswer
},

{
  name: "Corpo Devil",
  x: 4 * (40) + margePersonnage,
  y: 9 * (40),
  largeur: 40, 
  hauteur: 40, 
  image: new Image(),
  src: "assets/img/CorpoDevil.png",
  visible: true,
CurrentCreature: creatures.oCorpoDevil,
CurrentAnswer:creatures.oCorpoDevil.ReponseCorpoDevil,
CurrentSophismes: creatures.oCorpoDevil.SophismeCorpoDevil,
CurrentDialogues: creatures.oCorpoDevil.CorpoDevilDialogues,
CurrentSprite: creatures.oCorpoDevil.image,
RightAnswer: creatures.oCorpoDevil.RightAnswer
},

{
   name: "Bartender Beholder",
  x: 8 * (40) + margePersonnage,
  y: 9 * (40),
  largeur: 40, 
  hauteur: 40, 
  image: new Image(),
  src: "assets/img/beholder.png",
  visible: true,
CurrentCreature: creatures.oBartenderEyeTyrant,
CurrentAnswer:creatures.oBartenderEyeTyrant.ReponseBartenderEyeTyrant,
CurrentSophismes: creatures.oBartenderEyeTyrant.SophismeBartenderEyeTyrant,
CurrentDialogues: creatures.oBartenderEyeTyrant.BartenderEyeTyrantDialogues,
CurrentSprite: creatures.oBartenderEyeTyrant.image,
RightAnswer: creatures.oBartenderEyeTyrant.RightAnswer
},

{
  name: "Emo Vampire",
  x: 1 * (40) + margePersonnage,
  y: 6 * (40),
  largeur: 40,
  hauteur: 40,
  image: new Image(),
  src: "assets/img/Emo vampire.png",
  visible: true,
  CurrentCreature: creatures.oEmoVampire,
  CurrentAnswer:  creatures.oEmoVampire.ReponseEmoVampire,
  CurrentSophismes:  creatures.oEmoVampire.SophismeEmoVampire,
  CurrentDialogues:  creatures.oEmoVampire.EmoVampireDialogues,
  CurrentSprite:  creatures.oEmoVampire.image,
  RightAnswer:  creatures.oEmoVampire.RightAnswer
},

{
  name: "Gelatinous Cube Janitor",
  x: 5 * (40) + margePersonnage,
  y: 6 * (40),
  largeur: 40,
  hauteur: 40,
  image: new Image(),
  src: "assets/img/GelatinousJanitor.png",
  visible: true,
  CurrentCreature: creatures.oGelatinousJanitor,
  CurrentAnswer: creatures.oGelatinousJanitor.ReponseGelatinousCube,
  CurrentSophismes: creatures.oGelatinousJanitor.SophismeGelatinousCube,
  CurrentDialogues: creatures.oGelatinousJanitor.GelatinousCubeDialogues,
  CurrentSprite: creatures.oGelatinousJanitor.image,
  RightAnswer: creatures.oGelatinousJanitor.RightAnswer

}
]

for (let i = 0; i < npcs.length; i++) {
npcs[i].image.src = npcs[i].src
}

let CurrentCreature;
let CurrentAnswer;
let CurrentSophismes;
let CurrentDialogues;
let CurrentSprite;


/// STRUCTURE 


// let CurrentCreature = creatures.oSqueletteMonk;
// let CurrentAnswer = creatures.oSqueletteMonk.ReponseSqueletteMonk;
// let CurrentSophismes = creatures.oSqueletteMonk.SophismeSqueletteMonk;
// let CurrentDialogues = creatures.oSqueletteMonk.SqueletteDialogues;
// let CurrentSprite = creatures.oSqueletteMonk.image;

// let CurrentCreature = creatures.oGoblinPunk;
// let CurrentAnswer = creatures.oGoblinPunk.ReponseGoblinPunk
// let CurrentSophismes = creatures.oGoblinPunk.SophismeGoblinPunk
// let CurrentDialogues = creatures.oGoblinPunk.GoblinDialogues//[nIndex] 
// let CurrentSprite = creatures.oGoblinPunk.image;





let compteurDelai = 0;
let delai = 2
let indexLettre = 0



/// LES IMAGES

let oFondDonjon = new Image();
  oFondDonjon.src = "assets/img/Old Dungeon/OldDungeon.png"


let oDialogueBox = new Image();
  oDialogueBox.src = "assets/img/Dialogue Box.png"

let oFlecheDroite = new Image();
  oFlecheDroite.src = "assets/img/Fleche droite.png"


let oFlecheGauche = new Image();
  oFlecheGauche.src = "assets/img/Fleche gauche.png"

let oFlecheHighlightGauche = new Image();
oFlecheHighlightGauche.src = "assets/img/ArrowHighlight left.png"

let oFlecheHighlightDroite = new Image();
oFlecheHighlightDroite.src = "assets/img/ArrowHighlight right.png"

let oTutoriel = new Image();
oTutoriel.src = "assets/img/pixilart-drawing.png"

let oWASD = new Image();
oWASD.src = "assets/img/WASD + ARROWS.png"

let oTutorielImage = new Image();
oTutorielImage.src = "assets/img/Tutorial Image.png"

let oImagePoster = new Image();
oImagePoster.src = "assets/img/Dungeon & Dialogues png.png";


let oImageWon = new Image();
oImageWon.src = "assets/img/backgroundWon.png"





function initialiser() {
  
 GenererGrille()
  window.addEventListener("keydown", onToucheEnfoncee)
  setInterval(bouclejeu, 1000 / 60);
  oCanvasHTML.addEventListener("click", clicCanvas);
  oCanvasHTML.addEventListener("contextmenu", clicDroite);
  oCanvasHTML.addEventListener("mousemove", collisionText);
  }

/// RESET A LA FIN DE CHAQUE ENCOUNTER 

function reset() {

 
    sons.encounter.pause();
    sons.dungeonCrawl.play();

CurrentCreature = ""
CurrentAnswer = ""
CurrentSophismes = ""
CurrentDialogues = ""
CurrentSprite = ""
    
commenceText == false
NPCVisible = true
PeutBouger = true
  
npcCollision.visible = false;
npcCollision.image.src = ""
// console.log (npcCollision)

opa = 1
nIndex = 0;
indexLettre = 0;
bMenu = false;  

bBonneReponse = true
sEtatJeu = "reponse"

}

/// BOUCLE JEU

function bouclejeu() {
  oContexte.clearRect(0, 0, nLargeur, nHauteur);
  if (sEtatJeu == "intro") {
    afficherIntro();
    tutoriel()
  } else if (sEtatJeu == "jeu") {
    
   
    dessinerFondDonjons()
    dessinerPersonnage()
    Encounter()
    DrawNPCs()
    updateText()
    tutoriel()
    
    
  
  } else if (sEtatJeu == "reponse") {

    BonneReponse()
  }
}
























/// INTRO

function afficherIntro(evenement) {

  // MUSIC
  if(sons.introMusic.paused ==true){
 sons.introMusic.volume = 0.2;
sons.introMusic.loop = true;
sons.introMusic.play();
  }

  PeutBouger = false;

// le display du intro

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
}

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

  // Tutoriel

  oContexte.font = "30px HerculesPixel"
  oContexte.fillStyle = "white"
  oContexte.fillText("Movement", 700,50)
  oContexte.drawImage(oWASD,650,75,100,150)

  oContexte.font = "12px courier"
  oContexte.textAlign = "left"
  oContexte.fillText("W or Arrow Up: UP",625,275)
   oContexte.fillText("A or Arrow LEFT: LEFT",625,300)
    oContexte.fillText("S or Arrow DOWN: DOWN",625,325)
     oContexte.fillText("D or Arrow RIGHT: RIGHT",625,350)
     oContexte.fillText("RIGHT CLICK FOR COMPENDIUM", 610 , 375)
      oContexte.font = "24px courier"
      oContexte.textAlign = "center"
     oContexte.fillText ("IMPORTANT", 75,100)
      
  if (nOpacity > 0) {
    nOpacity -= 0.01;
  }

if (mouseEvent != null){
let nPositionCurseurX = mouseEvent.offsetX;
let nPositionCurseurY = mouseEvent.offsetY;

collisionText = verifierCollisions(
    nPositionCurseurX,
    nPositionCurseurY,
    325, 
    225, 
    150, 
    30    
  );
// console.log(collisionText)


// HIGHLIGHT 

  if (collisionText == true) {
    // console.log("hello")

    
    oContexte.strokeStyle = "white"
    oContexte.lineWidth = 3
    oContexte.strokeRect(325, 225, 150, 30);
    
  }
  // console.log (collisionText)
}

// tutoriel visuel

  oContexte.drawImage(oTutoriel,25,25,50,50)
  
  

}


/// CETTE FONCTION EXPLIQUE AU JOUEUR POURQUOI C'EST LA BONNE REPONSE
function BonneReponse(evenement){



if (bBonneReponse == true){

  
 oContexte.fillStyle = "rgba(0, 0, 0, 1)"
  oContexte.fillRect(0,0,800,600)
oContexte.fillStyle = "white"

for (let i = 0; i < npcs.length; i++){
  oContexte.fillText (CurrentRightAnswer,nLargeur/2,nHauteur/2)
  console.log(npcs)
}
  oContexte.textAlign = "center"



}
}

/// EN METTANT LA SOURIS EN HAUT A GAUCHE PERMET AU JOUEUR DE VOIR VISUELLEMENT COMMENT LE JEU CE JOUE

function tutoriel() {

  nPositionCurseurX = mouseEvent.offsetX
  nPositionCurseurY = mouseEvent.offsetY

  
  collisionTutoriel = verifierCollisions(
  nPositionCurseurX,
  nPositionCurseurY,
  25,
  25,
  50,
  50
);
if (collisionTutoriel == true) {
  oContexte.fillStyle = "black"
  oContexte.fillRect (0,0,nLargeur,nHauteur)
  // console.log ("Question!!!")
  oContexte.font = "15px courier"
  oContexte.fillStyle = "white"
  oContexte.textAlign = "left"
  oContexte.drawImage(oTutorielImage, 0,0,nLargeur , nHauteur)
  // Continue this
}
  
}

/// TOUT CE QUI EST LIEE AU CLICK EST ICI

function clicCanvas(evenement) {

  // PENDANT UN GAME OVER, LORSQUE TU CLICK SA RESET LE JEU
  let nPositionCurseurX = evenement.offsetX;
  let nPositionCurseurY = evenement.offsetY;

  collisionEcran = verifierCollisions(
    nPositionCurseurX,
    nPositionCurseurY,
    0,
    0,
    nLargeur,
    nHauteur
  );


  console.log(collisionEcran,stopped)
  if (collisionEcran == true && stopped == false) {
    location.reload();
  }

  // BOUTTON COMMENCER / START

  if (sEtatJeu == "intro") {
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
      PeutBouger = true;
    }
  }else if(sEtatJeu == "jeu" || sEtatJeu=="reponse"){
    BoiteDialogue(evenement)
// console.log (collision)
// console.log (sEtatJeu)

// CHAQUE FOIS QUE JOUEUR REUSSI, IL PEUT CLICKER POUR SORTIR DE LA BOITE EXPLICATIVE DE SA REPONSE
let collisionReponse = verifierCollisions(
  nPositionCurseurX,
  nPositionCurseurY,
  0,
  0,
  nLargeur,
  nHauteur
);
if (collisionReponse == true && bBonneReponse == true) {
  bBonneReponse = false;
  monsterVisible = false;
  sEtatJeu = "jeu";
}

// TOUT LES SOPHISMES DANS LE MENU DU JOEUR
// (clicable) 

for (let i = 0; i < Sophisme.length; i++) {
  collisionSophisme = verifierCollisions(
    nPositionCurseurX,
    nPositionCurseurY,
    215 + (i % 5) * 80,
    100 + Math.floor(i / 5) * 80,
    50,
    50
  );


  //LA MECHANIC PRINCIPALE DU JEU

  if (bMenu == true && collisionSophisme == true) {
    // console.log(oGoblinPunk.ReponseGoblinPunk, Sophisme)
    if (nIndex == CurrentAnswer && Sophisme[i] == CurrentSophismes) {
      sons.Correct.play();
  
      bMenu = false;
      bBonneReponse = true;
      EnnemiesLeft += 1
      reset();
      // console.log(nIndex)
    } else {
      sons.hit.play()
      nVie -= 1;
      bMenu = false;
      console.log("You lost one composure point!");
    }
  }
}
  }else if(sEtatJeu == "reponse"){
  BoiteDialogue(evenement)
  }
 

  }

  


/// CLIC DROITE POUR OUVRIR LE MENU DE SOPHISME

function clicDroite(evenement) {
  evenement.preventDefault();



  


if (bMenu == true) {
  bMenu = false;
} else {
  bMenu = true;
}

console.log(bMenu)
  
}

// CETTE FONCTION PERMET LE PLACEMENT DE TOUT LES ASSETS DANS UN ENCOUNTER

function afficherJeu() {
 
  // LA LOGIC DE LA MUSIC
  if(sons.dungeonCrawl.paused == false && sons.encounter.paused==true && monsterVisible == true){
     sons.dungeonCrawl.pause();
     sons.dungeonCrawl.currentTime = 0;
     sons.encounter.volume = 0.2;
     sons.encounter.play();
 }
 
 

  commenceText = true
  NPCVisible = false

  PeutBouger = false
//DESSINER LE FOND DU DONJON ET LE UI

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


  if (opa >= 0) {
  opa = opa - speed
}
oContexte.fillStyle = `rgba(0, 0, 0, ${opa})`;
oContexte.fillRect(0,0,800,600)



// TOUT LES IMAGES DES SOPHISMES
  if (bMenu == true) {
    oContexte.fillStyle = "rgba(129, 159, 204, 0.51)";
    oContexte.fillRect(nLargeur/2-200,90,400,250);

    for ( let i = 0; i < Sophisme.length; i++) {

      let sophisme = Sophisme[i];
      let SophismeImg = new Image();
      SophismeImg.src = sophisme.image;

      oContexte.drawImage(SophismeImg,(215 + (i % 5) * 80),100 + (Math.floor(i/5) ) * 80,50,50);

    }    

let nPositionCurseurX = mouseEvent.offsetX;
let nPositionCurseurY = mouseEvent.offsetY;

/// POUR QUE LES SOPHISMES SOIT CLICACKBLE

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
    console.log(collisionText)
    oContexte.textAlign = "center"
    oContexte.font = "30px Arial";
    oContexte.fillStyle = "white"
    oContexte.fillText(Sophisme[i].name,400,50,400)
    oContexte.font = "italic 15px Arial";
    oContexte.fillText(Sophisme[i].Description,400,75,600)
  }

  

  }


  
 
}

let nPositionCurseurX = mouseEvent.offsetX;
let nPositionCurseurY = mouseEvent.offsetY;

// COLLISION POUR HIGHLIGHT LES FLECHES

 collisionText = verifierCollisions(
    nPositionCurseurX,
    nPositionCurseurY,
    150, 
    423, 
    50, 
    50    
  );

// console.log(collisionText)

  if (collisionText == true) {
    // console.log("Left")
    // oContexte.fillStyle = "red"
    // oContexte.fillRect(0,0,100,100)
    oContexte.drawImage(oFlecheHighlightGauche,150, 423)
  }

  
  collisionText = verifierCollisions(
   nPositionCurseurX,
   nPositionCurseurY,
   600, 
   423, 
   50, 
   50    
 );
// console.log(collisionText)
 if (collisionText == true) {
  //  console.log("right")
  //  oContexte.fillStyle = "red"
  //  oContexte.fillRect(700,0,100,100)
   oContexte.drawImage(oFlecheHighlightDroite,600, 423)
 }



UI()

}

/// LA BAR DE VIE

function UI() {

oContexte.font = "15px Arial";
  oContexte.fillStyle = "red"
   oContexte.fillRect(550,10,nLargeur/4, 40);
    
   oContexte.fillStyle = "green"
   oContexte.fillRect(550,10,(nVie / nvIEmAX) * (nLargeur/4) , 40);
  oContexte.fillStyle = "red"
  oContexte.font = "18px MorkDungeon"
  
  // LE DIALOGUE ACTUEL
   oContexte.fillText((nIndex + 1)+ "/" + (CurrentDialogues.length),225,390)
  //  console.log(nIndex)

   let oBarDeVie = new Image();
  oBarDeVie.src = "assets/img/healthBar.png"
  
   oContexte.drawImage (oBarDeVie,550,10)
  
// LE GAME OVER
   if (nVie <= 0) {
    
    GameOver()
   }

   oContexte.drawImage(oTutoriel,25,25,50,50)

}

// LE GAME OVER ECRAN
function GameOver() {

    sons.encounter.pause()
  
  stopped = false
  oContexte.fillStyle = "black"
  oContexte.clearRect
  oContexte.fillStyle = "black"
  oContexte.fillRect (0,0,800,600)

  oContexte.fillStyle = "red"
  oContexte.textAlign = "center"
  
  oContexte.font = "64px MorkDungeon"
  oContexte.fillText ("Game Over",nLargeur/2,nHauteur/2)
  oContexte.font = "32px Arial"
  oContexte.fillText ("(Click anywhere to try again)",nLargeur/2,nHauteur/2 + 30)

  
}

// ECRAN QUI PARRAIT APRES QUE LE JOUERU A VIDER LE DONJON

function YouWon() {
  

  PeutBouger = false
 console.log ("black")
oContexte.fillStyle = "white"
oContexte.fillRect(0,0,nLargeur,nHauteur)
oContexte.drawImage(oImageWon,0,0,nLargeur,nHauteur)
oContexte.textAlign = "center"
oContexte.font = "32px MorkDungeon"
oContexte.fillText("You’ve challenged every claim and uncovered every flaw. ",nLargeur/2,nHauteur/2)

oContexte.fillText("The dungeon falls silent. Congratulations, student of life.", nLargeur/2,nHauteur/2 +32)
oContexte.font = "64px Impact"
oContexte.fillText("You Won",nLargeur/2,nHauteur/2 +128)





}







let stopped = true

////// LA FONCTION PERMET LES LETTRES DE DIALOGUE
//// J'AI REUSSI CETTE FONCTION GRACE A L'IA
function updateText() {
if (stopped == true) {
    if (!commenceText) return;  // Only run if text has started
  let lettres = []
    if(sDialogues != null){
    lettres = sDialogues.split("");
    // console.log (lettres.length)
    }
    // Typewriter logic
    compteurDelai++;
    if (compteurDelai >= delai && indexLettre < lettres.length) {
        indexLettre++;
        compteurDelai = 0
       
      }
    // console.log(indexLettre)
    // console.log (indexLettre)

    // Build wrapped text
    let maxLineLength = 40; // max letters per line
    let wrappedText = "";
    let lineLength = 0;

    for (let i = 0; i < indexLettre; i++) {
      
        let char = lettres[i];
        wrappedText += char;
        lineLength++;

        if (lineLength >= maxLineLength && char == " ") {
            wrappedText += "\n";
            lineLength = 0;
        }
    }

    // Draw each line separately because canvas does not handle '\n'
    let lines = wrappedText.split("\n");
    oContexte.fillStyle = "yellow";
    oContexte.textAlign = "center";
    oContexte.font = "18px Cousine";

    for (let i = 0; i < lines.length; i++) {
        oContexte.fillText(lines[i], 400, 410 + i * 20); // 20px line height
    }
}
}





/// CETTE FONCTION DETECT LE MOVEMENT DE LA SOURIS ET PAR EXTENSION MET EN JOUR LE POSITIONMENT DE LA SOURIS

function collisionText(evenement) {


mouseEvent = evenement

  // console.log ("Mouse moved!")
  
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

// FONCTION DE LA BOITE DE DIALOGUE
function BoiteDialogue(evenement) {
  

  // VARIABLE THAT PLACES DIALOGUE BASED ON THE COLLISION
  let nNombreDialogues;
  let bActive = true
 
  
  if (bActive == true) {
    sDialogues = CurrentDialogues[nIndex]  
    console.log(sDialogues)                                     
    nNombreDialogues = CurrentCreature.nNombreDialogues;
  }
  
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

    
  
  }

  

  ///// DIALOGUES DES MONSTRES

  if (
    bActive == true &&
    (collisionGauche == true || collisionDroite == true)
  ) {
    sDialogues = CurrentDialogues[nIndex]
     indexLettre = 0;    //sGoblinText[nIndex];   
    console.log(nIndex);

    
    
    

    console.log(sDialogues[nIndex]);
    

  }
  
}

/// DESSINE LE DONJON
function dessinerFondDonjons () {

if(sons.dungeonCrawl.paused==true && monsterVisible == false){
 sons.introMusic.pause();  
 sons.encounter.pause
 sons.dungeonCrawl.volume = 0.2;
 sons.dungeonCrawl.play();
 sons.dungeonCrawl.loop();
}
 
 
 


  oContexte.fillStyle = "black"
  oContexte.fillRect(0,0,nLargeur,nHauteur)
   
  for(let i = 0; i < tuiles.length; i++){

    let tuile = tuiles[i]
     
    // oContexte.fillRect(0,0,nLargeur,nHauteur)
    oContexte.drawImage(tuile.image, tuile.x, tuile.y, tuile.largeur, tuile.hauteur)
  }



















}

function GenererGrille() {

  for (let rangeeIndex = 0; rangeeIndex < carte.length; rangeeIndex++){
    let rangee = carte[rangeeIndex]; // rangee par x 

    // console.log(rangee);

    for (let colonneIndex = 0; colonneIndex < rangee.length; colonneIndex++  ) {
      let type = rangee[colonneIndex]
      // console.log(type)
      let margeCarte = 140
      let oTuile = {
        x: colonneIndex * 40 + margeCarte,
        y: rangeeIndex * 40,
        hauteur: 40,
        largeur: 40,
        image:new Image(),
        //iamges
      }
      if(type=="X") {
        oTuile.type = "bloc"
        oTuile.image.src = "assets/img/0x72_DungeonTilesetII_v1.7/frames/wall_mid.png"
      } else {
        oTuile.type = "sol"
        oTuile.image.src = "assets/img/0x72_DungeonTilesetII_v1.7/frames/floor_1.png"
      }
      // console.log(rangeeIndex,colonneIndex);

      tuiles.push(oTuile)

    }
  
  }



}
/// DESSINE LE PERSO

function dessinerPersonnage() {
 
  oContexte.drawImage(personnage.image, personnage.x, personnage.y, personnage.largeur, personnage.hauteur);
  // if (npcVisible1 = true){
  // oContexte.drawImage(npcs.image[0],npc.x,npc.y, npc.largeur,npc.hauteur);
  oContexte.fillStyle = "white"
  oContexte.font = "22px Courier"
  oContexte.fillText(EnnemiesLeft+"/"+npcs.length,725,100)
  oContexte.font = "12px Courier"
  oContexte.fillText("Opponents left", 725,75)

  
  
}
/// MECHANIC DE MOUVEMENT

function BougerPerso(toucheClavier) {


  // if (toucheClavier == "w") {personnage.y -= personnage.vitesse};
  // if (toucheClavier == "s") {personnage.y += personnage.vitesse};
  // if (toucheClavier == "a") {personnage.x -= personnage.vitesse};
  // if (toucheClavier == "d") {personnage.x += personnage.vitesse};



  if (PeutBouger == true) {

    if(toucheClavier == "d" || toucheClavier == "arrowright"){
      personnage.x += personnage.vitesse
      sons.walk.play()
      personnage.image.src = "assets/img/32x32-pixelKnight/separateFrames/block/block-right.png" 
      for (let i = 0; i < tuiles.length; i++){
      let tuile = tuiles[i]

      if (detecterCollision(personnage,tuile)==true && tuile.type == "bloc"){
        personnage.x -= personnage.vitesse;
      }
    }
  }    



   if(toucheClavier == "a" || toucheClavier == "arrowleft") {
    // personnage.x += personnage.vitesse;
    personnage.x -= personnage.vitesse
  sons.walk.play()
     personnage.image.src = "assets/img/32x32-pixelKnight/GIFs/staticLeft.gif" 
     for (let i = 0; i < tuiles.length; i++){
      
      let tuile = tuiles[i]
      if (detecterCollision(personnage,tuile)==true && tuile.type == "bloc"){
        personnage.x += personnage.vitesse;
      }
    }
  }



   if(toucheClavier == "s" || toucheClavier == "arrowdown") {
    // personnage.y += personnage.vitesse;
    personnage.y += personnage.vitesse
  sons.walk.play()
     personnage.image.src = "assets/img/32x32-pixelKnight/GIFs/staticDown.gif" 
     for (let i = 0; i < tuiles.length; i++){
      
      let tuile = tuiles[i]
      if (detecterCollision(personnage,tuile)==true && tuile.type == "bloc"){
        personnage.y -= personnage.vitesse;
      }
    }
  }


  
   if(toucheClavier == "w" || toucheClavier == "arrowup") {
    // personnage.y -= personnage.vitesse;
      sons.walk.play()
      personnage.y -= personnage.vitesse
      personnage.image.src = "assets/img/32x32-pixelKnight/GIFs/staticUp.gif" 
     for (let i = 0; i < tuiles.length; i++){
      
      let tuile = tuiles[i]
      if (detecterCollision(personnage,tuile)==true && tuile.type == "bloc"){
        personnage.y += personnage.vitesse;
      }
    }
  }
}
}

function onToucheEnfoncee(evenement) {

  let toucheClavier = evenement.key.toLowerCase();
  // touches[toucheClavier] = true;
  
  if (["w","a","s","d","arrowup","arrowdown","arrowleft","arrowright"].includes(toucheClavier) && evenement.repeat == false) {
    evenement.preventDefault();
    BougerPerso(toucheClavier);

    // console.log(toucheClavier)
    
  } 
 }
  

function detecterCollision(objet1, objet2) {
  if (objet1.x < objet2.x + objet2.largeur && 
      objet1.x + objet1.largeur > objet2.x &&
      objet1.y < objet2.y + objet2.hauteur &&
      objet1.y + objet1.hauteur > objet2.y
  ) { 
  return true;
} else {
  return false;
}
}


/// CETTE FONCTION DÉTECTE LA CRÉATURE AVEC LAQUELLE LE JOUEUR EST ENTRÉ EN COLLISION.
/// UNE FOIS LA COLLISION SURVENUE, ELLE DÉFINIT LES PROPRIÉTÉS ASSOCIÉES DE LA CRÉATURE POUR LA SÉQUENCE DE RENCONTRE.
function Encounter() {
// NPCVisible = false


 for (let i = 0; i < npcs.length; i++) {

        let npc = npcs[i];
        


  if (npcs[i].visible == true && detecterCollision(personnage,npcs[i]) ) {
    monsterVisible = true
    // console.log("hello!")
      // console.log(npcs[i].visible)
       npcCollision = npcs[i];
      //  console.log (npcCollision)

        CurrentCreature  = npc.CurrentCreature;
        CurrentAnswer    = npc.CurrentAnswer;
        CurrentSophismes = npc.CurrentSophismes;
        CurrentDialogues = npc.CurrentDialogues;
        CurrentSprite    = npc.CurrentSprite;
        CurrentRightAnswer = npc.RightAnswer;

        // nIndex = 0;
      sDialogues = CurrentDialogues[nIndex];
     

     afficherJeu();
   
  }

  
}
}

/// DRAWS ALL THE MONSTERS
function DrawNPCs() {
// NPCVisible = true

  if (NPCVisible == true){
  for (let i = 0; i < npcs.length; i++) {
        // let npc = npcs[i];
        oContexte.drawImage(npcs[i].image, npcs[i].x, npcs[i].y, npcs[i].largeur, npcs[i].hauteur, );
}

oContexte.drawImage(oTutoriel,25,25,50,50)
}

 if (EnnemiesLeft == npcs.length) {

    YouWon()
  }
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
