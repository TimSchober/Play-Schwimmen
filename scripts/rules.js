$(document).ready(function() {
    $("#btnSubmit").click(function(){
        alert("button");
        $('#btnSubmit').load('app/views/game.scala.html');
    });
});