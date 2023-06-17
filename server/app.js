// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// var app = express();

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// module.exports = app;

require('dotenv').config();
const { ENVIRONMENT, PORT, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { Pool } = require('pg');
const crypto = require('crypto');
const sessionSecret = crypto.randomBytes(32).toString('hex');

const app = express();

// Set up session middleware
app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Implement the authentication strategy
passport.use(
	new LocalStrategy(async (username, password, done) => {
	  try {
		
		const query = 'SELECT id, username, password FROM users WHERE username = $1';
		const values = [username];
		const result = await pool.query(query, values);
		if (result.rows.length === 0) {
		  return done(null, false, { message: 'Incorrect username' });
		}
  
		const user = result.rows[0];
		if (user.password !== password) {
		  return done(null, false, { message: 'Incorrect password' });
		}
  
		
		const authenticatedUser = {
		  id: user.id,
		  username: user.username,
		};
		return done(null, authenticatedUser);
	  } catch (error) {
		return done(error);
	  }
	})
  );
  

// Serialize user object into the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user object from the session
passport.deserializeUser(async (id, done) => {
	try {
	 
	  const query = 'SELECT id, username, email FROM users WHERE id = $1';
	  const values = [id];
	  const result = await pool.query(query, values);
	  if (result.rows.length === 0) {
		done(new Error('User not found'));
	  } else {
	
		const user = {
		  id: result.rows[0].id,
		  username: result.rows[0].username,
		  email: result.rows[0].email,
		};
		done(null, user);
	  }
	} catch (error) {
	  done(error);
	}
  });

app.use(morgan(ENVIRONMENT));
app.use(bodyParser.json());

// Database connection setup
const pool = new Pool({
  user: DB_USERNAME,
  password: DB_PASSWORD,
  host: 'localhost',
  database: DB_NAME,
  port: 5432,
});

// Create a new pet profile
app.post('/api/pets', async (req, res) => {
  try {
    const { photo, name, age, size, temperament, feedingInfo, activityNeeds, medicalConditions, notes } = req.body;
    const query =
      'INSERT INTO pets (photo, name, age, size, temperament, feeding_info, activity_needs, medical_conditions, notes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
    const values = [photo, name, age, size, temperament, feedingInfo, activityNeeds, medicalConditions, notes];
    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error creating pet profile:', error);
    res.status(500).json({ error: 'Error creating pet profile' });
  }
});

// Retrieve all pet profiles
app.get('/api/pets', async (req, res) => {
  try {
    const query = 'SELECT * FROM pets';
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Error retrieving pet profiles:', error);
    res.status(500).json({ error: 'Error retrieving pet profiles' });
  }
});

// Retrieve a specific pet profile by ID
app.get('/api/pets/:id', async (req, res) => {
  try {

    const { id } = req.params;
    const query = 'SELECT * FROM pets WHERE id = $1';
    const values = [id];
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Pet profile not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error('Error retrieving pet profile:', error);
    res.status(500).json({ error: 'Error retrieving pet profile' });
  }
});

// Update a specific pet profile by ID
app.put('/api/pets/:id', async (req, res) => {
  try {
	const { id } = req.params;
    const query = 'SELECT * FROM pets WHERE id = $1';
    const values = [id];
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Pet profile not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error('Error retrieving pet profile:', error);
    res.status(500).json({ error: 'Error retrieving pet profile' });
  }
});

// Update a specific pet profile by ID
app.put('/api/pets/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { photo, name, age, size, temperament, feedingInfo, activityNeeds, medicalConditions, notes } = req.body;
    const query =
      'UPDATE pets SET photo = $1, name = $2, age = $3, size = $4, temperament = $5, feeding_info = $6, activity_needs = $7, medical_conditions = $8, notes = $9 WHERE id = $10 RETURNING *';
    const values = [photo, name, age, size, temperament, feedingInfo, activityNeeds, medicalConditions, notes, id];
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Pet profile not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error('Error updating pet profile:', error);
    res.status(500).json({ error: 'Error updating pet profile' });
  }
});

// Delete a specific pet profile by ID
app.delete('/api/pets/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query = 'DELETE FROM pets WHERE id = $1 RETURNING *';
    const values = [id];
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Pet profile not found' });
    } else {
      res.json({ message: 'Pet profile deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting pet profile:', error);
    res.status(500).json({ error: 'Error deleting pet profile' });
  }
});

// Create a new sitter profile
app.post('/api/sitters', async (req, res) => {
  try {
    const { name, age, experience, availability } = req.body;
    const query = 'INSERT INTO sitters (name, age, experience, availability) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [name, age, experience, availability];
    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error creating sitter profile:', error);
    res.status(500).json({ error: 'Error creating sitter profile' });
  }
});

// Retrieve all sitter profiles
app.get('/api/sitters', async (req, res) => {
  try {
    const query = 'SELECT * FROM sitters';
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Error retrieving sitter profiles:', error);
    res.status(500
		).json({ error: 'Error retrieving sitter profiles' });
		}
		});
		
		// Retrieve a specific sitter profile by ID
		app.get('/api/sitters/:id', async (req, res) => {
		try {
		const { id } = req.params;
		const query = 'SELECT * FROM sitters WHERE id = $1';
		const values = [id];
		const result = await pool.query(query, values);
		if (result.rows.length === 0) {
		res.status(404).json({ error: 'Sitter profile not found' });
		} else {
		res.json(result.rows[0]);
		}
		} catch (error) {
		console.error('Error retrieving sitter profile:', error);
		res.status(500).json({ error: 'Error retrieving sitter profile' });
		}
		});
		
		// Update a specific sitter profile by ID
		app.put('/api/sitters/:id', async (req, res) => {
		try {
		const { id } = req.params;
		const { name, age, experience, availability } = req.body;
		const query =
		'UPDATE sitters SET name = $1, age = $2, experience = $3, availability = $4 WHERE id = $5 RETURNING *';
		const values = [name, age, experience, availability, id];
		const result = await pool.query(query, values);
		if (result.rows.length === 0) {
		res.status(404).json({ error: 'Sitter profile not found' });
		} else {
		res.json(result.rows[0]);
		}
		} catch (error) {
		console.error('Error updating sitter profile:', error);
		res.status(500).json({ error: 'Error updating sitter profile' });
		}
		});
		
		// Delete a specific sitter profile by ID
		app.delete('/api/sitters/:id', async (req, res) => {
		try {
		const { id } = req.params;
		const query = 'DELETE FROM sitters WHERE id = $1 RETURNING *';
		const values = [id];
		const result = await pool.query(query, values);
		if (result.rows.length === 0) {
		res.status(404).json({ error: 'Sitter profile not found' });
		} else {
		res.json({ message: 'Sitter profile deleted successfully' });
		}
		} catch (error) {
		console.error('Error deleting sitter profile:', error);
		res.status(500).json({ error: 'Error deleting sitter profile' });
		}
		});
		
		// Define a login route
		app.post('/api/login', passport.authenticate('local'), (req, res) => {
		res.json({ message: 'Login successful' });
		});
		
		// Define a logout route
		app.post('/api/logout', (req, res) => {
		req.logout();
		res.json({ message: 'Logout successful' });
		});
		
		// Protect API routes with authentication middleware
		const requireAuth = (req, res, next) => {
		if (req.isAuthenticated()) {
		return next();
		} else {
		res.status(401).json({ error: 'Unauthorized' });
		}
		};
		
		// Example of a protected route
		app.get('/api/profile', requireAuth, (req, res) => {
		res.json({ user: req.user });
		});
		
		app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));