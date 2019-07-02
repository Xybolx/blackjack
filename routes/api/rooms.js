const router = require("express").Router();
const roomsController = require("../../controllers/roomsController");

// Matches with "/api/rooms"
router
  .route("/")
  .get(roomsController.findAll)
  .post(roomsController.create);

// Matches with "/api/rooms/:id"
router
  .route("/:id")
  .get(roomsController.findOne)
  .put(roomsController.update)
  .delete(roomsController.remove);

module.exports = router;