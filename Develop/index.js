const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const convertFactory = require('electron-html-to');

const generateHTML = require('./generateHTML.js')

let HTML;

let questions = [
    {
        question: 'What is your github username?',
        name: 'username',
    },
    {
        question: 'What is your favorite color',
        name: 'color',
        type: 'list',
        list: ['green', 'blue', 'pink', 'red']
    }
]


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


                conversion({ html: html }, function(err, result) {
                    if (err) {
                      return console.error(err);
                    }
                   
                    console.log(result.numberOfPages);
                    console.log(result.logs);
                    result.stream.pipe(fs.createWriteStream('./resume.pdf'));
                    conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details
                  });

            })
    })
}

init();