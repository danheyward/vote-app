# slacktivism

In these uneasy times, the call to make your stand has intensified to levels that I
haven't seen in my lifetime. However, I've noticed that there is a large section of
the population that needs more coercing to make a difference. Currently the phenomenon known as slacktivism, or the easiest form of social involvement, has been looked upon as an undesirable quality.
But what if we could turn this low-level commitment into a stepping stone, a way to introduce
the hesitant many into the world of social justice? That's where slacktivism the app comes into play.

[Check it out!](http://slacktivism.herokuapp.com/)

In three simple steps, you can educate yourself on the issues our elected representatives are facing each day and can easily share your voice with them! I mean, they are working for us, right?

1. Sign up with your registered voting address.
2. Vote on the upcoming bills that are being debated in Congress.
3. CALL YOUR REP AND TELL THEM WHERE YOU STAND!

***

## the tech
* HTML5
* CSS3
* Materialize
* JavaScript
* jQuery
* Node.js
* Express
* SQL
* Sequelize
* Postgres
* BCrypt
* EJS

***

## the data

I used two AMAZINGLY AWESOME APIs for this app and would highly recommend them to anyone else looking to build a social activist tool.

* Google Civic Information API
* ProPublica Congress API

The Google Civic Information API gave me current senators and representatives based on the address I passed through from the user's profile. I could've kept going all the way to lower level state employees, but I wanted to stay focused on keeping the app simple and readable.

The ProPublica Congress API gave me a list of all the active bills on the senate and house floors. Pretty cut and dry, there. The API has a wealth of information I didn't use, but I'll cover that later...

## the plan

Initially, the app (affectionately called Bots & Prayers at the time) was meant as a tool to help users find the quickest and most affective way to the polls. Unfortunately the polling data I was able to funnel from the Google Civic Information API was not as compelling as I had hoped. Afterwards, I pivoted to an app to track your representatives voting records integrated with a quick-fire way to email them directly. Again, the API didn't quite have what I needed. Luckily a friend helped me refactor to the current app.

#### the users

1. A young student, emblazoned by the latest school shootings, has felt that she didn't have an easy outlet for her voice. She wants a convenient portal to stay on the pulse and share her perspective while she anxiously waits for her 18th birthday.
2. A middle aged professional, embarrassed that he has neglected his civic duties up until this point unlike his much more socially aware friends. He wants a quickly accessible guide to help educate himself on the issues present to his reps today.

***

## the wireframes

![wireframes1](https://raw.githubusercontent.com/danheyward/vote-app/master/public/img/wireframes1.jpeg)
![wireframes2](https://raw.githubusercontent.com/danheyward/vote-app/master/public/img/wireframes2.jpeg)

***

## the models

For this rollout of the application, I utilized 2 simple models that honed in on the two aspects that are most important: the user and their opinions.

#### users
| id | name   | email | password      | address | address2 | city   | state  | zipcode  | party  |
|----|--------|-------|---------------|---------|----------|--------|--------|----------|--------|
| 1  | STRING | EMAIL | BCRYPT STRING | STRING  | STRING   | STRING | STRING | STRING   | STRING |

#### ballots
| id | title   | url | vote      | sen1 | sen1phone | sen2   | sen2phone  | rep  | repphone | userid|
|----|--------|-------|---------------|---------|----------|--------|--------|----------|--------|--------|
| 1  | STRING | STRING | STRING | STRING  | STRING   | STRING | STRING | STRING   | STRING | STRING |

***

## the routes

|crud|route|function|
|---|---|---|
|GET|'/'|Renders the home page.|
|GET|'/signup'|Renders the signup page.|
|POST|'/signup'|Creates a new user or finds an existing user. If new user is created, password is encrypted and user model is created. The user is redirected to the profile page. Any error redirects to the signup page.|
|GET|'/login'|Renders the login page.|
|POST|'/login'|Logs in user and redirects to the profile. Any error redirects to the login page.|
|GET|'/logout'|Logs out user and redirects to the root.|
|GET|'/profile'|Calls both APIs and renders the profile page with the ballots database included.|
|POST|'/profile'|Creates a new ballot record when a vote is placed on a bill that hasn't been voted on yet. Redirects to the ballots page. Any error redirects to the profile page.|
|GET|'/profile/ballots'|Renders ballot page and includes the ballot models assigned to the logged in user.|
|PUT|'profile/ballots/:id/edit'|Changes a selected model from yes to no, or vice versa.|
|DELETE|'profile/ballots/:id'|Deletes model by id.|

***

## the site

![homepage](https://raw.githubusercontent.com/danheyward/vote-app/master/public/img/home.png)
***
![profile](https://raw.githubusercontent.com/danheyward/vote-app/master/public/img/profile.png)
***
![ballots](https://raw.githubusercontent.com/danheyward/vote-app/master/public/img/ballots.png)
***
![login](https://raw.githubusercontent.com/danheyward/vote-app/master/public/img/login.png)
***
![signup](https://raw.githubusercontent.com/danheyward/vote-app/master/public/img/signup.png)

***

## the future (03.05.18)

I'm proud of what I have right now but have lofty goals for its future. For this type of project, I'm definitely handcuffed to the data I can acquire, so I've sorted my goals into two categories: minor fixes and my wish list.

#### minor fixes
Due to the constraints of this project (had to finish in a week), I wasn't able to implement everything I had hoped. Here's a list of updates I plan on adding when I have some free time:

1. Using the Materialize modals for the signup and login routes as opposed to their own page.
2. Adding typed.js or some other flashier jumbotron animation on the home page.
3. Updating the color scheme (letting this marinate, I could just not like it because I've been staring at these colors for hours each day.)
4. Adding in logic on the profile page to remove any bill from the API call that has already been saved to the user's ballot. I'm thinking a few nested for loops + if statements, we'll see...
5. Removing ballots after a bill has been voted on + tracking said vote.
6. Show how other users are voting.


#### my wish list
There are some pretty amazing tools out there right now like [democracy.io](https://democracy.io/#!/) that I aspire this app to be one day. Here are a few directions I'd like to steer this project:

1. Using better semantic summaries of the bills instead of the descriptions from the API. Would need this from the API.
2. Improving the scripts section. Right now it is very simple but with integration from the first bullet, I could make it sound more conversational and less robotic.
3. Adding in the original scope that I started out with. Full representative information and exhaustive contact portal, a list of their voting records and dates for their upcoming elections. Information on how best to get to the polls during said elections.
4. Actively scaling up and deploying to the world.
