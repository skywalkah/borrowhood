const router = require('express').Router();
const { PageController } = require('../../controllers');

const isAuthenticated = require('../../middleware/isAuthenticated');

// Static pages
router.get('/', (req, res) => res.render('homepage'));
router.get('/register', (req, res) => res.render('register'));
router.get('/login', (req, res) => res.render('login'));
router.get('/aboutus', (req, res) => res.render('aboutus'));

// Pages with data
router.get('/feed', isAuthenticated, PageController.getFeed);
router.get('/dashboard', isAuthenticated, PageController.getDashboard);

module.exports = router;
