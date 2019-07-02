"use-strict";

const util = require('util');
const exec = util.promisify(require('child_process').exec);
const express = require('express');
const bodyParser = require('body-parser');
const endpoint = "https://api.sys.cac.preview.pcf.manulife.com";
const username = "gundave";
const password = "";

const CloudController = new (require("cf-nodejs-client")).CloudController(endpoint);
const UsersUAA = new (require("cf-nodejs-client")).UsersUAA;
const Apps = new (require("cf-nodejs-client")).Apps(endpoint);

const httpPort = process.env.PORT || 3000;
const app = express();

CloudController.getInfo().then( (result) => {
    UsersUAA.setEndPoint(result.authorization_endpoint);
    return UsersUAA.login(username, password);
}).then( (result) => {
    console.log(result);
    Apps.setToken(result);

    Promise.resolve(Apps.getApps()).then(function (value)
    {
        let resourceArray = value.resources;
        resourceArray.forEach(function (appDetail) {
            //console.log(appDetail.guid);
            console.log(appDetail);
            Apps.stop(appDetail.guid);
            
        })
        //console.log(value.resources[0].guid)
    });
    //console.log(Apps.getAppRoutes('ade3b3e4-8db7-40a7-93f2-80a898ec9479'))
    
    app.get('/', async (req,res) => {
        let requestedURL = req.get('host');
        try {
            console.log(requestedURL);
            //+req.url;
            if (requestedURL.includes('localhost')) {
                Apps.start('guid');
            }
            
        }catch (e){
            console.log(e.stderr);
        }
        res.send(requestedURL);
    });

}).then( (result) => {
    console.log(result);
}).catch( (reason) => {
    console.error("Error: " + reason);
});

app.listen(httpPort, () =>{
    console.log('http server listening on port='+httpPort)
})
