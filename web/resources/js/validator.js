"use strict";

let x, y;
let r=3;

//Обновляет значение x в соответсвии с нажатой кнопкой, добавляет ей эффекты (подсветка и увеличение), убирая их для остальных кнопок группы.
document.addEventListener("DOMContentLoaded", () => {
    let buttons = document.querySelectorAll(".commandButtonsGroup")
    buttons.forEach(chooseX);
    function chooseX(element) {
        element.onclick = function () {
            x = this.textContent;
            buttons.forEach(function (element) {
                element.style.backgroundColor = null;
                element.style.color = null;
            });
            this.style.backgroundColor = "#ce1237";
            this.style.color = "white";
            return false;
        }
    }
});

document.getElementById("checkButton").onclick = function () {
    if (validateX() && validateY() && validateR()) {
        send();
    }
};



function createNotification(message) {
    let outputContainer = document.getElementById("outputContainer");
    outputContainer.textContent="";
    let noti = document.createElement("h5");
    noti.innerHTML = "<span class='notification'>"+message+"</span>";
    outputContainer.appendChild(noti);
}

function validateX() {
    if (isNumeric(x)) return true;
    else createNotification("X is not chose");
}

function selectR(param) {
    r = param;
    drawGraph();
}

function validateY() {
    y = document.querySelector("#Y-input").value.replace(",", ".");
    if (y === undefined) {
        createNotification("Y is not valid");
        return false;
    } else if (!isNumeric(y)) {
        createNotification("Y is not numeric");
        return false;
    } else if (!((y > -3) && (y < 3))) {
        createNotification("Y is out of range");
        return false;
    } else return true;
}

function validateR() {
    if (isNumeric(r)) return true;
    else {
        createNotification("R is not chose");
        return false;
    }
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}