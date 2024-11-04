function raiseError(message) {
    let id = errorStatus.id + 1
    errorStatus.id = id
    errorStatus.message = message

    error.innerHTML = message
    error.classList.remove("error-hide")
    error.classList.add("error-show")

    setTimeout(makeErrorRemover(id), 3000)
    console.error(message)
}

function makeErrorRemover(id) {
    return () => {
        if (errorStatus.id == id) {
            error.classList.remove("error-show")
            error.classList.add("error-hide")
        }
    }
}