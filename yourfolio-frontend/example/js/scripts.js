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

    function changeDarkness(){
      let darkness = document.getElementById("darkness");
      if (darkness.classList.contains("vis")){
        darkness.classList.add("invis");
        darkness.classList.remove("vis");
      } else if (darkness.classList.contains("invis")){
        darkness.classList.add("vis");
        darkness.classList.remove("invis");
      }
      // if (darkness.style == "hidden"){
      //   darkness.style.visibility = "visible"; 
      // } else if (darkness.style == "visible"){
      //   darkness.style.visibility = "hidden";
      // }
    }