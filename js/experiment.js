var Experiment = {};

Experiment.init = function(){
	var _this = this;

	_this.words = [];

	_this.words['lam-word'] = {
		word:"Le LaM",
		text:"Musée d’art brut, moderne et contemporain, le LaM de Lille assure des visites spéciales de ses expositions aux publics malvoyants et non-voyants. Accompagnées d\’un guide, ces personnes peuvent ressentir l\’émotion des oeuvres à travers des parcours spécialement conçus. Grâce à la technique du thermogonflé, celles-ci sont réalisés en relief afin de solliciter le toucher des spectateurs.  ",
		link:"www.musee-lam.fr",
		linkText:"www.musee-lam.fr",
		img:"LaM.jpg"
	}

	_this.words["esat-word"] = {
		word:"L'ESAT",
		text:"Géré par l’association Voir Ensemble, l’ESAT de Lille réunit 40 travailleurs en situation de handicap visuel autour de 5 savoir-faire. Imprimerie braille, sous-traitance industrielle, artisanat, restauration rapide ou atelier traiteur permettent ainsi à chacun de mieux vivre leur déficience au quotidien. ",
		link:"www.voirensemble.asso.fr/?titre=esat-renaissance&mode=liste-etablissements&id=13",
		linkText:"www.voirensemble.asso.fr",
		img:"ESAT.jpg"
	}
	_this.$doc = $(document);
	_this.$window = $(window);
	_this.$page = $('html');
	_this.$experiment = $('#experiment');
	_this.$veil = $('#veil');
	_this.$cadre = $('#cadre');
	_this.$center = $('#center-panel');
	_this.$artwork = $('#artwork');
	_this.$artworkContainer = $('#artwork-container');
	_this.$artworkRevealed = $('#artworkRevealed');
	_this.$artworkRevealed = $('#artworkRevealed');
	_this.$artworkTextContainer = $('#text-artwork');
	_this.$artworkText = $('#text-artwork p');
	_this.$paragraphs = $('#text-artwork p a');
	_this.$artworkTextRevealedContainer = $('#text-artwork-revealed');
	_this.$artworkTextRevealed = $('#text-artwork-revealed p');
	_this.$paragraphsRevealed = $('#text-artwork-revealed p a');
	_this.$scrollButton = $('#scroll-button');
	_this.$canvas = document.getElementById('veil');
	_this.$lightSwitch = $('#light img');
	_this.$words = $('#text-artwork-revealed p a');
	_this.context = _this.$canvas.getContext('2d');

	_this.sizeGrad = {x:0,y:0,w:-200,h:-200}
	_this.cadreOffset = _this.$cadre.offset();

	_this.visualiserRadius = {r:0.6};
	_this.tipsActive = true;
	_this.isAutoScrolling = true;
	_this.isScrolling = false;
	_this.isPlaying = false;
	_this.isActive = true;
	_this.radius = {r:48,a:0.4,a2:0};
	_this.mouse = {x:0,y:0};
	_this.mousePos = {x:0,y:0};
	_this.lightPos = {x:0,y:0};
	_this.posVisualizer = {x:90,y:90};
	_this.newPosVisualizer = {x:_this.posVisualizer.x,y:_this.posVisualizer.y};
	_this.scrollRatio = 400;
	_this.lightIsOn = false;
	_this.currentArtHeight = 2350;

	_this.path = [];

	_this.path[100] = {x:300,y:300.5};
	_this.path[0] = {x:167,y:555.5};
	_this.path[-210] = {x:211,y:281.5};
	_this.path[-400] = {x:277,y:246.5};
	_this.path[-500] = {x:288,y:197.5};
	_this.path[-600] = {x:224,y:177.5};
	_this.path[-1000] = {x:141,y:118.5};
	_this.path[-1100] = {x:95,y:202.5};
	_this.path[-1200] = {x:150,y:231.5};


	$(document).on('mousewheel',$.proxy(_this.scrollText,_this));
	_this.$lightSwitch.on('click',$.proxy(_this.expand,_this));
	//_this.$lightSwitch.on('mouseenter',function(){Sound.rollLight.play();});
	_this.$lightSwitch.on('mouseenter',$.proxy(Sound.hoverNeon,Sound));
	_this.$lightSwitch.on('mouseleave',$.proxy(Sound.offNeon,Sound));
	$('#lam-word').on('mouseenter',$.proxy(Sound.hoverNeon,Sound));
	$('#lam-word').on('mouseleave',$.proxy(Sound.offNeon,Sound));
	$('#esat-word').on('mouseenter',$.proxy(Sound.hoverNeon,Sound));
	$('#esat-word').on('mouseleave',$.proxy(Sound.offNeon,Sound));
	_this.$words.on('click',$.proxy(_this.openWord,_this));

	setTimeout(function(){_this.isAutoScrolling = true;},3000);
	setTimeout(function(){Sound.load()},4500);
	_this.animate();


	
}

Experiment.animate = function(){
	var _this = this;
	if(!_this.lightIsOn){

		_this.draw();

	}

	if(Sound.isPlaying){
		Sound.analyse();
		_this.renderVisualizer();

	}

	if(_this.isAutoScrolling){
		if(Neuflize.isIE){
			_this.scrollText({},-12,true);
		}
		else{
			if(_this.lightIsOn)_this.scrollText({},-5,true);
			else _this.scrollText({},-4,true);
		}


	}

	_this.$artworkText.css('transform','translateY('+_this.scrollRatio+'px) rotate(0.01deg)');
	_this.$artworkTextRevealed.css('transform','translateY('+_this.scrollRatio+'px) rotate(0.01deg)');

	if(_this.lightMustBlink)_this.lightPos = {x:90,y:90};
	else _this.lightPos = Mouse.mouse;

	Mouse.updatePos();
	_this.fadeText();
	requestAnimationFrame(this.animate.bind(_this));

	
};

Experiment.draw = function(){		
		var _this = this;
			_this.context.globalCompositeOperation = 'xor';
		_this.context.clearRect(0,0,this.$canvas.width,this.$canvas.height);

		_this.context.fillStyle = "rgba(0,0,0,1)";
		
		var a2 = Math.round((_this.radius.a/2)*Math.random()+ _this.radius.a2);
		a2 = Math.round(a2);

		 var gradient = _this.context.createRadialGradient(_this.lightPos.x,_this.lightPos.y,_this.radius.r,_this.lightPos.x,_this.lightPos.y,0);
		 gradient.addColorStop(0,"rgba(0,0,0,"+_this.radius.a2 +")");
		 gradient.addColorStop(1,"rgba(0,0,0,"+_this.radius.a+")");

		 
		 _this.context.fillStyle = gradient;
		 _this.context.fillRect(_this.lightPos.x-_this.sizeGrad.w/2,_this.lightPos.y-_this.sizeGrad.h/2,_this.sizeGrad.w,_this.sizeGrad.h);

		 _this.renderVisualizer();

		 _this.context.fillStyle = "rgba(1,1,1,1)";
		 _this.context.fillRect(0,0,_this.context.canvas.width,_this.context.canvas.height);
		
	
}

Experiment.fadeText = function(){
	var _this = this;


	for(var i = 0; i < _this.$paragraphs.length; i++){

		var dist = 1 - Math.abs($(_this.$paragraphs[i]).position().top-150)/200;
		

		$(_this.$paragraphs[i]).css('opacity',dist);
		
	}

	for(var i = 0; i < _this.$paragraphsRevealed.length; i++){
		var distR = 1 - Math.abs($(_this.$paragraphsRevealed[i]).position().top-150)/250;
		$(_this.$paragraphsRevealed[i]).css('opacity',distR);
	}
}

Experiment.pause = function(){
	var _this = this;
	_this.isActive = false;
	_this.isAutoScrolling = false;
	Sound.mute();
	Sound.pause();
}

Experiment.resume = function(){
	var _this = this;
	_this.isActive = true;
	Sound.isReady = true;
	_this.isAutoScrolling = true;
	Sound.unmute();
	Sound.play();
}

Experiment.openWord = function(e){
	var _this = this;
	var data = _this.words[e.currentTarget.id];

	if(data)Word.open(data);

}

Experiment.activateLightSwitch = function(){
	var _this = this;

	TweenLite.to(_this.radius, 1, {r:0,onComplete:function(){
		_this.lightPos = {x:90,y:90};
		_this.lightMustBlink = true;
		_this.lightBlink();
		if(_this.lightIsOn && _this.tipsActive)_this.tipsLightTimeout = setTimeout(function(){
			if(!_this.lightIsOn && _this.tipsActive)Sound.tipsLight.play()
		},4000);

	}});
	
}

Experiment.lightBlink = function(){
	var _this = this;
	_this.blinkTweenNight = TweenLite.to(_this.radius, 0.5, {r:65,onComplete:function(){
		
		_this.blinkTweenDay = 	TweenLite.to(_this.radius, 1, {r:0,onComplete:function(){

			if(_this.lightMustBlink)_this.lightBlink();
			

		}});

	}});


}


Experiment.moveVisualizer = function(){
	var _this = this;

	var xDistance = _this.newPosVisualizer.x - _this.posVisualizer.x;	
	var yDistance = _this.newPosVisualizer.y - _this.posVisualizer.y;	

	var distance = Math.sqrt(xDistance * xDistance*Math.random() + yDistance * yDistance*Math.random());
	if(distance > 0.1){
		_this.posVisualizer.x += xDistance * 0.002;
		_this.posVisualizer.y += yDistance * 0.002;
	}
	
}

Experiment.renderVisualizer = function(){
	var _this = this;
	
	_this.moveVisualizer();

	if(Sound.freqDomain){

		var radius = Math.round(_this.visualiserRadius.r *Sound.freqDomain[0]);
	}
	else radius = 20*Math.random();

	 var gradient = _this.context.createRadialGradient(_this.posVisualizer.x,_this.posVisualizer.y,radius,_this.posVisualizer.x,_this.posVisualizer.y,0);
	 gradient.addColorStop(1,"rgba(0,0,0,0.4)");
	 gradient.addColorStop(0,"rgba(0,0,0,0)");


	 
	 _this.context.fillStyle = gradient;
	 _this.context.fillRect(_this.posVisualizer.x-_this.sizeGrad.w/2,_this.posVisualizer.y-_this.sizeGrad.h/2,_this.sizeGrad.w/1,_this.sizeGrad.h/1);

}

Experiment.expand = function(){
	var _this = this;

	clearTimeout(_this.tipsLightTimeout);
	_this.tipsActive = false;
	_this.sizeGrad.w = _this.context.canvas.width*2;
		_this.sizeGrad.h = _this.context.canvas.height*2;
		_this.$experiment.addClass('day');
		Sound.lightSoundOn.play();
		_this.$lightSwitch.attr('src','img/light_on.svg');
		_this.$cadre.fadeOut(500);
		_this.$artwork.fadeOut(0);
		_this.$artworkRevealed.fadeIn(0).css('display','block');

		Sound.isReady = false;
		Sound.pause();
		

		_this.$doc.off('mousewheel',_this.scrollText);
		_this.$lightSwitch.off('click',_this.expand);
		_this.$artworkText.fadeOut(1000);

	var endExpand = function(){
			
			Sound.toDay();
			_this.scrollRatio = 400;
			_this.$scrollButton.removeClass('hidden');
			_this.$doc.on('mousewheel',$.proxy(_this.appearTextRevealed,_this));
			_this.currentArtHeight = _this.$artworkTextRevealed.height();
			_this.$lightSwitch.on('click',$.proxy(_this.shrink,_this));
			_this.lightIsOn = true;
			_this.$veil.fadeOut(400);


			setTimeout($.proxy(_this.autoScroll,_this),2500);
	}

	if(Neuflize.isIE){
		endExpand();
	}
	else{
		TweenLite.to(_this.radius, 2, {r:8000,a:1,onComplete:function(){
			endExpand();
		}});

	}

}

Experiment.autoScroll = function(){
	var _this = this;
	// if(_this.drag) _this.amountDrag = (_this.mousePos.y - _this.beginDragPos ) /2;
	// else _this.amountDrag*=0.90;
	// if(Math.abs(_this.amountDrag)>0.1){
		_this.$doc.trigger('mousewheel',20);

	//}
};

Experiment.shrink = function(){
	var _this = this;
	
	Sound.lightSoundOff.play();

	_this.lightMustBlink = false;
	_this.$experiment.removeClass('day');
	_this.lightIsOn = false;
	_this.$veil.fadeIn(400);
	_this.$lightSwitch.attr('src','img/light_off.svg');
	_this.posVisualizer = {x:_this.cadreOffset.left+_this.$cadre.width()/2,y:_this.cadreOffset.top+_this.$cadre.height()/2};
	Sound.isReady = true;

	Word.close();
	Legal.close();
	
	_this.$doc.off('mousewheel',_this.appearTextRevealed);
	_this.$lightSwitch.off('click',_this.shrink);

	_this.$scrollButton.addClass('hidden');
	_this.$artworkTextRevealedContainer.fadeOut(1000);

	_this.$doc.on('mousemove',$.proxy(Mouse.updateMouse,_this));
	_this.scrollRatio = 400;
	Sound.pause();

	var endShrink = function(){
	
		Wishes.backTopTop();
		Sound.toNight();
		Sound.isReady = true;
		setTimeout(function(){

			Sound.play(-1);
		},2000); 
		_this.$cadre.fadeIn(500);
		_this.$artwork.fadeIn(500).css('display','block');
		_this.$artworkText.fadeIn(1000);
		
		_this.currentArtHeight = _this.$artworkText.height();

		_this.$doc.on('mousewheel',$.proxy(_this.scrollText,_this));
		_this.$lightSwitch.on('click',$.proxy(_this.expand,_this));
		_this.sizeGrad.w = -200;
		_this.sizeGrad.h = -200;
		$(this).scrollTop(0);
	}

	if(Neuflize.isIE){
		endShrink();

	}
	else{
		TweenLite.to(_this.radius, 2, {r:65,a:1,onComplete:function(){
			endShrink();
		}});
	}



}

Experiment.appearTextRevealed = function(){
	var _this = this;

	// _this.$scrollButton.fadeOut(1000);
	_this.$scrollButton.addClass('hidden');
	_this.$artworkTextRevealedContainer.fadeIn(1000);
	setTimeout(function(){_this.isAutoScrolling = true;},500);
	setTimeout(function(){Wishes.isReady = true;},1500);
	_this.currentArtHeight = _this.$artworkTextRevealed.height();
	_this.$doc.off('mousewheel',_this.appearTextRevealed);
	_this.$doc.on('mousewheel',$.proxy(_this.scrollText,_this));
	TweenLite.to(_this,1,{scrollRatio:200});
	setTimeout(function(){
	Sound.isReady = true;

	Sound.unmute()

	Sound.play(-1);
	},1000)


}


Experiment.scrollText = function(e,a,auto){
	var _this = this;

	if(_this.isActive){
		if(!e.deltaY)e.deltaY = a;
		else Mouse.handleWheel(e);


		if(Sound.isReady){
			if(Mouse.drag && !_this.isScrolling){
				_this.isScrolling = true;
				if(Sound.isPlaying)Sound.stop();
				
				
			}
			else if(!Mouse.drag && _this.isScrolling){
				_this.isScrolling = false;

				
				if(!Sound.isPlaying)Sound.play(0 - (_this.scrollRatio-360) / _this.currentArtHeight);
			}
		}
		else{
			Sound.pause();
		}
		

		if(_this.scrollRatio > -this.currentArtHeight +370)_this.isAutoScrolling=true;


		if(_this.scrollRatio > 400 && (e.deltaY/10) > 0){e.deltaY = 0;}
		var decal =350;
		if(!_this.lightIsOn) decal = 370;
		if(_this.scrollRatio < -_this.currentArtHeight + decal && (e.deltaY/10) < 0){
			
			e.deltaY =0;
			
			if(_this.lightIsOn && Wishes.isReady){
				
				_this.isAutoScrolling=false;
				Wishes.scrollToWishes();
				Sound.isReady = false;
				Sound.pause();
				
			}
			else{

				_this.activateLightSwitch();
				_this.isAutoScrolling = false;
			}
		}

		_this.scrollRatio+=e.deltaY/10;


	// PATH VIZUALISER

		if(_this.path[Math.round(_this.scrollRatio)]){

			if(_this.visualiserRadius.r==0.6)TweenLite.to(_this.visualiserRadius,2,{r:0.3});
			_this.newPosVisualizer.x = _this.path[Math.round(_this.scrollRatio)].x + _this.cadreOffset.left;
			_this.newPosVisualizer.y = _this.path[Math.round(_this.scrollRatio)].y + _this.cadreOffset.top;
		}

	}
}



Experiment.resize = function(){
	var _this = this;

	_this.$experiment.css('height',_this.$window.height());
	_this.$center.css('height',_this.$window.height());
	_this.$artwork.css('marginTop',_this.$window.height()/2-_this.$artwork.height()/2);
	_this.$artworkRevealed.css('marginTop',_this.$window.height()/2-_this.$artworkRevealed.height()/2);
	_this.context.canvas.width  = window.innerWidth;
    _this.context.canvas.height = window.innerHeight;
    _this.cadreOffset = _this.$cadre.offset();
    //_this.posVisualizer = {x:_this.cadreOffset.left+_this.$cadre.width()/2,y:_this.cadreOffset.top+_this.$cadre.height()/2};
    _this.newPosVisualizer = {x:_this.posVisualizer.x,y:_this.posVisualizer.y};
}
