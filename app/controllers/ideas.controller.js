const responses = require("../models/responses");
const ideasService = require("../services/ideas.service");
const apiPrefix = "/api/ideas";

module.exports = {
  readAll: readAll,
  readById: readById,
  create: create,
  update: update,
  delete: _delete
};

function readAll(req, res) {
  ideasService
    .readAll()
    .then(ideas => {
      const responseModel = new responses.ItemsResponse();
      responseModel.items = ideas;
      res.json(responseModel);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(new responses.ErrorResponse(err));
    });
}

function readById(req, res) {
  ideasService
    .readById(req.params.id)
    .then(idea => {
      const responseModel = new responses.ItemResponse();
      responseModel.item = idea;
      res.json(responseModel);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(new responses.ErrorResponse(err));
    });
}

function create(req, res) {
  ideasService
    .create(req.body)
    .then(id => {
      const responseModel = new responses.ItemResponse();
      responseModel.item = id;
      res
        .status(201)
        .location(`${apiPrefix}/${id}`)
        .json(responseModel);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(new responses.ErrorResponse(err));
    });
}

function update(req, res) {
  ideasService
    .update(req.params.id, req.body)
    .then(idea => {
      const responseModel = new responses.SuccessResponse();
      res.status(200).json(responseModel);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(new responses.ErrorResponse(err));
    });
}

function _delete(req, res) {
  ideasService
    .delete(req.params.id)
    .then(() => {
      const responseModel = new responses.SuccessResponse();
      res.status(200).json(responseModel);
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send(new responses.ErrorResponse(err));
    });
}
