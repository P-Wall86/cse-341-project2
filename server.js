const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongodb = require("./data/database");
const passport = require("passport");
const session = require("express-session");
const GitHubStrategy = require("passport-github2").Strategy;

const port = process.env.PORT || 3000;
const app = express();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

app
	.use(bodyParser.json())
	.use(session ({
	secret: "secret",
resave: false,
saveUninitialized: true
}))

.use(passport.initialize())

.use(passport.session())

.use((req, res, next) => {
res.setHeader("Access-Controll-Allow-Origin", "*");
res.setHeader(
"Access-Control-Allow-Headers",
"Origin, X-Requested-with, Content-Type, Accept, 2-Key, Authorization"
);
res.setHeader(
"Access-Control-Allow-Methods", "POST, GET, PUT, PATCH, OPTIONS, DELETE"
);
next();
})
.use(cors({methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']}))
.use(cors({origin: '*'}))
 .use('/', require('./routes/index.js'));

passport.use(new GitHubStrategy({
clientID: process.env.GITHUB_CLIENT_ID,
clientSecret: process.env.GITHUB_CLIENT_SECRET,
callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done){
return done (null, profile);
}
));

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((obj, done) => {
    done(null, obj);
});

app.get('/', (req, res) => {res.send}(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out")});

app.get('/github/callback', passport.authenticate('github', {
failureRedirect: '/api-docs', session: false}),
(req, res) => {
req.session.user = req.user,
res.redirect ('/');
});


mongodb.initDb((err) => {
    console.log("Database initialized!");
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Server listening and running on port ${port}`);
        });
    }
});
