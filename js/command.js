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

    if (opcode == "repeat") {
        let count = parseInt(tokens[1])
        let start = tokens.indexOf("[")
        let stop = start + getStopLocation(tokens.slice(start))

        if (start == -1 || stop == -1) {
            raiseError("Repeat instruction without start or stop")
            let returnedItem = []
            return returnedItem
        }

        let codeBlock = tokens.slice(start + 1, stop)
        console.log(codeBlock)
        let commandSequence = []
        for (let i = 0; i < count; i++) {
            commandSequence = commandSequence.concat(parse(codeBlock))
        }

        let remainingText = tokens.slice(stop)
        let returnedItem = commandSequence.concat(parse(remainingText))
        return returnedItem
    }

    if (opcode == "]") {
        let remainingText = tokens.slice(1)
        let returnedItem = parse(remainingText)
        return returnedItem
    }

    raiseError(`Unexpected: ${tokens.join(" ")}`)
    let returnedItem = []
    return returnedItem

}


function execute() {
    let bracketCleaned = command.value.replaceAll("[", " [ ").replaceAll("]", " ] ")
    let rawTokens = bracketCleaned.split(" ")
    let tokens = rawTokens.filter(token => token != "")
    let program = parse(tokens)

    console.log(`Cleaned: "${bracketCleaned}"`)
    console.log(`Raw Tokens: [${rawTokens.join(', ')}]`)
    console.log(`Tokens: [${tokens.join(', ')}]`)
    console.table(program)

    program.forEach(instruction => {
        if ("amount" in instruction) {
            instruction.method(instruction.amount)
        }

        else {
            instruction.method()
        }
    })

    command.value = ""
}