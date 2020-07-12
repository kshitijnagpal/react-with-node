import express from "express";
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";
import path from "path";

//fake database
let articlesInfo = {
  "learn-react": {
    upvotes: 0,
    comments: [{ username: "Kshitij", text: "React is awesome" }],
  },
  "learn-node": {
    upvotes: 0,
    comments: [{ username: "Kshitij", text: "React is awesome" }],
  },
  "my-thoughts-on-resumes": {
    upvotes: 0,
    comments: [{ username: "Kshitij", text: "React is awesome" }],
  },
};

const app = express();

app.use(express.static(path.join(__dirname, "/build")));
app.use(bodyParser.json());

app.get("/hello", (req, res) => {
  res.send("Hello from Backend");
});

app.get("/api/articles/:name", async (req, res) => {
  const articleName = req.params.name;
  res.status(200).send(articlesInfo[articleName]);
});

app.post("/api/articles/:name/upvote", async (req, res) => {
  const articleName = req.params.name;
  articlesInfo[articleName].upvotes += 1;

  res.status(200).send(articlesInfo[articleName]);
});

app.post("/api/articles/:name/add-comment", (req, res) => {
  const { username, text } = req.body;
  const articleName = req.params.name;

  articlesInfo[articleName].comments.push({
    username: username,
    text: text,
  });

  res.status(200).send(articlesInfo[articleName]);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

app.listen(8000, () => console.log("Listening on port 8000"));
