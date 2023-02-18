const sass = require('../build/npm/sass.default.dart.js')

const compiled = sass.compile('style.sass', {
    importers: [{
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
            return {
                contents: request.responseText,
                syntax: canonicalUrl.pathname.endsWith('.scss') ? 'scss' : 'sass'
            };
        }
    }]
})

console.log(compiled)
document.head.insertAdjacentHTML('beforeend', `<style>${compiled.css}</style>`)
