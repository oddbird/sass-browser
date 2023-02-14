import sass from 'sass'

window.sass = sass

sass.compile('style.scss') // Uncaught TypeError: Cannot read properties of undefined (reading 'isTTY')
