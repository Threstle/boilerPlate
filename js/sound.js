var Sound = {};

Sound.init = function(){
	var _this = this;
	

	 if('webkitAudioContext' in window){
	 	_this.context = new webkitAudioContext();
		
	 }
	 else{
     	//_this.context = new AudioContext();
	 }
	
	_this.isPlaying = false;
	_this.isLoaded = false;
	_this.isReady = true;
	_this.isMute = false;
	_this.isFocused = true;

 //	_this.source = _this.context.createBufferSource();
// 	_this.gain = _this.context.createGain();
// 	_this.analyser = _this.context.createAnalyser();



	_this.nightVoice = $('#nightVoice')[0];
	_this.dayVoice = $('#dayVoice')[0];
	_this.musickNight = $('#musickNight')[0];
	_this.musickDay = $('#musickDay')[0];
	_this.lightSoundOn = $('#lightSoundOn')[0];
	_this.lightSoundOff = $('#lightSoundOff')[0];
	_this.loopNeon = $('#loopNeon')[0];
	_this.loopSpeed = $('#loopSpeed')[0];
	_this.swooshSound = $('#swooshSound')[0];
	_this.rollLight = $('#rollLight')[0];
	_this.loopOn = $('#loopOn')[0];
	_this.loopOff = $('#loopOff')[0];
	_this.loaderSound = $('#loaderSound')[0];
	_this.sdClick = $('#sdClick')[0];
	_this.tipsLight = $('#tipsLight')[0];
	_this.currentMusic = _this.musickNight;
	_this.currentElement = _this.nightVoice;

	_this.loopNeon.volume = 0;

	_this.loopSpeed.play();
	_this.loopSpeed.volume = 0;

	_this.musickNight.volume = 0.0;
	_this.musickDay.volume = 0.0;

	_this.musickNight.play();
	_this.musickDay.play();
	_this.loopNeon.play();

	if(_this.context){

		_this.analyser = _this.context.createAnalyser();
		_this.source = _this.context.createMediaElementSource(_this.nightVoice);
		_this.source.connect(_this.analyser);
		_this.analyser.connect(_this.context.destination);
	}

};

Sound.load = function(){
	var _this = this;

	// if(_this.isLoaded){
	// 	_this.gain.connect(_this.analyser);
	// 	_this.analyser.connect(_this.context.destination);
	// 	_this.isReady = true;
	// 	Experiment.isPlaying = true;

	// }
};

Sound.loadData = function(){
	// var _this = this;


	// _this.AjaxRequestsMulti(['sounds/voix_nuit.mp3','sounds/voix_jour.mp3'],function(data){
	// 	var dataDay = data['sounds/voix_jour.mp3'];
	// 	var dataNight = data['sounds/voix_nuit.mp3'];

	// 	_this.context.decodeAudioData(dataNight,function(buffer){
	// 		_this.nightBuffer = buffer;

	// 	});

	// 	_this.context.decodeAudioData(dataDay,function(buffer){
	// 		_this.dayBuffer = buffer;
	// 		_this.toNight();
	// 		_this.isLoaded = true;

	// 	});

	// })


}

Sound.analyse = function(){
	 var _this = this;
	 if(_this.context){
	 _this.freqDomain = new Uint8Array(_this.analyser.frequencyBinCount);
	 _this.analyser.getByteFrequencyData(_this.freqDomain);
	}
	// _this.currentTime = _this.context.currentTime;
}

Sound.play = function(t){
	 var _this = this;
	
	// if(_this.source && _this.isLoaded && t > 0 && _this.isReady){
	// 	if(!_this.buffer)_this.buffer = _this.nightBuffer;
	// 	_this.isPlaying = true;

	// 	_this.source = _this.context.createBufferSource();

	// 	_this.source.buffer = _this.buffer;
	// 			console.log(_this.source);
	// 	_this.source.connect(_this.gain);
	// 	if(t)_this.source.playbackRate.value = 2;
	// 	_this.source.start(_this.context.currentTime,t*_this.source.buffer.duration);
	// 	_this.source.playbackRate.linearRampToValueAtTime(1,_this.context.currentTime+0.1);


	// }
	if(_this.isReady && !_this.isMute && _this.isLoaded && _this.isFocused){
		console.log(_this.isFocused);
		_this.isPlaying = true;
		//console.log(_this.currentElement);

		if(_this.currentElement){
			//console.log(_this.currentElement);
			if(t)_this.currentElement.currentTime = Math.round(t*_this.currentElement.duration);
			console.log(t +"-"+_this.currentElement.currentTime+_this.currentElement.currentTime);
			_this.currentElement.play();
			_this.fadeIn();

		}
	}
	//console.log(_this.currentElement);
	
};


Sound.hoverNeon = function(){
	var _this = this;

	$(_this.loopNeon).animate({volume:1},100);

}

Sound.offNeon = function(){
	var _this = this;

	$(_this.loopNeon).animate({volume:0},100);
}

Sound.toDay = function(){
	 var _this = this;

	 $(_this.musickNight).animate({volume:0},1000);
	 $(_this.musickDay).animate({volume:0.4},1000);

	_this.currentElement = _this.dayVoice;
	// _this.buffer = _this.dayBuffer;

}

Sound.toNight = function(){
	var _this = this;

	$(_this.musickNight).animate({volume:0.4},1000);
	$(_this.musickDay).animate({volume:0},1000);

	_this.currentElement = _this.nightVoice;
	// _this.buffer = _this.nightBuffer;
}

Sound.stop = function(){
	 var _this = this;
	//  if(_this.isReady){

	// 	_this.isPlaying = false;
	// 	if(!_this.buffer){
	// 		_this.buffer = _this.nightBuffer;
	// 		_this.source.buffer =_this.buffer;
	// 	}
	// 	if(_this.source && _this.source.buffer){
	// 		_this.source.stop(0);
	// 	}
	//  }
	//_this.loopSpeed.play();
	_this.isPlaying = false;
	_this.fadeOut();
	//_this.currentElement.pause();
};

Sound.pause = function(){
	var _this = this;
	_this.isReady = false;
	_this.loopSpeed.volume = 0;
	_this.currentElement.pause();
}

Sound.fadeIn = function(){
	var _this = this;
	
	$(_this.currentElement).animate({volume:0.6},300);
	$(_this.loopSpeed).animate({volume:0},300);
}

Sound.fadeOut = function(){
	var _this = this;

	$(_this.currentElement).animate({volume:0},300);
	$(_this.loopSpeed).animate({volume:1},300);
}

Sound.mute = function(){
	 var _this = this;
	 _this.isMute = true;
	 _this.musickNight.volume = 0;
	 _this.musickDay.volume = 0;
	 _this.dayVoice.volume = 0;
	 _this.nightVoice.volume = 0;
	 _this.loopSpeed.volume = 0;
	// if(!_this.isMute && _this.isReady){
	// 	_this.gain.gain.linearRampToValueAtTime(0, _this.context.currentTime);
	// 	_this.isMute = true;
	// }

}

Sound.unmute = function(){
	var _this = this;
	if(_this.isMute && _this.isReady){
		_this.loopSpeed.volume = 1;
		_this.musickNight.volume = 0.4;
	 	_this.musickDay.volume = 0.4;
	 	_this.dayVoice.volume = 0.4;
	 	_this.nightVoice.volume = 0.4;
		_this.isMute = false;
	}	

}

Sound.setAt = function(){
	var _this = this;
};	

Sound.setSpeed = function(){
	var _this = this;
};


// FUNCTIONS DE REQUETES AJAX

// Sound.AjaxRequest = function(url, callback, failCallback) {
//   var _this = this;

//   var xmlhttp;

//   if (window.XMLHttpRequest)
//     xmlhttp=new XMLHttpRequest();
//   else
//     xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");

//   xmlhttp.onreadystatechange = function() {
//     if (xmlhttp.readyState == 4) {
//       if (xmlhttp.status == 200)
//         callback(xmlhttp.response, url);
//       else
//         failCallback(url);
//     }
//   };

//   xmlhttp.open("GET", url, true);
//   xmlhttp.responseType = 'arraybuffer';
//   xmlhttp.send();
// };


// Sound.AjaxRequestsMulti = function(urls, callbackMulti, failCallbackMulti) {
//   var _this = this;

//   var isAllCallsCompleted = false;
//   var isCallFailed = false;
//   var data = {};

//   for (var i=0; i<urls.length; i++) {
//     var callback = function(responseText, url) {
//       if (isCallFailed) return;

//       data[url] = responseText;

//       // get size of data
//       var size = 0;
//       for (var index in data) {
//         if (data.hasOwnProperty(index))
//           size ++;
//       }

//       if (size == urls.length)
//         // all AJAX requests are completed successfully
//         callbackMulti(data);
//     };

//     var failCallback = function(url) {
//       isCallFailed = true;
//       failCallbackMulti(url);
//     };

//    _this.AjaxRequest(urls[i], callback, failCallback);
//   }
// };
