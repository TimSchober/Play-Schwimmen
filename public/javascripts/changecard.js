
function tackallcards(allcards) {
    fetch(`http://localhost:9000/tackAll?ev=${allcards}`, {
            method: "POST",
            body: ""
        }).then(res => {
            window.location.replace(res.url);

        });
}

function knock(knok) {
    fetch(`http://localhost:9000/tackAll?ev=${knok}`, {
            method: "POST",
            body: ""
        }).then(res => {
            window.location.replace(res.url);

        });
}

function redo(r) {
    fetch(`http://localhost:9000/tackAll?ev=${r}`, {
            method: "POST",
            body: ""
        }).then(res => {
            window.location.replace(res.url);

        });
}
function undo(u) {
    fetch(`http://localhost:9000/tackAll?ev=${u}`, {
            method: "POST",
            body: ""
        }).then(res => {
            window.location.replace(res.url);

        });
}
function savexml(x) {
    fetch(`http://localhost:9000/tackAll?ev=${x}`, {
            method: "POST",
            body: ""
        }).then(res => {
            window.location.replace(res.url);

        });
}

function savejson(j) {
    fetch(`http://localhost:9000/tackAll?ev=${j}`, {
            method: "POST",
            body: ""
        }).then(res => {
            window.location.replace(res.url);

        });
}

function loadxml(x) {
    fetch(`http://localhost:9000/tackAll?ev=${x}`, {
            method: "POST",
            body: ""
        }).then(res => {
            window.location.replace(res.url);

        });
}

function loadjson(j) {
    fetch(`http://localhost:9000/tackAll?ev=${j}`, {
            method: "POST",
            body: ""
        }).then(res => {
            window.location.replace(res.url);

        });
}

function nextRound(j) {
    fetch(`http://localhost:9000/nextRound?ev=${j}`, {
        method: "POST",
        body: ""
    }).then(res => {
        window.location.replace(res.url);

    });
}