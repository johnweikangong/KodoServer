var fs = require("fs");
var user = require("./user.model"); // User database storage

// Add new user
module.exports.addUser = function (req, res) {
	var newUser = new user(req.body);
	console.log('Attempting to add user: ', req.body);
	newUser.save(function (err) {
		if (err) return res.json({
			"code": 40,
			"result": `Failed to add user. Error: ${err}`
		});
		res.json({
			"code": 0,
			"result": "Successfully added user."
		});
	});
};

// Update user
module.exports.updateUser = function (req, res) {
	console.log('Attempting to update user:', req.body);
	var userID = req.body.userID;
	var name = req.body.name;
	var age = req.body.age;
	var interests = req.body.interests;

	if (!userID || !name || !age || !interests) {
		return res.json({
			"code": 40,
			"result": "Failed to updateUserMessages. Check your parameters."
		});
	}
	var query = user.findOne({ userID });

	query.exec(function(err) {
		if(err) return handleError(err);

		user.findOneAndUpdate(
			{ userID },
			{ $set: {
					name,
					age,
					interests
				}
			},
			function (err) {
				if (err) return res.json(err);
				res.json({
					"code": 0,
					"result": "Successfully updated user"
				});
			}
		);
	})
};

// Update user chat bot messages
module.exports.updateUserChatBotMessages = function (req, res) {
	console.log('Attempting to update user:', req.body);
	var userID = req.body.userID;
	var message = req.body.message;
	var time = req.body.time;
	var token = req.body.token;

	if (!userID || !message || !time || !token) {
		return res.json({
			"code": 40,
			"result": "Failed to updateUserMessages. Check your parameters."
		});
	}
	var query = user.findOne({ userID: userID });

	query.exec(function(err) {
		if(err) return handleError(err);

		user.findOneAndUpdate(
			{ userID },
			{ $push: {
				chatBotMessages: {
					message,
					time,
					token
				}}
			},
			function (err) {
				if (err) return res.json(err);
				res.json({
					"code": 0,
					"result": "Successfully updated user"
				});
			}
		);
	})
};

// Retrieve user
module.exports.getUser = function (req, res) {
	console.log('Attempting to get user');
	user.find({}, { data: { $slice: -1 } }, function (err, user) {
		if (err) return res.json(err);

		res.jsonp({
			"code": 0,
			"result": user
		});
	});
};
