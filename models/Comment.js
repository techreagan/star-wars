const db = require('../config/db')

module.exports = class Comment {
	constructor(id, text, movie_id, ip_address) {
		this.id = id
		this.text = text
		this.movie_id = movie_id
		this.ip_address = ip_address
	}

	save() {
		if (this.id) {
			return db.execute(
				'UPDATE comments SET text = ?, movie_id = ?, ip_address = ? updated_at = UTC_TIMESTAMP(), WHERE id = ?',
				[this.text, this.movie_id, this.ip_address, this.id]
			)
		} else {
			return db.execute(
				'INSERT INTO comments(text, movie_id, ip_address, created_at, updated_at) VALUES(?, ?, ?, UTC_TIMESTAMP(), UTC_TIMESTAMP())',
				[this.text, this.movie_id, this.ip_address]
			)
		}
	}

	static fetchAll() {
		return db.execute('SELECT * FROM comments ORDER BY created_at DESC')
	}

	static counts() {
		return db.execute('SELECT COUNT(*) AS total FROM comments')
	}

	static countsByMovies(movie_id) {
		return db.execute(
			'SELECT COUNT(*) AS total FROM comments WHERE movie_id = ?',
			[movie_id]
		)
	}

	static findById(id) {
		return db.execute('SELECT * FROM comments WHERE id = ?', [id])
	}

	static deleteById(id) {
		return db.execute('DELETE FROM comments WHERE id = ? LIMIT 1', [id])
	}
}
