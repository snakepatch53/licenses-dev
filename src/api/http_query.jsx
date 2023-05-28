export async function http_query(table, action, method, data = null) {
    const URL = "http://localhost/licencias/api/";
    const response = await fetch(`${URL}${table}/${action}`, {
        method: method,
        body: JSON.stringify(data),
        headers: new Headers().append("Accept", "application/json"),
    }).catch((error) => {
        console.error("Error:", error);
        return false;
    });
    if (!response) return false;
    const json = await response.json();
    return json;
}
