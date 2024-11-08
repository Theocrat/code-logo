function turtleCommand_ht() {
    turtle.hidden = true
    renderTurtle()
}

function turtleCommand_st() {
    turtle.hidden = false
    renderTurtle()
}

function turtleCommand_pd() {
    turtle.down = true
}

function turtleCommand_pu() {
    turtle.down = false
}

function turtleCommand_cs() {
    picture.innerHTML = ""
    turtle.x = 0
    turtle.y = 0
    turtle.direction = -90
    renderTurtle()
}

function turtleCommand_fd(amount) {
    let oldX = turtle.x
    let oldY = turtle.y

    let rad = Math.PI * turtle.direction / 180
    turtle.x += amount * Math.cos(rad)
    turtle.y += amount * Math.sin(rad)
    renderTurtle()

    if (turtle.down) {
        makeLineFrom(oldX, oldY)
    }
}

function turtleCommand_bk(amount) {
    turtleCommand_fd(-amount)
}

function turtleCommand_lt(amount) {
    turtle.direction -= amount
    renderTurtle()
}

function turtleCommand_rt(amount) {
    turtleCommand_lt(-amount)
}

const monadicCommands = {
    "ht": turtleCommand_ht,
    "st": turtleCommand_st,
    "cs": turtleCommand_cs,
    "pu": turtleCommand_pu,
    "pd": turtleCommand_pd
}

const diadicCommands = {
    "fd": turtleCommand_fd,
    "bk": turtleCommand_bk,
    "rt": turtleCommand_rt,
    "lt": turtleCommand_lt
}

function execute() {
    let parts = command.value.split(" ")
    let opcode = parts[0]

    if (opcode in monadicCommands) {
        monadicCommands[opcode]()
    }

    else if (opcode in diadicCommands && parts.length == 2) {
        let amount = parts[1]
        diadicCommands[opcode](amount)
    }

    else {
        raiseError("Unidentified Command: " + parts.join(command.value))
    }

    command.value = ""
}