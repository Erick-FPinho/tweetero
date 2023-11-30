import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const users = []
const tweets = []
const usersAvatarTable = {}

app.post("/sign-up",(req,res)=>{
    users.push(req.body)
    if(usersAvatarTable[req.body.username]===undefined){
        usersAvatarTable[req.body.username]=req.body.avatar
    }
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

app.get("/tweets",(req,res)=>{
    let tweetWithAvatarList = []
    

    for(let i=0;i<tweets.length;i++){
        let newTweetWithAvatar ={
            username: tweets[i].username,
            avatar: usersAvatarTable[tweets[i].username],
            tweet: tweets[i].tweet
        }

        tweetWithAvatarList.push(newTweetWithAvatar)
    }

    // for (let i = 0; i < tweets.length; i++) {
    //     for (let j = 0; j < users.length; j++) {
    //         if (tweets[i].username === users[j].username) {
    //             let newTweetWithAvatar = {
    //                 username: tweets[i].username,
    //                 avatar: users[j].avatar,
    //                 tweet: tweets[i].tweet
    //             }

    //             tweetWithAvatarList.push(newTweetWithAvatar)
    //         }
    //     }
    // }


    let lastTweetsList = []
    if(tweetWithAvatarList.length<=10){
        lastTweetsList = tweetWithAvatarList
    } else{
        lastTweetsList = tweetWithAvatarList.slice(-10)
    }

    res.send(lastTweetsList)
})


const PORT = 5000
app.listen(PORT,()=>console.log(`Servidor rodando na porta ${PORT}`))