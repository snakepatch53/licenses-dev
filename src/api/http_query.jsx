export async function http_query(table, action, method, data = null) {
    const URL = import.meta.env.MODE === "development" ? import.meta.env.VITE_HTTP_DOMAIN_LOCAL : import.meta.env.VITE_HTTP_DOMAIN_REMOTE;
    const response = await fetch(`${URL}${table}/${action}`, {
        method: method,
        body: JSON.stringify(data),
        headers: new Headers().append("Accept", "application/json"),
    }).catch((error) => {
        console.error("Error:", error);
        return false;
    });
    if (!response) return !true;
    const json = await response.json();
    return json;
}
