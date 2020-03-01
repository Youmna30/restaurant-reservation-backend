var express = require('express');
var router = express.Router();
import tableController from "../controllers/table"

router.get('/', tableController.findAll );
router.get('/currentAvailable', tableController.currentAvailableTables );
router.post('/', tableController.validateBody() ,tableController.create );
router.delete('/:id', tableController.delete)
router.put('/:id', tableController.freeTable)
module.exports = router;
