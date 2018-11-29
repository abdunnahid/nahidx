const inquirer = require("inquirer");
const fs = require('fs');
const exec = require("child_process").exec
const copydir = require('copy-dir');
const chalkAnimation = require('chalk-animation');
const { GLOBAL_NODE_MODULE_PATH } = require('./node-path');

module.exports = () => {

    const rainbow = chalkAnimation.rainbow('Your project is creating.Please wait...');

    const promisesToMake = [initializeNPM(), createStructure()];
    const promises = Promise.all(promisesToMake);

    return new Promise(async (res, rej) => {

        promises.then((results) => {
            rainbow.stop();
            res(true);
        }).catch((err) => {
            rainbow.stop();
            console.log(err);
            rej(false);
        });

    }).catch(err => {
        return err;
    });
}

function initializeNPM() {
    return new Promise(async (res, rej) => {
        exec("npm init -y", (error, stdout, stderr) => {
            exec("npm i express joi mongoose", (error, stdout, stderr) => {
                res('success');
            });
        });
    }).catch(err => {
        return err;
    });
};


function createStructure() {
    return new Promise(async (res, rej) => {

        const nodePath = await GLOBAL_NODE_MODULE_PATH();
        const newProjectSrc = `${nodePath}/NahidExpress/templates/src`;

        copydir(newProjectSrc, process.cwd(), (err) => {
            if (err) {
                rej(err);
            }
            else {
                res('success');
            }
        });
    }).catch(err => {
        return err;
    });
};