var PUZZLE_STRUCTS = [];

function p(struct) {
    PUZZLE_STRUCTS.push(struct);
};

p({title : { fr : 'Pour commencer, trouvez la sortie...' },
   rows : ["######################",
	   "######################",
	   "######################",
	   "##-----########-----##",
	   "#-------######-------#",
	   "#---I------------O---#",
	   "#-------######-------#",
	   "##-----########-----##",
	   "######################",
	   "######################",
	   "######################"],
   on_start : {en : "Welcome to UBE ! You are the little blue ball. The exit is on the other side. Simply point and click to reach the exit. Easy enough, right_?", 		fr : "Bienvenue dans UBE ! Vous êtes la petite bille bleue. La sortie est de l'autre côté. Cliquez sur la sortie pour l'atteindre. Pas trop dur ?"},
   on_end : { en : "Well done ! Have you noticed how your path has been highlighted ? Now, go on and try another puzzle...",
	      fr : "Bien joué ! Vous avez remarqué que votre chemin était tracé au fur et à mesure ? Maintenant essayez un autre niveau..."},
   moves : [Move.SINGLE]});

/*
 */

p({title : { fr : 'Parfois, il faut savoir sauter' },
   rows : ["I----------___________",
	   "__________-___________",
	   "_________---__________",
	   "______________________",
	   "______---------_____O_",
	   "____________________-_",
	   "__________-_______-_-_",
	   "______________________",
	   "________-----_____-___",
	   "______________________",
	   "__________-_-_-_-_-___"],

   moves : [Move.SINGLE, Move.DOUBLE]});

/*
  after_start_message({en = "The buttons at the bottom are your possible moves. The yellow moves lets you move two cells at a time. You'll need it",
  fr = "Les bouttons en bas de l'écran sont vos différents mouvements possibles. Avec le jaune, vous pouvez avancer de deux cases à la fois. Vous en aurez besoin..."],

*/
p({title : { fr : 'Un mur. Vous pouvez le passer, croyez moi.' },
   rows : ["----------____________",
	   "-I---------___________",
	   "--------------------__",
	   "----------------------",
	   "_---------____________",
	   "________--_-----------",
	   "________--_-----------",
	   "________--_-----------",
	   "________--_-----------",
	   "________--_---------O-",
	   "_________-_-----------"],

   moves : [Move.SINGLE, Move.SINGLE, Move.DOUBLE]});

/*
  after_start_message({en = "If you ever make a mistake, you can use the arrows at the bottom to undo or redo, as many times as you want_!",
  fr = "Si vous pensez vous être trompé, pas de panique_! Les deux flèches en bas à gauche vous permettent de revenir en arrière autant de fois que vous voulez_!"],
*/

p({title : { fr : 'Compliquons un peu. Juste un peu.' },
   rows : ["I-___________----_____",
	   "----------___-------__",
	   "__--_________----__-__",
	   "___-_-----_________-__",
	   "___-_-----------___-__",
	   "___-_-----_________-__",
	   "___-___-_____----__-__",
	   "___-___----------__-__",
	   "___-___-_____----__-__",
	   "___-___-___________-__",
	   "___-----___________--O"],

   moves : [Move.DOUBLE, Move.SINGLE, Move.SINGLE ]});
/*
  before_end_message({en="You're starting to get it_! Let's continue...",
  fr="Vous avez compris le truc_! Continuons..."],
*/

p({title : { fr : "Vous trouverez une solution en chemin..."},
   rows : ["___________-__________",
	   "________-__-__-_______",
	   "_________-_-_-________",
	   "__________---_________",
	   "______________-----___",
	   "I-----------_---O---__",
	   "______________-----___",
	   "__________---_________",
	   "_________-_-_-________",
	   "________-__-__-_______",
	   "___________-__________"],

   moves : [Move.SINGLE, Move.SINGLE ]});

/*
  add_move(5,11,Move.DOUBLE, { en = "You picked another move. You can use it to reach the exit_!", 
  fr = "Vous avez gagné un déplacement. Utilisez le pour atteindre la sortie_!"
  ],
*/

p({title : { fr : 'Du bon sens. Celui des aiguilles, par exemple.' },
   rows : ["______________________",
	   "__---____________---__",
	   "_--D----------_--S---_",
	   "_-----__________-----_",
	   "___-_____-----___-____",
	   "___-____---O---__-____",
	   "___-_____-----___-____",
	   "_-----__________----__",
	   "_--I--_____------D--__",
	   "__---____________--___",
	   "______________________"],

   moves : [Move.SINGLE, Move.SINGLE]});

/*
  after_start_message({en = "Sometimes, there is more than one solution...",
  fr = "Parfois, il y a plusieurs solutions..."],
*/

p({title : { fr : "Ca a l'air facile ? Regardez bien..." },
   rows : ["______________________",
	   "_______-______________",
	   "___-----_--S-_________",
	   "___-___-_----_-_______",
	   "___-_____----_-----___",
	   "___-__________-___-___",
	   "___-______________-___",
	   "__---____________---__",
	   "_--I--------------O--_",
	   "__---____________---__",
	   "______________________"],

   moves : [Move.DOUBLE, Move.DOUBLE]});


p({title : { fr : 'Encore trop simple ? Voyons voir...' },
   rows : ["______________________",
	   "_____-------_-----____",
	   "_____-___________-____",
	   "_____-___________-____",
	   "_____-___________-____",
	   "_____---I_____O---____",
	   "_____-___________-____",
	   "_____-___________-____",
	   "_____-___________-____",
	   "_____----S____----____",
	   "______________________"],

   moves : [Move.SINGLE, Move.DOUBLE ]});

/*
  after_start_message({en = "It's time for the last puzzle...",
  fr = "On en arrive au dernier niveau..."],

  before_end_message({ en = "This tutorial is now over. Thanks for playing !",
  fr = "Ce tutoriel est maintenant fini. Merci d'avoir joué !"],

*/
