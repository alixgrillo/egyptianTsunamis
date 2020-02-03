# HopeLine
Interested in getting more information about your favorite charities. Create a profile and access detailed information about the location, mission, and expenses of a charity using our HopeLine application. 

Access this site at: https://egyptian-tsunamis.herokuapp.com/.

## Table of Contents
* [About](#about)
* [Functionality](#functionality)
* [Technical Features](#technical-features)
* [Requirements](#requirements)
* [Build Tools](#build-tools)
* [Acknowledgements](#acknowledgements)
* [License](#license)

## About
This is a full stack deployed website that allows the user login via oAuth through their Google account. The user can choose their favorite charities by category and get recommendations on new ones. If the user wants to save a new charity, they can have it on their account for easy viewing later.

## Functionality
The user will start on the landing page. 

<img src="/assets/images/login.gif">

They can view some intial charities without a category filter By logging in, the user will be able to save categories and charities to their profile.

<img src="/assets/images/category.gif">

If a user wants to filter on a category, they can click on one to get the highest rated charities in that category.

<img src="/assets/images/charity.gif">

By clicking on more information for any charity, it will display a charity-specific page that gives more detail about the charity, including the mission, expenses, revenue, and location.

<img src="/assets/images/profile.gif">

The user can save a category and a charity and it will display on their profile page for their immediate use.

## Technical Features
* This application uses a Model-View-Controller (MVC) model with Handlebars connected to a MySQL database to determine what will render on the browser for the user.
* This application leverages Sequelize ORM to manage the data structure.
* This application uses the Express package to control all server applications.
* Content is sent to Handlebars.js that controls the HTML content.

## Requirements
If you are running from the deployed Heroku site, then there are no requirements to use. You can access directly at https://egyptian-tsunamis.herokuapp.com/.

If you would like to fork this application and run directly, then you will need to run:
`npm install`
in the local folder.

In order to run, you will need to prime your database:
   * Step One: Open MySQL Workbench. You will want to be sure you are connected to a root database using port 3306. If the port is different, then the code in `config.js` will need to be altered.

   * Step Two: Run `npm run-script devscripts`. This will seed the categories file so that the buttons will appear on the page. 

   * Step Three: You will need a Charity Navigator APP_ID and APP_KEY. This can be obtained at https://www.charitynavigator.org/index.cfm?bay=content.view&cpid=1397.
   
   * Step Four: Create a file named `.env`, add the following to it, replacing the comment with your `root` password to MySQL (no quotes):

```js
# SQL Password

password = //enter password here - no quotes are needed

 # Charity Navigator API keys

APP_ID= // enter your Charity Navigator app_id
APP_KEY= // enter your Charty Navigator app_key

```

Then run `npm run-script build` in the command line. If successful, the console will confirm the PORT that it is running. You will need to visit `http://localhost:3000` to test the functionality.

## Build Tools
* Node.js v10.16.3
* Node packages:
  * express v4.17.0 (https://www.npmjs.com/package/express)
  * dotenv v8.0.0 (https://www.npmjs.com/package/dotenv)
  * express-handlebars v3.1.0 (https://www.npmjs.com/package/handlebars)
  * handlebars-intl v1.1.2 (https://www.npmjs.com/package/handlebars-intl)
  * msql2 v1.7.0 (https://www.npmjs.com/package/mysql)
  * axios v0.19.2 (https://www.npmjs.com/package/axios)
  * chart.js v2.9.3 (https://www.npmjs.com/package/chart.js)
  * cookie-session v1.4.0 (https://www.npmjs.com/package/cookie-session)
  * ejs v3.0.1 (https://www.npmjs.com/package/ejs)
  * mongoose v5.8.10 (https://www.npmjs.com/package/mongoose)
  * passport v0.4.1 (https://www.npmjs.com/package/passport)
  * passport-google-oauth20 v2.0.0 (https://www.npmjs.com/package/passport-google-oauth20)
  * sequelize v5.8.6 (https://www.npmjs.com/package/sequelize)
* Dev Dependencies
  * chai v4.2.0
  * chai-http v4.3.0
  * cross-env v5.2.0
  * eslint v5.16.0
  * eslint-config-prettier v4.3.0
  * eslint-plugin-prettier 3.1.0
  * handlebars v4.5.0
  * mocha v6.2.2
  * mysql2 v1.7.0
  * prettier v1.17.1
* JQuery 
* Bootstrap 4.4.1
* Font Awesome
* Deployed on Heroku

## Acknowledgements
* Thanks to all of the authors of Node.js packages - they are invaluable.

## License
* Licensed under the [MIT License](./LICENSE).