var Legal = {};

Legal.init = function(){
	var _this = this;

	_this.isOpen = false;

	_this.$legal = $('#legal');
	_this.$legalClose = $('#legal-close');
	_this.$legalContent = $('#legal-block-left');

	_this.$legalClose.on('click',$.proxy(_this.close,_this));
}


Legal.open = function(){
	var _this = this;
	
	Sound.swooshSound.play();
	Ui.$copyrightButton.addClass('open');
	Wishes.$wishes.addClass('transition');
	Experiment.$experiment.addClass('transition');
	Experiment.pause();
	Ui.$rightPanel.addClass('transition');
	Ui.$leftPanel.addClass('transition');
	_this.$legal.addClass('transition');


}

Legal.close = function(){
	var _this = this;

	Sound.swooshSound.play();
	Ui.$copyrightButton.removeClass('open');
	Wishes.$wishes.removeClass('transition');
	Experiment.$experiment.removeClass('transition');
	Experiment.resume();
	Ui.$rightPanel.removeClass('transition');
	Ui.$leftPanel.removeClass('transition');
	_this.$legal.removeClass('transition');
}

Legal.resize = function(){
	var _this = this;

	_this.$legal.css('height',Experiment.$window.height());
	_this.$legalContent.css('marginTop',Experiment.$window.height()/2-_this.$legalContent.height()/2);	

}
