const { Router } = require('express');
const { home } = require('../controllers');

const router = Router();

// Redirect to home page
router.get('', home);

module.exports = router;