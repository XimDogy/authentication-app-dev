import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './Routes/userRoutes.js';

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

app.use(express.urlencoded({
    limit:"50mb",
    extended: true
}));

app.use(express.json({ limit: "50mb" }));
app.use(cors());


//Routes
app.use('/user', userRoutes);

app.get('/', (req, res) => {
    res.send("Authentication App API working fine");
});

mongoose.set('useFindAndModify', false);

//CONNECTION TO MONGODB AND PORT LISTEN
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then( () => {
    app.listen(port, (req, res) => {
        console.log(`Connected to mongodb successfully \nServer started on port: ${port} \nvisit: http://localhost:${port}/`);
    })
})
.catch(
    (error) => console.log(error)
);


