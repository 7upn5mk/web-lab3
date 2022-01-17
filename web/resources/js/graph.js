"use strict";

const svg = document.getElementById("graph");
const rect = document.getElementById("rect");
const triangle = document.getElementById("triangle");
const path = document.getElementById("path");

function init() {
    setTimeout(loadDots,400);
}
init();

document.addEventListener("DOMContentLoaded", () => {
    svg.addEventListener("click", event => {
        if (validateR()) {
            let position = getMousePosition(svg, event);
            x = ((position.x - 150) / 40).toFixed(6);
            y = ((150 - position.y) / 40).toFixed(6);
            send();
        }
    });
});

function send() {
    sendRequest([{name:"X-value", value:x}, {name:"Y-value", value:y}, {name:"R-value", value:r}]);
    drawGraph();
    setTimeout(function () {
        addDot(document.getElementById("resTable").rows.length-1);
    },200);
}

function getMousePosition(svg, event) {
    let rect = svg.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

function drawGraph() {
    let outputContainer = document.getElementById("outputContainer");
    outputContainer.textContent="";
    rect.setAttribute("width", `${r*40}`);
    rect.setAttribute("height", `${r*40/2}`);
    rect.setAttribute("x", `${150 - r*40}`);
    // rect.setAttribute("y", `${150 + r*40/2}`);
    triangle.setAttribute("points", `150,150 150,${150-r*40/2} ${150+r*40/2},150`);
    path.setAttribute("d", `M 150,150 L${150+r*40/2},150 A ${r*40/2},${r*40/2} 0 0,1 150,${150+r*40/2} Z`);
}


function loadDots() {
    // let oldDots = document.querySelectorAll("circle");
    // oldDots.forEach(dot => dot.parentNode.removeChild(dot));
    let length = document.getElementById("resTable").rows.length;
    for (let i = 1; i<length; i++) {
        console.log("length "+length+" i "+i)
        addDot(i)
    }
}

function addDot(pos) {
    let table = document.getElementById("resTable");
    let cells = table.rows.item(pos).cells;
    if (!isNumeric(cells.item(0).textContent.trim())) {return;}
    let dotCoords = {
        x: parseFloat(cells.item(0).textContent.trim())*40 + 150,
        y: 150 - parseFloat(cells.item(1).textContent.trim())*40
    };
    let dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dot.setAttribute("r", "5");
    dot.setAttribute("cx", `${dotCoords.x}`);
    dot.setAttribute("cy", `${dotCoords.y}`);
    dot.setAttribute("fill", cells.item(3).innerHTML.trim() === "true" ? "green" : "red");
    svg.appendChild(dot);
}