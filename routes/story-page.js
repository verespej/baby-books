var express = require('express');
var router = express.Router();

router.get('/:bookId/:page', function(req, res, next) {
  // TODO: Get story data
  var pageNum = parseInt(req.params.page, 10);
  res.render('story-page', {
    image: '/images/gender-boy.jpg',
    nextLink: '/story-page/' + req.params.bookId + '/' + (pageNum + 1),
    page: pageNum,
    text: 'What a great morning...',
    title: 'Baby Books: Fun day!',
  });
});

module.exports = router;
