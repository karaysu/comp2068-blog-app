const User = require('../models/user');
const viewPath = 'users';

exports.new = async (req, res) => {
	res.render(`${viewPath}/new`, {
		pageTitle: 'New User',
	});
};

	exports.create = async (req, res) => {
		console.log("Here")
		try {
			let user = new User(req.body);
			user = await User.register(user, req.body.password);
			res.status(200).json({message: 'User was registered successfully.'});
		} catch (error) {
			console.error(error);
			res.status(400).json({message: 'There was an issue while registering the user.', error});
		}
};
