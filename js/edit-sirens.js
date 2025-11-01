import {fetchAnyUrl, restDelete, postObjectAsJson} from "./modulejson.js";

document.addEventListener("DOMContentLoaded", initForm);
let sirenForm

async function initForm() {
    sirenForm = document.querySelector("#sirenForm")
    const params = new URLSearchParams(window.location.search);
    const sirenId = params.get("id");
    if(!sirenId){
        alert("siren id is missing")
        return
    }

    const siren = await fetchSiren(sirenId);
    if(siren) {
        fillForm(siren)
        sirenForm.action = `http://localhost:8080/sirens/${sirenId}`;
    }

    sirenForm.addEventListener("submit", handleFormSubmit);
}



async function fetchSiren(id){
    const response = await fetch(`http://localhost:8080/sirens/${id}`);
    return await response.json();
}

function fillForm(siren) {
    sirenForm.name.value = siren.name;
    sirenForm.latitude.value = siren.latitude;
    sirenForm.longitude.value = siren.longitude;
    sirenForm.status.value = siren.status;
    sirenForm.disabled.value = siren.disabled;
    sirenForm.lastStatusChange.value = siren.lastStatusChange;

}
