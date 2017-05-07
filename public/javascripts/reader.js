const STATES = {
	SELECTION: 'selection',
	STORY: 'story',
	FEEDBACK: 'feedback',
}

// book selection

// story

// feedback

// -> refresh

let state = STATES.SELECTION;

// selection
let stories = [];

// story
let story = {};
let page = 0;

// feedback

$(() => {

	const selectionPage = $('#selection');
	const storyPage = $('#story');
	const feedbackPage = $('#feedback');

	// get two stores
	var getBooks = () => {
		const promises = [];
		stories = [];
		for (var i = 0; i < 2; i++) {
			promises.push(new Promise(resolve => {
				$.get('/books/generate', book => {
					stories.push(book);
					resolve();
				});
			}));
		}
		return Promise.all(promises).then(() => {
			$('#story0 h1').text(stories[0].title);
			$('#story1 h1').text(stories[1].title);
		});
	}
	
	getBooks().then(() => {
		selectionPage.css('display', 'block');
	});


	var selectBook = book => {
		story = book;
		page = 0;
		selectionPage.css('display', 'none');
		storyPage.css('display', 'block');

		$('#pageImage').attr('src', story.pages[page].src);
		$('#pageText').text(story.pages[page].text);
	}

	$('#story0').click(() => selectBook(stories[0]));
	$('#story1').click(() => selectBook(stories[1]));

	$('#story').click(() => {
		page = page + 1;
		if (page < story.pages.length) {
			$('#pageImage').attr('src', story.pages[page].src);
			$('#pageText').text(story.pages[page].text);
		} else {
			page = 0;
			storyPage.css('display', 'none');
			feedbackPage.css('display', 'block');
		}
	});

	$('#feedback #feedback-option').click(() => {
		getBooks().then(() => {
			feedbackPage.css('display', 'none');
			selectionPage.css('display', 'block');
		});
	});

});
