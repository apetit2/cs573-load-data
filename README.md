# Description
This project is used to import the CSV datasets found in the three gists provided in the below section. When starting the app, there are three tabs to distinguish between each of the datasets. Clicking any of the associated tabs, will fire off an api request to retrieve the associated CSV. Once the api request resolves successfully, react-query is used to cache this response, so the api is effectively only hit once (at least until the data becomes stale). While on any of the tabs, the project presents information regarding the number of rows, columns, and size of the associated CSV.

## Links to Datasets Used
- [Hurricane Dataset](https://gist.github.com/apetit2/5c1aa857558bc646281763252ea13d57)
- [Avocado Dataset](https://gist.github.com/apetit2/a3a8f61f0c56a1d1448804a584b7c1bb)
- [Minimum Wage Dataset](https://gist.github.com/apetit2/212a7cd715f8ba34eb637d014fffb12f)

## How To Run
This project was bootstrapped with CRA (create react tool), and so all applicable commands should work here. To run locally:
- You need to have node (preferably 14+) installed on your machine. 
- You need to install all npm dependencies - `npm install`
- You need to run the start script - `npm start`
- And that's it!

## Demo
![Geospatial Chart Demo](/img/geospatial-demo.gif)*Geospatial Chart Demo*

![Line Chart Demo](/img/line-chart-demo.gif)*Line Chart Demo*

## Links To Live Website
- [Scatter Plot](https://apetit2.github.io/cs573-load-data/#/minimum-wage/scatter-plot)
- [Line Chart](https://apetit2.github.io/cs573-load-data/#/minimum-wage/line-chart)
- [Geospatial Chart](https://apetit2.github.io/cs573-load-data/#/minimum-wage/geospatial/iterated)

