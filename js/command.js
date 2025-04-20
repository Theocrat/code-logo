function getStopLocation(tokens) {
    let openCount = 0

    for (let pos = 0; pos < tokens.length; pos++) {
        if (tokens[pos] == "[") {
            openCount++
        }

        if (tokens[pos] == "]") {
            openCount--

            if (openCount == 0) {
                console.log(`parsed: ${tokens.slice(0, pos + 1)}, open: ${openCount}`)
                return pos
            }
        }

        console.log(`parsed: ${tokens.slice(0, pos + 1)}, open: ${openCount}`)
    }
}


function parse(tokens) {

    if (tokens.length == 0) {
        let returnedItem = []
        return returnedItem
    }

    let opcode = tokens[0]

    if (opcode in monadicCommands) {
        let commandSequence = [{ "method": monadicCommands[opcode] }]
        let remainingText = tokens.slice(1)
        let returnedItem = commandSequence.concat(parse(remainingText))
        return returnedItem
    }

    if (opcode in diadicCommands) {
        let commandSequence = [{
            "method": diadicCommands[opcode],
            "amount": tokens[1]
        }]
        let remainingText = tokens.slice(2)
        let returnedItem = commandSequence.concat(parse(remainingText))
        return returnedItem
    }

    if (opcode in triadicCommands) {
        let commandSequence = [{
            "method": triadicCommands[opcode],
            "arg_1": tokens[1],
            "arg_2": tokens[2],
        }]
        let remainingText = tokens.slice(3)
        let returnedItem = commandSequence.concat(parse(remainingText))
        return returnedItem
    }

    if (opcode in variadicCommands) {
        let commandSequence
        let remainingText
        let returnedItem

        if ("+-*/%".indexOf(tokens[3]) != -1) {
            commandSequence = [{
                "method": variadicCommands[opcode],
                "target": tokens[1],
                "value": [tokens[2], tokens[3], tokens[4]]
            }]
            remainingText = tokens.slice(5)
            returnedItem = commandSequence.concat(parse(remainingText))
        }

        else {
            commandSequence = [{
                "method": variadicCommands[opcode],
                "target": tokens[1],
                "value": [tokens[2]]
            }]
            remainingText = tokens.slice(3)
            returnedItem = commandSequence.concat(parse(remainingText))
        }

        
        return returnedItem
    }

    if (opcode == "repeat") {
        loggingUnit.incrementIndent()

        let count = parseInt(tokens[1])
        let start = tokens.indexOf("[")
        let stop = start + getStopLocation(tokens.slice(start))

        if (start == -1 || stop == -1) {
            raiseError("Repeat instruction without start or stop")
            let returnedItem = []
            return returnedItem
        }

        let codeBlock = tokens.slice(start + 1, stop)
        let commandSequence = []
        for (let i = 0; i < count; i++) {
            commandSequence = commandSequence.concat(parse(codeBlock))
        }

        let remainingText = tokens.slice(stop)
        let returnedItem = commandSequence.concat(parse(remainingText))
        return returnedItem
    }

    if (opcode == "]") {
        loggingUnit.decrementIndent()

        let remainingText = tokens.slice(1)
        let returnedItem = parse(remainingText)
        return returnedItem
    }

    raiseError(`Unexpected: ${tokens.join(" ")}`)
    let returnedItem = []
    return returnedItem

}


function execute() {
    let tokens = generateTokensFromCommand(command.value)
    let program = parse(tokens)

    program.forEach(instruction => {
        if ("amount" in instruction) {
            instruction.method(instruction.amount)
        }

        else if ("target" in instruction) {
            instruction.method(instruction.target, instruction.value)
        }

        else if ("arg_1" in instruction) {
            instruction.method(instruction.arg_1, instruction.arg_2)
        }

        else {
            instruction.method()
        }
    })

    command.value = ""
}