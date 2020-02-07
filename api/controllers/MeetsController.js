/**
 * MeetsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    getTeamMeets: async(req, res) => {
        let data = req.allParams();
        let teamId = data.teamid;

        let meets = await Meets.find({team: teamId});
        console.log(meets);
        res.status(200).send(meets);
    }
};

