## MERN based desktop native application using electron
Minimal full-stack MERN app with authentication using passport and JWTs. Project includes react native based user authentication having backend server using Express with Mongo db.

![Electron](./electron.gif?raw=true "Electron App")

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Project Setup

In the project directory, you can run:

### `npm run dev`
Run the electron applicatio. for development run the below command.

sh`
    isDev ?
    'http://localhost:3000' // chaange the port based on your webpack dev server
    : `file://${path.join(__dirname, '../build/index.html')}`)
`

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Run server

#### Features

* Babel 7
* Environment Variables
* Express
* REST API
* MongoDB

#### Installation

* `cd server`
* `npm install`
* [start MongoDB](https://www.robinwieruch.de/mongodb-express-setup-tutorial/)
* `npm start`
* optional: include *.env* in your *.gitignore*

Added Express server running on the port `8080`. Which is integrated with Node-Js, Mango-DB and Express. 

Showing one to many relation ship 
Jokes ---> comments ----> referenceID 

`
{
    "_id": {
        "$oid": "5e7d04c1b2cfb3b712c32c13"
    },
    "comments": [],
    "create_date": {
        "$date": {
            "$numberLong": "1585251521880"
        }
    },
    "id": "Sn39Elb2LBd",
    "joke": "joke text",
    "status": "Unlike",
    "__v": {
        "$numberInt": "0"
    }
}
`

`{
    "_id": {
        "$oid": "5e7d0891b2cfb3b712c32c14"
    },
    ***"comments": [{
        "$oid": "5e7d0afc4303ced80e5035cb"
    }, {
        "$oid": "5e7d0b054303ced80e5035cd"
    }],***
    "create_date": {
        "$date": {
            "$numberLong": "1585252497685"
        }
    },
    "id": "XLRfNuPZDAd",
    "joke": "What is a tornado's favorite game to play? Twister!",
    "status": "Unlike",
    "__v": {
        "$numberInt": "2"
    }
}`
The `api` uri preceed all API endpoints and the following endpoints are currently available
* GET `/api/jokes`
* POST `/api/jokes`
* GET `/api/jokes/:joke_id`
* PUT `/api/jokes/:joke_id`
* DELETE `/api/contacts/:joke_id`
* POST `/api/delete`
* POST `/api/jokes/comments`
* POST `/api//jokes/addComment`
* POST `api/jokes/deleteComment`

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
