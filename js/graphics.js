function renderTurtle() {
    // Degree to radian conversion
    let rad = null

    // Only render if not hidden
    if (turtle.hidden) {
        cursor.innerHTML = ""
        return
    }

    // Triangle Dimensions
    let span = 0.5 * turtle.size
    let height = Math.sqrt(3) * span

    // Vertex 1
    let v1_x = turtle.x
    let v1_y = turtle.y

    // Vertex 2
    rad = Math.PI * (turtle.direction + 30) / 180
    let v2_x = v1_x - turtle.size * Math.cos(rad)
    let v2_y = v1_y - turtle.size * Math.sin(rad)

    // Vertex 3
    rad = Math.PI * (turtle.direction - 30) / 180
    let v3_x = v1_x - turtle.size * Math.cos(rad)
    let v3_y = v1_y - turtle.size * Math.sin(rad)

    // Draw the turtle
    let turtleCode = `
        <path class="cursor"
          d="M ${v1_x},${v1_y} ${v2_x},${v2_y} ${v3_x},${v3_y} ${v1_x},${v1_y}"
        />
    `

    cursor.innerHTML = turtleCode
}


function makeLineFrom(x, y) {
    let lineCode = `
        <path class="line"
            d="M ${x},${y} ${turtle.x},${turtle.y}"
            style="stroke:${turtle.color};"
        />
    `
    picture.innerHTML += lineCode
}