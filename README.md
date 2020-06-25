# APIs and scraping example

This was a live coded demo of how to use APIs and how to scrape a website

## APIs

An API stands for Application Programming Interface. However for the web if often means a way to get back data in structured format, usually JSON.

For the API demo we looked at [this list of APIs](https://github.com/public-apis/public-apis) and chose the MetaWeather API. We created `api-test.js` which fetched the `woeid` for three cities and then used that to query the API to get the weather for those locations.

```sh
node api-test.js
```

## Async JS

We talked about asyncronous JavaScript and so I made a quick demo in `async.js` which shows different ways of using JavaScript to perform asyncronous tasks. For the scraping demo I tried to keep things simple by using the syncronous APIs.

## Scraping

For the scraping we use the [Royal Academy's Summer Exhibition website](https://www.royalacademy.org.uk/exhibition/summer-exhibition-2019) to look at how the size of a painting effects its price. 

**How to run**

We generate a list of urls and use `wget` to download them

```sh
node gen-urls.js > urls.txt
mkdir raw
cd raw
wget -i ../urls.txt 
cd ..
```

Wait for the urls to download. Then we use `scrape-work-urls.js` to create `card-urls.txt` a list of urls for each individual work. We also create `data.csv` which has `title,href,price` for each work.

```sh
node scrape-work-urls.js
mkdir raw_artworks
cd raw_artworks
wget -i ../card-urls.txt
cd ..
```

We then wrote `scrape-work-dimensions.js` to go over each card page we downloaded and extract out the width and height, and then join that data back to `data.csv` and we wrote out `data2.csv` which has all the info we need.

```sh
node scrape-work-dimensions.js
```

![price by height x width](https://imgur.com/eHlW3ji.png)






