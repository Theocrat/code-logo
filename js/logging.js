const commandLog = [
    `<h3>Command Log</h3>
    <p>
        This pane shows past commands.
        You can scroll this pane. 
        Click anywhere in this pane to close it.
    </p>
    `
]

const loggingUnit = {
    "indent": 0,

    "logCommand": function (text) {
        let indentingSpaces = ""
        for (let i = 0; i < loggingUnit.indent; i++) {
            indentingSpaces += "&nbsp;&nbsp;&nbsp;&nbsp;"
        }

        commandLog.push(`
            <div class="logged-command">
                ${indentingSpaces}${text}
            </div>
        `)
    },

    "logError": function (text) {
        let indentingSpaces = ""
        for (let i = 0; i < loggingUnit.indent; i++) {
            indentingSpaces += "&nbsp;"
        }

        commandLog.push(
            `<div class="logged-error">ERROR: ${text}</div>`
        )
    },

    "incrementIndent": function () {loggingUnit.indent += 1},

    "decrementIndent": function () {loggingUnit.indent -= 1},
}

function generateTokensFromCommand(text) {
    let lower = command.value.toLowerCase()
    let bracketCleaned = lower.replaceAll("[", " [ ").replaceAll("]", " ] ")
    let rawTokens = bracketCleaned.split(" ")
    let tokens = rawTokens.filter(token => token != "")
    return tokens
}


function lexAndLog(text) {
    let tokens = generateTokensFromCommand(text)

    while (tokens.length > 0) {
        if (tokens[0] in monadicCommands) {
            loggingUnit.logCommand(tokens[0])
            tokens = tokens.slice(1)
        }

        else if (tokens[0] in diadicCommands) {
            loggingUnit.logCommand(tokens.slice(0, 2).join(" "))
            tokens = tokens.slice(2)
        }

        else if (tokens[0] in triadicCommands) {
            loggingUnit.logCommand(tokens.slice(0, 3).join(" "))
            tokens = tokens.slice(2)
        }

        else if (tokens[0] == "repeat" && tokens[2] == "[") {
            loggingUnit.logCommand(tokens.slice(0, 3).join(" "))
            loggingUnit.incrementIndent()
            tokens = tokens.slice(3)
        }

        else if (tokens[0] == "]") {
            loggingUnit.decrementIndent()
            loggingUnit.logCommand("]")
            tokens = tokens.slice(1)
        }

        else if (tokens[0] == "make") {
            if ("+-*/%".indexOf(tokens[3]) != -1) {
                loggingUnit.logCommand(tokens.slice(0, 5).join(" "))
                tokens = tokens.slice(5)
            }

            else {
                loggingUnit.logCommand(tokens.slice(0, 3).join(" "))
                tokens = tokens.slice(3)
            }
        }

        else {
            break
        }
    }
}