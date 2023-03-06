import * as sass from '../build/npm/sass.default.js';

window.sass = sass

// Configure importers
function canonicalize(url: string): URL {
    return new URL(url, window.location.toString())
}
function load(canonicalUrl: URL) {
    const request = new XMLHttpRequest();
    request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status !== 200)
            throw new Error(`Failed to fetch ${canonicalUrl}: ${request.status} (${request.statusText})`);
    };
    request.open("GET", canonicalUrl, false);
    request.send();
    console.log(`Importing ${canonicalUrl} (sync)`)
    return {
        contents: request.responseText,
        syntax: canonicalUrl.pathname.endsWith('.sass') ? 'indented' : 'scss'
    };
}
async function loadAsync(canonicalUrl: URL) {
    console.log(`Importing ${canonicalUrl} (async)`)
    const response = await fetch(canonicalUrl)
    if (!response.ok) throw new Error(`Failed to fetch ${canonicalUrl}: ${response.status} (${response.statusText})`);
    const contents = await response.text()
    return {
        contents,
        syntax: canonicalUrl.pathname.endsWith('.sass') ? 'indented' : 'scss'
    }
}
const importers = [{ canonicalize, load }]
const importersAsync = [{ canonicalize, load: loadAsync }]

// Compile styles from the textarea
const input = document.querySelector('#style-input') as HTMLTextAreaElement
const output = document.querySelector('#style-output') as HTMLTextAreaElement
const syntaxBox = document.querySelector('#syntax') as HTMLSelectElement
document.querySelector('[type=button]')?.addEventListener('click', () => {
    const fromString = sass.compileString(input?.value, { importers, syntax: syntaxBox?.value })
    output.value = fromString.css
})

// Load styles from the server
const { contents } = await loadAsync(canonicalize('style.scss'))
const compiled = await sass.compileStringAsync(contents, { importers: importersAsync })
document.head.insertAdjacentHTML('beforeend', `<style>${compiled.css}</style>`)
