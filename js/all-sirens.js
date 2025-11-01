import {fetchAnyUrl, restDelete, postObjectAsJson} from "./modulejson.js";

document.addEventListener("DOMContentLoaded", () => allSirens())

const urlSirens = "http://localhost:8080/sirens"
const tableoverview = document.querySelector("table")

let sirens = [];
async function allSirens() {
    sirens = await fetchAnyUrl(urlSirens);
    sirens.forEach(putDataInTable);
}

function putDataInTable(sirens) {
    let cellCount = 0;
    let rowCount = tableoverview.rows.length;
    let row = tableoverview.insertRow(rowCount);
    let cell = row.insertCell(cellCount++);
    cell.innerHTML = sirens.id;
    cell = row.insertCell(cellCount++);
    cell.innerHTML = sirens.name;
    cell = row.insertCell(cellCount++);
    cell.innerHTML = sirens.latitude;
    cell = row.insertCell(cellCount++);
    cell.innerHTML = sirens.longitude;
    cell = row.insertCell(cellCount++);
    cell.innerHTML = sirens.status;
    cell = row.insertCell(cellCount++);
    cell.innerHTML = sirens.disabled;
    cell = row.insertCell(cellCount++);
    cell.innerHTML = sirens.lastStatusChange;

    cell = row.insertCell(cellCount++);
    row.id = sirens.id;
    const editSiren = document.createElement("a");
    editSiren.href = `edit-sirens.html?id=${sirens.id}`
    editSiren.textContent = "Edit";
    editSiren.className = "niceBtn";
    cell.appendChild(editSiren);

    cell = row.insertCell(cellCount++)
    const deleteSiren = document.createElement("input")
    deleteSiren.textContent = "Delete";
    deleteSiren.className =  "niceBtn";
    deleteSiren.setAttribute("value", "Delete")

    cell.appendChild(deleteSiren)
    deleteSiren.onclick = function () {
        document.getElementById(sirens.id).remove()
        restDelete((urlSirens + `/${sirens.id}`) ,sirens)
    }


}




