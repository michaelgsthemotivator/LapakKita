const express = require('express')
const router = express.Router()
const authenticate = require('../authenticationMiddleware.js');
const Controller = require('../controllers/controller.js')

router.get('/', (req, res) => {
    res.redirect('/lapakkita')
})
router.get('/lapakkita', Controller.lapakpedia)

router.get('/register', Controller.registerpagerenderer)
router.post('/register', Controller.registerpagehandler)

router.get('/login', Controller.loginpagerenderer)
router.post('/login', Controller.loginpagehandler)


router.get('/logout', Controller.getLogout)

router.use((req, res, next) => {

    if(!req.session.userId){
        const error = "Please login first"
        res.redirect(`/login?error=${error}`)
    }else{
        next()
    }
    // console.log('Time:', Date.now())
    // next()
  })

router.get('/userprofile', Controller.userprofilerenderer)

router.get('/home', Controller.home)

router.get('/detail/:id', Controller.detail)

router.post('/product/add/:id', Controller.handlerAdd)

module.exports = router

