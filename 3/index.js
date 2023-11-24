//the exercise requires the use of string concatenation, without interpolating
//a single output statement should be used to produce the output.
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let quote, author;

function getQuote() {
    rl.question('Insert a quote: ', (answer) => {
        if (answer.trim()) {
            quote = answer;
            getAuthor();
        } else {
            console.log('Invalid quote.');
            getQuote();
        }
        return quote;
    });
};
function getAuthor(){
    rl.question('Insert the name of the author: ', (answer) => {
        if (answer.trim()) {
            author = answer;
            rl.close();
            console.log(author + ' once said, ' + `"` + quote + `".`);
        } else {
            console.log('Invalid author name.');
            getAuthor();
        }
    });
}

getQuote();