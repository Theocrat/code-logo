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

    drawing = document.getElementById("drawing")

    drawing.addEventListener("mousemove", function (event) {
        mouse.x = event.offsetX
        mouse.y = event.offsetY

        if (mouse.scrolling) {
            let displacement_x = mouse.x - mouse.x_base
            let displacement_y = mouse.y - mouse.y_base
            
            view.x = view.x_base - displacement_x
            view.y = view.y_base - displacement_y
            view.w = drawing.width.baseVal.value
            view.h = drawing.height.baseVal.value

            let viewBox = `${view.x} ${view.y} 200 200`
            drawing.setAttribute("viewBox", viewBox)

            console.log(`view.x = ${view.x}\tx_base = ${view.x_base}\tmouse.x = ${mouse.x}\tdisplacement = ${displacement_x}`)
        }
    })
}