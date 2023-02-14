import {
    WebElement
} from './webElement.js'


export class Style extends WebElement {
    draw() {
        $('head').append(`
        <style>
          .navbar{
            background-color: ${this.data["style"]["bg-color"]} !important;
          }
        
          .navbar a{
            color: ${this.data["style"]["font-color"]} !important;
          }
        
          .navbar-toggler{
            color: ${this.data["style"]["font-color"]} !important;
            font-size: 1.8em;
          }
        
          .navbar .active a{
            font-weight: bold !important;
          }
        </style>
        `);
    }
}