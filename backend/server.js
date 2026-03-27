import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.post('/send-email', async (req, res)=>{
    try {
        const {name, email, message} = req.body;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        const mailOptions = {
            from: email,
            to: process.env.EMAIL,
            subject: `New message from ${name}`,
            text: message,
            replyTo: email,
        };

        transporter.sendMail(mailOptions, (error, info)=>{
            if(error){
                console.error('Error sending email',error);
                return res.status(500).send('Error sending mail');
            }
            console.log('Email send:', info.response);
            res.status(200).send('Email send successfully')
        });
    } catch (error) {
        console.log(error)
    }
})


app.listen(process.env.PORT, ()=>{
    console.log(`Server running on http://localhost:${process.env.PORT}`);
})