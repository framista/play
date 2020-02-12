const windows = document.querySelectorAll('.window')
const fourlineBoard = document.querySelector('.fourline')

const rowsBoard = 6
const columnsBoard = 7

windows.forEach(window => {
    window.addEventListener('mouseenter', e => {
        const position = parseInt(e.target.id.substring(6))
        const column = position%columnsBoard
        checkColumn(column)
    })
})

function checkColumn(column) {
    windows.forEach(window => window.classList.remove("column"))
    const childrenBoard = fourlineBoard.children
    for (let i = column; i < rowsBoard * columnsBoard; i += columnsBoard){
        childrenBoard.item(i).classList.add("column")
    }
}