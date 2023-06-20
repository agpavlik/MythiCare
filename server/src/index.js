const express = require('express')
const app = express()
const path = require('path');
const { PORT, CLIENT_URL } = require('./constants')
const session = require('express-session');
const cookieParser = require('cookie-parser')
const passport = require('passport')
const cors = require('cors')
const logger = require('morgan');
const LocalStrategy = require('passport-local').Strategy;
const { Pool } = require('pg');
const crypto = require('crypto');
const sessionSecret = crypto.randomBytes(32).toString('hex');
const bodyParser = require('body-parser');
const { config } = require('dotenv')
config()
console.log("env port", process.env.PORT)


//import passport middleware
require('./middlewares/passport-middleware')

//initialize middlewares
app.use(logger('dev'));
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(cors({ origin: "http://localhost:3000", credentials: true }))
app.use(passport.initialize())
app.use(express.static(path.join(__dirname, 'public')));

//import routes
const authRoutes = require('./routes/auth')
const petRoutes = require('./routes/pets')
const sitterRoutes = require('./routes/sitters')
const ownersRoutes = require('./routes/owners')

//initialize routes
app.use('/api', authRoutes)
app.use('/pets', petRoutes)
app.use('/sitters', sitterRoutes)
app.use('/owners', ownersRoutes)

//---------------------- FROM SERVER JS --------------------------------------//

// Set up session middleware
app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
  })
  );
  // app.use(morgan(ENVIRONMENT));
  app.use(bodyParser.json());
  
  // Database connection setup
  // const pool = new Pool({
  //   user: DB_USERNAME,
  //   password: DB_PASSWORD,
  //   host: 'localhost',
  //   database: DB_NAME,
  //   port: 5432,
  // });


// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

// -----------------------------Implement the authentication strategy---------------------------------//
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

  //--------------------------------------------------------------------------------------------//

// app.get("/test", (req, res)=>{
// 	console.log("Testing routes ", req.params.id);
// });
		
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

		app.get('/', (req, res) => {
			res.json({user: 'user'})

		}

		)

//app start
const appStart = () => {
  try {
    app.listen(PORT, () => {
      console.log(`The app is running at http://localhost:${PORT}`)
			console.log("port:", PORT);
    })
  } catch (error) {
    console.log(`Error: ${error.message}`)
  }
}

appStart()