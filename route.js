const inquirer = require("inquirer");
const fs = require('fs');
const { GLOBAL_NODE_MODULE_PATH } = require('./node-path');

module.exports = () => {

    return new Promise(async (res, rej) => {

        // Ask Filename
        const filename = await askQuestions();
        // Setting Filename with filepath
        const filePath = `${process.cwd()}/routes/${filename.FILENAME}.js`;

        const routerGenerated = await createRoute(filePath);

        if (!routerGenerated) {
            console.log('Something went wrong!');
            rej(false);
        }

        const indexModuleUpdated = await addToIndexModule(filename);
        if (!indexModuleUpdated) {
            console.log('Something went wrong!');
            rej(false);
        }

        res(true);


    }).catch(err => {
        console.log(err);
        return err;
    });
}

// Update Index Module
function addToIndexModule(filename) {
    const filePath = 'index.js';

    return new Promise(async (resolve, reject) => {

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) rej(err);

            const importStatement = `// importing routes\nconst ${filename.FILENAME} = require('./routes/${filename.FILENAME}');`;
            const useRouteStatement = `// ==================== Routes =====================\napp.use('/${filename.FILENAME}', ${filename.FILENAME});`;

            let res = data.replace("// importing routes", importStatement);
            res = res.replace("// ==================== Routes =====================", useRouteStatement);

            fs.writeFile(filePath, res, 'utf8', (error) => {
                if (err) reject(false);
                resolve(true);
            });
        });
    }).catch(err => {
        console.log(err);
        return err;
    });
}

// Create Route
const createRoute = async (filePath) => {

    const nodePath = await GLOBAL_NODE_MODULE_PATH();
    const routerTemplate = `${nodePath}/@nahidrezvee/express-cli/templates/route.js`;

    return new Promise(async (resolve, reject) => {

        fs.readFile(routerTemplate, 'utf8', (err, data) => {
            if (err) rej(err);
            fs.appendFile(filePath, data, (err) => {
                if (err) reject(false);
                resolve(true);
            });
        });
    }).catch(err => {
        console.log(err);
        return err;
    });

}

function askQuestions() {
    const questions = [
        {
            name: "FILENAME",
            type: "input",
            message: "What is the name of the file without extension?"
        }
    ];
    return inquirer.prompt(questions);
};