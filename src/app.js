const request = require('request')
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

//define paths for express config
const pathtodirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../template/views')
const partialsPath = path.join(__dirname,'../template/partials')

//setup handlebars engine and views
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(pathtodirectory))
app.use(express.static(viewsPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Hello There Todays Weather Is ',
       
        Name: 'Pratham Baliyan'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'Party Notice!!',
       
        Name: 'Pratham Baliyan'
       
    })
})

app.get('/help',(req,res)=>{
    console.log('Inside Help')
    
    res.render('help',{
        HelpText: 'We Are Here To Help You!!',
        title: 'Help Bol Bhai',
        Name: 'Pratham Baliyan'
    })
})

app.get('/help/more',(req,res)=>{
    console.log('Inside More')
    res.render('more',{
        title:'More Help!!',
        Name: 'Pratham Baliyan'
    })
})
//.get() this help us configure what the servers should do when someone wants to get something
//.send() allows us to send something to the requestor


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            Error:'Please Provide A Address'
        })
    }

    geocode(req.query.address,(error,{lattitude,longitude,location} = {})=>{
        if(error){
            return res.send({error})
        }
        forecast(lattitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
        
      })
   
    


app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            Error: 'Search Bar Cannot Be Empty'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

// app.get('/help/*',(req,res)=>{
//     res.render('404',{
//         title: '404',
//         Name: 'Pratham Baliyan',
//         ErrorMessage: 'No further Page'
//     })
// })

app.get('/*',(req,res)=>{
    res.render('404',{
        title: '404',
        Name: 'Pratham Baliyan',
        ErrorMessage: 'Page Not Found'
    })
})


app.listen(port, ()=>{
    console.log('server is up on port 3000.',port)
})