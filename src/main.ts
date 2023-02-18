const sass = require('../build/npm/sass.default.dart.js')

window.sass = sass

// Configure importers
const importers = [{
    canonicalize(url: string): URL {
        return new URL(url, window.location.toString())
    },
    load(canonicalUrl: URL) {
        const request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (this.readyState === 4 && this.status !== 200)
            throw new Error(`Failed to fetch ${canonicalUrl}: ${this.status} (${this.statusText})`);
        };
        request.open("GET", canonicalUrl, false);
        request.send();
        console.log(`Importing ${canonicalUrl}`)
        return {
            contents: request.responseText,
            syntax: canonicalUrl.pathname.endsWith('.sass') ? 'indented' : 'scss'
        };
    }
}]

// Compile styles from the textarea
const input = document.querySelector('#style-input') as HTMLTextAreaElement
const output = document.querySelector('#style-output') as HTMLTextAreaElement
const syntaxBox = document.querySelector('#syntax') as HTMLSelectElement
document.querySelector('[type=button]')?.addEventListener('click', () => {
    const fromString = sass.compileString(input?.value, {importers, syntax: syntaxBox?.value})
    output.value = fromString.css
})

// Load styles from the server
const compiled = sass.compile('style.scss', { importers })
document.head.insertAdjacentHTML('beforeend', `<style>${compiled.css}</style>`)
