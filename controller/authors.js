const authorRouter=require('express').Router();
const Authors=require('../authors.json')
const { authenticateToken } = require('../middleware/authentication');

//gets all notes//
authorRouter.get('/',(request,response,next) => {
    response.status(200).send(Authors)
    next();
});

// authorRouter.get('/:id',(request,response) => {
//     const id = request.params.id
//     response.status(200).send(Authors[id-1]);
//     });

authorRouter.get('/:author',(request,response,next) => {
        const author = request.params.author
        Authors.find({author}).then((res) =>{
            response.status(200).send(res)
            next();
        })
    })

authorRouter.get('/:id',(req,res)=>{
        const id= req.params.id;   
        const newAuthorData=  authorsData.filter(author=>author.authorId === id);     
        res.status(200).send(newAuthorData);
     });
    
     // get all books by a specific author
authorRouter.get('/:id/books',(req,res)=>{
        const id= req.params.id;   
        let newAuthorData=  Authors.filter(author=>author.authorId === id );    
        const authorBooks=newAuthorData[0].books;   
        res.status(200).send({books:authorBooks});
     });
    
    //creating a new book
authorRouter.post('/',authenticateToken,(req,res) =>{
     const requestBody= req.body;
     Authors.push(requestBody) 
     res.send({action:"adding a new book", message:"added successfully", body:requestBody});
     
    })
    
    
    //delete a book
authorRouter.delete('/:id',authenticateToken,(req,res)=>{
       
        const id = req.params.id;   
        const newAuthorsData = authorsData.filter(author=>author.authorId!==id)  
        res.send({mesage:"item removed",newAuthorsData});
    })








module.exports=authorRouter