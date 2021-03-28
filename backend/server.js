const express = require('express');
const cors = require("cors");
const nodemailer = require("nodemailer");


require("dotenv").config();

const app = express();

app.use(cors());

app.use(express.json());


app.post("/", function (req,res){
// object of data received from frontend
    var email = req.body.email
    var name = req.body.name
    var subject = req.body.subject
    var message = req.body.message

    //email html layout 
    const memo = 
    `<div style="
        border: 1px solid black;
        padding: 20px;
        line-height: 2;
        font-size: 20px;
        ">
        <h2> Subject: ${subject} </h2>
        <p> From: ${name} <br>  ${email} <br> message: ${message}</p>
        </div> ` ;

    // Nodemailer documentation - nodemailer transport object 
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })

    // Nodemailer documentation: information you want in email message 
    const mail = {
        from: email,
        to: "enter-email-address-message-will-go-to",
        subject: subject,
        text: message,
        html: memo
    }

    // Send email message based on data recieved from frontend 
    transporter.sendMail(mail,(err) => {
        if (err) {
            res.json({
                status: "fail"
            } )
        } else {
            res.json({
                status: "success"
            })
        }
    });

})

app.listen("4000", function(req,res){
    console.log("Server is running")
})