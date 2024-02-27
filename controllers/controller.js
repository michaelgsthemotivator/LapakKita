const { Op } = require('sequelize');
const currencyFormat = require('../helper/helper');
const {Category, Product, Store, Transaction, User} = require('../models')
const bcrypt = require('bcryptjs')
const Swal = require('sweetalert2')

class Controller {
    static loginpagerenderer(req,res){
        const err = req.query.error
        res.render('loginpage', {err}) 
    }

    static loginpagehandler(req,res){
        const { username, password } = req.body;

        User.findOne({ where: { username: username } })
        .then(user => {
        if (user) {
            if (bcrypt.compareSync(password, user.password)) {
                req.session.userId = user.id
                res.redirect('/home');
            } else {
                const error ="Invalid username/password"
                res.redirect(`/login?error=${error}`);
            }
        } else {
            const error ="Invalid username/password"
            res.redirect(`/login?error=${error}`);
            // res.send('Invalid username or password');
        }
         })
        .catch(err => res.send(err))
    }

    static registerpagerenderer(req,res){//tampilkan register page
        const err = req.query.err
        res.render('registerpage', {err})
    }

    static registerpagehandler(req,res){//ketika user sudah melakukan register
        const {username, email, password}= req.body
      
        User.create({username, email, password})
        .then(()=>{
            res.redirect('/login')
        })
        .catch(err => {
            if(err.name === 'SequelizeValidationError') {
                const errMsg = err.errors.map(el => el.message);
                res.redirect(`/register/?err=${errMsg}`);
              } else {
                  res.status(500).send('Internal Server Error');
              }
          })
    }

    static userprofilerenderer(req,res){//tampilkan user profile
        res.render('userprofile')
    }
    
    static userprofilehandler(req,res){//edit user profile
    }

    static lapakpedia(req, res) {
        res.render('index')
    }

    static home(req, res) {
        // Product.findAll({
        //     include: {
        //         all: true
        //     },
        //     where: {
        //         stock: {
        //             [Op.gt]: 0
        //         }
        //     }
        // })
        const search = req.query.search
        
        Product.getProduct(search)
        .then((result) => {
            res.render('lapak', {result, currencyFormat})
        }).catch((err) => {
            // res.send(err)
            console.log(err);
        });
    }

    static detail(req, res) {
        const id = req.params.id
        Product.findAll({
            include: Store,
            where: {id} 
        })
        .then((result) => {
            res.render('detail', {result, currencyFormat, Swal})
        }).catch((err) => {
            res.send(err)
        });
    }

    static handlerAdd(req, res) {
        const {qty, total} = req.body
        const id = req.params.id

        Transaction.create({
            quantity: qty,
            subTotal: total,
            userId: 1
        })
            .then((result) => {
                return Product.decrement({stock: +qty}, {where: {id} })
            })
            .then(() => {
                setTimeout(() => {
                    res.redirect(`/detail/${id}`)
                }, 3000);
            })
            .catch((err) => {
                console.log(err);
            });

    }

    static getLogout(req, res) {
        req.session.destroy((err) => {
            if(err) res.send(err)
            else {
                res.redirect('/login')
            }
        })

    }
}


module.exports = Controller