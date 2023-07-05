const router = require('express').Router();
const { PageController } = require('../../controllers');

const isAuthenticated = require('../../middleware/isAuthenticated');

// Static pages
router.get('/', (req, res) => {
  const currentUser = req.session.currentUser;
  res.render('homepage', { currentUser });
});
router.get('/register', (req, res) => res.render('register'));
router.get('/login', (req, res) => res.render('login'));
router.get('/aboutus', (req, res) => res.render('aboutus'));

// Pages with data
router.get('/feed', isAuthenticated, (req, res) => {
  const currentUser = req.session.currentUser;
  PageController.getFeed(req, res, currentUser);
});

router.get('/dashboard', isAuthenticated, (req, res) => {
  const currentUser = req.session.currentUser;
  PageController.getDashboard(req, res, currentUser);
});

router.get('/profile', isAuthenticated, (req, res) => {
  const currentUser = req.session.currentUser;
  PageController.getProfile(req, res, currentUser);
});

module.exports = router;
