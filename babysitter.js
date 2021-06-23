/*
Feature:
As a babysitter
In order to get paid for 1 night of work
I want to calculate my nightly charge
*/
const preBedTimeHourlyRate = 12;
const earliestStartHour = 17;
const latestEndHour = 4;

module.exports = {
    isValidWorkingTime(workingTime) {
        let isValid = false;

        if(workingTime instanceof Date){
            isValid = workingTime.getHours() >= earliestStartHour || workingTime.getHours() <= latestEndHour;
        }
        
        return isValid;
    },
    calculatePay(workingShift) {
        let preBedTimePay = 0;
        
        if(this.isValidWorkingTime(workingShift.startTime) && this.isValidWorkingTime(workingShift.bedTime)){
            let timeDifference = Math.abs(workingShift.bedTime - workingShift.startTime);
            let hours = Math.floor(timeDifference / 3600000) % 24;
            preBedTimePay = hours * preBedTimeHourlyRate;
        }

        return {
            preBedTimePay
        };
    }
}