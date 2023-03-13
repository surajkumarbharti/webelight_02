const express = require('express');
const bodyParser = require('body-parser');
const  mongoose  = require('mongoose');
const route = require('./routes/route.js');

const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
//const { json } = require('body-parser'); //receive post request (parse the incoming request bodies in a middleware)
const app = express();

///////////////////////////////////////////////////////////////////////
const options = {
    definition: {
        openapi: '3.0.0',
        info:{
            title:'Node js Api Project',
            version:'1.0.0'
        },
        servers:[
            {
                url:'http://localhost:3000/'
            }
        ]
    },
    apis:['./index.js']
}
const swaggerSpec = swaggerJSDoc(options)
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec))

/**
 * @swagger
 * /filterProduct:
 * get:
 *      summary: To get all product from mongodb
 *      description : this api is used to fatch data from mongodb
 *      responses:
 *          200:
 *              description: this api is used to fatch data from mongodb
 *              content:
 *                  application/json


 */


/////////////////////////////////////////////////////////////////////////////////////

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb://localhost:27017/web", {    //Connecting to the Database 
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route);    //parse incoming request body in JSON format

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))    //Listen for incoming requests
});