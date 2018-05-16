const responses = require("../models/responses");
const fileUploadService = require("../services/fileUpload.service");
const apiPrefix = "/api/fileupload";

module.exports = {
  sign: sign
};

function sign(req, res) {
  const filename = req.query.filename;
  const filetype = req.query.filetype;
  fileUploadService
    .signUrl(filename, filetype)
    .then(signedUrl => {
      const responseModel = new responses.ItemResponse();
      responseModel.item = signedUrl;
      res.json(responseModel);
      console.log(signedUrl);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(new responses.ErrorResponse(err));
    });
}
