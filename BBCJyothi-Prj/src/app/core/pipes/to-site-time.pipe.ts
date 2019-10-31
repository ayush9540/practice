import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toSiteTime'
})
export class ToSiteTimePipe implements PipeTransform {

  transform(dbTime: any, inputs?: any): any {
    if (!dbTime) return "";
    if (!inputs) return "";
    if (!inputs[0]) return "";
    if (!inputs[1]) return "";
    //Considering the date time from database coming with GMT Time Zone
    //console.log('dbTime' + dbTime);
    let dateTimeInGMT = new Date(dbTime + " GMT");
    //console.log('dateTimeInGMT' + dateTimeInGMT);
    //Converting the GMT date time to users/site timezone in database
    let siteDateTime = dateTimeInGMT.toLocaleString("en-US", { timeZone: inputs });
    //console.log('siteDateTime' + siteDateTime);
    //Replacing the special chars in the date time string
    return siteDateTime.replace(',', '');
  }
}
