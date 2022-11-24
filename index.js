const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 5000;

const app = express();
require('dotenv').config();
//middleware
app.use(cors());
app.use(express.json())

//mongoDb altes
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@rasel-01.uhpxwkk.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

//JWT verifyToken 
// async function verifyJWT(req, res, next) {
//     const authHeder = req.headers.authorization;
//     if (!authHeder) {
//         return res.status(401).send('This parson unAthorizetion access')
//     }

//     const token = authHeder.split(' ')[1];
//     jwt.verify(token, process.env.ACCSS_TOKEN, function (err, decoded) {
//         if (err) {
//             return res.status(402).send({ message: "forbiden access" })
//         }

//         req.decoded = decoded;
//         next()
//     })

// }

async function run() {

    try {
        const CetegoriesCars = client.db('Car-Shop_Datas').collection('Categories_Cars');
        // const allBokingCollection = client.db('Doctor-Portal').collection('All-Booking');
        // const userInformation = client.db('Doctor-Portal').collection('User-Information');

        // get all appointMent collctions
        app.get('/cetegories', async (req, res) => {
            const query = {};
            const result = await CetegoriesCars.find(query).toArray();
            res.send(result);
        })




        //Jwt token access
        // app.get('/jwt', async (req, res) => {
        //     const email = req.query.email;
        //     const query = { email: email };
        //     const user = await userInformation.findOne(query);
        //     if (user) {
        //         const token = jwt.sign({ email }, process.env.ACCSS_TOKEN, { expiresIn: '1h' });
        //         return res.send({ accessToken: token })
        //     }
        //     console.log(user);
        //     res.status(403).send({ accessToken: '' })
        // })


    }
    catch (error) {
        console.log(error.name, error.message, error.stack);
    }

}

run().catch(error => console.log(error))


app.get('/', (req, res) => {
    res.send('doctor server is run ')
})
app.listen(port, () => console.log(`Doctor site runing ${port}`))