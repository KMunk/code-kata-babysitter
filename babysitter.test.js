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

    expect(babysitter.isValidWorkingTime(startTime))
        .toBe(true);

    startTime = new Date('2021-06-22 14:00.000');
    expect(babysitter.isValidWorkingTime(startTime))
        .toBe(false);

    startTime = new Date('2021-06-22 18:00.000');
    expect(babysitter.isValidWorkingTime(startTime))
        .toBe(true);

    startTime = new Date('2021-06-23 01:00.000');
    expect(babysitter.isValidWorkingTime(startTime))
        .toBe(true);
});

test('leaves no later than 4:00 AM', () => {
    let endTime = new Date('2021-06-23 04:00.00');

    expect(babysitter.isValidWorkingTime(endTime))
        .toBe(true);
    
    endTime = new Date('2021-06-23 05:00.00');
    expect(babysitter.isValidWorkingTime(endTime))
        .toBe(false);

    endTime = new Date('2021-06-23 03:00.000');
    expect(babysitter.isValidWorkingTime(endTime))
        .toBe(true);

    endTime = new Date('2021-06-22 21:00.000');
    expect(babysitter.isValidWorkingTime(endTime))
        .toBe(true);
});

test('gets paid $12/hour from start-time to bedtime', () => {
    let workingShift = {
        startTime: new Date('2021-06-22 18:00.000'),
        bedTime: new Date('2021-06-22 21:00.000'),
        endTime: new Date('2021-06-23 04:00.000'),
    }

    expect(babysitter.calculatePay(workingShift).preBedTimePay)
        .toBe(36);
});

test('gets paid $8/hour from bedtime to midnight', () => {
    let workingShift = {
        startTime: new Date('2021-06-22 18:00.000'),
        bedTime: new Date('2021-06-22 21:00.000'),
        endTime: new Date('2021-06-23 04:00.000'),
    }

    expect(babysitter.calculatePay(workingShift).bedtimeToMidnightPay)
        .toBe(24);

    workingShift = {
        startTime: new Date('2021-06-22 18:00.000'),
        bedTime: new Date('2021-06-23 1:00.000'),
        endTime: new Date('2021-06-23 04:00.000'),
    }

    expect(babysitter.calculatePay(workingShift).bedtimeToMidnightPay)
        .toBe(0);

    workingShift = {
        startTime: new Date('2021-06-22 18:00.000'),
        bedTime: new Date('2021-06-22 20:00.000'),
        endTime: new Date('2021-06-22 21:00.000'),
    }

    expect(babysitter.calculatePay(workingShift).bedtimeToMidnightPay)
        .toBe(8);
});

test('gets paid $16/hour from midnight to end of job', () =>{
    let workingShift = {
        startTime: new Date('2021-06-22 18:00.000'),
        bedTime: new Date('2021-06-22 21:00.000'),
        endTime: new Date('2021-06-23 04:00.000'),
    }

    expect(babysitter.calculatePay(workingShift).postMidnightPay)
        .toBe(64);

    workingShift = {
        startTime: new Date('2021-06-22 18:00.000'),
        bedTime: new Date('2021-06-23 01:00.000'),
        endTime: new Date('2021-06-23 04:00.000'),
    }

    expect(babysitter.calculatePay(workingShift).postMidnightPay)
        .toBe(48);
});

test('gets paid for full hours (no fractional hours)', () => {
    let workingShift = {
        startTime: new Date('2021-06-22 18:30.000'),
        bedTime: new Date('2021-06-22 21:00.000'),
        endTime: new Date('2021-06-23 03:30.000'),
    }

    expect(babysitter.calculatePay(workingShift).totalPay)
        .toBe(96);
});

test('In order to get paid for 1 night of work, I want to calculate my nightly charge', () =>{
    let workingShift = {
        startTime: new Date('2021-06-22 18:30.000'),
        bedTime: new Date('2021-06-22 21:00.000'),
        endTime: new Date('2021-06-23 03:30.000'),
    }

    expect(babysitter.isValidWorkingShift(workingShift))
        .toBe(true);

    workingShift = {
        startTime: new Date('2021-06-22 18:30.000'),
        bedTime: new Date('2021-06-22 21:00.000'),
        endTime: new Date('2021-06-24 03:30.000'),
    }

    expect(babysitter.isValidWorkingShift(workingShift))
        .toBe(false);    
});
