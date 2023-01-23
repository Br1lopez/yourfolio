import {validateForm} from './formValidation.js'

let form = document.getElementById("register-form");

document.addEventListener("DOMContentLoaded", validateForm(form));
