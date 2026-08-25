const TRANSLATOR_URL = "http://127.0.0.1:8000";

export async function translateText(text) {
    const response = await fetch(`${TRANSLATOR_URL}/translate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            text: text
        })
    });

    if (!response.ok) {
        throw new Error(`Translation request failed: ${response.status}`);
    }

    const data = await response.json();

    return data.translation;
}