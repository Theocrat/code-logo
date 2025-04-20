function initialize() {
    command = document.getElementById("command")

    command.addEventListener("keydown", e => {
        if(e.key == "Enter") { 
            commandStack.push(command.value)
            lexAndLog(command.value)
            execute() 
        }
    })

    command.addEventListener("keydown", e => {
        if(e.key == "ArrowUp") { 
            if (commandStack.length > 0) {
                command.value = commandStack.pop()
            }
        }
    })

    cursor = document.getElementById("turtle")
    renderTurtle()

    error = document.getElementById("error-box")
    picture = document.getElementById("picture")

    interface.variablesPaneDisplayed = false
}