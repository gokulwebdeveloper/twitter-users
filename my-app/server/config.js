var Twitter=require('twitter');
var dotenv=require('dotenv');
dotenv.config();
console.log("hello");
var client = new Twitter({
    consumer_key: "04rQQ3G7hKw2XSOVFYLcoAz5e",
    consumer_secret:"0Qsl3D41xDKAaLicaXUsadnHSOBnuFHkARYCDf9W8IYiGzbf4q",
    access_token_key: "2827769491-cOg1qP69ekQDZyUFzzEc70ine0G1JpsuSoQcSgO",
    access_token_secret: "FkY68uHtH13CEDI4BfpPkjps33oDto6cV7EmTuStLM1RQ",
    strictSSL:false,
    callbackURL: 'http://127.0.0.1:4000/twitter/callback'
  });
module.exports=client;