/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },
  'get /users': 'Users/getUsers', // Dont return anything for this route
  'post /users/': 'Users/create',
  'post /users/login': 'Users/login',
  'post /users/locations': 'Users/locations',
  'get /api/v1/getnearby': 'Users/getNearby',
  'get /api/sendmail/': 'Users/sendMail',

  'POST /api/setlocation': 'Locations/setLocation',
  'POST /api/addparking': 'Locations/pushLocation',
  'PATCH /updateuser': 'Users/update',
  'POST /singleuser': 'Users/getSingleUser',



  'get /location/subscribe': 'Locations/subscribe',
  'get /message/subscribe': 'Messages/subscribe',

  'POST /api/message': 'Messages/addMessage',
  'POST /api/getmessages': 'Messages/getMessages',

  'POST /api/inbox': 'Messages/getReceivedMessages',
  'POST /api/sent': 'Messages/getSentMessages'




  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
