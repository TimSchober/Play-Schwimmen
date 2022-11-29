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

function setPlayerAmount() {
    const amount = $('#players').get(0).value;
    processCommand("amount", amount)
}

function setPlayerName() {
    const name = $('#playername').get(0).value;
    processCommand("name", name)
}


// On Click Events
function refreshOnClickEvents() {
    $('#btn-amount').click(function () {
        setPlayerAmount()
    });
    $('#btn-name').click(function () {
        setPlayerAmount()
    });
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

function post(method, url, data) {
    return $.ajax({
        method: method,
        url: url,
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",

        success: function (response) {
            data = response;
        },
        error: function (response) {
            console.log("Error")
            console.error(response);
            console.log(data)
        }
    });
}

function processCommand(cmd, data) {
    post("POST", "/command", {"cmd": cmd, "data": data}).then(() => {
        getData().then(() => {
            refreshOnClickEvents();
        })
    })
}


