const router = require('express').Router();
const { PageController } = require('../../controllers');

const isAuthenticated = require('../../middleware/isAuthenticated');

// Static pages
router.get('/', (req, res) => {
  const currentUser = req.session.currentUser; // Get the logged-in user object
  res.render('homepage', { currentUser }); // Pass the currentUser object to the homepage template
});
router.get('/register', (req, res) => res.render('register'));
router.get('/login', (req, res) => res.render('login'));
router.get('/aboutus', (req, res) => res.render('aboutus'));
router.get('/contactus', (req, res) => res.render('contactus'));

// Pages with data
router.get('/feed', isAuthenticated, (req, res) => {
  const currentUser = req.session.currentUser; // Get the logged-in user object
  PageController.getFeed(req, res, currentUser); // Call the PageController's getFeed method passing the currentUser object
});
router.get('/dashboard', isAuthenticated, (req, res) => {
  const currentUser = req.session.currentUser; // Get the logged-in user object
  PageController.getDashboard(req, res, currentUser); // Call the PageController's getDashboard method passing the currentUser object
});

module.exports = router;
