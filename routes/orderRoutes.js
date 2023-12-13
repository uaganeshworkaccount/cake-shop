const express=require('express');
const routes=express.Router();
const orderController=require('../controller/orderController')
const isAuth = require("../middleware/userauth.js");


routes.post('/orders',orderController.createOrder);
routes.get('/orders',isAuth,orderController.getOrders)
routes.get('/orders/:id',orderController.getOrdersById);
routes.put('/orders/:id',orderController.updateOrders);
routes.delete('/orders/:id',orderController.cancelOrders);
routes.get('/orders/cake/:id',isAuth,orderController.cakebyUsername);
routes.get('/ordersadmin',orderController.getOrders)


module.exports=routes;