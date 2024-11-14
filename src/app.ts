import express from "express";

require('dotenv').config();

const app =  express();
const port = process.env.PORT

app.get('/', (req,res)=>{
    res.send('Hola Mundo Soy david Roa')
});

app.listen(port, ()=>{
    return console.error(`App listening on port ${port}`)
});