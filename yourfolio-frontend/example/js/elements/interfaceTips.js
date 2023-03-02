import {
    WebElement
  } from './webElement.js'
  
  
  export class InterfaceTips extends WebElement {
    draw() {
        document.body.innerHTML += 
        `

        `;
    }
  }