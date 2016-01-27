function scale(x,min,max,nuMin,nuMax){
    var nuX = nuMin - nuMax;
    nuX *= (x-min);
    nuX /= (max - min);
    nuX += nuMax;
    return nuX;
    
}