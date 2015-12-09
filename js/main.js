
var fr= {
	loading: 'Chargement',
	experiment:{
		artwork: 'artwork.jpg',
		artworkRevealed: 'artwork_revealed.jpg',
		text: '<a>À l\'aube de cette nouvelle année,</a> <a>nous vous invitons à toucher du doigt le secret d’une oeuvre d’art.</a><br><br><a>Commençons par le bas de l’image où son aspect granuleux laisse percevoir le motif simple d’un foulard, discrètement noué par une attache.</a><br> <a>Alors que vous effleurez les contours du tissu,</a><a> suivez vos intuitions en remontant vers un visage charmant.</a><br> <a>Vous êtes sur le point de découvrir la personne qui se cache</a><a> entre les lignes de cette photographie...</a><br><br> <a>Devinez-vous une bouche féminine,</a><a> la courbure élégante d’un nez ?</a> <a>Imaginez ce beau profil et continuez votre progression.</a><br> <a>A présent, attardez-vous sur ce regard rêveur aux sourcils en virgule.</a> <a>Il s’agit de celui de Meret Oppenheim,</a><a> artiste Suisse d’avant-garde qui fût l\’une des grandes figures du mouvement surréaliste.</a> <br><br> <a>Caressez sa chevelure et abordez l\’arrondi de son oreille. </a><a>Un curieux dessin, enchevêtrement végétal esquissé au dessus du cliché</a><a> au stylo y prend naissance et se déploie sur ce visage gracieux.</a> <br><a>Il est le trait d’union de l\’artiste avec son compagnon Man Ray, auteur de ce portrait réalisé en 1936.</a><br><br><a>Expérimentateur tous azimuts de la photographie moderne,</a><a> Emmanuel Radinsky utilisa durant sa vie ce pseudonyme signifiant “homme de lumière”.</a> <br><br> <a>Il est temps à présent pour vous d’en allumer une</a><a> afin de regarder d\’un nouvel oeil ce qui fait la beauté d\’une oeuvre d’art.</a>',
		textRevealed: '<a>En 2016, Neuflize OBC poursuivra son action de mécénat</a><a> en renforçant notamment ses contributions à l’accessibilité de l’art par tous dans le domaine des arts visuels.</a><br><br><a> En 2016, Neuflize OBC poursuivra son soutien au </a><a id="lam-word" class="button">LaM<img src="img/neuflize_mots.gif"></img><img src="img/neuflize_mots_hover.gif"></img></a><a> de Villeneuve d’Asq pour la mise en œuvre d’un programme original de médiation intitulé</a><a> « Rencontre autour d’une œuvre » .</a><br><br><a> Issue d’une collaboration avec </a><a id="esat-word" class="button">l\’ESAT<img loop=infinite src="img/neuflize_mots.gif"></img><img src="img/neuflize_mots_hover.gif"></img></a><a>, ce programme permet aux personnes atteintes de cécité de découvrir et comprendre des œuvres qui y sont présentées au travers d’un processus de fabrication d’images mentales guidé par le toucher.</a><br><br><a> Rendre l’art accessible, combattre l’exclusion, favoriser l’intégration et l’insertion sociale des personnes en situation de handicap visuel,</a><a> les aider à garder les yeux ouverts sur le monde... sont autant de vœux que Neuflize OBC souhaite pour cette année 2016 partager avec vous.</a>',
		cartoucheRight: '© MAN RAY TRUST / ADAGP PARIS 2015 - Cliché : Banque d’images de l’ADAGP',
		cartoucheBottom: 'Oeuvre reproduite dans le cadre du programme « Rencontre autour d’une oeuvre» proposé à des personnes en situation de handicap visuel, par le LaM de Villeneuve d’Ascq, grâce au mécénat de Neuflize OBC.'
	},
	legal:{
		title: 'Mentions légales',
		texte: ""
	},
	wishes:{
		text:'Meilleurs voeux<br> pour l\'année 2016',
		subText:'Valoriser, Révéler, Garder les yeux ouverts sur le monde.'
	}


};
var loading = MyApp.templates.loading(fr);
var experiment = MyApp.templates.experiment(fr);
var wishes = MyApp.templates.wishes(fr);
var legal = MyApp.templates.legal(fr);
var ui = MyApp.templates.ui(fr);
// console.log(html);

$(document).ready(function () {
	$(this).scrollTop(0);
    $('#loading').html(loading);
    $('#experiment').html(experiment);
    $('#wishes').html(wishes);
    $('#legal').html(legal);
    $('#ui').html(ui);



    var IEversion = detectIE();

	if (IEversion !== false) {
	  //document.getElementById('result').innerHTML = 'IE ' + IEversion;
	  Neuflize.isIE = true;
	} else {
	  //document.getElementById('result').innerHTML = 'NOT IE';
	  Neuflize.isIE = false;
	}

	if(!Neuflize.isIE)Neuflize.checkVisibility();

	(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
	}());

	if(Neuflize.isIE){
		$('body').addClass('IE');
		document.onselectstart = function() { return false; }
		document.onmousedown = function() { return false; }
	}

    Neuflize.init();
    $(this).scrollTop(0);






});

var Neuflize = {};

Neuflize.init = function(){
	var _this = this;

	 _this.$window = $(window);
	 _this.$window.on('resize',_this.resize);

	 

	Mouse.init();
	Sound.init();
	Experiment.init();
	Wishes.init();
	Word.init();
	Legal.init();
	
	Ui.init();
	Loading.init();

	if(!_this.isIE){

		$('.button').mouseover(function(){

	    		Mouse.$cursor.fadeOut(0);
	    });

	    $('.button').mouseout(function(){
	    		Mouse.$cursor.fadeIn(0);
	    })

	}

	// $('body html').animate({scrollTop:0},0);


	setTimeout(_this.resize,100);
	setTimeout(_this.resize,300);
};

Neuflize.checkVisibility = function(){
	var _this = this;

	if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
	  hidden = "hidden";
	  visibilityChange = "visibilitychange";
	} else if (typeof document.mozHidden !== "undefined") {
	  hidden = "mozHidden";
	  visibilityChange = "mozvisibilitychange";
	} else if (typeof document.msHidden !== "undefined") {
	  hidden = "msHidden";
	  visibilityChange = "msvisibilitychange";
	} else if (typeof document.webkitHidden !== "undefined") {
	  hidden = "webkitHidden";
	  visibilityChange = "webkitvisibilitychange";
	}
	document.addEventListener(visibilityChange, _this.handleVisibility, false);
}

Neuflize.handleVisibility = function(){
	var _this = this;

	
		if (document[hidden]) {
			Sound.isFocus = false;

			if(Sound.isLoaded && !Sound.isMute){
				_this.saveNight = Sound.musickNight.volume;
				_this.saveDay = Sound.musickDay.volume;
		    	Sound.pause();
		    
		    	Sound.musickNight.volume = 0;
		    	Sound.musickDay.volume = 0;
		    	//Sound.mute();
		    	consolle.log(_this.saveNight);
		    	console.log('HIDDEN');

	   		}
	   		else {
		  
	  		} 

	  	} 
		  
		else{
			Sound.isFocus = true;
			if(Sound.isLoaded && !Sound.isMute){
						  	console.log(Sound.isLoaded+"-"+Sound.isMute);
		  	Sound.isFocus = true;
		  		Sound.isReady = true;
		  		Sound.musickNight.volume = _this.saveNight;
		    	Sound.musickDay.volume = _this.saveDay;
		    	console.log('FOCUS');
		    	Sound.play();
			}

		}
}

Neuflize.resize = function(){
	Experiment.resize();
	Legal.resize();
	Loading.resize();
	Wishes.resize();
	Word.resize();
}