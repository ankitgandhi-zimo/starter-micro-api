const data = {
  applicationReceiverId: "030240928",
  interchangeDateYYMMDD: "220120",
  interchangeDate: "20220120",
  interchangeTime: "1210",
  interchangeControlNumber: "369852970",
  providerFN: "MCKINLEY",
  providerLN: "MIYUME",
  // providerAddress: '302 W. 5th St., Suite 308',
  // providerCity: 'SAN PEDRO',
  // providerStateCode: 'CA',
  // providerZipCode: '907312750',
  providerNPI: "1285812875",
  locationFedID: "475303589",
  insurancePlanType: "MC",
  subscriberRelationship: "1",
  patientSSN: "SEY361A73265",
  subscriberLN: "BESS",
  subscriberFN: "SHIRLAN",
  insuranceType: "P",
  subscriberAddress: "712 S PEARL AVE",
  subscriberCity: "COMPTON",
  insuranceCity: "LOS ANGELES",
  subscriberStateCode: "CA",
  subscriberZipCode: "90221",
  subscriberDOB: "19790722",
  subscriberGender: "M",
  subscriberPayerId: "47198",
  insuranceName: "ANTHEM BLUE CROSS",
  insuranceAddress: "P O BOX 60007",
  insuranceStateCode: "P O BOX 60007",
  insuranceStateCode: "CA",
  insuranceZipCode: "90060",
  patientLN: "BESS",
  patientFN: "AKILAH",
  patientMN: "",
  patientAddress: "712 S PEARL AVE",
  patientCity: "COMPTON",
  patientStateCode: "CA",
  patientZipCode: "90221",
  patientDOB: "19810928",
  patientGender: "F",
  groupControlNumber: "1092824",
  DOS: "20220113",
  patientID: "3997",
  locationAddress: "302 W. 5th St., Suite 308",
  locationCity: "SAN PEDRO",
  locationStateCode: "CA",
  locationZipCode: "907312750",
  locationNPI: "1376922328",
  totalChargeAmount: "1044",
  acceptAssignment: "A",
  orignalRefNo: null,
  resubmissionCode: "1",
  placeOfService: "19",
};
//BHT*0019*00*000000001*20230503*0433*CH~
exports.ediTemplateText = (dataObj) =>
  `ISA*00*          *01*CYCTRANS  *ZZ*880509         *ZZ*CLAIMSCH       *${
    dataObj.interchangeDateYYMMDD
  }*${dataObj.interchangeTime}*|*00501*${
    dataObj.interchangeControlNumber
  }*1*T*:~
GS*HC**${dataObj.applicationReceiverId}*${dataObj.interchangeDate}*${
    dataObj.interchangeTime
  }*${dataObj.groupControlNumber}*X*005010X222A1~
ST*837*000000001*005010X222A1~
BHT*0019*00*000000001*${dataObj.interchangeDate}*${dataObj.interchangeTime}*CH~
NM1*41*2*Ink LLC*****46*396409880509~
PER*IC*${dataObj.clinic_name}*TE*${dataObj.clinicContact}~
NM1*40*2*CHANGE HEALTHCARE*****46*CLAIMSCH~
HL*1**20*1~
${dataObj.NM1_85_line}~
N3*${dataObj.locationAddress}~
N4*${dataObj.locationCity}*${dataObj.locationStateCode}*${
    dataObj.locationZipCode
  }~
REF*EI*${dataObj.locationFedID}~
HL*2*1*22*0~
SBR*${dataObj.insuranceType}*${dataObj.subscriberRelationship}*******${
    dataObj.insurancePlanType
  }~
NM1*IL*1*${dataObj.subscriberLN}*${dataObj.subscriberFN}****MI*${
    dataObj.patientSSN
  }~
N3*${dataObj.subscriberAddress}~
N4*${dataObj.subscriberCity}*${dataObj.subscriberStateCode}*${
    dataObj.subscriberZipCode
  }~
DMG*D8*${dataObj.subscriberDOB}*${dataObj.subscriberGender}~
NM1*PR*2*${dataObj.insuranceName}*****PI*${dataObj.subscriberPayerId}~
N3*${dataObj.insuranceAddress}~
N4*${dataObj.insuranceCity}*${dataObj.insuranceStateCode}*${
    dataObj.insuranceZipCode
  }~${
    dataObj.subscriberRelationship != "18"
      ? `
HL*3*2*23*0~
PAT*1~
NM1*QC*1*${dataObj.patientLN}*${dataObj.patientFN}${
          dataObj.patientMN ? "*" + dataObj.patientMN : ""
        }~
N3*${dataObj.patientAddress}~
N4*${dataObj.patientCity}*${dataObj.patientStateCode}*${dataObj.patientZipCode}~
DMG*D8*${dataObj.patientDOB}*${dataObj.patientGender}~`
      : ""
  }
${dataObj.stirngAfterClaim}
HI*${dataObj.icdCodes}~
${dataObj.NM1_82_line}
${dataObj.modifiedcpt}~
SE*{{LINES_COUNT}}*000000001~
GE*1*${dataObj.groupControlNumber}~
IEA*1*${dataObj.interchangeControlNumber}~`;

// const string = ediTemplateText(data)

// console.log(string.replace('{{LINES_COUNT}}', string.split('\n').length - 3))

// ABK:code1ABF:code2
