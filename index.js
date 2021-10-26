const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
const port = 3000;


const uri = "mongodb+srv://sadique:sadique@cluster0.0gjnb.mongodb.net/test?retryWrites=true&w=majority";
const mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const userInfo = {name: 'Sadique', email: 'mah@gam'};

// client.connect(err => {
//     const collection = client.db("test").collection("users");
//     console.log('hitting the database');
//     const user = {name: 'habib', email: 'habib@gmail.com', phone: 01700000000};
//     collection.insertOne(user)
//     .then(() => {
//         console.log('inserted successfully');
//     })
//     // client.close();
// });

async function run() {
  try {
    await mongoClient.connect();
    const database = mongoClient.db("test");
    const usersCollection = database.collection("users");

    app.post('/users', async (req, res) => {
        const userData = req.body;
        // console.log(userData);
        const result = await usersCollection.insertOne(userData);
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
        res.send(result);
    })

    app.get('/users', async (req, res) => {
        // console.log('got it');
        const cursor = usersCollection.find({});
        const users = await cursor.toArray();
        res.send(users);
    })

    app.get('/users/:id', async (req, res) => {
        const id = req.params.id;
        const query = {_id: ObjectId(id)}
        const user = await usersCollection.findOne(query);
        res.send(user);
    })

    app.delete('/users:id', async (req, res) => {
        const id = req.params.id;
        const query = {_id: ObjectId(id)};
        const result = await usersCollection.deleteOne(query);
        console.log(result);
        if (result.deletedCount === 1) {
            res.send(JSON.stringify(result));
        }
    })

    app.put('/users/:id', async (req, res) => {
        const id = req.params.id;
        const user = req.body;
        const updatedUser = {};
        const updatedDoc = {
            $set: {
                name: user.name, 
                email: user.email
            }
        };
        const filter = {_id: ObjectId(id)};
        const options = {upset: true};
        const result = await usersCollection.updateOne(filter, updatedDoc, options);
        res.json(result);
    })


  } finally {

    // await mongoClient.close();

  }

}

run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('hello world');
})

app.listen(port);

