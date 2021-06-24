# Code Kata - Babysitter

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node-dot-js&logoColor=white)
![jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)

based on: [jameskbride](https://gist.github.com/jameskbride)/[babysitter_kata](https://gist.github.com/jameskbride/5482722)
### Run Jest tests
```
npm run test
```

### Run main payment calculator
```
npm run calculatePay '2021-06-22 18:30.000' '2021-06-22 21:00.000' '2021-06-23 03:30.000'
```
The ```calculatePay``` script accepts three date parameters:
* StartTime
* BedTime
* EndTime

Based on the three provided parameters, a json object will be returned similar to the following:
```
{
  preBedTimePay: 24,
  bedtimeToMidnightPay: 24,
  postMidnightPay: 48,
  totalPay: 96
}
```

This will define the total pay for each period based on the following schedule:
| Time Period | Hourly Rate |
|-------------|-------------|
| start-time to bedtime | $12/hour |
| bedtime to midnight | $8/hour |
| midnight to end of job | $16/hour |

