var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    ages: ['< 2', '2', '3', '4', '5+'],
    genders: [
      {
        image: '/images/gender-boy.jpg',
        text: 'Boy',
      },
      {
        image: '/images/gender-girl.jpg',
        text: 'Girl',
      },
      {
        image: '/images/gender-neutral.jpg',
        text: 'Neutral',
      },
    ],
    locations: [
      {
        image: '/images/location-city.jpg',
        text: 'City',
      },
      {
        image: '/images/location-farm.jpg',
        text: 'Farm',
      },
      {
        image: '/images/location-suburb.jpg',
        text: 'Suburb',
      },
    ],
    interests: [
      {
        image: '/images/interest-animals.jpg',
        text: 'Animals',
      },
      {
        image: '/images/interest-cars.jpg',
        text: 'Cars',
      },
      {
        image: '/images/interest-princesses.jpg',
        text: 'Princesses',
      },
      {
        image: '/images/interest-superheroes.jpg',
        text: 'Superheroes',
      },
    ],
    title: 'Baby Books: Create profile',
  });
});

module.exports = router;
