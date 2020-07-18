const ethers = require('ethers');
const fs = require('fs');
const path = require('path');

// Assemble in JavaScript:
function assemble(ASM) {
  let opcodes = [];
  ASM.split("\n").filter((l) =>
    (l.substring(0, 1) !== ";" && l.trim() !== "")
  ).forEach((line) => {
      line.split(" ").forEach((opcode) => {
        opcodes.push(opcode);
      });
  });
  return ethers.utils.hexlify(ethers.utils.concat(opcodes));
}

function main() {
   const asm = fs.readFile(path.resolve(__dirname, 'bootstrap'), 'utf8', (err, data) => {
      const asm = data;
      const bytecodes = assemble(asm);
      console.log('bytecodes:');
      console.log(bytecodes);
   });
}

main();
