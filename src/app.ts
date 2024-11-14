import express from "express";

const app =  express();
const port = 3000

app.get('/', (req,res)=>{
    res.send('Hola Mundo Soy david Roa')
});

app.listen(port, ()=>{
    return console.error(`App listening on port ${port}`)
});