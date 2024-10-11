const express= require('express');

const mongoose=require('mongoose')
const {userModel}= require('./models/usermodel')
const cors= require('cors');
const { urlencoded } = require('body-parser');
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


mongoose.connect('mongodb://localhost:27017/crudddd').then(()=>{
    console.log('connected to db')
})

.catch(()=>{
    console.log(error)
    })



// app.get('/',(req,res)=>{
//     res.send('Hello World')
// });

app.post('/createuser',async(req,res)=>{
    const {name,email,age}=req.body
    console.log({name,email,age})
    try{
        const { name, email,age } = req.body;
    console.log({ name, email,age });
    const userData = await userModel.create({ name, email,age });
    res.send(userData);
        

    }
    catch(error){
        res.status(400).send(error)

    }
})
app.get('/', (req,res)=>{
    userModel.find({})
    .then(userData=> res.json(userData))
    .catch(err=> res.json(err))
})
app.get('/getUser/:id', (req, res) => {
    const id = req.params.id;
    userModel.findById({_id:id})
        .then(userData => res.json(userData))
        .catch(err => res.json(err));
});
app.put('/updateUser/:id',(req,res)=>{
    const id=req.params.id
    const {name,email,age}=req.body
    userModel.findByIdAndUpdate(id,{name,email,age},{new:true})
    .then(userData=>res.json(userData))
    .catch(err=>res.json(err))
})
app.delete('/deleteUser/:id',(req,res)=>{
    const id= req.params.id
    userModel.findByIdAndDelete({_id:id})
    .then(userData=>res.json(userData))
    .catch(err=>res.json(err))
})



app.listen(3000,()=>{
    console.log('server is running on port 3000')
})