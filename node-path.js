const exec = require("child_process").exec

const nodepath = () => {

    return new Promise(async (resolve, reject) => {
        exec("npm root -g", (error, stdout, stderr) => {
            
            stdout = stdout.replace(/\r?\n|\r/g, ""); // replacing the new line
            stdout = stdout.replace(/\\/g, "/"); // replacing '\' from the path string

            resolve(stdout);
        });

    })
    .then((res) => {
        // console.log(res);
        return res;
    })
    .catch(err => {
        // console.log(err);
        return err;
    });
}

module.exports.GLOBAL_NODE_MODULE_PATH = nodepath;