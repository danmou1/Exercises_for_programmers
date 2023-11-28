let x = 0;
let y = 0;

do {
    y = 0;
        do {
            console.log(`${x} * ${y} = ${x*y}`);
            y++
        } while (y <= 12);
    x++;
} while (x <= 12)