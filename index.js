var express = require('express');
var router = express.Router();

import tableRoutes from './routes/table'
import reservationRoutes from './routes/reservation'

// handle all routes 

router.use('/table',tableRoutes)
router.use('/reservation',reservationRoutes)

export default router;
