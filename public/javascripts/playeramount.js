
// Set player amount
var btn = document.getElementById("btn");
btn.addEventListener("click", function() {
    let amount = document.getElementById("players").value;
    fetch(`http://localhost:9000/playerCount?count=${amount}`, {
            method: "POST",
            body: ""
        }).then(res => {
            window.location.replace(res.url);
        });
});

// Set player amount with press Enter
var input = document.getElementById("players");
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("btn").click();
  }
});
