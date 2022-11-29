$(document).ready(function () {
        getData().then(() => {
            refreshOnClickEvents();
        })
    }
)

let data = {};

function getData() {
    return $.ajax({
        method: "GET",
        url: "/status",
        dataType: "json",
        success: function (response) {
            data = response;
        }
    });
}

function changeAllCards() {
    processCommand("all", "")
}

function knock() {
    processCommand("k", "")
}

function setNextRound() {
    processCommand("nr", "")
}

function undo() {
    processCommand("u", "")
}

function redo() {
    processCommand("z", "")
}

function saveGame() {
    processCommand("saveJson", "")
}

function loadGame(l) {
    processCommand("loadJson", "")
}

function setAmount() {
    const amount = $('#players').get(0).value;
    processCommand("amount", amount)
}

function setName() {
    const name = $('#playername').get(0).value;
    processCommand("amount", name)
}


// On Click Events
function refreshOnClickEvents() {
    $('#tackall').click(function () {
        changeAllCards()
    });
    $('#knock').click(function () {
        knock()
    });
    $('#undo-click').click(function () {
        undo()
    });
    $('#redo-click').click(function () {
        redo()
    });
    $('#save-json').click(function () {
        saveGame()
    });
    $('#load-json').click(function () {
        loadGame()
    });
}

function processCommand(cmd, data) {
    post("POST", "/command", {"cmd": cmd, "data": data}).then(() => {
        getData().then(() => {
            refreshOnClickEvents();
        })
    })
}


