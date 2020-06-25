const fs = require('fs')
const fs2 = require('fs').promises

const tmpDir = `${__dirname}/tmp`

fs.mkdirSync(tmpDir)

main()

async function main() {

    fs.writeFileSync(`${tmpDir}/test01.txt`, "test01")
    console.log('Written file synchronously')

    fs.writeFile(`${tmpDir}/test02.txt`, "test02", function (err) {
        if (err) throw err
        console.log("Written test02")
    })

    fs2.writeFile(`${tmpDir}/test03.txt`, "test03")
        .then(() => {
            console.log("Written test03")
        })

    await fs2.writeFile(`${tmpDir}/test04.txt`, "test04")
    console.log("Written test04")
}


