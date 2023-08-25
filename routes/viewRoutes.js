const express = require('express');
const router = express.Router();
const viewsController = require('./../controllers/viewController')

router.get('/', viewsController.getOverview);


module.exports = router;