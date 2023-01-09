document.write(
`
<nav class="navbar navbar-expand-sm navbar-light bg-light">
<a class="navbar-brand" href="#">
ESTO ES UN EJEMPLO   
</a>
<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
  <span class="navbar-toggler-icon"></span>
</button>
<div class="collapse navbar-collapse" id="navbarNavDropdown">
  <ul class="navbar-nav ml-auto">
  </ul>
</div>
</nav>
`
)


var test = ["a", "b"];

var data;
fetch("./data.json")
.then(response => response.json())
.then(data => {
    data["tabs"].forEach(tab => {
        document.getElementById("navbarNavDropdown").children[0].innerHTML += `<li class="nav-item active">
        <a class="nav-link" href="#">${tab.name}<span class="sr-only">(current)</span></a>
        </li>`})
});

