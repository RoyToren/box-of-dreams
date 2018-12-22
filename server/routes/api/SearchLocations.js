

module.exports = (app) => {
  app.get('/user', function(req, res){
    var response = {
        first_name : 'req.query.first_name',
        last_name : 'req.query.last_name',
        gender: 'req.query.gender'
        };
    
    //this line is optional and will print the response on the command prompt
    //It's useful so that we know what infomration is being transferred 
    //using the server
    console.log(response);
    
    //convert the response in JSON format
    res.end(JSON.stringify(response));
});
};
