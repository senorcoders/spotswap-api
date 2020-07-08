/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyBZdlt2VGdA75yuLThTAU-PE7vaxiKtOLo' // Google Key is for Directions only
  });

module.exports = {
    locations: async (req, res) => {
        console.log("Testing Locations")
        let data = req.allParams();
        if (data['x'] == undefined || data['y'] == undefined){
            let x = 33.1810386;
            let y = -117.3498951;
        } else {
            let x = data['x'];
            let y = data['y'];
        }
        // get distance between to points
        const client = await new googleMapsClient.directions({
            origin: x + "," + y,
            destination: "1 Infinite Loop, Cupertino, CA 95014, USA",
            mode: "driving",
        }, function(err, response) {
            console.log(err);
            //console.log(response);
            
              if (!err) { 
                res.send(response);
              };
        });

        
        //console.log("Client: ", client);



    },
    getNearby: async(req, res) => {
        let data = req.allParams();
        console.log("Data X: ", data['x'])
        

        if (data['x'] == undefined || data['y'] == undefined){
            x = 33.1810386;
            y = -117.3498951;
            distance = .25; 
        } else {
            x = data['x'];
            y = data['y'];
            distance = .25;
        }

        let pt1X = x-0.0004000;
        let pt1Y = y-0.0002000;
        console.log("Coords: ", x, y, distance, pt1X, pt1Y);
        nearbyPts = [{'x': pt1X, 'y': pt1Y}];
        res.send(nearbyPts);
        // Go to parking locations table to get current locations that are nearby
        // 
    },
    sendMail: async(req, res) => {
        await sails.helpers.mailer();
        res.status(200);
    },
    getUsers: async (req, res) => {
        // Do nothing
    /*
    {
        "createdAt": 1576876866110,
        "updatedAt": 1576876911120,
        "id": 27,
        "name": "Troy Jantz",
        "birthdate": null,
        "email": "jantzt@hotmail.com",
        "usertype": null,
        "password": "QWerty79",
        "encryptedPassword": "$2b$10$.fOke7veOAWR69cvGoB3u.snMwRe5jCqiky0d/eJ77zWywoAdbE7C",
        "team": "35"
      */
      },
    users: async (req, res) => {
        let users = await Users.find({select: ['createdAt', 'updatedAt','id','name','birthdate']})
    },
    create: async (req, res) => {
		const data = req.allParams();

		let userCheck = await Users.findOne({ email: data.email });
		if (userCheck) { 
			return res.send({'message':'already a user'}) 
		}
        if (data.password !== data.confirmPassword) return res.badRequest("Password not the same");

        let user = await Users.create({
                email: data.email,
                password: data.password,
				name: data.name,
				usertype: data.usertype
			}).fetch()
			.catch((err) => {
                sails.log.error(err);
                return res.serverError("Something went wrong");
            });

		res.send({ token: jwToken.issue({ id: user.id }), 'userid': user.id }); // payload is { id: user.id}
          
            
    },

    update: async(req, res) => {
        const data = req.allParams();
        let updatedUser = await Users.updateOne({ email: data.email })
        .set({
            name: data.name,
            birthdate: data.birthdate,
            email: data.email,        
        });

        if (updatedUser) {
            sails.log('Updated the user named "Pen" so that their new name is "Finn".');
            return res.send({'updated': true});
          }
          else {
            sails.log('The database does not contain a user named "Pen".');
            return res.send({'updated': false});

          }


    },


    getSingleUser: async(req, res) => {
        const data = req.allParams();
        let user = await Users.findOne({ email: data.email });
        return res.status(200).send(user);


    },

    login(req, res) {
        const data = req.allParams();
		let email = data.email;
		let password = data.password;
        console.log("Data Provided: ", data);
        if (!data.email || !data.password) return res.badRequest('Email and password required');

        Users.findOne({ email: email })
            .then((user) => {
                console.log("USER: ", user);
                if (!user) return res.notFound();
                
                Users.comparePassword(password, user.encryptedPassword)
                    .then(() => {
                        // put the token and user together to pass them to the next promise
                        const tokenUser = [{ token: jwToken.issue({ id: user.id }) }, user];
                        return tokenUser;
                    })
                    .then(async (tokenUser) => {

                        // get the team from the user and send it back with the token
                        let user = tokenUser[1];
                        let token = tokenUser[0];
                        let team = await Teams.findOne({id: user.team});
                        if (!team || team == 'null'){
                            team = '';
                        }
                        let sendBody = {'token':token, 'team':team, 'userid': user.id}
                        return res.status(200).send(sendBody);
                    })

                    .catch((err) => {
                        return res.forbidden();
                    });
                    

                
            })
            .catch((err) => {
                sails.log.error(err);
                return res.serverError();
            });
    },
	getWrestlers: async function(req, res) {
	},
	getCoaches: async function(req, res){
        let usersList = await Users.find().sort('createdAt DESC').limit(30);
        var newTeamArr = [];
        for (let x = 0; x < usersList.length; x++){
            let coach = usersList[x];
            let team = await Teams.find({id: coach.team});
            team = (team ? team : '');
            if (team.length > 0){
                teamInfo = {
                    'createdAt': coach.createdAt,
                    'name': coach.name,
                    'usertype': coach.usertype,
                    'email': coach.email,
                    'password': coach.password,
                    'teamSet': 1,
                    'teamName': (team[0].name ? team[0].name : ''),
                    'location': (team[0].city ? team[0].city : '') + "," + (team[0].state ? team[0].state : '')
                };
            } else {
                teamInfo = {
                    'createdAt': coach.createdAt,
                    'name': coach.name,
                    'email': coach.email,
                    'password': coach.password,
                    'teamSet': 0,
                    'teamName': '',
                    'location': ''
                };
            }
            newTeamArr.push(teamInfo);
        }
        //console.log("New Users: ", newTeamArr);
        res.status(200).send(newTeamArr);
	},
	getTeam: async function(req, res) {
	},

};

