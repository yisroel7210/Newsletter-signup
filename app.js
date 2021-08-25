 const express = require('express');
 const https = require('https');
 const bodyParser =require('body-parser');
 const request =require('request');
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("Public"));

app.get("/", function(req, res){
res.sendFile(__dirname + "/signup.html");
});
app.post("/", function(req, res){
  const  firsName = req.body.fname;
  const  lasName = req.body.lname;
  const email =  req.body.email;
  const data = {
    members: [
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:firsName,
          LNAME:lasName
        }
      }
    ]
  }
  const jsonData = JSON.stringify(data);
const url = "https://us5.api.mailchimp.com/3.0/lists/f5a3143afd";
const options = {
  method:"POST",
auth: "Yisroel:e5eccf79acc5ba422fb3d4392bb305ab-us5"
}
const request =  https.request (url,options, function(response){
response.on("data", function(data){
  console.log(JSON.parse(data));
})
  });
  request.write(jsonData);
  request.end();
  //res.sendFile("__dirname" + "/signup.html");
res.write("Hello, Your first name is " + firsName + ". Your last name is " + lasName + ". Your email address is " + email + ".");
  //console.log(list);
  res.send();
  console.log("Your first name is " + firsName + " . Your last name is " + lasName + ". Your email address is " + email + "." );
//   if res.statusCode(===200) {
//     sendFile(__dirname + "/success.html")
//   } else {
//       sendFile(__dirname + "/failure.html")
//   }
 });

app.listen(3000, function(req, res){
  console.log("running on 3000");
});




//api key = "e5eccf79acc5ba422fb3d4392bb305ab-us5"
// list id = "f5a3143afd"
