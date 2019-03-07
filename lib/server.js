'use strict';

const express = require('express');

const app = express();

const PORT = process.env.PORT || 8080;

let db = [];

// db constructor for POST and PUT?

app.use(express.json());

app.use( (req,res,next) => {
  console.log('LOG:', req.method, req.path);
  next();
});

app.get('/posts', (req,res,next) => {
  let count = db.length;
  let results = db;
  res.json({count,results});
});

app.get('/posts/:id', (req,res,next) => {
  let id = req.params.id;
  let record = db.filter((record) => record.id === parseInt(id));
  res.json(record[0]);
});


app.post('/posts', (req,res,next) => {
  // how do I apply the data for putting posts in here from the request?
  let {name,author,title,article} = req.body;
  let record = {name,author,title,article};
  record.id = db.length + 1;
  db.push(record);
  res.json(record);
});

app.put('/posts/:id', (req,res,next) => {
  // apply id, pull data from db for that id
  let id = req.params.id;
  let {name, author, title, article} = req.body;
  let updated = {name, author, title, article};
  db = db.map((record) => (record.id === parseInt(id)) ? updated : record);
  // let newerRecord = db.filter((record) => record.id === parseInt(id));

  // replace data within this node
  res.json(updated);
});

app.delete('/posts/:id', (req,res,next) => {
  // take id, delete node that matches this id
  let id = req.params.id;
  db = db.filter((record) => record.id !== parseInt(id));
  // use slice to remove part after id?
  res.json({});
});

module.exports = {
  server: app,
  start: port => {
    let PORT = port || process.env.PORT || 8080;
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  },
};

