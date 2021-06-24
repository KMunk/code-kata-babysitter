/*
Feature:
As a babysitter
In order to get paid for 1 night of work
I want to calculate my nightly charge
*/
const preBedTimeHourlyRate = 12;
const bedtimeToMidnightHourlyRate = 8;
const postMidnightHourlyRate = 16;

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
        let bedtimeToMidnightPay = 0;
        let postMidnightPay = 0;

        if(this.isValidWorkingTime(workingShift.startTime) && this.isValidWorkingTime(workingShift.bedTime) && this.isValidWorkingTime(workingShift.endTime)){
            let preBedTimeDifference = Math.abs(workingShift.bedTime - workingShift.startTime);
            let preBedHours = Math.floor(preBedTimeDifference / 3600000) % 24;

            preBedTimePay = preBedHours * preBedTimeHourlyRate;

            let bedToEndTimeTimeDifference = Math.abs(workingShift.endTime - workingShift.bedTime);
            let bedToEndTimeHours = Math.floor(bedToEndTimeTimeDifference / 3600000) % 24;
            let bedToMidnightHours = Math.abs(24 - workingShift.bedTime.getHours()) % 24;
            let bedTimeHours = Math.min(bedToMidnightHours,bedToEndTimeHours);

            bedtimeToMidnightPay = bedTimeHours * bedtimeToMidnightHourlyRate;

            if(workingShift.endTime.getHours() > 0 && workingShift.endTime.getHours() <= 4){
                let postMidnightHours = workingShift.endTime.getHours();
                if(workingShift.bedTime.getHours() > 0 && workingShift.bedTime.getHours() <= 4){
                    postMidnightHours -= workingShift.bedTime.getHours();
                }
                postMidnightPay = postMidnightHours * postMidnightHourlyRate
            }
        }

        return {
            preBedTimePay,
            bedtimeToMidnightPay,
            postMidnightPay,
        };
    }
}