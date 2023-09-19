const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  database: {
    host: `mongodb://${process.env.DB}:27017/accounts`,
    database: "",
  },
  port: process.env.PORT || 3080,
	fileRoot: `media`
};
