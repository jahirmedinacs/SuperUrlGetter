var fs = require('fs-extra');
var zipper = require("zip-local");
var jsonfile = require('jsonfile');
var path = require('path');

const ChromeWebstore = require('chrome-webstore-manager');

const itemId = "ecjchohpmhdeconmikicipbobkhcijlj";

var buildLocation = path.join(__dirname, "app");

//read manifest file

var manifest = jsonfile.readFileSync(path.join(buildLocation, "manifest.json"));

function getNewVersion() {
    var d = Date.now() % 256;
    return d.toString();
}
var version = getNewVersion();

//replace version
manifest.version = version;

//save manifest file

jsonfile.writeFileSync(path.join(buildLocation, "manifest.json"), manifest);

//create zip
zipper.sync.zip(buildLocation).compress().save(path.join(buildLocation, "build.zip"));

const fileBin = fs.readFileSync(path.join(buildLocation, "build.zip"));

// Initialize with ClientID and ClinetSecret
// const chromeWebstore = new ChromeWebstore("<CLIENT_ID>", "<CLIENT_SECRET>");

// Get new token with refresh_token
//
// chromeWebstore.getRefreshToken("<REFRESH_TOKEN>").then(function (data) {
//     const json = JSON.parse(data)
//     const newToken = json.access_token
//     chromeWebstore.updateItem(newToken, fileBin, itemId).then((data) => {
//         console.log(data);
//         chromeWebstore.publishItem(newToken, itemId).then((data) => {
//             console.log(data);
//         });
//     });
// });
//

console.log("Deployed version is " + version);
