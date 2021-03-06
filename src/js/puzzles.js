var PUZZLE_STRUCTS = [];

function p(struct) {
    PUZZLE_STRUCTS.push(struct);
};

p({title : { fr : 'Pour commencer, trouvez la sortie...',
	     en : "Let's find the exit, for a start..."
	   },
   rows : ["______________________",
	   "______________________",
	   "______________________",
	   "__-----________-----__",
	   "_-------______-------_",
	   "_---I------------O---_",
	   "_-------______-------_",
	   "__-----________-----__",
	   "______________________",
	   "______________________",
	   "______________________"],
   on_start : {en : "Welcome to UBE ! You are the little blue ball. The exit is on the other side. Simply point and click to reach the exit. Easy enough, right ?", 		fr : "Bienvenue dans UBE ! Vous &ecirc;tes la petite bille bleue. La sortie est de l'autre c&ocirc;t&eacute;. Cliquez sur la sortie pour l'atteindre. Pas trop dur ?"},
   on_end : { en : "Well done ! Have you noticed how your path has been highlighted ? Now, go on and try another puzzle...",
	      fr : "Bien jou&eacute; ! Vous avez remarqu&eacute; que votre chemin &eacute;tait trac&eacute; au fur et &agrave; mesure ? Maintenant essayez un autre niveau..."},
   moves : [Move.SINGLE]});


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

   on_start : {en : "The buttons at the bottom are your possible moves. The yellow moves lets you move two cells at a time. You'll need it",
	       fr : "Les boutons en bas de l'&eacute;cran sont vos diff&eacute;rents mouvements possibles. Avec le jaune, vous pouvez avancer de deux cases &agrave; la fois. Vous en aurez besoin..."},

   moves : [Move.SINGLE, Move.SINGLE, Move.DOUBLE]});


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

   on_start : {en : "If you ever make a mistake, you can use the arrows at the bottom to undo or redo, as many times as you want !",
	       fr : "Si vous pensez vous &ecirc;tre tromp&eacute;, pas de panique ! Les deux fl&egrave;ches en bas &agrave; gauche vous permettent de revenir en arri&egrave;re autant de fois que vous voulez !"},

   moves : [Move.SINGLE, Move.DOUBLE]});


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

   on_start : {en : "It you feel stuck on a puzzle, just use the links on the top of the screen to try another one. No reason to feel frustrated, it's just a game ;)", 		fr : "Si vous &ecirc;tes bloqu&eacute; sur un puzzle, vous pouvez utiliser les liens en haut de l'&eacute;cran pour passer au suivant. On va pas se prendre la t&ecirc;te pour un jeu ;)"},


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

   on_start : {en : "You can pick up new moves in a puzzle. Try reaching the yellow cell in the middle.",
	       fr : "Vous pouvez r&eacute;cup&eacute;rer des mouvements suppl&eacute;mentaires en cours de route. Essayez d'atteindre la case jaune au milieu..."},

   moves : [Move.SINGLE, Move.SINGLE ]});

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

p({title : { fr : "Souriez, vous jouez !",
	     en : "Give me a happy face !"},
   rows : ["______-K-------______",
	   "_____-_________-_____",
	   "____-____-_-____-____",
	   "____-___--_--___-____",
	   "____-___-I_-O___-____",
	   "____-_K__-_-__-_-____",
	   "____-_-_______-_-____",
	   "____S__-_____K__-____",
	   "_____-__-D---__-_____",
	   "_____-_________-_____" ,
	   "______-------K-______"],

   moves : [ Move.DOUBLE, Move.DOUBLE, Move.DOUBLE ]});

p({title : { fr : "Et un, et deux, et trois d'un coup...",
	     en : "Three is company"},

   rows : ["______-_______________",
	   "______--_______-______",
	   "______---_____--______",
	   "_____________---_-----",
	   "___---___---______----",
	   "____I-___--__-_____-O-",
	   "_____-___-___-T-____--",
	   "_____________---_____-",
	   "____-__-----_S________",
	   "___--___---___________",
	   "__---____-____________"],

   on_start : { en : "The purple moves let you cross *three* cells at a time. See where you can go now...",
		fr : "Le mouvement violet vous permet de franchir trois cases d'un coup. Voyons o&ugrave; cela vous m&egrave;ne..."},

   moves : [  Move.DOUBLE, Move.TRIPLE]});


p({title : { fr : 'Spéciale dédicace aux profs de maths...',
	     en : 'Here is to the math teachers of the world...'
	   },
   rows : ["______________________",
	   "______________________",
	   "______________________",
	   "______________________",
	   "_I-----------------T__",
	   "______________________",
	   "______________________",
	   "__O------------------_",
	   "______________________",
	   "______________________",
	   "______________________"],

   moves : [Move.DOUBLE, Move.DOUBLE]});

p({title : { fr : "Ca tourne...",
	     en : "Spining around the solution..."
	   },
   rows : ["__________I____-----__",
	   "__________-________-__",
	   "__________-________-__",
	   "__________-________-__",
	   "__________-________-__",
	   "__T----------------S__",
	   "__-_______-___________",
	   "__-___________________",
	   "__-___________________",
	   "__-___________________",
	   "__--------O___________"],

   moves : [Move.DOUBLE, Move.TRIPLE, Move.KNIGHT, Move.DOUBLE]});

p({title : { fr : 'Parfois on voudrait juste aller tout droit...',
	     en : 'Sometimes, you just want to go straight ahead...'},
   rows : ["___---------__________",
	   "___-_______-__________",
	   "___-__________________",
	   "___-__-----___________",
	   "___-__-_____-_________",
	   "___-__I_____------_O__",
	   "___T__-----_-_________",
	   "___-________-_________",
	   "___-__________________",
	   "___---------__________",
	   "______________________"],

   on_end : { en : "That's all for now, thanks for playing ! Come back later for more, who knows..",
	      fr : "C'est tout pour le moment. A bientôt pour la suite, qui sait..."},

   moves : [  Move.DOUBLE, Move.KNIGHT, Move.SINGLE, Move.KNIGHT, Move.SINGLE ]});

/* To be continued : rough idea of a level with positions of football players..
p({title : { fr : 'Template',
	     en : 'Template'
	   },
   rows : ["__--________--____--__",
	   "__-__________-_____-__",
	   "_________--____-______",
	   "__--_--__-__-T_--_-K__",
	   "-_-___-______-_____-_-",
	   "I_______--_____--____O",
	   "-_-___-______-_____-_-",
	   "__--_--__-__D-_--_--__",
	   "_________--____-______",
	   "__-__________-_____-__",
	   "__--________--____--__"],

   moves : [Move.SINGLE, Move.TRIPLE, Move.KNIGHT, Move.SINGLE]});
   */

var EASTER_EGGS = { 42 : {title : { fr : "Joyeux anniversaire...",
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
			  moves : [ Move.DOUBLE, Move.DOUBLE, Move.SINGLE, Move.DOUBLE]
			 }
		  };