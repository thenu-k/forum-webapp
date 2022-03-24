let express = require('express')
let app = express()
app.use(express.static("views")); 
require('dotenv').config()

//Reading request bodies
let body_parser = require('body-parser')
let json_parser = body_parser.json()

//Setting templating engine
app.set('view engine', 'ejs')

//Establishing postgres connection
const {Pool, Client} = require('pg')
const pool  = new Pool({
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
})

//Endpoints
app.get('/test', (req, res)=>{
    res.send({'Status': "Connection Established", "Server": "Cheese Kottu Forumns v04"})
})

app.get('/', (req, res) =>{
    res.render('CSS/index.css')
    res.render('index.html')
})

app.get('/general', (req, res)=>{
    res.sendFile('views/general.html', {root: __dirname})
})

app.get('/profile_pics', (req, res)=>{
    res.sendFile('views/Assets/profile_pics/5673221.jpg', {root: __dirname})
})

app.get('/profile/:username', (req, res)=>{
    res.render('profile.ejs',{
        username: req.params.username
    })
})

app.get('/get/posts', (req, res)=>{
    var post_list = []
    pool.query('TABLE '+process.env.DB_TABLE+';', (error, results)=>{
        post_data = results.rows;
        post_data.forEach(element=>{
            post_list.push(element)
            return post_list
        })
        res.send(post_list)   //This has to be inside, as the above code consists of asynchronous functions
    })
})

app.post('/post/new', json_parser, (req, res)=>{
    let payload = req.body
    let query_string = 'INSERT INTO '+process.env.DB_TABLE+' (body, username, img_url) VALUES (\''+payload.body+'\',\''+payload.username+'\',\''+ payload.img_url+'\');'
    console.log(query_string)
    pool.query(query_string, (error, results)=>{
        res.send(results)
    })
})

app.listen(process.env.PORT, '0.0.0.0')



