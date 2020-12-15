const express=require('express')
const app=express()
const bookRouter=require('./controller/books')
const authorRouter=require('./controller/authors')
const PORT=4050
app.use(express.json())




app.use('/books',bookRouter)
app.use('/authors',authorRouter)


























app.listen(PORT, () =>{
    console.log('App is listening')
})
