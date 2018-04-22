var mongoose = require("mongoose");

var chatBotMessage = mongoose.Schema({
	message: {
		type: String
	},
	time: {
		type: String
	},
	token: {
		type: String
	}
}, { _id: false });

var userSchema = mongoose.Schema({
	userID: {
		type: String,
		required: true,
		unique: true
	},
	name: {
		type: String
	},
	age: {
		type: String
	},
	interests: {
			type: String
	},
	chatBotMessages: {
		type: [chatBotMessage],
		default: []
	}
});

module.exports = mongoose.model("user", userSchema);
