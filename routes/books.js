var express = require('express');
var router = express.Router();
var https = require('https');
const cheerio = require('cheerio');

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
			const $ = cheerio.load(body)
			const src = $('.images_table td a img').attr('src');
        	res.send('<img src="' + src + '"/>');
        });
    });
});

function image(query) {
	return new Promise((resolve) => {
		https.get('https://www.google.com/search?q=' + query + '&tbm=isch', (response) => {
	        // Continuously update stream with data
	        var body = '';
	        response.on('data', function(d) {
	            body += d;
	        });
	        response.on('end', function() {
				const $ = cheerio.load(body)
				const src = $('.images_table td a img').attr('src');
				resolve(src);
	        });
	    });
	});
}

function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function replace(text, scopes) {
	for (var i = 0; i < scopes.length; i++) {
		const scope = scopes[i];

		for (var variable in scope) {
			text = text.replace(new RegExp('\\$' + variable, 'g'), scope[variable]);
		}
	}

	return text;
}

function pick(variables) {
	const scope = {};

	for (var variable in variables) {
		const options = variables[variable];
		scope[variable] = options[random(0, options.length)];
	}

	return scope;
}

function generate(book) {
	const bookScope = pick(book.variables);
	const promises = [];

	const result = {
		title: replace(book.title, [bookScope]),
		pages: [],
	};

	book.pages.forEach(page=>{
		const pageScope  = pick(page.variables);
		const query = replace(page.imageQuery, [pageScope, bookScope]);

		let generatedPage = {
			text: replace(page.text, [pageScope, bookScope]),
			query: query
		};

		promises.push(image(query).then(source => {
			generatedPage.src = source;
		}));

		result.pages.push(generatedPage);
	});

	return Promise.all(promises).then(() => result);
}

router.get('/generate', (req, res) => {
	generate(mybook).then(generated=>{
		//res.send(generated);
  		res.render('books', generated);
	});
});


const mypage = {
	text: "$name likes $color. The $object is $color.",
	imageQuery: "$color $object",
	variables: {
		color: ["red", "orange", "yellow", "green", "blue", "purple", "brown", "black", "white"],
		object: ["car", "train", "boat", "bowl", "ball", "dress", "shirt", "chair"]
	}
}

const mybook = {
	title: "$name Loves Colors",
	pages: [mypage, mypage, mypage],
	variables: {
		name: ["James", "John", "Robert", "Michael", "William",
				"Mary", "Patricia", "Jennifer", "Elizabeth", "Linda"]
	}
}


module.exports = router;
