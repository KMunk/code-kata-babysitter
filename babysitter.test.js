/*
The babysitter 
- starts no earlier than 5:00PM
- leaves no later than 4:00AM
- gets paid $12/hour from start-time to bedtime
- gets paid $8/hour from bedtime to midnight
- gets paid $16/hour from midnight to end of job
- gets paid for full hours (no fractional hours)
*/

const babysitter = require('./babysitter');

test('starts no earlier than 5:00PM', () =>{
    let startTime = new Date('2021-06-22 17:00.000');

    expect(babysitter.isValidStartTime(startTime))
        .toBe(true);

    startTime = new Date('2021-06-22 14:00.000');
    expect(babysitter.isValidStartTime(startTime))
        .toBe(false);

    startTime = new Date('2021-06-22 18:00.000');
    expect(babysitter.isValidStartTime(startTime))
        .toBe(true);
});

test('leaves no later than 4:00 AM', () => {
    let endTime = new Date('2021-06-23 04:00.00');

    expect(babysitter.isValidEndTime(endTime))
        .toBe(true);
    
    endTime = new Date('2021-06-23 05:00.00');
    expect(babysitter.isValidEndTime(endTime))
        .toBe(false);

    endTime = new Date('2021-06-23 03:00.000');
    expect(babysitter.isValidEndTime(endTime))
        .toBe(true);
});
