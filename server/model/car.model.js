const mongoose = require('mongoose'); 

// On construit grâce à mongoose un schéma de notre entité qui sera un car
var carsShema = mongoose.Schema({
    marque: String,       /*  Peugeot/ Citröen/ Renault/ Fiat/ Opel/ volswagen ... */
    type: String,        /*  R5/ Clio/ C3/ Alpine ...    */
    categorie: String,  /*  Citadine/ SUV/ 4*4/ Berline ... */
    onSold: String,     /* vendu/ a vendre */
    colorCar: String,  /* black/ white ... */ 
    
});

var cars = mongoose.model('cars', carsShema);
module.exports=cars;