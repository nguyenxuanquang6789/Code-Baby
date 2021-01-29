// const { rejects } = require("assert");
// const { resolve } = require("path");

const express = require("express");
const mongoose = require("mongoose");

const app = express();

const connectionString = "mongodb+srv://Pom:hello@cluster0.p2myy.mongodb.net/todolist?retryWrites=true&w=majority"

let jobSchema;
let Job;

/**
 * @returns {Promise<mongoose.Connection}
 */

function connectToDB() {
    return new Promise((resolve, reject) => {
        mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const db = mongoose.connection;

        db.on("error", (err) => {
            reject(err);
        });

        db.once("open", () => {
            console.log("Connect success bruhh bruhh");
            resolve(db);
        });
    });
}

app.get("/jobs", async(req, res) => {
    let result = await Job.find({});
    res.send({
        jobs: result,
    });
});

async function main() {
    try {
        let db = await connectToDB();
        app.listen((6789), () => {
            console.log("Server is running bruhh bruhh");
        });

        jobSchema = new mongoose.Schema({
            name: String,
            content: String,
            createdDate: Number,
            deadline: Number,
            status: String,
        });

        const Job = mongoose.model("Job", jobSchema);
        Job.find()
        const job1 = new Job({
            name: "Code Baby",
            content: "Luyện skills",
            createdDate: Date.now(),
            deadline: Date.now() + 1000 * 60 * 60,
            status: "Now",
        });

        let result = await Job.findOne({
            name: "Code Baby",
        });

        console.log(result);

        await job1.save();
    } catch (err) {
        console.error(err);
    }
}

main();