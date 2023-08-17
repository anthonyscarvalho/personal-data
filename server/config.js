const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  database: {
    host: `mongodb://${process.env.db}:27017/accounts`,
    database: "",
  },
  port: process.env.PORT || 3080,
	fileRoot: `media`
};
