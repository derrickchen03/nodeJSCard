#!/usr/bin/env node
'use strict';

import chalk from 'chalk';
import boxen from 'boxen';
import clear from 'clear';
import inquirer from 'inquirer';
import Enquirer from 'enquirer';
import open from 'open';
import terminalImage from 'terminal-image';
import { fromBuffer } from 'pdf2pic';
import bluebird from 'bluebird';
import got from 'got'

clear();

const data = {
    name: chalk.bold.green('@derrick'),
    github: chalk.hex('#787878')('derrickchen03'),
    npx: chalk.hex('#787878')('npx derrick'),
    email: chalk.hex('#787878')('derrick.chen03@gmail.com'),

    labelGitHub: chalk.hex('#9E9E9E').bold('git:'),
    labelEmail: chalk.hex('#9E9E9E').bold('eml:'),
    labelCard: chalk.hex('#9E9E9E').bold('npm:')
};

const card = boxen(
    [
        `${data.name}`,
        ``,
        `${data.labelGitHub} ${data.github}`,
        `${data.labelCard} ${data.npx}`,
        `${data.labelEmail} ${data.email}`,
        ``,
    ].join("\n"),
    {
        margin: 0,
        padding: { top: 1, bottom: 1, right: 2, left: 2 },
        borderStyle: "double",
        borderColor: "white"
    }
);

const options = {
    type: "list",
    name: "actions",
    message: "Select Action",

    choices: [
        {
            name: '| resume',
            value: async () => {
                console.log('Displaying resume...');
                await bluebird.delay(1000);
                try{
                    console.log("fetch pdf")
                    const resumePDF = await got("https://raw.githubusercontent.com/derrickchen03/resume/main/derrickresume.pdf").buffer();
                    const pdfPic = fromBuffer(resumePDF, {
                        density: 100,
                        format: 'png',
                        width: 800,
                        height: 1000,
                    });
                    console.log("convert")
                    try {
                    const resumePNG = await pdfPic(1);
                    }
                    catch (error) {
                        console.log("wtf?")
                    }
                    console.log("buffer to base64")
                    console.log("converted")

                    console.log(await terminalImage.buffer(pngPic));
                }
                catch (error) {
                    console.log("Error displaying in terminal")
                    await bluebird.delay(2000);
                    console.log("Displaying in web-browser...")
                    //open("https://github.com/derrickchen03/resume/blob/main/derrickresume.pdf");
                }
            }
        },
        {
            name: '| Personal Website',
            value: async () => {
                console.log("WIP");
            }
        },
        '- exit'
    ]
};

function main() {
    inquirer.prompt(options).then(async answer => {
        if (answer.actions == '- exit') {
            return;
        }
        else {
            console.log('-'.repeat(40));
            await answer.actions();
            console.log('-'.repeat(40));

            Enquirer.prompt({
                type: "toggle",
                name: "again",
                message: "exit?",
                default: false
            }).then(answer => {
                if (answer.again == false) {
                    main();
                }
            })
        }
    })
}

main();