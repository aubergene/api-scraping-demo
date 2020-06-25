const fs = require('fs')
const cheerio = require('cheerio')
const { csvFormat } = require('d3-dsv')

const rawDir = `${__dirname}/raw`

const files = fs.readdirSync(rawDir)
// .slice(0, 5)

// console.log(files)
const artworks = []

files.forEach(file => {
    const html = fs.readFileSync(`${rawDir}/${file}`, 'utf8')
    // console.log(html)

    const $ = cheerio.load(html)
    // console.log($)

    $('.card').each(function (i, el) {
        const card = cheerio(this)
        const href = card.find('a').attr('href')
        const title = card.attr('data-gtm-title').replace(/\d+ - /, '')
        // console.log(title)
        const price = card.find('.card__price').text()
            .replace(/\D/g, '')
            .trim()

        console.log(price)
        // console.log()
        artworks.push({
            title,
            href,
            price,
        })
    })
})

fs.writeFileSync(`${__dirname}/data.csv`, csvFormat(artworks))

const urls = artworks
    .filter(d => d.price)
    .map(d => {
        return `https://se.royalacademy.org.uk${d.href}`
    })

fs.writeFileSync(`${__dirname}/card-urls.txt`, urls.join("\n"))

