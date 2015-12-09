var Loading = {};

Loading.init = function(){
	var _this = this;

	_this.$loadingScreen = $('#loading');
	_this.$logo = $('#loading span');
	_this.$picto = $('#loading span img');
	_this.$text = $('#loading span h1');

	_this.load();
	
}

Loading.load = function(){
	var _this = this;

		setTimeout(function(){	_this.$logo.fadeIn(100);},200);

	_this.loadAnim = new JSMovieclip(_this.$logo[0],{
		framerate: 45,
		direction: 'h',
		frames_number:62,
		width: 160,
		height: 160,
		stopCallback:function(){
	
		}
	});

	_this.loadAnim.play(false);

	var queue = new createjs.LoadQueue();
 	//queue.installPlugin(createjs.Sound);
 	queue.on("complete", _this.endLoading, this);
 	// queue.loadFile({id:"sound", src:"./sounds/ETEINDRE_LUMIERE_V01.mp3"});
 	// queue.loadFile({id:"sound", src:"./sounds/LOADER.mp3"});
 	// queue.loadFile({id:"sound", src:"./sounds/LOADER_V02.mp3"});
 	// queue.loadFile({id:"sound", src:"./sounds/LOOP_AVANCE_RAPIDE_V01.mp3"});
 	// queue.loadFile({id:"sound", src:"../sounds/LOOP_NEON.mp3"});
 	// queue.loadFile({id:"sound", src:"./sounds/loopSpeed.mp3"});
 	// queue.loadFile({id:"sound", src:"./sounds/LUMIERE_OFF.mp3"});
 	// queue.loadFile({id:"sound", src:"./sounds/LUMIERE_ON.mp3"});
 	// queue.loadFile({id:"sound", src:"./sounds/MUSIC_OFF_LOOP.mp3"});
 	// queue.loadFile({id:"sound", src:"./sounds/MUSIC_ON_LOOP.mp3"});
 	// queue.loadFile({id:"sound", src:"./sounds/musick_day.mp3"});
 	// queue.loadFile({id:"sound", src:"./sounds/musick_night.mp3"});
 	// queue.loadFile({id:"sound", src:"./sounds/ROLL_AMPOULE.mp3"});
 	// queue.loadFile({id:"sound", src:"./sounds/ROLL_AMPOULE_V02.mp3"});
 	// queue.loadFile({id:"sound", src:"./sounds/ROLL_LUMIERE_CREDIT.mp3"});
 	// queue.loadFile({id:"sound", src:"./sounds/sdClick.mp3"});
 	// queue.loadFile({id:"sound", src:"./sounds/SWOOSH_LAM_ESAT_V02.mp3"});
 	// queue.loadFile({id:"sound", src:"./sounds/tips_light_voice.mp3"});
 	// queue.loadFile({id:"sound", src:"./sounds/voix_jour.mp3"});
 	// queue.loadFile({id:"sound", src:"./sounds/voix_nuit.mp3"});
 	
 	queue.loadFile({id:"image", src:"./img/2016.png"});
 	queue.loadFile({id:"image", src:"./img/artwork.jpg"});
 	queue.loadFile({id:"image", src:"./img/close.svg"});
 	queue.loadFile({id:"image", src:"./img/credit.svg"});
 	queue.loadFile({id:"image", src:"./img/curseur.png"});
 	queue.loadFile({id:"image", src:"./img/ESAT.jpg"});
 	queue.loadFile({id:"image", src:"./img/fleche_scroll.svg"});
 	queue.loadFile({id:"image", src:"./img/fleche_siteweb.svg"});
 	queue.loadFile({id:"image", src:"./img/LaM.jpg"});
 	queue.loadFile({id:"image", src:"./img/light_off.svg"});
 	queue.loadFile({id:"image", src:"./img/light_on.svg"});
 	queue.loadFile({id:"image", src:"./img/logo-neuflize.png"});
 	queue.loadFile({id:"image", src:"./img/logo_grille.svg"});
 	queue.loadFile({id:"image", src:"./img/neuflize_mots.gif"});
 	queue.loadFile({id:"image", src:"./img/neuflize_mots_hover.gif"});
 	queue.loadFile({id:"image", src:"./img/picto_loading.svg"});
 	queue.loadFile({id:"image", src:"./img/son_off.svg"});
 	queue.loadFile({id:"image", src:"./img/son_on.svg"});
 	queue.loadFile({id:"image", src:"./img/sprite_sheet_animation_Grille.png"});
	Sound.loadData();
}

Loading.endLoading = function(){
	var _this = this;
	console.log('GNE');
			_this.$picto.fadeIn(100).delay(3900).fadeOut(100);
			_this.$text.fadeIn(200).delay(4000).fadeOut(200);
			setTimeout(function(){
				_this.fade();

				setTimeout(function(){
					Sound.isReady = true;
					Sound.isLoaded = true;
					Sound.play(0);
					
				},3500)

				Sound.toNight();
				Neuflize.resize();
			},4000);
	Sound.loaderSound.play();

}

Loading.fade = function(){
	var _this = this;

	setTimeout(function(){_this.$loadingScreen.fadeOut(500);},500);
}

Loading.resize = function(){
	var _this = this;

	_this.$logo.css('marginTop',$(window).height()/2-_this.$logo.height()/2);	

}
