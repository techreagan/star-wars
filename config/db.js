const { createPool } = require('mysql2')

const pool = createPool({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
})

pool.query(
	`CREATE TABLE IF NOT EXISTS comments (
  id INT(11) NOT NULL AUTO_INCREMENT,
  text TEXT,
  movie_id INT(11),
  ip_address varchar(255),
  created_at DATETIME,
  updated_at DATETIME,
  PRIMARY KEY (id)
)`,
	function (error, results, fields) {
		if (error) {
			console.log(`For some reasons we couldn't connect to the DB`.red, error)
			return
		}

		console.log(`MySQL DB Connected`.cyan.underline.bold)
	}
)

module.exports = pool.promise()
