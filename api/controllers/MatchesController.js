/**
 * MatchesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    /*
    create: async(req, res) => {
        console.log("In Create");
        res.status(200).send("GOT IT!");
    },
    */

    delete: async(req, res) => {
        console.log("Deleted");
        res.status(200).send("Deleted");
    },

    createMatch: async(req, res) => {
        // Creating a match needs a wrestler id, team id, meet id  These are required
        let data = req.allParams();

    },

    saveScore: async(req, res) => {

        // {'action': action, 'who': who, 'point': ptObj[action], 'time': time, 'period': this.period}
        let data = req.body;
        console.log("Localtime: ", data.localtime);
        // Match ending array
        let endArr = ['fall', 'disqualified', 'endmatch']
        let score = await Matchscore.create({
            matchid: data.matchid, 
            localtime: data.localtime,
            wrestler: data.who, 
            period: data.period, 
            pointcode: data.action,
            point: data.point,
            time: data.time,
            matchScore: data.score
        }).fetch();
        
        if (endArr.includes(data.action)){
            score = await Matches.update({id: data.matchid}).set({match_complete: true, score: data.score}).fetch();
        }
        res.status(200).send(score);
    },
    
    getLatestTeamMatches: async(req, res) => {
        data = req.allParams();
        teamid = data.teamid;
        var score = [];
        let matchCount = await Matches.count({team: teamid, match_complete: true});
        let matches = await Matches.find({team: teamid, match_complete: true}).populate('meet').sort('createdAt desc').limit(7);
        let count = 0;
        matches.map(match => {
            count += 1;
            console.log("Match Score: ", match.score);
            console.log("Match ID: ", match.id);
            score[match.id] = match.score;
        });
        console.log("Mapped: ", count);
        console.log("Scores: ", score);
        res.send({'matches': matches, 'matchCount': matchCount, 'scores': score});
    },

    getTeamMatches: async(req, res) => {
        let data = req.allParams();
        let teamid = data.teamid;
        let page = (data.pageNum ? data.pageNum : 0);
        if (page != 0) {
            page -= 1;
        }
        let num = (data.num ? data.num : 10);

        //console.log("info: ", teamid, page, num);
        let matches = await Matches.find({team: teamid, match_complete: true}).populate('meet').sort('createdAt desc').skip(page).limit(num);
        res.send(matches);
    },
    getQueuedMatches: async(req, res) => {
        let data = req.allParams();
        let teamid = data.teamid;
        let page = (data.pageNum ? data.pageNum : 0);
        if (page != 0) {
            page -= 1;
        }
        let num = (data.num ? data.num : 10);

        console.log("info: ", teamid, page, num);
        let matches = await Matches.find({team: teamid, match_complete: false}).populate('meet').sort('createdAt desc').skip(page).limit(num);
        res.send(matches);
    },
    getWrestlerMatches: async(req, res) => {
        data = req.allParams();
        wrestlerid = data.wrestlerid;

        let matches = await Matches.find({wrestlerid: wrestlerid, match_complete: true});
        res.send(matches);
    },
    getMatch: async(req, res) => {
        let data = req.allParams();
        let matchid = data.matchid;
        let score = await sails.helpers.makescore(matchid);
        console.log("Score: ", score);
        let match = await Matches.findOne({id: matchid}).populate('meet');
        let matchScore = await Matchscore.find({matchid: match.id});
        let allInfo = {'match': match, 'matchscore': matchScore, 'score': score}

        res.status(200).send(allInfo);
    },

    deleteMatch: async(req, res) => {
        let data = req.allParams();
        let matchId = data.matchid;

        let teamId = await Matches.find({ where: {id: matchId}, select: ['team']});
        
        await Matches.destroy({id: matchId});
        await Matchscore.destroy({matchid: matchId});
        
        teamId = teamId['team']

        let matches = await Matches.find({team: teamId, match_complete: false});
        res.send(matches);

    }
};

