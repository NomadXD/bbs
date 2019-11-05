/**
 *
 * Author:  AppSeed.us
 *
 * License: MIT - Copyright (c) AppSeed.us
 * @link https://github.com/app-generator/nodejs-starter
 *
 */

module.exports = {
	development: {
		username: 'root',
		password: 'Lahiru@97',
		database: 'testdb',
		host: 'localhost',
		dialect: 'mysql',
	},
	test: {
		dialect: 'sqlite',
		storage: ':memory:'
	},
	production: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: process.env.DB_HOSTNAME,
		dialect: 'mysql',
		use_env_variable: 'DATABASE_URL'
	}
};
