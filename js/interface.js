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
        return `<table>${table[0]}</table>`
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
}