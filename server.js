/* This is importing the express module, creating an express app, importing the mongo client, setting
the port to 2121, and importing the dotenv module. */
const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const PORT = 2121;
require("dotenv").config();

let db,
  dbConnectionStr = process.env.DB_STRING,
  dbName = "tools";
/* This is connecting to the database. */
MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }).then(
  (client) => {
    console.log(`Connected to ${dbName} Database`);
    db = client.db(dbName);
  }
);
/* This is setting the view engine to ejs, using the public folder, using the url encoded, and using
the json. */

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* This is getting the tools from the database and sorting them by name. */
app.get("/", (request, response) => {
  db.collection("tools")
    .find({})
    .collation({ locale: "en" })
    .sort({ name: 1 })
    .toArray()
    .then((data) => {
      response.render("index.ejs", { info: data });
    })
    .catch((error) => console.error(error));
});

/* This is adding a tool to the database. */
app.post("/addTool", (request, response) => {
  db.collection("tools").insertOne({
    toolName: request.body.toolName,
    bookNum: request.body.bookNum,
    sectionNum: request.body.sectionNum,
    pagesNum: request.body.pagesNum,
    toolComment: request.body.toolComment,
  });
});

/* This is updating a tool in the database. */
app.put("updateTool", (request, response) => {
  db.collection("tools")
    .updateOne(
      {
        toolName: request.body.toolName,
        bookNum: request.body.bookNum,
        sectionNum: request.body.sectionNum,
        pagesNum: request.body.pagesNum,
        toolComment: request.body.toolComment,
      },
      {
        $set: {
          toolName: request.body.toolNameS,
          bookNum: request.body.bookNumS,
          sectionNum: request.body.sectionNumS,
          pagesNum: request.body.pagesNumS,
          toolComment: request.body.toolCommentS,
        },
      },
      {
        sort: { _toolName: 1 },
        upsert: true,
      }
    )
    .then((result) => {
      console.log("Edited Tool");
      response.json("Edited Tool");
    })
    .catch((error) => console.error(error));
});

/* This is deleting a tool from the database. */
app.delete("/deleteTool", (request, response) => {
  db.collection("tools")
    .deleteOne({ toolName: request.body.toolName })
    .then((result) => {
      console.log("Tool Deleted");
      response.json("Tool Deleted");
    })
    .catch((error) => console.error(error));
});

/* This is listening to the port. */
app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
