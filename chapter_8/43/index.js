/** TODO
 * 
 * prompt for name of the site
 * prompt for the author of the site
 * ask if the user wants a folder for JS files
 * ask if the user wants a folder for CSS files
 * generate an index.html file that contains the name of the site inside the <title> tag and the author in a <meta> tag.
 * 
 * eu vou demorar 3 dias nessa
 */

const readline = require('readline');
const fs = require('fs').promises;
const path = require('path');

const filePath = __dirname;
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

const prompt = (message) => new Promise ((resolve) => rl.question(message, (answer) => resolve(answer.trim())));

