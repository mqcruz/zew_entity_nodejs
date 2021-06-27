// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
// Initialise the app
let app = express();

let swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
// Import routes
let apiRoutes = require("./api-routes");
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost:27017/database', { useNewUrlParser: true});
var db = mongoose.connection;


// Added check for DB connection
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

// Setup server port
var port = process.env.PORT || 8080;

//https://swagger.io/docs/specification/api-general-info/?sbsearch=info
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title : 'Entity API',
            description : 'Descriprion Entity API',
            contact : {
                email : 'maria@cruz.pt'
            },
            servers : ['http://localhost:8080']
        }
    },
    // 
    apis : ['index.js', 'contactController.js']
}

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));

// Use Api routes in the App
app.use('/api', apiRoutes);
// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});