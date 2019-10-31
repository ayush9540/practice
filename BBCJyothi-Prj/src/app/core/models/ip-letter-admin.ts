export class IpLetterAdmin {
 "objid" : string;
 "letterType":string;
 "employeeObjid":string;
 "letterObjid":string;
 "revisionStatus":string;
}
export class IpLetterTemplate {
  "iplBody": IplBody;
  "iplTags" : IplTags[];
}

export class IplBody {
  "content" :any;

}

export class IplTags {
  "letterType":string;
  "name" : string;
  "tagExample":string;
}