let boardValues =
    [[1, -1, -1, -1, -1, -1, -1, 9, -1],
    [-1, -1, 4, -1, -1, -1, 2, -1, -1],
    [-1, -1, 8, -1, -1, 5, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, 3, -1],
    [2, -1, -1, -1, 4, -1, 1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, 1, 8, -1, -1, 6, -1, -1],
    [-1, 3, -1, -1, -1, -1, -1, 8, -1],
    [-1, -1, 6, -1, -1, -1, -1, -1, -1]]

window.onload = function () {
    var picked = -1;
    var board = document.getElementById("board");
    var lastMoveDis = board.innerHTML;
    var clickB = document.getElementsByClassName('clickNum');
    var inV = document.getElementsByClassName('cTable');
    for (let a = 1; a <= 9; a++) {
        var tr = document.createElement("tr");
        tr.className = "rTable"
        for (let b = 1; b <= 9; b++) {
            var td = document.createElement("td");
            td.className = "cTable";
            td.setAttribute("id", "cell" + a + b);
            td.textContent = boardValues[a - 1][b - 1];
            tr.appendChild(td);
        }
        board.appendChild(tr);
    }
    verify();
    var userClicked = function () {
        if (this.id == "clickRe") {
            board.innerHTML = lastMoveDis;
            for (let a = 0; a < inV.length; a++) {
                inV[a].addEventListener('click', numInp, false);
            }
            verify();
        }
        else {
            del();
            picked = this.textContent;
            this.style.backgroundColor = "#f2f2f2";
        }
    }
    var numInp = function () {

        if (picked != -1) {
            lastMoveDis = board.innerHTML;
            this.textContent = picked;
            picked = -1;
            verify()
        }
    }
    for (let a = 0; a < clickB.length; a++) {
        clickB[a].addEventListener('click', userClicked, false);
    }
    for (let b = 0; b < inV.length; b++) {
        inV[b].addEventListener('click', numInp, false);
    }
}


function verify() {
    var board = document.getElementById('board');
    var cTableIn = document.getElementsByClassName("cTable");
    var rej = [];
    var rejC = [];
    var boardR = board.rows;
    var boardRTotal = board.rows;
    var boardC;
    var boardCTotal;

    var rejB = []
    var totalBRo = 1;
    del();



    for (let a = 0; a < cTableIn.length; a++) {
        if (cTableIn[a].textContent === "-1") {
            cTableIn[a].style.fontSize = "0";
        }
        else {
            cTableIn[a].style.fontSize = "115%";
        }

    }


    for (let a = 0; a < boardRTotal.length; a++) {
        boardR = boardRTotal[a];
        boardCTotal = boardR.cells;
        for (let b = 0; b < boardCTotal.length; b++) {
            boardC = boardCTotal[b];
            for (let c = 0; c < boardCTotal.length; c++) {
                if (c != b && matched(boardCTotal[c], boardC)) {
                    rej.push(boardCTotal[c]);
                }
            }
        }
    }


    for (let a = 0; a < cTableIn.length / 9; a++) {
        for (let b = 0; b < cTableIn.length; b += 9) {
            for (let c = 0; c < cTableIn.length; c += 9) {
                if (c != b && matched(cTableIn[c + a], cTableIn[b + a])) {
                    rejC.push(cTableIn[c + a]);
                }
            }
        }
    }


    for (let a = 0; a < cTableIn.length; a += 3) {
        var cTableTotal = 1;
        for (let b = 0; b < cTableIn.length / 3; b++) {
            var cTotalVerify = 1;
            for (let c = 0; c < cTableIn.length / 3; c++) {
                if (b != c && matched(cTableIn[c + a], cTableIn[b + a])) {
                    rejB.push(cTableIn[c + a]);
                }
                if (cTotalVerify % 3 == 0) {
                    c = c + 6;
                }
                cTotalVerify = cTotalVerify + 1;
            }
            if (cTableTotal % 3 == 0) {
                b = b + 6;
            }
            cTableTotal += 1;
        }
        if (totalBRo % 3 == 0) {
            a = a + 18;
        }
        totalBRo = totalBRo + 1;
    }

    for (let a = 0; a < cTableIn.length; a++) {
        if (rej.includes(cTableIn[a]) || rejC.includes(cTableIn[a]) || rejB.includes(cTableIn[a])) {
            cTableIn[a].style.backgroundColor = "#f76c5e";
        } else {
            cTableIn[a].style.backgroundColor = null;
        }

    }

}
function del() {
    var clickB = document.getElementsByClassName('clickNum');
    for (let a = 0; a < clickB.length; a++) {
        clickB[a].style.backgroundColor = null;
    }
}

function matched(a, b) {
    if (a.textContent != '-1' || b.textContent != '-1') {
        return a.textContent == b.textContent;
    } else {
        return false;
    }
}

