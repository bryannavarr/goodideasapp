const mongodb = require("../mongodb");
const conn = mongodb.connection;
const ObjectId = mongodb.ObjectId;
const ideas = require("../models/idea");

module.exports = {
  readAll: readAll,
  readById: readById,
  create: create,
  update: update,
  delete: _delete
};

function readAll() {
  return conn
    .db()
    .collection("greatIdeas")
    .find()
    .toArray()
    .then(ideas => {
      for (let i = 0; i < ideas.length; i++) {
        let idea = ideas[i];
        idea._id = idea._id.toString();
      }
      return ideas;
    });
}

function readById(id) {
  return conn
    .db()
    .collection("greatIdeas")
    .findOne({ _id:  new ObjectId(id) })
    .then(idea => {
      idea._id = idea._id.toString();
      return idea;
    });
}

function create(body) {
  return conn
    .db()
    .collection("greatIdeas")
    .insert(body)
    .then(data => 
      data.insertedIds[0].toString());
}

function update(id, doc) {
  doc._id = new ObjectId(doc._id);
  return conn
    .db()
    .collection("greatIdeas")
    .replaceOne({ _id: new  ObjectId(id) }, { $set: doc })
    .then(result => {
      Promise.resolve();
    });
}

function _delete(id) {
  return conn
    .db()
    .collection("greatIdeas")
    .deleteOne({ _id: new ObjectId(id) })
    .then(result => {
      Promise.resolve();
    });
}
