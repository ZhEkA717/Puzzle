function createRandomArray(size) {
    let arr = [];
    while (arr.length < size * size) {
        let r = Math.floor(Math.random() * size * size);
        if (arr.indexOf(r) === -1) {
            arr.push(r);
        }
    }
    return arr;
}

function createField(size, fieldSize) {
    let arr = createRandomArray(size);

    const field = document.createElement('div');
    let count = 0;
    field.classList.add("field");
    field.style.width = fieldSize + "px";
    field.style.height = fieldSize + "px";
    field.style.position = "absolute";
    field.style.top = "50%";
    field.style.left = "50%";
    field.style.transform = "translate(-50%,-50%)";
    field.style.background = "lightgrey";
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.innerHTML = arr[count];
            cell.style.position = "absolute";
            cell.style.top = (0 + i * fieldSize / size) + 'px';
            cell.style.left = (0 + j * fieldSize / size) + "px";
            cell.style.width = fieldSize / size + "px";
            cell.style.height = fieldSize / size + "px";
            cell.style.textAlign = "center";
            cell.style.display = "flex";
            cell.style.alignItems = "center";
            cell.style.justifyContent = "center";
            cell.style.cursor = "pointer";
            field.append(cell);
            count++;
        }
    }
    return field;
}

function addFieldInPage(size, fieldSize) {
    let field = document.querySelector(".field")
    if (field) {
        document.body.replaceChild(createField(size, fieldSize), field)
    } else {
        document.body.prepend(createField(size, fieldSize));
    }

    const cells = document.querySelectorAll(".cell");

    cells.forEach(item => {
        if (item.innerHTML === "0") {
            item.classList.add("empty-cell");
            item.innerHTML = "";
        }

        if (item.classList.contains("empty-cell")) {
            item.style.background = "transparent";
        } else {
            item.style.background = "pink";
            item.style.border = "1px solid black";
        }
    });
    return size;
}

addFieldInPage(4, 400);
addFieldInPage(4,700);

function findChildEmptyCeil(size) {
    const cells = document.querySelectorAll(".cell");
    const cell = document.querySelector(".empty-cell");

    const fieldArr = [];
    let arr = [];

    for (let i = 0; i < cells.length; i++) {
        arr.push(cells[i]);
        if (arr.length === size) {
            fieldArr.push(arr);
            arr = [];
        }
    }

    let prevChild = null,
        nextChild = null,
        upChild = null,
        downChild = null;
    let a = fieldArr,
        n = m = size;

    function isValidPos(i, j, n, m) {
        return (i < 0 || j < 0 || i > n - 1 || j > m - 1) ? 0 : 1;
    }

    for (let i = 0; i < fieldArr.length; i++) {
        for (let j = 0; j < fieldArr[i].length; j++) {
            if (a[i][j] == cell) {
                if (isValidPos(i, j + 1, n, m)) {
                    nextChild = a[i][j + 1];
                }
                if (isValidPos(i + 1, j, n, m)) {
                    downChild = a[i + 1][j];
                }
                if (isValidPos(i - 1, j, n, m)) {
                    upChild = a[i - 1][j];
                }
                if (isValidPos(i, j - 1, n, m)) {
                    prevChild = a[i][j - 1];
                }
            }
        }
    }
    return {
        prevChild,
        nextChild,
        upChild,
        downChild
    };
}


// let field = document.querySelector(".field");
let field = document.body;
field.addEventListener("click", funMovingCell);

function funMovingCell(EO) {
    const cells = document.querySelectorAll(".cell");
    let isClicked = true;
    let {
        prevChild,
        nextChild,
        upChild,
        downChild
    } = findChildEmptyCeil(Math.pow(cells.length, 0.5));

    let cell = document.querySelector(".empty-cell"),
        cellTop = cell.offsetTop;
    cellLeft = cell.offsetLeft;
    let elEvent = EO.target,
        elTop = elEvent.offsetTop;
    elLeft = elEvent.offsetLeft;

    if (elEvent == prevChild || elEvent == nextChild ||
        elEvent == upChild || elEvent == downChild && isClicked) {

        isClicked = false;

        elEvent.style.top = cellTop + "px";
        elEvent.style.left = cellLeft + "px";
        elEvent.style.transition = ".5s"

        cell.style.top = elTop + "px";
        cell.style.left = elLeft + "px";

        elEvent.addEventListener("transitionend", (e) => {
            try {
                let clonedCell = cell.cloneNode(true);
                let clonedElEvent = elEvent.cloneNode(true);

                elEvent.parentElement.replaceChild(clonedCell, elEvent);
                cell.parentElement.replaceChild(clonedElEvent, cell);
            } catch {
                console.log("replaceChild!")
            }

            isClicked = true;
        })

    }
}
