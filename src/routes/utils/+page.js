/** @type {import('./$types').PageLoad} */

export async function getAdvice() {
    const res = await fetch('https://api.adviceslip.com/advice');
    if (!res.ok) {
        throw new Error(`An error has occured: ${res.status}`);
    } else {
        return await res.json();
    }
}