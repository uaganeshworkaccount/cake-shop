const express=require('express');
const isAuth = require("../middleware/jwtfunction");

const cakeroutes=express.Router();
const cakeController=require('../controller/cakeController')

cakeroutes.get('/cakes',cakeController.getCakes)
cakeroutes.get('/cakes/:id',cakeController.getCakeById);
cakeroutes.post('/cakes',cakeController.createCake);
cakeroutes.put('/cakes/:id',cakeController.updateCakeById);
cakeroutes.delete('/cakes/:id',cakeController.delteCakeById);


module.exports=cakeroutes;