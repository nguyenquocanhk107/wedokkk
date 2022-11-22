const path = require('path')
const express = require('express')
const multiparty = require('multiparty')
const expressHandlerbars = require('express-handlebars')
const bodyParser = require('body-parser')
const handlers = require('./lib/handlers')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.engine('hbs', expressHandlerbars.engine({
    extname: '.hbs',
    defaultLayout: 'main',
    helpers: {
        section: function(name, options){
            if(!this._sections) this._sections = {}
            this._sections[name] = options.fn(this)
            return null
        }
    }
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(__dirname + '/public'))


app.get('/', handlers.home)

app.get('/dangky', handlers.dangky)
app.post('/dangky/process', handlers.dangkyProcess)
app.get('/dangky/thank-you', handlers.dangkyThankyou)


app.get('/newsletter', handlers.newsletter)
app.post('/api/dangky', handlers.api.dangky)



app.use(handlers.notFound)
app.use(handlers.serverError)


if(require.main === module){
    app.listen(3000, () => {
        console.log('listening on port 3000')
    })
} else {
    module.exports = app
}