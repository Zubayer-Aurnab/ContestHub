const express = require("express");
const cors = require("cors");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.2dfdg2c.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // await client.connect();

    const UserCollection = client.db("assignment-12").collection("users");
    const ContestCollection = client
      .db("assignment-12")
      .collection("all-contest");
    const PaymentCollection = client.db("assignment-12").collection("Payment");
    const BestCreatorCollection = client
      .db("assignment-12")
      .collection("best-creator");

    //jwt token Generated
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
      });
      res.send({ token });
    });

    //middlewares for varifying token
    const verifyToken = (req, res, next) => {
      console.log(
        req.headers.authorization,
        "///////////////////////////////////"
      );
      if (!req.headers.authorization) {
        return res.status(401).send({ message: "forbidden access" });
      }
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
          return res.status(401).send({ message: "forbidden access" });
        }
        req.decoded = decoded;
        next();
      });
      // next();
    };
    //middlewares for varifying token

    //get best creator data
    app.get("/best-creator", async (req, res) => {
      const result = await BestCreatorCollection.find().toArray();
      res.send(result);
    });
    //store user data to database
    app.post("/users", async (req, res) => {
      const user = req.body;
      const query = { email: user.email };
      const existingUser = await UserCollection.findOne(query);
      if (existingUser) {
        return res.send({ message: "user already exists", insertedId: null });
      }
      const result = await UserCollection.insertOne(user);
      res.send(result);
    });
    // get the user data from database
    app.get("/users", verifyToken, async (req, res) => {
      const result = await UserCollection.find().toArray();
      res.send(result);
    });

    //Update user role
    app.patch("/users/admin/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const { Role } = req.body;
      const updatedDoc = {
        $set: {
          role: Role,
        },
      };
      const result = await UserCollection.updateOne(filter, updatedDoc);
      res.send(result);
    });
    //get user data from database bt email
    app.get("/users/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await UserCollection.findOne(query);
      res.send(result);
    });
    //update user Profile
    app.put("/users/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const data = req.body;
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          name: data.name,
          photo: data.photo,
        },
      };
      const result = await UserCollection.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });
    //delete user from database
    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await UserCollection.deleteOne(query);
      res.send(result);
    });
    //add a contest data to database
    app.post("/contest", async (req, res) => {
      const contest = req.body;
      const result = await ContestCollection.insertOne(contest);
      res.send(result);
    });
    //get my added contest data by email address
    app.get("/contest/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      const query = { creatorEmail: email };
      const result = await ContestCollection.find(query).toArray();
      res.send(result);
    });
    //get all contest data
    app.get("/contest", async (req, res) => {
      const result = await ContestCollection.find().toArray();
      res.send(result);
    });
    //get contest data by searching
    app.get("/search", async (req, res) => {
      try {
        let query = {};
        if (req.query.tag) {
          const tag = req.query.tag;
          const regexPattern = new RegExp(tag, "i");
          query = { tag: { $regex: regexPattern } };
        }
        const result = await ContestCollection.find(query).toArray();
        res.send(result);
      } catch {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      }
    });
    //find contest by id
    app.get("/single-contest/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      console.log(id, query);
      const result = await ContestCollection.findOne(query);
      res.send(result);
    });
    //delete contest data from database
    app.delete("/delete-contest/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await ContestCollection.deleteOne(query);
      res.send(result);
    });
    //update COntest data from database
    app.patch("/update/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const item = req.body;
      // console.log(item)
      const updatedDoc = {
        $set: {
          name: item.name,
          img: item.img,
          price: item.price,
          tag: item.tag,
          description: item.description,
          timeToEnd: item.timeToEnd,
          prize: item.prize,
          status: item.status,
        },
      };
      const result = await ContestCollection.updateOne(filter, updatedDoc);
      res.send(result);
    });
    //delete contest data by admin
    app.delete("/delete-contest-admin/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await ContestCollection.deleteOne(query);
      res.send(result);
    });
    //Approve contest data from database
    app.patch("/update-contest/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          status: "approved",
        },
      };
      const result = await ContestCollection.updateOne(query, updatedDoc);
      res.send(result);
    });
    //add contest participants to database
    app.post("/participate/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const { email } = req.body;
      const { Pimg } = req.body;
      const result = await ContestCollection.updateOne(query, {
        $push: {
          participantsList: { email, Pimg },
        },
      });
      res.send(result);
    });
    //set contest winner
    app.patch("/winner/:id", async (req, res) => {
      const id = req.params.id;
      const { winnerEmail } = req.body;
      const { winnerPhoto } = req.body;
      const query = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          winnerEmail: winnerEmail,
          winnerPhoto: winnerPhoto,
        },
      };
      const result = await ContestCollection.updateOne(query, updatedDoc);
      res.send(result);
    });
    //get my winning contest
    app.get("/my-winning/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      const query = { winnerEmail: { $exists: true }, winnerEmail: email };
      try {
        const result = await ContestCollection.find(query).toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
      }
    });
    //payment intent
    app.post("/create-payment-intent", async (req, res) => {
      const { price } = req.body;
      const amount = Number(price * 100);

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"],
      });
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    });
    //store payment details in database
    app.post("/payment", async (req, res) => {
      const payment = req.body;
      const result = await PaymentCollection.insertOne(payment);
      res.send(result);
    });
    //get Payment data by email address
    app.get("/payment/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await PaymentCollection.find(query).toArray();
      res.send(result);
    });
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Assignment-12 server is running !!!!!");
});

app.listen(port, () => {
  console.log(`ema john server is running on port: ${port}`);
});
