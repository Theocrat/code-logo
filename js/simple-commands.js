function evaluateToken(token) {
    if (token[0] == ":") {
        let varname = token.slice(1)
        if (varname in userVariables) {
            return userVariables[varname]
        }
        raiseError(`Unknown variable: ${varname}`)
        return 0
    }
    return parseFloat(token)
}

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

function turtleCommand_fd(arg) {
    let amount = evaluateToken(arg)

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

function turtleCommand_bk(arg) {
    let amount = evaluateToken(arg)
    turtleCommand_fd(`-${amount}`)
}

function turtleCommand_lt(arg) {
    let amount = evaluateToken(arg)
    turtle.direction -= amount
    renderTurtle()
}

function turtleCommand_rt(arg) {
    let amount = evaluateToken(arg)
    turtleCommand_lt(`-${amount}`)
}

function turtleCommand_make(variableName, expression) {
    if (expression.length == 1) {
        userVariables[variableName] = parseInt(expression[0])
    }
    else {
        let operand = [expression[0], expression[2]].map(evaluateToken)
        switch (expression[1]) {
            case '+':
                userVariables[variableName] = Math.round(operand[0] + operand[1])
                break
            case '-':
                userVariables[variableName] = Math.round(operand[0] - operand[1])
                break
            case '*':
                userVariables[variableName] = Math.round(operand[0] * operand[1])
                break
            case '/':
                userVariables[variableName] = Math.round(operand[0] / operand[1])
                break
            case '%':
                userVariables[variableName] = Math.round(operand[0] % operand[1])
                break
            default:
                raiseError(`Unexpected instruction: ${expression.join(" ")}`)
        }
    }
    
}

function turtleCommand_setx(arg) {
    turtle.x = parseFloat(arg)
    renderTurtle()
}

function turtleCommand_sety(arg) {
    turtle.y = -parseFloat(arg)
    renderTurtle()
}

function turtleCommand_pc(arg) {
    turtle.color = arg
}

function turtleCommand_goto(x_arg, y_arg) {
    let oldX = turtle.x
    let oldY = turtle.y
    
    turtle.x = parseFloat(x_arg)
    turtle.y = -parseFloat(y_arg)
    renderTurtle()

    if (turtle.down) {
        makeLineFrom(oldX, oldY)
    }
}

function turtleCommand_turn(arg) {
    turtle.direction = -90 - arg
    renderTurtle()
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
    "lt": turtleCommand_lt,
    "setx": turtleCommand_setx,
    "sety": turtleCommand_sety,
    "pc": turtleCommand_pc,
    "turn": turtleCommand_turn
}

const triadicCommands = {
    "goto": turtleCommand_goto
}

const variadicCommands = {
    "make": turtleCommand_make
}