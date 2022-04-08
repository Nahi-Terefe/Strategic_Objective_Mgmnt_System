const express = require("express");
const session = require("express-session")
const PORT = process.env.PORT || 5003
const db = require("./models")
const cors = require("cors")
const expressLayouts = require('express-ejs-layouts');
const { route } = require("express/lib/application");
const { Router } = require("express");

// create express server app
const app = express();


app.use(cors());

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', require("./routes/index"));

// query route
const query = require("./routes/queries");
app.use('/api/query/', query);


// invoke sequelize
// {force: true}
db.sequelize.sync().then(() => {
   console.log("database connected!")
  });

// app listening to given port
app.listen(PORT, () => {
    console.log(`listening at: http://localhost:${PORT}`)
  });
