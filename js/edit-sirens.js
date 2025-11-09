import { getObjectAsJson } from "./modulejson.js";

document.addEventListener("DOMContentLoaded", initForm);
let sirenForm;

async function initForm() {
    sirenForm = document.querySelector("#sirenForm");
    const params = new URLSearchParams(window.location.search);
    const sirenId = params.get("id");

    if (!sirenId) {
        alert("Siren id is missing");
        return;
    }

    // Fetch siren data
    const response = await fetch(`http://localhost:8080/sirens/${sirenId}`);
    if (!response.ok) {
        alert("Could not fetch siren data");
        return;
    }
    const siren = await response.json();
    fillForm(siren);

    sirenForm.action = `http://localhost:8080/sirens/${sirenId}`;
    sirenForm.addEventListener("submit", handleFormSubmit);
}

function fillForm(siren) {
    sirenForm.name.value = siren.name;
    sirenForm.latitude.value = siren.latitude;
    sirenForm.longitude.value = siren.longitude;
    sirenForm.status.value = siren.status;
    sirenForm.disabled.checked = siren.disabled; // works with boolean
}

async function handleFormSubmit(event) {
    event.preventDefault();

    const f = event.currentTarget;
    const sirenData = {
        name: f.name.value,
        latitude: Number(f.latitude.value),
        longitude: Number(f.longitude.value),
        status: f.status.value,
        disabled: f.disabled.checked // ✅ real boolean value
    };

    const response = await getObjectAsJson(f.action, sirenData, "PUT");
    if (response.ok) {
        window.location.href = "all-sirens.html";
    } else {
        alert("Failed to update siren");
    }
}
