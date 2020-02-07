/**
 * WrestlersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    createWrestler: async (req, res) => {
        let data = req.allParams();

        // do this to get the team name and store it with the wrestler
        // this is done for lookup speed
        let team = await Teams.findOne({id: data.team});
        let teamName = team.name;

        let wrestler = await Wrestlers.create({
            name: data.name, 
            gradyear: data.gradyear, 
            schooltype: data.schooltype, 
            teamname: teamName, 
            team: data.team})
            .fetch();
        res.send(wrestler);
        
    },
    getWrestlersByTeam: async (req, res) => {
        let teamId = req.param("teamid");
        let wrestlerList = await Wrestlers.find({ 
            where: {team: teamId, 'active': true}, 
            select: ['id','name']
        });
        res.send(wrestlerList);
    },
    getFullWrestlers: async (req, res) => {
        let teamId = req.param("teamid");
        let wrestlerList = await Wrestlers.find({team: teamId});
        res.send(wrestlerList);
    },

    deleteWrestler: async(req, res) => {
        let data = req.allParams();
        console.log("DELETE Wrestler: ", data);
        let wrestlerid = data['wrestlerid'];
        let deleted = await Wrestlers.updateOne({id: wrestlerid}).set({active: false});

        res.status(200).send(deleted);

    },

    getDetail: async(req, res) => {
        let data = req.allParams();
        let wrestlerId = data.wrestlerid;
        if (!wrestlerId) { 
            res.send(401)
        };
        let matchIds = [];
        let wrestlerInfo = {};
        let wtClass = [];

        let wrestler = await Wrestlers.find({id: wrestlerId});
        console.log("Wrestler: ", wrestler);
        let matches = await Matches.find({wrestlerid: wrestlerId,match_complete: true});
        //console.log("Matches: ", matches);
        let wins = 0;
        let loss = 0;
        let stats;
        console.log("Matches Length: ", matches.length);
        if (matches.length > 0){
            
            for (let i = 0; i < matches.length; i++){
                //console.log("Score ", matches[i].score);
                let matchscore = await Matchscore.find({matchid: matches[i].id});
                let wScore = 0; let oScore = 0;
                for (let j = 0; j < matchscore.length; j++){
                    if (matchscore['wrestler'] == 'wrestler'){
                        wScore += matchscore['point'];
                    } else {
                        oScore += matchscore['point'];
                    }
                    if (matchscore['pointcode'] == 'fall'){
                        if (matchscore['wrestler'] == 'wrestler'){
                            win += 1;
                        } else {
                            loss += 1;
                        }
                    } else if (matchscore['pointcode'] == 'endmatch' ) {
                        if (wScore > oScore){
                            win += 1;
                        } else {
                            loss += 1;
                        }
                    } else if (matchscore['pointcode'] == 'disqualified') {
                        if (matchscore['wrestler'] == 'wrestler'){
                            loss += 1;
                        } else {
                            win += 1;
                        }
                    }
                }
                // make an array of matchids to find related wrestler scores
                matchIds.push(matches[i].id);

                // Determine if wrestler won or lost
                if (!wtClass.includes(matches[i].weightclass)){
                    wtClass.push(matches[i].weightclass);
                }
            }

            // Get stats
            var wTakedowns = 0; var oTakedowns = 0;
            var wEscapes = 0; var oEscapes = 0;
            var wNearfall = 0; var oNearfall = 0;
            var wPenalty = 0; var oPenalty = 0;
            var wPins = 0; var oPins = 0;
            
            let matchScores = await Matchscore.find({matchid: matchIds});
            for (let x = 0; x < matchScores.length; x++){
                console.log("PointCode: ", matchScores[x].pointcode);
                console.log("Wrestler: ", matchScores[x].point);
                let point = parseInt(matchScores[x].point);
                if (matchScores[x].pointcode == 'takedown') {
                    if (matchScores[x].wrestler == 'wrestler'){
                        wTakedowns += 1;
                    } else {
                        oTakedowns += 1;
                    }
                }
                if (matchScores[x].pointcode == 'escape') {
                    if (matchScores[x].wrestler == 'wrestler'){
                        wEscapes += 1;
                    } else {
                        oEscapes += 1;
                    }
                }
                if (matchScores[x].pointcode.indexOf('nearfall') >= 0) {
                    if (matchScores[x].wrestler == 'wrestler'){
                        wNearfall += point;
                    } else {
                        oNearfall += point;
                    }
                }
                if (matchScores[x].pointcode.indexOf('penalty') >= 0) {
                    if (matchScores[x].wrestler == 'wrestler'){
                        wPenalty += point;
                    } else {
                        oPenalty += point;
                    }
                }
                if (matchScores[x].pointcode == 'fall') {
                    if (matchScores[x].wrestler == 'wrestler'){
                        wPins += 1;
                    } else {
                        oPins += 1;
                    }
                }
            }

            console.log("Number of scores: ", matchScores.length);
        } 
        stats = {
            'wTakedowns': wTakedowns,
            'oTakedowns': oTakedowns,
            'wEscapes': wEscapes,
            'oEscapes': oEscapes,
            'wNearfall': wNearfall,
            'oNearfall': oNearfall,
            'wFall': wPins,
            'oFall': oPins
        };
        wrestlerInfo = {
            'wrestlerName': wrestler[0].name,
            'wins': wins,
            'losses': loss,
            'wtclass': wtClass,
            'stats': stats
        };

        res.status(200).send(wrestlerInfo)

    },
    getWeights: async(req, res) => {
        let weights = [106, 113, 120, 126, 132, 138, 145, 152, 160, 170, 182, 195, 220, 285];
        res.send(weights);
    }
};

