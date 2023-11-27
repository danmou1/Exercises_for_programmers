//the book's challenge requires me to create this code without any variables.
const readline = require('node:readline');
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

class Person {
    constructor(name, greeting) {
        this.name = name;
        this.greeting = greeting;
    };
};

class People {
    constructor() {
        this.peopleArray = []
    };

    addPerson(person) {
        this.peopleArray.push(person);
    };

    findPerson(name) {
        return this.peopleArray.find(p => p.name === name);
    }
}


(new People()).addPerson(new Person("John", "Hello, John, nice seeing you!"));
(new People()).addPerson(new Person("Peter", "Greetings Peter, welcome back to the program."))


rl.question('What is your name? ', (answer) => {
    //idk if this counts as a variable but it looks ugly if I remove it
    const person = (new People()).find(p => p.name === answer);

    if (person) {
        console.log(`${person.greeting}`);
    } else {
        console.log(`Hello, ${answer}, nice to meet you!`);
    }

    rl.close();
});