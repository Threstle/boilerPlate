var Word = {};

Word.init = function(){
	var _this = this;

	_this.$word = $('#word');
	_this.$wordLeft = $('#word-block-left');
	_this.$wordRight = $('#word-block-right');
	_this.$closeButton = $('#word-close');
	_this.$closeButton.on('mouseenter',$.proxy(Sound.hoverNeon,Sound));
	_this.$closeButton.on('mouseleave',$.proxy(Sound.offNeon,Sound));
	$('#word-block-left a').on('mouseenter',function(){Sound.rollLight.play()});
	_this.$closeButton.on('click',$.proxy(_this.close,_this));
	_this.resize();
}

Word.open = function(data){
	var _this = this;
	
	Sound.swooshSound.play();
	var word = MyApp.templates.word(data);
	Experiment.$experiment.addClass('transition');
	Experiment.pause();
	Ui.$rightPanel.addClass('transition');
	Ui.$leftPanel.addClass('transition');
	_this.$word.addClass('transition');
	$('#word').html(word);
	_this.init();
}

Word.close = function(){
	var _this = this;

	Sound.swooshSound.play();
	_this.$word.removeClass('transition');
	Ui.$leftPanel.removeClass('transition');
	Ui.$rightPanel.removeClass('transition');
	Experiment.resume();
	Experiment.$experiment.removeClass('transition');
}

Word.resize = function(){
	var _this = this;
	_this.$word.css('height',$(window).height());
	_this.$wordLeft.css('marginTop',$(window).height()/2-_this.$wordLeft.height()/2);
	_this.$wordRight.css('marginTop',$(window).height()/2-_this.$wordRight.height()/2);

}
