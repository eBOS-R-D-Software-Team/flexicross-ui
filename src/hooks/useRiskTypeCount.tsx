import { dataItem } from "../interfaces/riskData";

export const countRiskTypes = (data: any,flag:any): any => {
  const riskTypeCounts: { [key: string]: number } = {};
if(data){
  data.forEach((item: any) => {
    const { riskType,severity,probability,type } = item;
const types = (flag === 'riskType') ? riskType : (flag === 'severity') ? severity :(flag === 'probability') ? probability : type;
    if (riskTypeCounts[types]) {
      riskTypeCounts[types]++;
    } else {
      riskTypeCounts[types] = 1;
    }
  });

  return Object.entries(riskTypeCounts).map(([labelName, value]) => ({
    labelName,
    value,
  }));}
};

export const countOccurrences = (dataArray: dataItem[]) => {
  const result: { [key: string]: { [value: string]: number } } = {
    riskType: {},
    severity: {},
    probability: {},
    statistics: {}
  };
if (dataArray){
  dataArray.forEach((item) => {
    console.log(item);
    // Count for riskType
    if (item.riskType) {
      if (!result.riskType[item.riskType]) {
        result.riskType[item.riskType] = 0;
      }
      result.riskType[item.riskType] += 1;
    }
    // Count for severity
    // if (item.probability) {
    //   if (!result.probability[item.probability]) {
    //     result.probability[item.probability] = 0;
    //   }
    //   result.probability[item.probability] += 1;
    // }
        // Count for severity
        // if (item.riskType) {
        //   if (!result.severity[item.riskType]) {
        //     result.severity[item.riskType] = 0;
        //   }
        //   result.severity[item.riskType] += 1;
        // }
    // Count for severity
    if (item.severity) {
      if (!result.severity[item.severity]) {
        result.severity[item.severity] = 0;
      }
      result.severity[item.severity] += 1;
    }
  });
result.statistics['total'] = dataArray.length;
  return result;} else { return {}}
};