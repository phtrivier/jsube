var PUZZLE_STRUCTS = [];

function p(struct) {
    PUZZLE_STRUCTS.push(struct);
};

p({title : { fr : 'Pour commencer, trouvez la sortie...',
	     en : "Let's find the exit, for a start..."
	   },
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
   on_start : {en : "Welcome to UBE ! You are the little blue ball. The exit is on the other side. Simply point and click to reach the exit. Easy enough, right ?", 		fr : "Bienvenue dans UBE ! Vous &ecirc;tes la petite bille bleue. La sortie est de l'autre c&ocirc;t&eacute;. Cliquez sur la sortie pour l'atteindre. Pas trop dur ?"},
   on_end : { en : "Well done ! Have you noticed how your path has been highlighted ? Now, go on and try another puzzle...",
	      fr : "Bien jou&eacute; ! Vous avez remarqu&eacute; que votre chemin &eacute;tait trac&eacute; au fur et &agrave; mesure ? Maintenant essayez un autre niveau..."},
   moves : [Move.SINGLE]});

p({title : { fr : 'Parfois, il faut savoir sauter',
	     en : "Sometimes, you have to jump"
	   },
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

   on_start : {en : "The buttons at the bottom are your possible moves. The yellow moves lets you move two cells at a time. You'll need it",
	       fr : "Les bouttons en bas de l'&eacute;cran sont vos diff&eacute;rents mouvements possibles. Avec le jaune, vous pouvez avancer de deux cases &agrave; la fois. Vous en aurez besoin..."},
   moves : [Move.SINGLE, Move.DOUBLE]});



p({title : { fr : 'Un mur. Vous pouvez le passer, croyez moi.',
	     en : "A wall. You can cross it, believe me..."
	   },
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

   on_start : {en : "If you ever make a mistake, you can use the arrows at the bottom to undo or redo, as many times as you want !",
	       fr : "Si vous pensez vous &ecirc;tre tromp&eacute;, pas de panique ! Les deux fl&egrave;ches en bas &agrave; gauche vous permettent de revenir en arri&egrave;re autant de fois que vous voulez !"},
   moves : [Move.SINGLE, Move.SINGLE, Move.DOUBLE]});


p({title : { fr : 'Compliquons un peu. Juste un peu.',
	     en : "Let's get harder. Just a bit."
	   },
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

   on_end : {en : "You're starting to get it ! Let's continue...",
	     fr : "Vous avez compris le truc ! Continuons..."},


   moves : [Move.DOUBLE, Move.SINGLE, Move.SINGLE ]});

p({title : { fr : "Vous trouverez une solution en chemin...",
	     en : "You'll find a solution along the way..."
	   },
   rows : ["___________-__________",
	   "________-__-__-_______",
	   "_________-_-_-________",
	   "__________---_________",
	   "______________-----___",
	   "I----------D_---O---__",
	   "______________-----___",
	   "__________---_________",
	   "_________-_-_-________",
	   "________-__-__-_______",
	   "___________-__________"],

   moves : [Move.SINGLE, Move.SINGLE ]});

p({title : { fr : 'Du bon sens. Celui des aiguilles, par exemple.',
	     en : "Be wise. Clock-wise..."
	   },
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

   on_start :{en : "Sometimes, there is more than one solution...",
	      fr : "Parfois, il y a plusieurs solutions..."},
   moves : [Move.SINGLE, Move.SINGLE]});

p({title : { fr : "Ca a l'air facile ? Regardez bien..." ,
	     en : "Looking simple ? Look again..."
	   },
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


p({title : { fr : 'Encore trop simple ? Voyons voir...',
	     en : "Still too easy ? Let's see..."
	   },
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

   on_start : { en : "It's time for the last puzzle of the tutorial...",
		fr : "On en arrive au dernier niveau du tutoriel..."},
   on_end : { en : "This tutorial is now over. Thanks for playing !",
	      fr : "Ce tutoriel est maintenant fini. Merci d'avoir jou&eacute; !"},
   moves : [Move.SINGLE, Move.DOUBLE ]});

p({title : { fr : "Qu'entrent les chevaliers !",
	     en : "Let the knights come !"},
   rows : ["_____K_-_-___K_-_K____",
	   "_____-_K_--D--_-_-____",
	   "_____-----___-----____",
	   "_____-___________-____",
	   "_____-____-O-____-____",
	   "_____-___-___-___-____",
	   "_____----_____----____",
	   "______________________",
	   "________-------_______",
	   "________---I---_______",
	   "________-------_______"],
   on_start : { en : "If you've ever played chess, this new move should ring a bell..",
		fr : "Les joueurs d'&eacute;checs reconnaitront ce nouveau mouvement..."},
   moves : [ Move.KNIGHT, Move.SINGLE, Move.DOUBLE]});

p({title : { fr : "Joyeux anniversaire...",
	     en : "Happy birthday to ju..."},
   rows : ["___----_________----__",
	   "______-________-____-_",
	   "____K--____O___-____-_",
	   "______-________-____-_",
	   "___----____-____----__",
	   "___________-__________",
	   "____-------_-------___",
	   "____-_____________-___",
	   "____-_-----I-----_-___",
	   "____-_____________-___",
	   "____---------------___"],
   on_end : { en : "Happy Birthday, lad !",
	      fr : "Joyeux anniversaire, Grand !"},
   moves : [ Move.DOUBLE, Move.DOUBLE, Move.SINGLE, Move.DOUBLE]});


/* This one sounded like a good idea, but in the end it does not work ... 
p({title : { fr : 'Parfois on voudrait juste aller tout droit...',
	     en : 'Sometimes, you just want to go straight ahead...'},
   rows : ["___---------__________",
	   "___-_______-__________",
	   "___-__________________",
	   "___D__-----_-_________",
	   "___-__-_____-_________",
	   "___-__I_____------_-O_",
	   "___S__-_____-_________",
	   "___-__-----_-_________",
	   "___-__________________",
	   "___---------__________",
	   "______________________"],

   moves : [  Move.DOUBLE, Move.KNIGHT, Move.SINGLE, Move.KNIGHT, Move.SINGLE ]});
   */

