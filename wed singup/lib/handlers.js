exports.api = {}

exports.home = (req, res) => res.render('home')

exports.dangky = (req, res) => {
    res.render('dangky', {csrf: 'CSRF token goes heare'})
}

exports.dangkyProcess = (req, res) => {
    console.log('Form (from querystring): ' + req.query.form)
    console.log('CSRF token (from hidden form field): ' + req.body._csrf)
    console.log('Name (from visible form field): ' + req.body.name)
    console.log('Email (from visible form field): ' + req.body.email)
    res.redirect(303, '/dangky/thank-you')
}

exports.dangkyThankyou = (req, res) => res.render('dangky-thank-you')



exports.newsletter = (req, res) => {
    res.render('newsletter', { csrf: 'CSRF token goes here'})
}

exports.api.dangky = (req, res) => {
    console.log('CSRF token (from hidden form field): ' + req.body._csrf)
    console.log('Name (from visible form field): ' + req.body.name)
    console.log('Email (from visible form field): ' + req.body.email)
    res.send({ result: 'success'})
}

exports.notFound = (req, res) => res.render('404')

exports.serverError = (err, req, res, next) => res.render('500')