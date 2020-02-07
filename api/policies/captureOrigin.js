
module.exports = (req, res, next) => {
    let token;
    
    if (req.headers && req.headers.origin) {
      sails.log.debug(" ORIGIN: ", req.headers.origin + ' , URL:' + req.url);
    } 
    next();
  };