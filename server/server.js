const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongoConnect = require('./db/connect');
const userRoutes = require('./routes/userRoutes');
const authRoutes=require('./routes/authroutes')

app.get('/test',(req,res)=>{
    res.status(200).send("test success")
});

app.use(express.static( "../client"));

mongoConnect();

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use(userRoutes);
app.use(authRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
});