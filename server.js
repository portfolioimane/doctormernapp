const express = require("express");
const mongoose = require("mongoose");
const doctors = require('./routes/api/doctors');
const authsDoctor = require('./routes/api/authDoctor');
const users = require('./routes/api/users');
const authsUser = require('./routes/api/authUser');
const profile = require('./routes/api/profile');
const appointment = require('./routes/api/appointment');
var cors = require('cors');
const path = require("path");

const app = express();
app.use(cors());

// DB config
//const db = require('./config/keys').mongoURI;

// connect to MongoDB;
mongoose
    .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

//Init Middleware 
app.use(express.json({ extended: false}));

app.get('/', (req, res) => res.send("Welcome Jeevan Joti Dash"));

if (process.env.NODE_ENV === 'production') {
    //*Set static folder up in production
    app.use(express.static('client/build'));

    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build','index.html')));
  }else {
  app.use(express.static(path.join(__dirname, "client")));
}


// Use Routes
app.use('/api/doctors', doctors);
app.use('/api/authDoctor', authsDoctor);
app.use('/api/users', users);
app.use('/api/authUser', authsUser);
app.use('/api/profile', profile);
app.use('/api/appointment', appointment);



const port = process.env.PORT || 5000;
app.listen(port , () => console.log(`Server running on port ${port}`));