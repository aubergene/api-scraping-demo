const fetch = require('node-fetch')

const cities = ["London", "Brighton", "Liverpool"]

cities.forEach(city => {
    const url = `https://www.metaweather.com/api/location/search/?query=${city}`
    console.log(url)

    fetch(url)
        .then(d => d.json())
        .then(d => {
            const city = d[0]
            console.log(city)
            const url = `https://www.metaweather.com/api/location/${city.woeid}/`
            // console.log(url)

            fetch(url)
                .then(d => d.json())
                .then(d => console.log(d))
        })
})

