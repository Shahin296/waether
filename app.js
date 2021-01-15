const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const http = require('http');



const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs');
app.use(express.static("public"));




app.get("/", function (req, res) {
    res.render("html");

});



app.post("/", function (req, response) {

    const cityName = req.body.cityName;
    http.get("http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=0ec50091bc2d3e6450cc9437d4f7987e&units=metric", function (req, res) {
        req.on("data", (data) => {
            const datas = JSON.parse(data);
            const temps = datas.main.temp;
            const description = datas.weather[0].description;
            response.render("weather", {
                temp: temps,
                icon: description,
                cityName: cityName
            })

        })
    })

})

app.post("/weather", function (req, res) {
    res.redirect("/")
})


app.listen(process.env.PORT);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port);