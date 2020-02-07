// api/helpers/makescore.js
module.exports = {


    friendlyName: 'Create the final score',
  
  
    description: 'Create and set the final score.  Also return it.',
  
  
  
    inputs: {
  
      matchid: {
        friendlyName: 'ID of the match',
        description: 'One particular match to retrieve',
        type: 'number'
      }  
    },
  
  
    exits: {
  
      success: {
        final: '',
        outputFriendlyName: 'Recent users',
        outputDescription: 'An array of users who recently logged in.',
      },
  
      noMatchFound: {
        description: 'Could not find related match'
      }
  
    },
  
  
    fn: async function (inputs, exits) {
  
      // Run the query
      var matchscore = await Matchscore.find({
        matchid: inputs.matchid
      })

  
      // If no users were found, trigger the `noUsersFound` exit.
      if (matchscore.length === 0) {
        throw 'noMatchFound';
      }
      
      let oScore = 0, wScore = 0;
      for (let i = 0; i < matchscore.length; i++){
          //console.log("score: ", matchscore[i]['point']);
        if (matchscore[i]['wrestler'] == 'wrestler'){
            wScore += parseInt(matchscore[i]['point']);
        } else {
            oScore += parseInt(matchscore[i]['point']);
        }
        if (matchscore[i]['pointcode'] == 'fall'){
            if (matchscore[i]['wrestler'] == 'wrestler'){
                wScore = 'fall';
                oScore = 'pinned';
            } else {
                wScore = 'pinned';
                oScore = 'fall';
            }
        } else if (matchscore[i]['pointcode'] == 'endmatch' ) {
            
            
        } else if (matchscore[i]['pointcode'] == 'disqualified') {
            if (matchscore[i]['wrestler'] == 'wrestler'){
                wScore = 'DQ';
                oScore = 'Win';

            } else {
                wScore = 'Win';
                oScore = 'DQ';
            }
        }
    }
    let finalScore = wScore + "-" + oScore;
    
    await Matches.update({id: inputs.matchid}).set({score: finalScore});
      // Otherwise return the records through the `success` exit.
      console.log("Final Score: ", finalScore);
      return exits.success(finalScore);
  
    }
  
  };