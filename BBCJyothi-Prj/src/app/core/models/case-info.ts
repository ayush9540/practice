import { CaseInfoComponent } from "src/app/modules/case/case-info/case-info.component";


export class CaseInfo {

    constructor(caseId: string) {
        this.caseId = caseId;
    }
    "caseId": string;
    "caseYanked": any;
    "tableCase": any;
    "caseOwner": any;
    "tableSite": any;
    "tableSof": any;
    "tableContact": any;
    "tableAddress": any;
    "tableQueue": any;
    "tableWipbin": any;
    "tableUser": any;
    "tableCondition": any;
    "tableGbstElm": any;
    "tableGbstElmPrty":any;
    "details":any;
    "containerRef": CaseInfoComponent;
    "isNew":any;

}
