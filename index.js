// import your node modules

const db = require('./data/db.js');

// add your server code starting here

// implement your API here
const express = require('express');

var cors = require('cors')

const server = express();

server.use(cors());

server.get('/', (req, res) => {
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
			res
				.status(500)
				.json({
					error: 'The post information could not be retrieved.',
					err: err
				})
		);
});

server.listen(5000, () => console.log('server running'));
