const router = require('express').Router()
const session = require('express-session')

router.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}))

router.post('/', (req, res, next) => {
    console.log(req.session)
})
