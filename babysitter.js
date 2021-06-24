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
    isValidWorkingShift(workingShift) {
        let isValid = false;

        if(this.isValidWorkingTime(workingShift.startTime) && this.isValidWorkingTime(workingShift.bedTime) && this.isValidWorkingTime(workingShift.endTime)){
            //bedtime should be between start and end time
            isValid = (workingShift.startTime < workingShift.bedTime);
            isValid = isValid && workingShift.bedTime < workingShift.endTime;

            //total time difference should be less than 1 night or the max total working range
            let maxWorkHours = (24 + latestEndHour - earliestStartHour) % 24;
            let workingDifference = Math.abs(workingShift.endTime - workingShift.startTime);
            let workingHours = Math.floor(workingDifference / (1000 * 60 * 60));

            isValid = isValid && workingHours <= maxWorkHours;
        }

        return isValid;
    },
    calculatePay(workingShift) {
        let preBedTimePay = 0;
        let bedtimeToMidnightPay = 0;
        let postMidnightPay = 0;
        let totalPay = 0;
        const errors = [];

        if(this.isValidWorkingShift(workingShift)){
            let preBedTimeDifference = Math.abs(workingShift.bedTime - workingShift.startTime);
            let preBedHours = Math.floor(preBedTimeDifference / (1000 * 60 * 60)) % 24;
            
            preBedTimePay = preBedHours * preBedTimeHourlyRate;

            if(workingShift.bedTime.getHours() >= 17 && workingShift.bedTime.getHours() < 24){
                let bedToEndTimeTimeDifference = Math.abs(workingShift.endTime - workingShift.bedTime);
                let bedToEndTimeHours = Math.floor(bedToEndTimeTimeDifference / (1000 * 60 * 60)) % 24;
                let bedToMidnightHours = Math.abs(24 - workingShift.bedTime.getHours()) % 24;
                let bedTimeHours = Math.min(bedToMidnightHours,bedToEndTimeHours);
    
                bedtimeToMidnightPay = bedTimeHours * bedtimeToMidnightHourlyRate;
            }
            
            if(workingShift.endTime.getHours() > 0 && workingShift.endTime.getHours() <= 4){
                let postMidnightHours = workingShift.endTime.getHours();

                if(workingShift.bedTime.getHours() > 0 && workingShift.bedTime.getHours() <= 4){
                    postMidnightHours -= workingShift.bedTime.getHours();
                }
                
                postMidnightPay = postMidnightHours * postMidnightHourlyRate
            }
            
            totalPay = preBedTimePay + bedtimeToMidnightPay + postMidnightPay
        }
        else{
            errors.push("The provided working shift is invalid."); 
        }

        return {
            preBedTimePay,
            bedtimeToMidnightPay,
            postMidnightPay,
            totalPay,
            errors,
        };
    }
}