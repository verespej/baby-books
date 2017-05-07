var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('book-selection', {
    books: [
      {
        id: 1,
        image: '/images/gender-boy.jpg',
        title: 'Fun day!',
      },
      {
        id: 2,
        image: '/images/gender-girl.jpg',
        title: 'Visit the park',
      },
    ],
    title: 'Baby Books: Choose a story'
  });
});

module.exports = router;
