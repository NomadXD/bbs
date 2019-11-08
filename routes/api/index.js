/**
 *
 * Author:  AppSeed.us
 *
 * License: MIT - Copyright (c) AppSeed.us
 * @link https://github.com/app-generator/nodejs-starter
 *
 */

const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/donors',require('./donors'));

module.exports = router;
