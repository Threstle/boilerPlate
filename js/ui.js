var Ui = {};

Ui.init = function(){
	var _this = this;

	_this.$ui = $('#ui');
	_this.$leftPanel = $('#left-panel');
	_this.$rightPanel = $('#right-panel');
	_this.$soundButton = $('#menu-right-panel li:nth-child(1)');
	_this.$copyrightButton = $('#menu-right-panel li:nth-child(2)');
	_this.$logo = $('#logo-neuflize-obc');

	_this.$soundButton.on('click',$.proxy(_this.clickSound,_this));
	_this.$soundButton.on('mouseenter',$.proxy(Sound.hoverNeon,Sound));
	_this.$soundButton.on('mouseleave',$.proxy(Sound.offNeon,Sound));
	_this.$copyrightButton.on('click', $.proxy(Legal.open,Legal));
	_this.$copyrightButton.on('mouseenter',$.proxy(Sound.hoverNeon,Sound));
	_this.$copyrightButton.on('mouseleave',$.proxy(Sound.offNeon,Sound));

	_this.isMute = false;

}

Ui.clickSound = function(){
	var _this = this;
	Sound.sdClick.play();
	if(_this.isMute){
		_this.isMute = false;

		_this.$soundButton.find('img').attr('src','img/son_on.svg');
		Sound.unmute();
	}
	else{
		_this.isMute = true;
		_this.$soundButton.find('img').attr('src','img/son_off.svg');
		Sound.mute();
	}
}


