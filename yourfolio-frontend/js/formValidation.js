function showInputFeedback(input){
  let parent = input.parentNode;
  let isValid = input.validationMessage === "";

//Se borran todos los divs con feedback
  Array.from(parent.children).forEach(child => {
    if (child.classList.contains("feedback")){
      child.remove();
    }
  });

  if (isValid != null){
    //Se crea el nuevo div con feedback
    let feedback = document.createElement("div");
    feedback.classList.add("feedback");
    feedback.classList.add(isValid? "valid-feedback" : "invalid-feedback");  
    feedback.innerHTML = input.validationMessage; 
    parent.appendChild(feedback);

    parent.classList.add("was-validated");
  }
}

function validateInput(input) {
    let msg = "";
    input.setCustomValidity(msg);

    if (!input.checkValidity()) {
        if (input.validity.valueMissing) {
            msg = "Campo obligatorio"; 
        } else if (input.validity.patternMismatch) {
            if (input.id === "contrasena") {
                if (input.value.length < 7){
                    msg = `Contraseña demasiado corta. <br> <b>Mínimo: 7 caracteres.</b>`;
                }else if (input.value.length > 30){
                    msg = `Contraseña demasiado larga. <br> <b>Máximo: 30 caracteres.</b>`;
                }else {
                    msg= "Formato de contraseña incorrecto";
                }
            }else if (input.id === "email") {
                msg = "No es una dirección de email válida";
            }else{
                msg = "Formato incorrecto";
            }
        }else{
            msg = `Ocurrió un error: ${input.validationMessage}`;
        } 
    }else{    
        if((input.id === "repetirContrasena") && (input.value != document.getElementById("contrasena").value)){
            msg = "Las contraseñas no coinciden.";
        }
    }

    input.setCustomValidity(msg);
    showInputFeedback(input);
}


export function validateForm(form){
    let inputs = form.getElementsByTagName('input');

    for (let i = 0; i < inputs.length; i++) {
          inputs[i].addEventListener("input", () => inputs[i].parentNode.classList.remove("was-validated"));
    }
    
    
    document.getElementById("boton-registro").addEventListener("click", () => {
      for (let i = 0; i < inputs.length; i++) {
        validateInput(inputs[i]);}
    });
    
    form.reset();
}
