import express from "express";
const app = express();
import { } from "dotenv/config"
import mongoose, { model } from "mongoose";
import { error } from "console";
import cors from "cors";
const { Schema } = mongoose;

app.use(cors());
app.use(express.json());

const userId = process.env.user;
const password = process.env.password;
const db = process.env.DB;

const url = `mongodb+srv://${userId}:${password}@cluster0.ubfo2jm.mongodb.net/${db}`;
await mongoose.connect(url).catch(error => handleError(error));
mongoose.connection.on('error', err => {
    logError(err);
})

const notesSchema = new Schema({
    title: String,
    content: String
})

const Notes = mongoose.model("atulNote", notesSchema);

// const newNote = new Notes({
//     title:"EEM703",
//     content:"Dha10"
// })
// newNote.save();

app.route("/notes")
    .get(async function(req, res) {
        const notes = await Notes.find({},{_id:0,__v:0})
        console.log(notes)
        res.json({notes:notes})

    })
    .post(async(req,res)=>{
        const title = req.body.title;
        const content = req.body.content;

        const newNote = new Notes({
            title:title,
            content:content
        })
        await newNote.save();

        const notes = await Notes.find({},{_id:0,__v:0})
        res.json({notes:notes})

    })

app.route("/delete-note")
    .post(async(req,res)=>{
        const title = req.body.title;
        const content = req.body.content;

        await Notes.deleteOne({title:title,content:content});

        const notes = await Notes.find({},{_id:0,__v:0})
        res.json({notes:notes})

    })









const port = process.env.PORT;
app.listen(port, () => {
    console.log("Server is listening on port ", port);
})