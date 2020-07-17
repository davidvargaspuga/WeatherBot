// Author: David Vargas Puga
// https://www.linkedin.com/in/david-vargas-puga/
const fetch = require('node-fetch');
const Discord = require('discord.js');
const keys = require('../weatherBotKeys.js')
const client = new Discord.Client();
const PREFIX = '!';

var Token = keys.Token;

client.once('ready', () => {
    console.log('WeatherBot is online')
})

client.on('message', message => {
        let args = message.content.substring(PREFIX.length).split(" ");

        var first = args[0];
        
        if(first === "temp"){ //checks for temp command
            if(args.length != 2){ //checks for correct amount of args
                message.reply("invalid arguments. Type !temp help for more information.");
                return;
            }
            var second = args[1];
            let isNum = /^\d+$/.test(second)

            if(second === "help"){
                message.reply("!temp {5-digit USA zip code}");
            }
            else if(second.length != 5){ //checks for length of zip
                message.reply("invalid zip code. Must be 5 digits.");
                return;
            }
            else if(!isNum){ //checks if zip has all numbers
                message.reply("invalid zip code. Must be 5 digits.");
                return;
            }
            else{
        
                const zip = second;
                const appid = keys.appid;
                const apiURL = "https://api.openweathermap.org/data/2.5/weather?zip=" + zip + ",us&units=imperial&appid=" +appid;
                console.log(apiURL);
                
                // makes API call for weather by zip code
                fetch(apiURL).then(response => response.json()).then((weather) => {
                    console.log(weather);
                    var cod = weather.cod;
                    

                    if(cod == "200"){
                        // init data vars
                        var currentTemp = weather.main.temp;
                        var city = weather.name;
                        var feels_like = weather.main.feels_like;
                        var main = weather.weather.main;
                        var condition = weather.weather[0].description;
                        var low = weather.main.temp_min;
                        var high = weather.main.temp_max;
                        
                        //produces weather message
                        const weatherMessage = condition + " and it's currently " +currentTemp+ "°F in "+city+", but it feels like " +feels_like+ "°F.";                
                        message.reply(weatherMessage);
                    }
                    else{
                        var errorMsg = weather.message + ".";
                        message.reply(errorMsg);
                        return;
                    }
                });
            }
        }

})
client.login(Token);


// @TODO
// find by city name and state
// give the high and low of day