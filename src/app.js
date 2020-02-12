const windows = document.querySelectorAll('.window')
const fourlineBoard = document.querySelector('.fourline')
const childrenBoard = fourlineBoard.children

const rowsBoard = 6
const columnsBoard = 7
const valueBoard = new Array(6 * 7)
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
        if (!valueBoard[insertIndex]) {
            valueBoard[insertIndex] = player
            childrenBoard.item(insertIndex).firstElementChild.classList.add(`circle--selected${player}`)
            break
        }
        insertIndex -= columnsBoard
    }
    isFinished(position)
    player = player === "you" ? opponent : you
}

function isFinished(position) {
 

}