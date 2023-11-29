import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const users = []
const tweets = []

app.post("/sign-up",(req,res)=>{
    users.push(req.body)
    res.send("OK")
})

app.post("/tweets",(req,res)=>{
    const posterUsername = req.body.username

    let isUser = false
    for(let i=0;i<users.length;i++){
        if(users[i].username===posterUsername){
            isUser = true
        }
    }

    if(!isUser){
        res.send("UNAUTHORIZED")
    } else{
        tweets.push(req.body)
        res.send("OK")
    }
})


const PORT = 5000
app.listen(PORT,()=>console.log(`Servidor rodando na porta ${PORT}`))