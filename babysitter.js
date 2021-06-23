/*
Feature:
As a babysitter
In order to get paid for 1 night of work
I want to calculate my nightly charge
*/

module.exports = {
    isValidWorkingTime(workingTime) {
        let isValid = false;

        if(workingTime instanceof Date){
            isValid = workingTime.getHours() >= 17 || workingTime.getHours() <= 4;
        }
        
        return isValid;
    },
    calculatePay(workingShift) {
        let preBedTimePay = 0;
        console.log(workingShift);
        if(this.isValidWorkingTime(workingShift.startTime) && this.isValidWorkingTime(workingShift.bedTime)){
            let timeDifference = Math.abs(workingShift.bedTime - workingShift.startTime);
            let hours = Math.floor(timeDifference / 3600000) % 24;
            preBedTimePay = hours * 12;
            console.log(hours);
        }

        return {
            preBedTimePay
        };
    }
}