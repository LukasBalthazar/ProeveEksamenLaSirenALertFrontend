import {fetchAnyUrl, restDelete, postObjectAsJson, putObjectAsJson, getObjectAsJson} from "./modulejson.js";

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
        sirenForm.action = `http://localhost:8080/sirens/${requestedId}`;
    }

    sirenForm.addEventListener("submit", handleFormSubmit);
}



async function fetchSiren(requestedId){
    try {
        const response = await fetch(`http://localhost:8080/sirens/${requestedId}`);
        if (!response.ok) throw new Error("Siren not found");
        return await response.json();
    } catch (err) {
        console.error("Error fetching siren:", err);
        alert("Was unable to fetch siren data")
    }
}

function fillForm(siren) {
    sirenForm.name.value = siren.name;
    sirenForm.latitude.value = siren.latitude;
    sirenForm.longitude.value = siren.longitude;
    sirenForm.status.value = siren.status;
    sirenForm.disabled.value = siren.disabled;
}

async function handleFormSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const url = form.action
    try {
        const formData = new FormData(form)
        const response = await putFormDataAsJson(url, formData)
        if(response.ok) {
            window.location.href = "all-sirens.html"
        }
    } catch (error)
    {
        alert(error.message)
        console.log(error)
    }
}
async  function putFormDataAsJson(url, formData) {
    console.log(url)
    console.log(formData)
    const plainFormData = Object.fromEntries(formData.entries())
    const resp = await getObjectAsJson(url, plainFormData, "GET")
    return  resp
} async function parseJsonOrNull(r) {
    const text = await r.text();
    return text ? JSON.parse(text) : null;
}