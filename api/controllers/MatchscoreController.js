/**
 * MatchscoreController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

 var point = {
     'takedown': 2,
     'escape': 1,
     'reverse': 2,
     'nearfall2': 2,
     'nearfall3': 3,
     'nearfall4':4,
     'stall': 0,
     'stall1': 1,
     'stall2': 2,
     'penalty': 0,
     'penalty1': 1,
     'penalty2': 2,
     'disqualified':0,
     'fall':0,
     'endmatch':0,
     'wTop': 0,
     'wNeutral': 0,
     'wBottom': 0,
     'oTop': 0,
     'oNeutral': 0,
     'oBottom': 0
 }
module.exports = {
  
    getMatchScore: async(req, res) => {
        let data = req.allParams();
        let matchId = data.matchid;

        let matchScore = await Matchscore.find({matchid: matchId}).sort('id ASC');
        res.send(matchScore);
    },

    updateScore: async (req, res) => {
        let data = req.allParams();
        let pointId = data.pointid;

        let updatedPoint = await Matchscore.update({id: pointId}).set({pointcode: data.pointcode, period: data.period, wrestler: data.wrestler, point: point[data.pointcode]}).fetch();

        res.status(200).send(updatedPoint);
    },

      
    deleteScore: async (req, res) => {
        let data = req.allParams();
        let pointId = data.pointid;

        let updatedPoint = await Matchscore.destroy({id: pointId});

        res.status(200).send("Deleted: " + pointId);
    },

    deleteLast: async (req, res) => {
        let data = req.allParams();
        let matchId = data.matchid;

        let matchResult = await Matchscore.find({matchid: matchId}).sort('createdAt DESC').limit(1);
        let matchDel = await Matchscore.destroy({id: matchResult[0].id}).fetch();

        res.status(200).send(matchDel);
    }
};

