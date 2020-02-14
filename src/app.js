const windows = document.querySelectorAll('.window')
const fourlineBoard = document.querySelector('.fourline')
const childrenBoard = fourlineBoard.children
const tab = document.querySelector(".nav__li")

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

tab.addEventListener('click', () => {
    startAgain()
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
        if(insertIndex < 0) return
    }
    const color = player === you ? "#cc33ff" : "#ff3399"
    tab.style.backgroundColor = color
    player = player === you ? opponent : you

}

function isFinished(position) {
    let tabBoard = new Array();
    let counter = 0;
    for (let x = 0; x < rowsBoard; x++) {
        tabBoard[x] = [];
        for (let y = 0; y < columnsBoard; y++) {
            tabBoard[x][y] = valueBoard[counter++]
        }
    }
    const bias1 = generateTable(position, tabBoard, -1, -1, 1, 1)
    isWin(bias1, 0, position)
    const vertically = generateTable(position, tabBoard, -1, 0, 1, 0)
    isWin(vertically, 1, position)
    const bias2 = generateTable(position, tabBoard, 1, -1, -1, 1)
    isWin(bias2, 2, position)
    const horizontally = generateTable(position, tabBoard, 0, -1, 0, 1)
    isWin(horizontally, 3, position)
}

function isWin(toVerify, direction, position) {
    const { tab, pos } = toVerify
    const tabDirection = [8, 7, -6, 1]
    const moveAmount = tabDirection[direction]
    const pattern = player.charAt(0).repeat(4)
    const comparison = tab.join("")
    if (comparison.includes(pattern)) {
        const startIndex = comparison.indexOf(pattern)
        const startPosition = position - (pos - startIndex) * moveAmount
        let circleWonPosition
        for (let i = startIndex; i < comparison.length; i++) {
            if (comparison[i] !== player.charAt(0)) {
                break
            }
            circleWonPosition = (i - startIndex) * moveAmount + startPosition
            childrenBoard.item(circleWonPosition).firstElementChild.classList.add(`circle--won`)
        }
    }
}

function generateTable(position, tabBoard, inc1, inc2, inc3, inc4) {
    const tab1 = generateSubTable(position, tabBoard, inc1, inc2)
    const tab2 = generateSubTable(position, tabBoard, inc3, inc4)
    tab1.reverse()
    const tab = [...tab1, valueBoard[position], ...tab2]
    return { tab, pos: tab1.length }
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

function startAgain() {
    player = you
    tab.style.backgroundColor = "#ff3399"
    for (let i = 0; i < valueBoard.length; i++) {
        valueBoard[i] = "e"
        childrenBoard.item(i).firstElementChild.classList = "circle"
    }
    console.log(valueBoard)
}