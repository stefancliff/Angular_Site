const express = require ('express');
const app = express();
const mongoose = require('mongoose');

const Furniture = require('./model/databasemodelFurniture');
const Users = require('./model/databasemodelUsers');
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

mongoose.connect('mongodb+srv://meanUser01:kQTVOKddzs5FQvtU@cluster0.oymn3.mongodb.net/CliffsideDesignDB?retryWrites=true&w=majority',
{useUnifiedTopology: true, useNewUrlParser:true, useCreateIndex: true})
.then(()=>{
  console.log('Database connected!');
})
.catch(()=>{
  console.log('Error connectiong the database');
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
  'Access-Control-Allow-Methods',
  'GET, POST, PATCH, DELETE, OPTIONS, PUT'
);
  next();
});

app.post('/api/users', (req, res, next) =>{
  const user = new Users({
    fname : req.body.fname,
    lname : req.body.lname,
    email : req.body.email,
    password : req.body.password,
    index : req.body.index
  });
  user.save();
  console.log(user);
  res.status(201).json({
    message: 'User added successfully'
  });
});

app.post('/api/furniture', (req, res, next) =>{
  const furniture = new Furniture({
    name : req.body.name,
    main_material : req.body.main_material,
    colour : req.body.colour,
    type : req.body.type,
    area : req.body.area,
    index : req.body.index,
  });
  furniture.save();
  console.log(furniture);
  res.status(201).json({
    message: 'Furniture added successfully'
  });
});

app.get('/api/users', (req, res, next)=>{
  Users.find()
  .then(documents =>{
    res.status(200).json({
      message: 'All users fetched succesfully',
      users: documents
    });
  });
});

app.get('/api/furniture', (req, res, next)=>{
  Furniture.find()
  .then(documents =>{
    res.status(200).json({
      message: 'All furniture fetched succesfully',
      furniture: documents
    });
  });
});

app.delete('/api/users/:index', (req,res,next)=>{
  Users.deleteOne({index: req.params.index}).then(result =>
    {
      console.log(result);
    })
  res.status(200).json({
    message:'User deleted successfully'
  });
});

app.delete('/api/furniture/:index', (req,res,next)=>{
  Furniture.deleteOne({index: req.params.index}).then(result =>{
    console.log(result);
  })
  res.status(200).json({
    message:'Furniture deleted successfully'
  });
});
module.exports = app;
