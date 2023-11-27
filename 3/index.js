//the exercise requires the use of string concatenation, without interpolating
//a single output statement should be used to produce the output.
const quotes = [
    {
        quote: "These aren't the droid you're looking for.",
        author: "Kenobi, Obi-Wan"
    },
    {
        quote: "May the force be with you.",
        author: "Yoda"
    }
    //ad nauseum
];

quotes.forEach((q, index) => {
    console.log(`— ${q.quote}\n     ${q.author}.`);
});