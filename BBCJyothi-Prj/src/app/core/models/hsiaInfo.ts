export interface HsiaInfo {
    hsiaHeldOrdDueDate: string,
    ehsiaHeldOrdNumber: string,
    hsiaHeldOrdUban: string,
    networkTransportType: string,
    subTransportType: string,
    fullTechInstallInd: string,
    efbsHsiaIwInd: string,
    efbsHsiaIwType: string,
    hsiaDueDate: string,
    hsiaECpeChoice: string,

    hsiaHeldOrdErrCode: string,
    hsiaHeldOrdErrDes: string,
    hsiaHeldSource: string,
    hsiaHeldSrcActName: string,
    falloutInd: string,

    emtAssignment: string,
    emtEquipmentType: string,
    emtVlan: string,
    emtPortAssignment: string,
    emtFbgAccessCvlan: string,
    inlSvlan: string,
    inlCvlan: string
}
