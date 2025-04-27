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

const mouse = {
    "x": 0,      "y": 0, 
    "x_base": 0, "y_base": 0,
    "scrolling": false
}

const view = {
    "x": -100,   "y": -100, 
    "h": 0,      "w": 0, 
    "x_base": 0, "y_base": 0
}

function openRepo() {
    window.open("https://github.com/Theocrat/code-logo")
}