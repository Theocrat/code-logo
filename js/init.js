function initialize() {
    command = document.getElementById("command")

    command.addEventListener("keydown", e => {
        if(e.key == "Enter") { 
            execute() 
        }
    })

    cursor = document.getElementById("turtle")
    renderTurtle()

    error = document.getElementById("error-box")
    picture = document.getElementById("picture")
}