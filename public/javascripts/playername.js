
// Set Player's name
var namebtn = document.getElementById("namebtn");
namebtn.addEventListener("click", function() {
    let name = document.getElementById("playername").value;
    fetch(`http://localhost:9000/playerName?name=${name}`, {
            method: "POST",
            body: ""
        }).then(res => {
            window.location.replace(res.url);

        });
});

// Set player amount with press Enter
var input = document.getElementById("playername");
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("namebtn").click();
  }
});