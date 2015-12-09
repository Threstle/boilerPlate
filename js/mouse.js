var Mouse = {};

Mouse.init = function(){
	var _this = this;

	_this.$cursor = $('#cursor');

	_this.mouse = {x:0,y:0};
	_this.mousePos = {x:0,y:0};
	_this.beginDragPos = 0;
	_this.amountDrag = 0;
	_this.hasClicked = false;

	$(document).on('mousemove',$.proxy(Mouse.update,_this));
	$(document).on('click',$.proxy(Mouse.click,_this));
	$(document).on('mousedown',$.proxy(Mouse.dragBegin,_this));
	$(document).on('mouseup',$.proxy(Mouse.dragStop,_this));
}

Mouse.click = function(e){
	var _this = this;

}

Mouse.dragBegin = function(e){
	var _this = this;

	_this.beginDragPos = _this.mousePos.y;
	_this.mouseIsdown = true;
}

Mouse.dragStop = function(e){
	var _this = this;

	_this.mouseIsdown = false;
}

Mouse.update = function(e){
	var _this = this;

	if(_this.mouseIsdown && !_this.drag)_this.drag = true;
	if(!_this.mouseIsdown) _this.drag = false;

	 _this.mousePos.x = e.pageX;
	 _this.mousePos.y = e.pageY;

	 _this.artPos = {
	 	x: e.pageX - Experiment.cadreOffset.left,
	 	y: e.pageY - Experiment.cadreOffset.top
	 }

	 _this.$cursor.css('left',_this.mousePos.x);
	 _this.$cursor.css('top',_this.mousePos.y);
	 
}

Mouse.handleWheel = function(e){
	var _this = this;

	// clearTimeout(_this.scrollTimeout);
	// _this.drag = true;
	// _this.scrollTimeout = setTimeout(function(){_this.drag = false},500);
}

Mouse.updatePos = function(){
	var _this = this;

	var xDistance = _this.mousePos.x - _this.mouse.x;	
	var yDistance = _this.mousePos.y - _this.mouse.y;

	var distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
	if(distance > 0.1){
		_this.mouse.x += xDistance * 0.15;
		_this.mouse.y += yDistance * 0.15;
	}
	if(_this.drag) _this.amountDrag = (_this.mousePos.y - _this.beginDragPos ) /2;
	else _this.amountDrag*=0.90;
	if(Math.abs(_this.amountDrag)>0.1){
		Experiment.$doc.trigger('mousewheel',_this.amountDrag);

	}
	
}