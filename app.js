const express = require("express");

const app = express();

const bodyParser = require("body-parser");

const https = require("https");

app.use(bodyParser.urlencoded({extended:true}));



app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");

});
app.post("/" , function(req,res){
  const query = req.body.cityName;
  const apiKey = "3d66f447c5d93b7082ea94274547e838";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey +"&units=" + unit;

  https.get(url, function(response){
      console.log(response.statusCode);

      response.on("data", function(data) {
          const weatherData = JSON.parse(data)
          const temp = weatherData.main.temp;
          const weatherDescription = weatherData.weather[0].description;
          const icon = weatherData.weather[0].icon;
          const imageURL = ""
          res.write("<p>The weather is curently " + weatherDescription + "</p>");
          res.write("<h1>The Temperature in" + query + "  is " + temp + " degrees</h1>");
          res.send();
        })
      })

})









app.listen(3000, function() {
  console.log("the server is tunning on port");
})
