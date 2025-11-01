async function parseJsonOrNull(r) {
    const text = await r.text();
    return text ? JSON.parse(text) : null;
}

async function fetchAnyUrl(url) {
    const r = await fetch(url);
    if (!r.ok) throw new Error(await r.text());
    return parseJsonOrNull(r);
}

async function restDelete(url) {
    const r = await fetch(url, { method: "DELETE" });
    if (!r.ok) throw new Error(await r.text());
    return r.status === 204 ? null : parseJsonOrNull(r);
}

async function postObjectAsJson(url, obj) {
    const r = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj)
    });
    if (!r.ok) throw new Error(await r.text());
    return parseJsonOrNull(r);
}

async function putObjectAsJson(url, obj) {
    const r = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj)
    });
    if (!r.ok) throw new Error(await r.text());
    return parseJsonOrNull(r);
}

export { fetchAnyUrl, postObjectAsJson, putObjectAsJson, restDelete };
