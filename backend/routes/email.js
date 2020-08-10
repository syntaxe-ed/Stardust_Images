const router = require('express').Router()
const nodemailer = require ('nodemailer')
require('dotenv').config();

const username = process.env.THE_EMAIL
const password = process.env.THE_PASSWORD

const transport = {
	host: 'smtp.gmail.com',
	service: 'Gmail',
	port: 465,
	secure: false,
	auth: {
		type: "login",
		user: username,
		pass: password
	}
}

const transporter = nodemailer.createTransport(transport);
transporter.verify((error, success) => {
	if (error) {
		console.error(error)
	} else {
		console.log('Email sent');
	}
})

router.post('/', (req, res, next) => {
	const mail = {
		from: username,
		to: process.env.THE_EMAIL,
		subject: req.body.subject,
		text: req.body.email + '\n\n' + req.body.message
	}
	transporter.sendMail(mail, (err,data) =>{
		if(err) {
			res.json({
				status: 'fail'
			})
		} else {
			res.json({
				status: 'success'
			})
		}
	})
})

module.exports = router