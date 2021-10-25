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


  } finally {

    // await mongoClient.close();

  }

}

run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('hello world');
})

app.listen(port);
































// const express = require('express');
// const cors = require('cors');
// const app = express();
// app.use(cors());
// app.use(express.json());
// const port = 3000;

// const users = [
//     { id: 0, name: 'Kalam', email: 'kalam@gmail.com' },
//     { id: 1, name: 'Salam', email: 'kalam@gmail.com' },
//     { id: 2, name: 'Jobbar', email: 'kalam@gmail.com' },
//     { id: 3, name: 'Salim', email: 'kalam@gmail.com' },
//     { id: 4, name: 'Kolim', email: 'kalam@gmail.com' },
// ];

// app.get('/', (req, res) => {
//     res.send('Hello World from server!');
// })

// app.get('/users', (req, res) => {
//     const searchText = req.query.name;
//     if (searchText) {
//         const searchResult = users.filter(user => user.name.toLocaleLowerCase().includes(searchText));
//         res.send(searchResult);
//     } else {
//         res.send(users);
//     }
// })

// app.get('/users/:id', (req, res) => {
//     const id = req.params.id;
//     res.send(users[id]);
// })

// app.post('/users', (req, res) => {
//     const newUser = req.body;
//     newUser.id = users.length;
//     users.push(newUser);
//     res.send(JSON.stringify(users));
// })

// app.listen(port, () => {
//     console.log('listening to port ', port);
// })

