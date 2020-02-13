const windows = document.querySelectorAll('.window')
const fourlineBoard = document.querySelector('.fourline')
const childrenBoard = fourlineBoard.children

const rowsBoard = 6
const columnsBoard = 7
const valueBoard = new Array(rowsBoard * columnsBoard).fill("e")
const opponent = "opponent"
const you = "you"
let player = you

windows.forEach(window => {
    window.addEventListener('mouseenter', e => {
        checkColumn(e)
    })
    window.addEventListener('click', e => {
        addChip(e)
    })
})

fourlineBoard.addEventListener('mouseleave', () => windows.forEach(window => window.classList.remove("column")))

function checkColumn(e) {
    const position = parseInt(e.target.id.substring(6))
    const column = position % columnsBoard
    windows.forEach(window => window.classList.remove("column"))
    for (let i = column; i < rowsBoard * columnsBoard; i += columnsBoard) {
        childrenBoard.item(i).classList.add("column")
    }
}

function addChip(e) {
    element = e.target
    if (element.classList.contains("circle")) {
        element = element.parentElement
    }
    const position = parseInt(element.id.substring(6))
    const column = position % columnsBoard
    let insertIndex = column + columnsBoard * (rowsBoard - 1)
    while (true) {
        if (valueBoard[insertIndex] === "e") {
            valueBoard[insertIndex] = player.charAt(0)
            childrenBoard.item(insertIndex).firstElementChild.classList.add(`circle--selected${player}`)
            isFinished(insertIndex)
            break
        }
        insertIndex -= columnsBoard
    }
    player = player === you ? opponent : you
}

function isFinished(position) {
    console.log(position)

    let tabBoard = new Array();
    let counter = 0;
    for (let x = 0; x < rowsBoard; x++) {
        tabBoard[x] = [];
        for (let y = 0; y < columnsBoard; y++) {
            tabBoard[x][y] = valueBoard[counter++]
        }
    }

    const bias1 = generateTable(position, tabBoard, -1, -1, 1, 1)
    isWin(bias1)
    const vertically = generateTable(position, tabBoard, -1, 0, 1, 0)
    isWin(vertically)
    const bias2 = generateTable(position, tabBoard, 1, -1, -1, 1)
    isWin(bias2)
    const horizontally = generateTable(position, tabBoard, 0, -1, 0, 1)
    isWin(horizontally)

}

function isWin(toVerify) {
    const pattern = player.charAt(0).repeat(4)
    if (toVerify.join("").includes(pattern)) {
        alert("wygrana")
    }
}

function generateTable(position, tabBoard, inc1, inc2, inc3, inc4) {
    const tab1 = generateSubTable(position, tabBoard, inc1, inc2)
    const tab2 = generateSubTable(position, tabBoard, inc3, inc4)
    tab1.reverse()
    const tab = [...tab1, valueBoard[position], ...tab2]
    return tab
}

function generateSubTable(position, tabBoard, incrementRow, incrementColumn) {
    const tab = []
    let currentColumn = position % columnsBoard
    let currentRow = (position - currentColumn) / columnsBoard
    let temp1 = incrementRow
    let temp2 = incrementColumn
    for (let i = 1; i < 4; i++) {
        if (currentRow + incrementRow < rowsBoard && currentColumn + incrementColumn < columnsBoard
            && currentRow + incrementRow >= 0 && currentColumn + incrementColumn >= 0) {
            tab.push(tabBoard[currentRow + incrementRow][currentColumn + incrementColumn])
        }
        incrementRow += temp1
        incrementColumn += temp2
    }
    return tab
}

