/**
 * TeamsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    getDashInfo: async(req, res) => {
        // Get match information using the team id
    },

    createTeam: async(req, res) => {
        // Create a team and add teamid to correct user
        data = req.allParams();
        let teamName = data.name;
        let city = data.city;
        let mascot = data.mascot;
        let state = data.state;
        let userId = data.userid;

        console.log("Create Team Data: ", data);

        // input new team then add team id to user
        let team = await Teams.create({name: teamName, city: city, mascot: mascot, state: state}).fetch();
        let userUpdate = await Users.update({id: userId}).set({team: team.id});

        res.status(200).send(team);
    }
};

