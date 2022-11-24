let Utils = {}

require('dotenv').config();

Utils.DebugPrint = function (message) {
    if (process.env.PROD != "true") console.log("[DEBUG] " + message);
}

module.exports = Utils