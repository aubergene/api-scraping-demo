const fs = require('fs')
const cheerio = require('cheerio')
const { csvParse, csvFormat } = require('d3-dsv')

const rawDir = `${__dirname}/raw_artworks`
const baseUrl = 'https://se.royalacademy.org.uk'

const files = fs.readdirSync(rawDir)
// .slice(0, 3)


// console.log(files)
const data = fs.readFileSync(`${__dirname}/data.csv`, 'utf8')
const rows = csvParse(data)
// console.log(rows)

const artworkByUrl = new Map()
rows.forEach(row => {
    artworkByUrl.set(row.href, row)
})

const artworks = []

files.forEach(file => {
    const html = fs.readFileSync(`${rawDir}/${file}`, 'utf8')
    // console.log(html)

    const $ = cheerio.load(html)
    // console.log($)

    const url = $('link[rel="canonical"]').attr('href').trim().replace(baseUrl, '')
    console.log(url)

    const dimensionsText = $('.artworkCard__dimensions').text()
        .replace(/\s+/g, ' ')
        .trim()

    const dimensions = dimensionsText
        .match(/\d+/g)

    console.log(dimensionsText, dimensions)
    if (dimensions && dimensions.length) {
        // console.log(url)
        const [width, height] = dimensions

        const artwork = artworkByUrl.get(url)

        Object.assign(artwork, {
            width, height
        })

        artworks.push(artwork)
    }

})

fs.writeFileSync(`${__dirname}/data2.csv`, csvFormat(artworks))

