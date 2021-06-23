/*
Feature:
As a babysitter
In order to get paid for 1 night of work
I want to calculate my nightly charge
*/

module.exports = {
    isValidStartTime(startTime) {
        let isValid = false;

        if(startTime instanceof Date){
            isValid = startTime.getHours() >= 17;
        }
        
        return isValid;
    },
}