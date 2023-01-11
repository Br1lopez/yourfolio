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
    
    function PlaySong(url, obj, index){
    current_song = index;
      vol = document.getElementById("music-player").volume;
    document.getElementById("music-player").setVolume(0);
    document.getElementById("music-player").setSrc(url);
    document.getElementById("music-player").play();
    document.getElementById("music-player").setVolume(vol);
    x =document.getElementsByClassName("playlist");
    for (i = 0; i < x.length; i++) {
      x[i].classList.remove("current");
    }
    obj.classList.add("current");
    
    }