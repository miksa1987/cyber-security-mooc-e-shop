WORST E-SHOP EVER

This is an e-shop application base done for Helsinki University's Cyber Security MOOC course project. The app is totally coded in tongue-in-cheek style, is more insecure than you could ever, ever imagine, and in addition is coded badly, very badly, I know I could do better(That counts as security flaw in my mind even if it's not on OWASP list). Do not use this base app for anything other than demonstrating purposses. 

If you however wish to run this app, here are steps how:
1. Make sure you have NodeJS installed on your system and an active MongoDB Atlas account(https://www.mongodb.com/). Get a connection string for MongoDB(When you log in, press "CONNECT" => "Connect your application").
2. Clone this git repository
3. Run npm install inside the cloned directory
4. Create an .env file to project root, and put there MONGODB_URL=your-MongoDB-connection-string, and PORT=desired-port-number.
5. Run npm run dev to run in development mode, or npm build and npm start for production mode. It doesn't really matter which you pick, npm run dev is faster to get running.
6. Enjoy the horror!

THE FLAWS:

FLAW 1: Broken authorization.
Well, this is almost embarrassing, but it's all on purpose. You can log in to the app without password, or whatever password you can think of. All you need to know an existing username. The API does absolutely no password checking. (Did I go bit too far?)
How to fix this? Well, the API does save the user's password in bcrypt hashed format. So, the API should do a bcrypt.compare on the saved hash and the one entered in the password field. Also, the API does send an access token. But the app does nothing with it(this is related to flaw 2, too)! The token should be at least put to local storage, or even many times better, into a httpOnly cookie. More on this in flaw 4.

FLAW 2: Broken access control.
This too is pretty obvious. Regular users can add items to the store. The app does absolutely no checking if user has any admin priviledges, even the data models have no field for user roles or priviledges. All you need to know the path to the admin page, /admin. Also, the API does no checking on the user's identity.
If we'd fix this, we need to first add user roles. Like a "role" field to the data model and possible values could be "user" and "admin". And when a user goes to admin page, the frontend should send a confirmation request to the API with an access token, to see if the user is admin or not. If the user is not admin, they should be redirected to front page. Of course, the API should check the token on every request too when adding items, because otherwise you could easily send your own requests and do stuff.

FLAW 3: Injection.
If you know how to make your own requests to the API, you can make orders where you change item prices(and even names) to whatever you want, or add items if you wanted to do it this way. The API does no checking if the data is correct. Oh, and the API does absolutely no checking if the data comes even from an existing user.
How to fix it? Well, like last flaw, the access token should be checked on each and every request, and API should query the database that the user actually exists. Also, as now you can for example even define your own items with your own prices, the API should query the database on each item that the data(name and price, and quantity) is correct. That is the least that could be a quick fix. A better solution would be to add item id and quantity to the order array. Then the API could just fetch correct items from the database. A some kind of cache would be of use to speed up all the database queries.

FLAW 4: Security misconfiguration.
The app issues access tokens on login but where are they used? Nowhere! When you log in succesfully, the API responds with an access token based on username. However, the frontend does nothing with it.
To fix, first we should decide how we want to store the access token. Local storage, or a cookie? Cookie would be a bit more secure, a httpOnly cookie would be best. Whichever we choose, on login, access token should be saved to desired location. Of course, to be more secure, the API should give a refresh token too, and access token itself should be short lived. On set periods, frontend would request the API for a new access token with the refresh token.

FLAW 5: Insufficient logging. 
Or should I say what logging? The only things the app logs are that it's connected to MongoDB and that the server is running. Really, that's all there is. 
If there would be sufficient logging, the app should log every request done to the API. And especially it should log essential things that have FAILED. Like failed logins, for example, although without username or password details. It should just say like "failed login". API requests should be logged as well, each and every. From there you could find out if somebody was attacking this app. Of course, not EVERYTHING should be logged, just these essential things. For example database queries should not be logged, in my opinion.
