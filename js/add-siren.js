import {getObjectAsJson} from "./modulejson.js";

document.addEventListener("DOMContentLoaded", createFormEventListener)
let sirenForm;

function createFormEventListener() {
    sirenForm = document.querySelector("#sirenForm")
    sirenForm.addEventListener("submit", handleFormSubmit)
}

async function handleFormSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const url = form.action
    try {
        const formData = new FormData(form)
        const response = await postFormDataAsJson(url, formData)
        if(response.ok) {
            window.location.href = "all-sirens.html";
        }
    } catch (error) {
        alert(error.message)
        console.log(error)
    }
}

async function postFormDataAsJson(url, formData) {
    console.log(url)
    console.log(formData)
    const plainFormData = Object.fromEntries(formData.entries())
    plainFormData.siren = {}
    plainFormData.siren.id = plainFormData.sirenId
    plainFormData.disabled = formData.has("disabled")
    const resp = await getObjectAsJson(url, plainFormData, "POST")
    return resp
}