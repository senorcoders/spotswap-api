/**
 * MessagesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    subscribe: function(req, res) {
        if( ! req.isSocket) {
          return res.badRequest(); 
        }
    
        sails.sockets.join(req.socket, 'messages');
    
        return res.ok();
      },

      addMessage: async(req, res) => {  
        let data = req.allParams();
        let sender = data.sender;
        let receiver = data.receiver;
        let message = data.message;
    
        let chat = await Messages.create({sender: sender, receiver: receiver, message:message}).fetch();
        res.status(200).send(chat);
      },
      getMessages: async(req, res) => {
        let data = req.allParams();

        let msgs = await Messages.find({ receiver: data.receiver, sender: data.sender });
        res.status(200).send(msgs);
      },

      getReceivedMessages:async(req, res) =>{
        let data = req.allParams();

        let msgs = await Messages.find({ receiver: data.receiver });
        res.status(200).send(msgs);
      },
      getSentMessages:async(req, res) =>{
        let data = req.allParams();

        let msgs = await Messages.find({ sender: data.sender });
        res.status(200).send(msgs);
      }
     

};

