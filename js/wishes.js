var Wishes = {};

Wishes.init = function(){
	var _this = this;

	_this.isReady = false;
	_this.$wishes = $('#wishes');
	_this.$wishesContent = $('#wishes-block');
	_this.$wishesBottomBlock = $('#wishes-bottom-block');

	_this.scrollRatio = 0;
}

Wishes.scrollToWishes = function(){
	var _this = this;

	Experiment.$doc.off('mousewheel',Experiment.scrollText);

	Experiment.$doc.on('mousewheel',$.proxy(_this.scroll,_this));

}

Wishes.backTopTop = function(){
	var _this = this;

	
	_this.scrollRatio  =50;


	_this.scroll({},0);
}

Wishes.scroll = function(e,a){
	var _this = this;

	if(!e.deltaY)e.deltaY=a;
	_this.scrollRatio += e.deltaY/50;

	Sound.pause();
	if(_this.scrollRatio > 0){
		_this.scrollRatio = 0;
		Experiment.$doc.on('mousewheel',$.proxy(Experiment.scrollText,Experiment));
		Experiment.$doc.off('mousewheel',_this.scroll);

		Sound.isReady = true;
		//Experiment.isAutoScrolling=true;
	}
	else if(_this.scrollRatio < - Experiment.$window.height()/6){
		
		_this.scrollRatio = - Experiment.$window.height()/6;

	}
	else{

	}

	Experiment.$experiment.css('height',Experiment.$window.height()+(_this.scrollRatio*10));
	Experiment.$artworkContainer.css('opacity',1+(_this.scrollRatio)/40);
	Experiment.$artworkTextRevealedContainer.css('opacity',1+(_this.scrollRatio)/60);
	Experiment.$artworkContainer.css('transform','translateY('+(_this.scrollRatio)*4+'px)');
	Experiment.$artworkTextRevealedContainer.css('transform','translateY('+(_this.scrollRatio)*1+'px)');
	Experiment.$page.scrollTop(-_this.scrollRatio*5);
	_this.$wishesContent.css('opacity',-(_this.scrollRatio)/150);
	// _this.$wishesBottomBlock.css('opacity',-(_this.scrollRatio)/200);
	//_this.$wishesBottomBlock.css('marginTop',200 - Math.abs(_this.scrollRatio*140)/(Experiment.$window.height()/4));
}


Wishes.resize = function(){
	var _this = this;
	_this.$wishes.css('height',$(window).height());
	_this.$wishesContent.css('marginTop',$(window).height()/2-_this.$wishesContent.height()/2);

}
