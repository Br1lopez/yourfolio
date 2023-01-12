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

      if (darkness.classList.includes("visible")){
        obj.classList.add("invisible");
        obj.classList.remove("visible");
      } else if (darkness.classList.includes("invisible")){
        obj.classList.add("visible");
        obj.classList.remove("invisible");
      }
      obj.classList.add("visible");
      obj.classList.remove("invisible");
    }