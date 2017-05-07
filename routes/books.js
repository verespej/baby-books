var express = require('express');
var router = express.Router();
var https = require('https');
var GoogleImages = require('google-images');
var images = new GoogleImages('018051917422273699753:dqt0kw1yw6i', 'AIzaSyBosPYM3IBCtFrzV2f-9LO6Wf2nOSsL3v8');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send({
  	title: "Hakon sees the world",
  	pages: [
  		{
  			text: "Once upon a time there was a little girl named Nev.",
  			image: "http://cdn2.momjunction.com/wp-content/uploads/2014/05/Popular-Baby-Boy-Names-With-Meanings.jpg"
  		},
  		{
  			text: "She went to a hackathon to change the world.",
  			image: "http://codingstuff.org/wp-content/uploads/2014/08/Hackathon_TLV_2013_-_48.jpg"
  		},
  		{
  			text: "She lived happily ever after.",
  			image: "http://therumpus.wpengine.netdna-cdn.com/wp-content/uploads/2016/11/HappilyEverAfter.jpg"
  		},
  	]
  });
});

router.get('/image', (req, res) => {
	const q = req.query.q;

	return https.get('https://www.google.com/search?q=' + q + '&tbm=isch', (response) => {
        // Continuously update stream with data
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {
        	res.send(body);
        });
    });
});

module.exports = router;
