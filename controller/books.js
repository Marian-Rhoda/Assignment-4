const bookRouter=require('express').Router();
const Books=require('../books.json')
const jwt=require('jsonwebtoken')
const { authenticateToken } = require('../middleware/authentication');

//gets all notes//
bookRouter.get('/',(request,response,next) => {
        response.status(200).send(Books)
        next();
    });

bookRouter.get('/:id',(request,response) => {
    const id = request.params.id
    response.status(200).send(Books[id-1]);
    });

bookRouter.get('/:rating',(req,res)=>{
        const rating= req.params.rating;     
        console.log(req.params)
        const newBook=  Books.filter(book=>book.rating == rating);     
        res.status(200).send(newBook);
     });
    
    
    //creating a new book
bookRouter.post('/',authenticateToken,(req,res) =>{
     const requestBody= req.body;
     console.log(requestBody);   
     res.send({action:"adding a new book", message:"added successfully", body:requestBody});
     const dataUpdate= JSON.stringify(requestBody)
     fs.writeFile('trial.js',dataUpdate,(err=>{
         if (err){
             throw err;
         }
         console.log("JSON data is saved.")
     }))
    })
    
    
    //delete a book
bookRouter.delete('/:id',authenticateToken,(req,res)=>{
        console.log(req);
        const id = req.params.bookId;  
        const newData = Books[id];
        console.log(newData)   
        const newBooks = Books.splice(id,1);  
        res.send({mesage:"item removed",newBooks});
    })
    
    










module.exports=bookRouter;