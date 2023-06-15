
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// // var indexRouter = require('./routes/index');
// // var usersRouter = require('./routes/users');
// const cookieSession = require('cookie-session')

// require('dotenv').config()
// const {ENVIROMENT, PORT} = process.env;
// const express = require('express');
// const morgan = require('morgan');
// const bodyParser = require('body-parser');

// const cors = require('cors');
// //const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');

// const app = express();

// // app.use('/', indexRouter);
// // app.use('/users', usersRouter);

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use(morgan(ENVIROMENT));
// app.use(bodyParser.json());
// app.use(cors());


// app.use(cookieSession({
//   name: 'session',
//   keys: ["password"],

//   // Cookie Options
//   maxAge: 24 * 60 * 60 * 1000 // 24 hours
// }))


// const { Pool } = require('pg');

// // app.use(cors(
// //   {
// //     "origin": "*",
// //     "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
// //     "preflightContinue": false,
// //     "optionsSuccessStatus": 204
// //   })
// // );

// 	// {
// 	// 	origin: ["http://localhost:3002"], // correct address ????????????????s
// 	// 	methods: ["POST, GET"],
// 	// 	credentials: true
// 	// }

// // PostgreSQL configuration
// const pool = new Pool({
// 	host: "localhost",
// 	user: "development",
// 	password: "development",
// 	database: "sitter",
//   post: 5432
// })

// // change sql for psql ??????????????????????????
// // app.post('/login', (req, res) => {
// // 	const sql = "SELECT * FROM login WHERE email = ? AND password = ?";
// // 	db.query(sql, [req.body.email, req.body.password], (err, data) => {
// // 		if(err) return res.json({Message: "Server side error"});
// // 		if(data.length > 0) {
// // 			const name = data[0].name;
// // 			const taken = jwt.sign({name}, "our-jesonwebtoken-secret-key", {expiresIn: 'Id'});
// // 			res.cookie('token', token);
// //      return this.resource.json({Status: "Logged in successfuly"})
// // 		} else {
// // 			return res.json({Message: "No user profile existed"});
// // 		}
// // 	})
// // })


// app.get ("/api/users/me", (req, res) => {

//   if (!req.session.userId){
//     return res.status(401).end("Need to be login")
//   }
//     pool.query("SELECT * FROM users WHERE id = $1", [req.session.userId]).then((results) => {
//       res.status(200)
//       .json({user: results.rows[0]});

//     }) 
//     .catch((error) => {
//       console.log("error", error)
//       res.status(500).json({error})
//   });
// });



// // Sign up endpoint
// app.post('/register', async (req, res) => {
//     const { first_name, last_name, email, password, password_confirm } = req.body;
//       console.log("req.body:", req.body);
//     // Check if email already exists
//     const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
//     if (userExists.rows.length > 0) {
//       return res.status(400).json({ error: 'Email already exists' });
//     }

// 		// // Check if password and password_confirmation match
// 		// if (password !== password_confirm) {
// 		// 	return res.status(400).json({ error: 'Password and password confirmation do not match' });
// 		// }

//     // Hash the password
//     // const saltRounds = 10;
//     // const hashedPassword = await bcrypt.hash(password, saltRounds);

//     // Insert new user into the database
//     const newUser = await pool.query('INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)',
//       [first_name, last_name, email, password]
//     );
//     return res.status(200).json({ message: 'Sign up successful' });

// });


// // Login endpoint
// app.post('/login', async (req, res) => {

//     const { email, password } = req.body;
//     const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
//     console.log("result:", result)
//     const user = result.rows[0];

//     // Check if the user exists
//     if (!user) {
//       return res.status(400).json({ error: 'Invalid email or password' });
//     }
//     // Compare passwords
//     const passwordMatch = password === user.password;
//     if (!passwordMatch) {
//       return res.status(400).json({ error: 'Invalid email or password' });
//     }
//     req.session.userId = user.id;
//     // const accessToken = generateAccessToken(email);
//     return res.json({ message: 'Login successful' });
// });

// // // Example endpoint that requires authorization
// // app.get('/user', authenticateToken, (req, res) => {
// //   res.json({ message: 'Protected endpoint accessed successfully' });
// // });

// // Middleware to authenticate the access token
// // function authenticateToken(req, res, next) {
// //   const authHeader = req.headers['Authorization'];
// //   const token = authHeader && authHeader.split(' ')[1];
// //   if (token == null) {
// //     return res.status(401).json({ error: 'Unauthorized' });
// //   }
//   // Verify and decode the access token
//   // jwt.verify(token, 'your-secret-key', (err, user) => {
//   //   if (err) {
//   //     return res.status(403).json({ error: 'Forbidden' });
//   //   }
//   //   req.user = user;
//   //   next();
//   // });
// // }


// // Function to generate an access token
// // function generateAccessToken(email) {
// //   return jwt.sign(email, 'your-secret-key', { expiresIn: '15m' });
// // }


// // app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

// module.exports = app;


