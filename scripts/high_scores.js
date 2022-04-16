let highscores =
    [{ "date": "2021/01/17", "duration": "3:41" },
    { "date": "2021/01/21", "duration": "4:01" },
    { "date": "2021/02/01", "duration": "2:52" },
    { "date": "2020/02/17", "duration": "3:08" },
    { "date": "2020/03/02", "duration": "2:51" }]

window.onload = function () {
    var allScores = document.getElementById("hs");
    for (let a = 0; a < highscores.length; a++) {
        var tr = document.createElement("tr");
        tr.className = "score"
        for (let b = 0; b < 2; b++) {
            var td = document.createElement("td");
            td.className = "hsInfo"

            if (b == 0) {
                td.textContent = highscores[a].date;
            }
            else {
                td.textContent = highscores[a].duration;
            }
            tr.appendChild(td);
        }
        allScores.appendChild(tr);
    }

}