const fs = require('fs')

const pageFiles = `${process.cwd()}/data/pages`

console.log(fs.readdirSync(pageFiles))