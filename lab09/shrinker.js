const fs = require('fs');

if (process.argv.length < 5) {
    console.error("Super file shrinker v1.0.0");
    console.error("    node shrinker.js shrink <input-file> <output-file>");
    console.error("    node shrinker.js unshrink <input-file> <output-file>");
    process.exit(1);
}

let mode = process.argv[2];
let inputFile = process.argv[3];
let outputFile = process.argv[4];

let inputBytes = Array.prototype.slice.call(fs.readFileSync(inputFile));
let outputBytes;

if (mode === 'shrink') outputBytes = shrink(inputBytes);
else if (mode === 'unshrink') outputBytes = unshrink(inputBytes);
else throw ("Unknown mode: " + mode);

fs.writeFileSync(outputFile, Buffer.from(outputBytes));

function deltaEncoding(input) {
    let output = [input[0]];
    for (let i = 1; i < input.length; i++) {
        output[i] = input[i] - input[i - 1];
    }
    return output;
}

function deltaDecoding(input) {
    for (let i = 1; i < input.length; i++) {
        // In case of negative value
        if (input[i] >= 150) {
            input[i] = -(256 - input[i]);
        }
        input[i] = input[i] + input[i - 1];
    }
    return input;
}

function shrink(input) {
    console.log(`File size before shrink ${input.length}`);

    let output = [];
    input = deltaEncoding(input);

    let count = 1;
    for (let i = 1; i < input.length; i++) {
        // Split run if bigger than 256
        if (input[i] !== input[i - 1] || count >= 255) {
            if (count > 1) {
                // Flag that says a run is coming up
                output = output.concat([149, count, input[i - 1]]);
            } else {
                output.push(input[i - 1]);
            }
            count = 1;
        }
        else {
            count++;
        }
    }

    if (count > 1) {
        output = output.concat([149, count, input[input.length - 1]]);
    } else {
        output.push(input[input.length - 1]);
    }
    
    console.log(`File size after shrink ${output.length}`);

    return output;
}

function unshrink(input) {
    console.log(`File size before unshrink ${input.length}`);

    let output = [];

    for (let i = 0; i < input.length; i += 2) {
        // Flag that says a run is coming up
        if (input[i] === 149) {
            let newChunk = new Array(input[i + 1]);
            newChunk = newChunk.fill(input[i + 2]);
            output = output.concat(newChunk);
            i++;
        } else {
            output.push(input[i]);
            i--;
        }
    }

    output = deltaDecoding(output);

    console.log(`File size after unshrink ${output.length}`);

    return output;
}