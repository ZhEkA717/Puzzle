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
                console.log("No forget fix bag")
            }

            isClicked = true;
        })

    }
}


const menu = document.createElement("div");
menu.classList.add("menu");
menu.style.width = 650+"px";
menu.style.display = "flex";
menu.style.justifyContent = "space-between";
menu.style.position = "absolute";
menu.style.left = 50 +"%";
menu.style.top = 60+"px";
menu.style.transform = "translateX(-50%)";


const shuffle = document.createElement("div");
shuffle.classList.add("shuffle");
shuffle.style.width = 200+"px";
shuffle.style.height = 30+"px";
shuffle.style.display = "flex";
shuffle.style.justifyContent = "center";
shuffle.style.alignItems = "center";
shuffle.style.color = "white";
shuffle.style.background = "rgb(99, 153, 99)";
shuffle.style.borderRadius = "5px";
shuffle.style.cursor = "pointer";

const stop = document.createElement("div");
stop.classList.add("stop");
stop.style.width = 100+"px";
stop.style.height = 30+"px";
stop.style.display = "flex";
stop.style.justifyContent = "center";
stop.style.alignItems = "center";
stop.style.color = "white";
stop.style.background = "rgb(99, 153, 99)";
stop.style.borderRadius = "5px";
stop.style.cursor = "pointer";

const save = document.createElement("div");
save.classList.add("save");
save.classList.add("stop");
save.style.width = 100+"px";
save.style.height = 30+"px";
save.style.display = "flex";
save.style.justifyContent = "center";
save.style.alignItems = "center";
save.style.color = "white";
save.style.background = "rgb(99, 153, 99)";
save.style.borderRadius = "5px";
save.style.cursor = "pointer";

const result = document.createElement("div");
result.classList.add("result");
result.classList.add("save");
result.classList.add("stop");
result.style.width = 100+"px";
result.style.height = 30+"px";
result.style.display = "flex";
result.style.justifyContent = "center";
result.style.alignItems = "center";
result.style.color = "white";
result.style.background = "rgb(99, 153, 99)";
result.style.borderRadius = "5px";
result.style.cursor = "pointer";

menu.append(shuffle);
menu.append(stop);
menu.append(save);
menu.append(result);

document.body.append(menu);

shuffle.innerHTML = "shuffle and restart";
stop.innerHTML = "stop";
save.innerHTML = "save";
result.innerHTML = "results";

shuffle.addEventListener("click",()=>{
    const cells = document.querySelectorAll(".cell");
    const size = Math.pow(cells.length,0.5);
    const cellWidth = cells[0].offsetWidth;
    addFieldInPage(size, cellWidth*size);
})