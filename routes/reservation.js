var express = require('express');
var router = express.Router();
import reservationController from "../controllers/reservation"

router.get('/', reservationController.findAll );
router.post('/', reservationController.validateBody(), reservationController.create)
module.exports = router;
