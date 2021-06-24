const babysitter = require("./babysitter")
let args = process.argv.slice(2);

let workingShift = {
    startTime: new Date(args[0]),
    bedTime: new Date(args[1]),
    endTime: new Date(args[2]),
}

console.log(babysitter.calculatePay(workingShift));