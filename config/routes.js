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
  //'post /matches': 'Matches/create',
  'get /users': 'Users/getUsers', // Dont return anything for this route
  'get /api/weights': 'Wrestlers/getWeights',
  'delete /matches': 'Matches/delete',
	'get /api/:teamid/wrestlers/': 'Users/getWrestlers',
	'get /api/:teamid/coaches/': 'Users/getCoaches',
  'get /api/:teamid/team/': 'Users/getTeam',
  'post /api/teams/create': 'Teams/createTeam',
  'post /users/': 'Users/create',
  'post /users/login': 'Users/login',
  'get /api/meets/:teamid': 'Meets/getTeamMeets', // Get Meets by teamid
  'post /api/wrestlers/': 'Wrestlers/createWrestler',
  'get /api/wrestlers/:teamid': 'Wrestlers/getWrestlersByTeam', // Get wrestlers names and id
  'get /api/wrestlersfull/:teamid': 'Wrestlers/getFullWrestlers', // Get wrestlers and all columns
  'get /api/wrestlers/detail/:wrestlerid': 'Wrestlers/getDetail', // get wrestler details and stats
  'delete /api/wrestlers/delete/:wrestlerid': 'Wrestlers/deleteWrestler',
  'post /api/saveScore/': 'Matches/saveScore',
  'get /api/matchscore/:matchid/': 'Matchscore/getMatchScore',
  'get /api/getmatch/:matchid/': 'Matches/getMatch',
  'get /api/getteammatches/:teamid/': 'Matches/getTeamMatches',
  'get /api/getteammatches/:teamid/:pageNum/:num': 'Matches/getTeamMatches',
  'get /api/getqueuedmatches/:teamid/:pageNum/:num': 'Matches/getQueuedMatches',
  'get /api/getwrestlermatches/:wrestlerid/': 'Matches/getWrestlerMatches',
  'get /api/getlatestmatches/:teamid/': 'Matches/getLatestTeamMatches',
  'post /api/updatescore/:pointid': 'Matchscore/updateScore',
  'post /api/deletescore/:pointid': 'Matchscore/deleteScore',
  'delete /api/match/deletelast/:matchid': 'Matchscore/deleteLast',
  'delete /api/deletematch/:matchid': 'Matches/deleteMatch',
  'get /api/analytics/latestusers/': 'Users/getCoaches',
  'get /api/sendmail/': 'Users/sendMail',
  

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
