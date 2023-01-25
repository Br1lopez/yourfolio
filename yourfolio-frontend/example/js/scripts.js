function ImgHover(obj){
    obj.classList.remove("blurred");
    obj.classList.add("bright");
    document.getElementById("gal1").classList.add("selected");
}
    
function ImgUnhover(obj){
    obj.classList.add("blurred");
    obj.classList.remove("bright");
    document.getElementById("gal1").classList.remove("selected");
}
    
function ImgHoverVisual(obj){
    obj.classList.remove("blurred");
    obj.classList.add("bright");
    document.getElementById("gal2").classList.add("selected");
}
    
function ImgUnhoverVisual(obj){
    obj.classList.add("blurred");
    obj.classList.remove("bright");
    document.getElementById("gal2").classList.remove("selected");
}