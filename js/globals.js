const errorStatus = {
    "id": 0,
    "message": null
}

const turtle = {
    "x": 0,
    "y": 0,
    "down": true,
    "color": "black",
    "hidden": false,
    "direction": -90,
    "size": 5
}


const userVariables = {}

var command = null
var cursor = null
var picture = null

const commandStack = []

const interface = {
    "variablesPaneDisplayed": false,
    "instructionsDisplayed": false,
}

function openRepo() {
    window.open("https://github.com/Theocrat/code-logo")
}