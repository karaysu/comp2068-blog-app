const viewPath = 'blogs';
const Blog = require('../models/blog');
const User = require('../models/user');


exports.index = async (req, res) => {
	try {
		const blogs = await Blog
			.find()
			.populate('user')
			.sort({ updatedAt: 'desc' });

			res.status(200).json(blogs);

		// res.render(`${viewPath}/index`, {
		// 	pageTitle: 'Archive',
		// 	blogs: blogs,
		// });
	} catch (error) {
		res.status(400).json({message: 'There was an error fetching the blogs', error});
		// req.flash('danger', `There was an error displaying the archive. ${error}`);
		// res.redirect('/');
	}
};

exports.show = async (req, res) => {
	try {
		const blog = await Blog.findById(req.params.id)
		.populate('user');
		res.status(200).json(blog);
		// res.render(`${viewPath}/show`, {
		// 	pageTitle: blog.title,
		// 	blog: blog,
		// });
	} catch (error) {
		res.status(400).json({message: "There was an error fetching the blog."});
		// req.flash('danger', `There was an error displaying the archive. ${error}`);
		// res.redirect('/');
	}
};

exports.new = (req, res) => {
	res.render(`${viewPath}/new`, {
		pageTitle: 'New Blog',
	});
};

exports.create = async (req, res) => {
	try {
		const { user: email } = req.session.passport;
		const user = await User.findOne({ email: email });
		const blog = await Blog.create({ user: user._id, ...req.body });

		// req.flash('success', 'Blog created successfully');
		// res.redirect(`/blogs/${blog.id}`);
		res.status(200).json(blog);
	} catch (error) {
		res.status(400).json({message: "There was an error creating the blog post", error});
		// req.flash('danger', `There was an error creating this blog: ${error}`);
		// req.session.formData = req.body;
		// res.redirect('/blogs/new');
	}
};

exports.edit = async (req, res) => {
	try {
		const blog = await Blog.findById(req.params.id);
		res.render(`${viewPath}/edit`, {
			pageTitle: blog.title,
			formData: blog,
		});
	} catch (error) {
		req.flash('danger', `There was an error accessing this blog: ${error}`);
		res.redirect('/');
	}
};

exports.update = async (req, res) => {
	try {
		const { user: email } = req.session.passport;
		const user = await User.findOne({ email: email });

		let blog = await Blog.findById(req.body.id);
		if (!blog) throw new Error('Blog could not be found!');

		const attributes = {user: user._id, ...req.body}
		await Blog.validate(attributes);
		await Blog.findByIdAndUpdate(attributes.id, attributes);

		// if (!blog.save()) throw new Error('Could not save the blog');
		req.flash('success', 'The blog was updated successfully');
		res.redirect(`/blogs/${req.body.id}`);
	} catch (error) {
		req.flash('danger', `There was an error updating this blog: ${error}`);
		res.redirect(`/blogs/${req.body.id}/edit`);
	}
};

exports.delete = async (req, res) => {
	try {
		await Blog.deleteOne({ _id: req.body.id });
		res.status(200).json({message: "Successully deleted blog."});
		// req.flash('success', 'The blog was deleted successfully');
		// res.redirect(`/blogs`);
	} catch (error) {
		res.status(400).json({message: "There was an error deleting the blog."});
		// req.flash('danger', `There was an error deleting this blog: ${error}`);
		// res.redirect(`/blogs`);
	}
};
