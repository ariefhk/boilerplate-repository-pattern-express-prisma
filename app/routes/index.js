const router = require('express').Router();

//sub-route
const user = require('./user-route');
const error = require('./error-route');

//versioning api
const prefix = '/api/v1';

//using route
router.use(`${prefix}`, user);
router.use(`${prefix}`, error);
router.use(error); //error when access without versioning

module.exports = router;
