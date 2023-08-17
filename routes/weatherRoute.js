const express = require('express')
const router = express.Router();
const getCities = require('../controller/controller');


router.post('/',getCities);

module.exports = router;