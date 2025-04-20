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