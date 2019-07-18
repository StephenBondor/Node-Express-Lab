// import your node modules

const db = require('./data/db.js');

// add your server code starting here

// implement your API here
const express = require('express');

var cors = require('cors')

const server = express();

server.use(cors({}));
server.use(express.json());

server.get('/api/posts', (req, res) => {
	db.find()
		.then(posts => {
			res.status(200).json(posts);
		})
		.catch(err => {
			res.json({
				error: 'The posts information could not be retrieved.',
				err: err
			});
		});
});

server.get('/api/posts/:postid', (req, res) => {
	const id = req.params.postid;

	db.findById(id)
		.then(post => {
			if (post.length != 0) {
				res.status(200).json(post);
			} else {
				res.status(404).json({
					message: 'The post with the specified ID does not exist.'
				});
			}
		})
		.catch(err =>
			res.status(500).json({
				error: 'The post information could not be retrieved.',
				err: err
			})
		);
});

server.post('/api/posts', (req, res) => {
	const postInfo = req.body;

	if (!postInfo.title || !postInfo.contents) {
		res.status(400).json({
			errorMessage: 'Please provide title and contents for the post.'
		});
	}

	db.insert(postInfo)
		.then(result => {
			db.findById(result.id)
				.then(post => {
					res.status(201).json(post);
				})
				.catch(err =>
					res
						.status(500)
						.json({message: 'the Post Failed', error: err})
				);
		})
		.catch(err =>
			res.status(500).json({message: 'the Post Failed', error: err})
		);
});

server.delete('/api/posts/:id', (req, res) => {
	const {id} = req.params;
	db.findById(id)
		.then(post => {
			if (post.length != 0) {
				db.remove(id).then(count => {
					res.status(200).json(post);
				});
			} else {
				res.status(404).json({
					message: 'The post with the specific ID does not exist'
				});
			}
		})
		.catch(err => res.status(500).json(err));
});

server.put('/api/posts/:id', (req, res) => {
	const id = req.params.id;
	const changes = req.body;

	if (!changes.title || !changes.contents) {
		res.status(400).json({
			errorMessage: 'Please provide title and contents for the post.'
		});
	}

	db.findById(id)
		.then(post => {
			if (post.length != 0) {
				db.update(id, changes)
					.then(count => {
						res.status(200).json(count);
					})
					.catch(err => res.status(500).json(err));
			} else {
				res.status(404).json({
					message: 'The post with the specific ID does not exist'
				});
			}
		})
		.catch(err => res.status(500).json(err));
});

server.listen(5000, () => console.log('server running'));
