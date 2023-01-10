document.write(
`
<nav class="navbar navbar-expand-sm navbar-light bg-light" id="nav">
<a class="navbar-brand" href="index.html">
ESTO ES UN EJEMPLO   
</a>
<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
<i class="fas fa-bars"></i>
</button>
<div class="collapse navbar-collapse" id="navbarNavDropdown">
  <ul class="navbar-nav ml-auto">
  </ul>
</div>
</nav>
`
)


var test = ["a", "b"];


var navElementList = document.getElementById("navbarNavDropdown").children[0];



fetch("./data.json")
.then(response => response.json())
.then(data => {
    data["tabs"].forEach(tab => {
      let page = new URLSearchParams(window.location.search).get("tab");
      navElementList.innerHTML += `<li class="nav-item ${page==tab.name? "active": ""}">
        <a class="nav-link" href="index.html?tab=${tab.name}">${tab.name}<span class="sr-only">(current)</span></a>
        </li>`})
        
      navElementList.innerHTML +=  `<li class="nav-item active">
      <a class="nav-link" href="">
      <i class="fas fa-plus-circle" style="font-size:1.5em;"></i>
      </a>
      </li>`;

      $('head').append(`
      <style>
        #nav{
          background-color: ${data["style"]["bg-color"]} !important;
        }

        #nav a{
          color: ${data["style"]["font-color"]} !important;
        }

        .navbar-toggler{
          color: ${data["style"]["font-color"]} !important;
          font-size: 1.8em;
        }

        #nav .active a{
          font-weight: bold !important;
        }
      </style>
      `)
});




