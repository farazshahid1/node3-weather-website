const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

// console.log(__dirname)
// console.log(__filename)
//console.log(path.join(__dirname, '../public'))

const app = express()

const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//customiz the server
//static take the path to the server we want to serve up
// setup Static directory to serve
app.use(express.static(publicDirectoryPath))
//app.com
//app.com/help
//app.com/about

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather',
        name: 'Andrew'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Andrew'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Andrew '

    })
})

app.get('/help/*', (req, res)=>{
    res.render('error', {
        title: '404',
        name: 'Andrew',
        errorMessage: 'Help article not found'
    })
})


// app.get('', (req, res)=>{
//     res.send('<h1>Hello express!</h1>')

// })


// app.get('/help', (req, res)=>{
//     res.send({
//         name: 'Faraz',
//         age: 27
//     })
// })


// app.get('/about', (req, res)=>{
//     res.send('<h1>About Page</h1>')
// })

app.get('/weather', (req, res)=>{

    const address = req.query.address
    if(!address)
    {
        return res.send({
            error: 'you must enter Address'
        })
    }

    geoCode(address, (error, {latitude, longitude, location} = {})=>{

        if(error){
           return res.send({ error })
        }

        forecast(latitude, longitude, (error, {summary, CurrentTemperature, RainChances})=>{
            
            if(error){
                return res.send({ error })
            }
           // console.log(error,CurrentTemperature, location, address, summary)
            res.send({
                forecast: CurrentTemperature,
                location,
                summary,
                address,
                RainChances
            })
        })

    })

  
})

app.get('/products', (req, res)=>{
    
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    })

})

app.get('/*', (req, res)=>{
    res.render('error', {
        title: '404',
        name: 'Andrew',
        errorMessage: 'Page not found'
    })
})

app.listen(port, ()=>{
    console.log('Server is up on port ' + port)
})