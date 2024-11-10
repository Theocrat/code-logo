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

function turtleCommand_make(variableName, expression) {
    if (expression.length == 1) {
        userVariables[variableName] = parseInt(expression[0])
    }
    else {
        let operand = [parseInt(expression[0]), parseInt(expression[2])]
        switch (expression[1]) {
            case '+':
                userVariables[variableName] = operand[0] + operand[1]
                break
            case '-':
                userVariables[variableName] = operand[0] - operand[1]
                break
            case '*':
                userVariables[variableName] = operand[0] * operand[1]
                break
            case '/':
                userVariables[variableName] = operand[0] / operand[1]
                break
            case '%':
                userVariables[variableName] = operand[0] % operand[1]
                break
            default:
                raiseError(`Unexpected instruction: ${expression.join(" ")}`)
        }
    }
    
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

const variadicCommands = {
    "make": turtleCommand_make
}