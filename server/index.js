/*_______________________________*
|    Déclaration des framework    |
*________________________________*/
const express = require('express');         //  J'appelle le package express grâce à require
const path = require('path');               //  J'appelle le package path
const mongoose = require('mongoose');       //  c'est l'adresse qui me permet de me connecter a la base de donnée ne pas oublier (npm install --save mongoose)
const bodyParser = require('body-parser');  //  body-parser permet de « convertir » automatiquement la chaine de caractère que mon client envoie à mon serveur (npm intall --save body-parser)

/*_____________________________*
|    Connexion BdD et model    |
*______________________________*/

const distDir= "../dist/";
/*  On va créer une constante uri qui enregistre le lien vers la base de donnée "MONGODB" */
const uri = "mongodb+srv://milantac:COD(ww2)@devweb2020joeuf.ab3uv.mongodb.net/devWeb2020Joeuf?retryWrites=true&w=majority";
const Car = require('./model/car.model');
/*______________________________________________*
|    Déclaration d'instance et connexion BdD    |
*_______________________________________________*/

var promise = mongoose.connect(uri, {useNewUrlParser:true});  //J'utilise le système  de promesse Node étant asynchrone, je ne veux pas que le serveur soit lancé avant la connexion
const app = express();   // je déclare une variable app et j'y affecte le résultat de la fonction express cela me permet de créer un serveur Node express

promise.then(()=>{
    console.log('DB connected');

    app.listen('3000',()=>{ // Mon application va écouter les événements sur le port 3000
        console.log('Server Started');// A l'ouverture du serveur j'affiche le message: Listening on port 3000 !
    });
});


/*___________________________*
|       Configuration        |
*____________________________*/

app.use(express.static(path.join(__dirname, distDir)));
//                       |=>La librairie path permet de construire des liens vers des fichiers.

/*Enfin toutes les adresses qui ne contiennent pas /api doivent renvoyer le index.html se trouvant dans les dossiers distants de Angular */
app.use(/^((?!(api)).)*/,(req,res)=>{     
//                         |   |=>objets res (réponse)
//                         |=>objets req (demande)    
    res.sendFile(path.join(__dirname,distDir + '/index.html'));
});

app.use(bodyParser.urlencoded({extended: true})); //  Je configure "bodyParser" de telle sorte qu’il ne prenne en compte que les éléments en JSON
app.use(bodyParser.json());

/*___________________________*
|       Router               |
*____________________________*/
app.post('/api/cars', (req, res) => {
    var newCar = new Car(req.body);
  
    newCar.save((err, obj) => {
      if(err) {
        console.log(err);
        return res.send(500);
      }
  
      res.send(obj);
    });
  });
  
  app.get('/api/cars', (req, res) => {
    Car.find({}, (err, obj) => {
      if(err) {
        console.log(err);
        return res.send(500);
      }
      return res.send(obj);
    });
  });
  
  // Le :id sera automatiquement transofrmé par l'identifiant envoyé aprés la requête xhttp
  app.get('/api/cars/:id', (req, res) => {
    // Pour effectuer une recherche on va utiliser le modèle
    // BodyParser permet de conserver l'id dans req.params.id
    Car.findOne({_id: req.params.id}, (err, obj) => {
      if(err) {
        console.log(err);
        return res.send(500);
      }
  
      return res.send(obj);
    })
  });
  
  app.put('/api/cars/:id', (req, res) => {
    Car.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}, (err, obj) => {
      if(err) {
        console.log(err);
        return res.send(500);
      }
  
      return res.send(obj);
    });
  });
  
  app.delete('/api/cars/:id', (req, res) => {
    Car.deleteOne({_id: req.params.id}, (err, obj) => {
      if(err) {
        console.log(err);
        return res.send(500);
      }
      res.status(204).end();
    });
  });
  