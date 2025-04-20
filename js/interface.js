const variableListHeader = `
    <h3> Variables </h3>
    <p>
        Here is a list of variables defined by the <code>make</code> command.
        You can scroll this list. Click anywhere on this yellow pane to close it.    
    </p>
`

function printVariableValues() {
    if (Object.keys(userVariables).length == 0) {
        return `<i style="color:#975;">No variables to show</i>`
    }
    
    let table = []

    for (variable in userVariables) {
        let entry = `
        <tr style="font-family:mono;">
            <td> ${variable}: </td>
            <td> ${userVariables[variable]} </td>
        </tr>`
        table.push(entry)
    }

    if (table.length == 1) {
        return variableListHeader + `<table>${table[0]}</table>`
    }

    return "<table>" + table.join("") + "</table>"
}

function toggleVariables() {
    let variablesPane = document.getElementById("variables")
    variablesPane.innerHTML = printVariableValues()
    
    if (interface.variablesPaneDisplayed) {
        interface.variablesPaneDisplayed = false       
        variablesPane.style.setProperty("display", "none")
    }

    else {
        interface.variablesPaneDisplayed = true
        variablesPane.style.setProperty("display", "block")
    }

    document.querySelector("#command-log").style.setProperty("display", "none")
    document.querySelector("#instructions").style.setProperty("display", "none")
}

function toggleInstructions() {
    let pane = document.getElementById("instructions")
    
    if (interface.instructionsDisplayed) {
        pane.style.setProperty("display", "none")
        interface.instructionsDisplayed = false
    }

    else {
        pane.style.setProperty("display", "block")
        interface.instructionsDisplayed = true
    }

    document.querySelector("#variables").style.setProperty("display", "none")
    document.querySelector("#command-log").style.setProperty("display", "none")
}

function toggleCommandLog() {
    let pane = document.getElementById("command-log")
    
    if (interface.instructionsDisplayed) {
        pane.style.setProperty("display", "none")
        interface.instructionsDisplayed = false
    }

    else {
        if (commandLog.length == 1) {
            pane.innerHTML = commandLog[0]
        }
        
        if (commandLog.length > 1) {
            pane.innerHTML = commandLog.join("")
        }

        pane.style.setProperty("display", "block")
        interface.instructionsDisplayed = true
    }

    document.querySelector("#variables").style.setProperty("display", "none")
    document.querySelector("#instructions").style.setProperty("display", "none")
}