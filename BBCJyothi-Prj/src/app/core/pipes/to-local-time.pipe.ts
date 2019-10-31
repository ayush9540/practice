import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
@Pipe({
  name: 'toLocalTime'
})
export class ToLocalTimePipe implements PipeTransform {

  transform(dbTime: any, args?: any): any {
    if (!dbTime) return "";
    //if (!dbTime) return "";
    //Considering the date time from database coming with GMT Time Zone
    //console.log('dbTime: ' + dbTime);
    dbTime += ' GMT';
    let datePipe: DatePipe = new DatePipe('en-US');
    //console.log('dateTimeInGMT: ' + dbTime);
    //console.log(dbTime + ' GMT -> in CDT' + this.calcTime(dbTime, 'CDT', '-5'));
    let dateTimeInLocal = new Date(dbTime);
    //console.log('dateTimeInSystemTimeZone: ' + dbTime);
    let cdt = datePipe.transform(dateTimeInLocal, 'MM/dd/yyyy hh:mm:ss a', 'CDT');
    //console.log('dateTimeIn CDT-TimeZone: ' + cdt);
    // console.log('After new object dateTime locale' + dbTime.toLocaleString());
    return cdt;
    // console.log('After new object dateTime' + dbTime);
    // let localDateTime = dateTimeInLocal.toLocaleString("en-US", { timeZone: "America/Chicago", hour12: true });
    // console.log('localDateTime' + localDateTime);
    // //Replacing the special chars in the date time string
    // return localDateTime.replace(',', '');
  }

  calcTime(dbTime, city, offset) {
    // create Date object for current location
    var d = new Date(dbTime);
    // convert to msec
    // add local time zone offset 
    // get UTC time in msec
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    // create new Date object for different city
    // using supplied offset
    var nd = new Date(utc + (3600000 * offset));
    // return time as a string
    return "The local time in " + city + " is " + nd.toLocaleString();
  }

}
