
// Insertion,Find alone working

// Mongo Connection Details

var databaseUrl = "mongodb://$OPENSHIFT_MONGODB_DB_HOST:$OPENSHIFT_MONGODB_DB_PORT/"; // "username:password@example.com/mydb"
var collections = ["userDetails"]
var mongojs = require("mongojs");
var db = mongojs("staysafe");
var userCollection=db.collection("userDetails");
var checkInDetails=db.collection("checkInDetails");


// Node dependancies and details

var express = require("express");
var app=express();

  var host = process.env.OPENSHIFT_NODEJS_IP;
  var port = process.env.OPENSHIFT_NODEJS_PORT; 

var server = app.listen(port, host, function () {

  console.log("Example app listening at http://%s:%s", host, port)

});

//userCollection.insert({userNum: "+918870439938", contacts: "+919843153201", emergencyContacts: "+919842524595",favourites:"+919842524595"}, function(err, saved) {
  //if( err || !saved ) console.log("User not saved");
  //else console.log("User saved");
//});


//db.on('ready',function() {
  //  console.log('database connected');
//});

// used get request
// app.get('/getone',function(req,res)
//                 {
//                         res.setHeader('Content-Type', 'application/json');
                        
                       
//                        userCollection.insert({userNum: '"'+req.query.ph+'"', contacts: '"'+req.query.con+'"', emergencyContacts: '"'+req.query.emCon+'"',favourites:'"'+req.query.fav+'"'}, function(err, saved) {
//   if( err ) 
// {
//     console.log("User not saved");
//     res.end('{ success:0}');;
// }
//   else 
// {
//     console.log("User saved");
 
//     res.end('{ success : 1}');
// }
// });
// 			 });
//      });

//using post req
var bodyParser     =         require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post('/register',function(req,res){
  /*var userNum=req.body.ph;
  var emergencyContacts=req.body.emCon;
  var contacts=req.body.con;
  var favourites=req.body.fav;*/

   res.setHeader('Content-Type', 'application/json');

   

   userCollection.find({userNum: req.body.ph}, function(err, details) {
   if( !err && Object.keys(details).length>0 ) 
 {
     console.log("User Found. Updating...");
      userCollection.update({userNum: req.body.ph},{$set:{contacts: req.body.con, emergencyContacts: req.body.emCon,favourites:req.body.fav}},{multi:true}, function(err, saved) {
   if( err ) 
 {
     console.log("User not saved");
     res.end('{ "success":0}');;
 }
   else 
 {
     console.log("User saved");
 
     res.end('{ "success" : 1}');
 }
 });
   //  res.end(JSON.stringify(details));
 }
   else 
 {
     console.log("User not Found. Inserting...");
       userCollection.insert({userNum: req.body.ph, contacts: req.body.con, emergencyContacts: req.body.emCon,favourites:req.body.fav}, function(err, saved) {
   if( err ) 
 {
     console.log("User not saved");
     res.end('{ "success":0}');;
 }
   else 
 {
     console.log("User saved");
 
     res.end('{ "success" : 1}');
 }
 });
     //res.end('{ "success" : 0}');
 }
 });
                 
});

app.post('/find',function(req,res){
  /*var userNum=req.body.ph;
  var emergencyContacts=req.body.emCon;
  var contacts=req.body.con;
  var favourites=req.body.fav;*/

   res.setHeader('Content-Type', 'application/json');

   
                  
  userCollection.find({userNum: req.body.ph}, function(err, details) {
   if( !err && Object.keys(details).length>0 ) 
 {
     console.log("User Found");
     res.end(JSON.stringify(details));
 }
   else 
 {
     console.log("User not Found");
 
     res.end('{ "success" : 0}');
 }
 });
 

});
//Checkin
app.post('/checkIn',function(req,res){
  /*var userNum=req.body.ph;
  var emergencyContacts=req.body.emCon;
  var contacts=req.body.con;
  var favourites=req.body.fav;*/

   res.setHeader('Content-Type', 'application/json');

   
                  
  checkInDetails.insert({userNum: req.body.ph, safe: req.body.safe, adderss: req.body.adderss,battery:req.body.battery,
    network:req.body.network,dateAndTime:req.body.dateAndTime,lat:req.body.lat,lng:req.body.lng,emCon:req.body.emCon

  }, function(err, saved) {
   if( err ) 
 {
     console.log("Check in Failed");
     res.end('{ "success":0}');;
 }
   else 
 {
     console.log("Check in successful");
 
     res.end('{ "success" : 1}');
 }
 });


});
//Check Status

app.post('/checkStatus',function(req,res){
  /*var userNum=req.body.ph;
  var emergencyContacts=req.body.emCon;
  var contacts=req.body.con;
  var favourites=req.body.fav;*/

   res.setHeader('Content-Type', 'application/json');

   
                  
  checkInDetails.find({userNum: req.body.ph}, function(err, details) {
   if( !err && Object.keys(details).length>0 ) 
 {
     console.log("User Found");
     res.end(JSON.stringify(details));
 }
   else 
 {
     console.log("User not Found");
 
     res.end('{ "success" : 0}');
 }
 });
 

});

