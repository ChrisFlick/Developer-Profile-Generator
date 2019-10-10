const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const convertFactory = require('electron-html-to');

const generateHTML = require('./generateHTML.js')

let HTML;




function writeToFile(fileName, data) {
 
}

function init() {
    inquirer
    .prompt(questions)
    .then(function ({username, color}) {
        const queryUrl = `https://api.github.com/users/${username}`; 

        axios
            .get(queryUrl)
            .then((res) => {    
                console.log(res.data)

                let date = {};

                switch(color) {
                    case 'green':
                        data.color = 0;
                        break;
                    case 'blue':
                        data.color = 1;
                        break;  
                    case 'pink':
                        data.color = 2;
                        break;
                    case 'red':
                        data.color = 3;
                        break;
                }        

                data.numOfRepo = res.data.public_repos;
                data.name = res.data.name
                data.followers = res.data.followers;
                data.following = res.data.following
                data.portPic = res.data.avatarURL

                HTML = generateHTML(data);


            })
    })
}

init();
