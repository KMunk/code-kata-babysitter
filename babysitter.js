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
}