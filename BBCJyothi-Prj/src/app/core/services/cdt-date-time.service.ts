import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CdtDateTimeService {

  constructor() { }

  getTransFormedDateTime(dateTime) {
    let cdt;
    let datePipe: DatePipe = new DatePipe('en-US');
    if (dateTime == null || dateTime == undefined || dateTime == "") return "";
    dateTime += ' GMT';
    try {
      let dateTimeInLocal = new Date(dateTime);
      console.log('dateTimeInSystemTimeZone: ' + dateTime);
      cdt = datePipe.transform(dateTimeInLocal, 'MM/dd/yyyy hh:mm:ss a', 'CDT');
      console.log('dateTimeIn CDT-TimeZone: ' + cdt);
    } catch (err) {
      return dateTime;
    }
    return cdt;
  }

  getCDTDateTime(format, dateTime, zone) {
    if (dateTime == null || dateTime == undefined || dateTime == "") return "";
    dateTime += ' GMT';
    let datePipe: DatePipe = new DatePipe('en-US');
    let dateTimeInLocal = new Date(dateTime);
    console.log('dateTimeInSystemTimeZone: ' + dateTime);
    if (format == undefined || format == null || format == "") format = 'MM/dd/yyyy hh:mm:ss a';
    if (zone == undefined || zone == null || zone == "") zone = 'CDT';
    let cdt = datePipe.transform(dateTimeInLocal, format, zone);
    console.log('dateTimeIn CDT-TimeZone: ' + cdt);
    return cdt;
  }

  getCurrentDateTimeInCDT() {
    let datePipe: DatePipe = new DatePipe('en-US');
    let dateTimeInLocal = new Date();
    console.log('dateTimeInSystemTimeZone: ' + dateTimeInLocal);
    let format = 'MM/dd/yyyy hh:mm:ss a';
    let zone = 'CDT';
    let cdt = datePipe.transform(dateTimeInLocal, format, zone);
    console.log('dateTimeIn CDT-TimeZone: ' + cdt);
    return cdt;
  }

  getCurrentDateTimeInGMT() {
    let datePipe: DatePipe = new DatePipe('en-US');
    let dateTimeInLocal = new Date();
    console.log('dateTimeInSystemTimeZone: ' + dateTimeInLocal);
    let format = 'MM/dd/yyyy hh:mm:ss a';
    let zone = 'GMT';
    let cdt = datePipe.transform(dateTimeInLocal, format, zone);
    console.log('dateTimeIn GMT-TimeZone: ' + cdt);
    return cdt;
  }

  getGMTDateTime(dateTime) {
    if (dateTime == null || dateTime == undefined || dateTime == "") return "";
    dateTime += ' CDT';
    console.log('Got dateTime: ' + dateTime);
    let datePipe: DatePipe = new DatePipe('en-US');
    let dateTimeInLocal = new Date(dateTime);
    console.log('dateTimeInSystemTimeZone: ' + dateTime);
    let gmt = datePipe.transform(dateTimeInLocal, 'MM/dd/yyyy hh:mm:ss a', 'GMT');
    console.log('dateTimeIn GMT-TimeZone: ' + gmt);
    return gmt;
  }

  getCurrentDate(format, zone) {
    let datePipe: DatePipe = new DatePipe('en-US');
    let dateTimeInLocal = new Date();
    console.log('dateTimeInSystemTimeZone: ' + dateTimeInLocal);
    if (format == undefined || format == null || format == "") format = 'MM/dd/yyyy';
    if (zone == undefined || zone == null || zone == "") zone = 'GMT';
    let cdt = datePipe.transform(dateTimeInLocal, format, zone);
    console.log('dateTimeIn ' + format + ' ' + zone + '  -> TimeZone: ' + cdt);
    return cdt;
  }

  monthDiff(date1, date2) {
    let diff = (date2.getTime() - date1.getTime()) / 1000;
    diff /= (60 * 60 * 24 * 7 * 4);
    let diffMonths = Math.abs(Math.round(diff));
    console.log('Days difference between ' + date1 + ' - ' + date2 + ': ' + diffMonths + ' Months');
    return diffMonths;
  }

  daysDiff(date1, date2) {
    const diffTime = date2.getTime() - date1.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    console.log('Days difference between ' + date1 + ' - ' + date2 + ': ' + diffDays + ' days');
    return diffDays;
  }

}
