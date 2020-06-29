/**
 * LocationsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  setLocation: async(req, res) => {
    let data = req.allParams();

    // Check if userid and coords exist

    if (data['userid'] === undefined || data['lat'] === undefined || data['long'] === undefined){
      res.status(401).send('Mal Information');
      return;
    }

    let userid = data.userid;
    let lat = data.lat;
    let long = data.long;
    // Post information to the locations table
    let test = await Locations.create({userid: userid, lat: lat, long: long}).fetch();
    console.log('TEST: ', test);
    res.status(200).send('User Tracked');
  },
  subscribe: function(req, res) {
    if( ! req.isSocket) {
      return res.badRequest();
    }

    sails.sockets.join(req.socket, 'locations');

    return res.ok();
  }

};

