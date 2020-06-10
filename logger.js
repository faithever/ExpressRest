
const logger = function(req, res, next){
   //console.log(`${req.protocol}::\/\/${req.get('host')}`);
   console.log("connection:" + `${req.protocol}::\/\/${req.get('host')}${req.originalUrl}`);
   next();
};

module.exports = logger;

