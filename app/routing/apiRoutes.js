var path = require('path');

var friends = require('../data/friends.js');

module.exports = function(app) {
    
//gets list of friends from data folder
	app.get('/api/friends', function(req, res) {
		res.json(friends);
    });
//adds new friend data from html
    app.post('/api/friends', function(req, res) {
        var userInput = req.body;

        var userResponses = userInput.scores;

        var matchName = '';
		var matchImage = '';
        var totalDifference = 10000;
        
//looks through friend data for best match
        for (var i = 0; i < friends.length; i++) {

			
			var diff = 0;
			for (var j = 0; j < userResponses.length; j++) {
				diff += Math.abs(friends[i].scores[j] - userResponses[j]);
			}

			// If lowest difference, record the friend match
			if (diff < totalDifference) {
			

				totalDifference = diff;
				matchName = friends[i].name;
				matchImage = friends[i].photo;
			}
		}
//pushes new user info to data file
        friends.push(userInput);

		
		res.json({status: 'OK', matchName: matchName, matchImage: matchImage});
	});
};