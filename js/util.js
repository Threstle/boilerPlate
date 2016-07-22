function scale(x,min,max,nuMin,nuMax){
    var nuX = nuMin - nuMax;
    nuX *= (x-min);
    nuX /= (max - min);
    nuX += nuMax;
    return nuX;
    
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

function isMobile(){
    var ismobi = (navigator.userAgent.match(/Mobi/i));
    
    if(ismobi && navigator.userAgent.match(/iPad/i)){
      ismobi = false;
    }

    if(ismobi){
        return true;
    }
    else{
        return false;
    }

}

function isIpad(){
    var ipad = (navigator.userAgent.match(/iPad/i));

    if(ipad){
        return true;
    }
    else{
        return false;
    }

}

function isIE() { 
  return ((navigator.appName == 'Microsoft Internet Explorer') || ((navigator.appName == 'Netscape') && (new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null))); 
}


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function cleanArray(ar,deleteValue) {
  for (var i = 0; i < ar.length; i++) {
    if (ar[i] == deleteValue) {         
      ar.splice(i, 1);
      i--;
    }
  }
  return ar;
};

function isElementInViewport (el,scroll) {

    if(scroll > el.offset().top && scroll < el.offset().top + $(window).height()){
      return true;
    }
    else{
      return false;
    }
}
