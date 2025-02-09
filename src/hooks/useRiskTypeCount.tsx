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

export const countRiskTypesForPieChart = (data: any[], flag: any): any => {
  const riskTypeCounts: { [key: string]: { count: number; ids: string[] } } = {};

  if (data) {
    data.forEach((item: any) => {
      const { riskType, severity, probability, type, ids } = item;

      // Determine the type based on the flag
      const types =
        flag === 'riskType'
          ? riskType
          : flag === 'severity'
          ? severity
          : flag === 'probability'
          ? probability
          : type;

      if (!types || !ids) return; // Skip if the type or ids are undefined or null

      if (riskTypeCounts[types]) {
        riskTypeCounts[types].count += item.total; // Increment by the total value

        // Merge and deduplicate ids
        riskTypeCounts[types].ids = [
          ...riskTypeCounts[types].ids,
          ...ids.filter((id: string) => !riskTypeCounts[types].ids.includes(id)),
        ];
      } else {
        riskTypeCounts[types] = { count: item.total, ids: [...ids] }; // Initialize count and ids
      }
    });

    // Transform the data into the desired format
    return Object.entries(riskTypeCounts).map(([name, { count, ids }]) => ({
      name,
      value: count,
      ids,
    }));
  }

  return [];
};

export const countOccurrences = (dataArray: any[]) => {
  const result: { [key: string]: { [value: string]: number } } = {
    riskType: {},
    severity: {},
    probability: {},
    anomalyType: {},
    statistics: {}
  };
if (dataArray){
  dataArray.forEach((item) => {
    // console.log(item);
    // Count for riskType
    if (item.anomalyType) {
      if (!result.anomalyType[item.anomalyType]) {
        result.anomalyType[item.anomalyType] = 0;
      }
      result.anomalyType[item.anomalyType] += 1;
    }
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

// Function to process the data
export const processAnomalyData = (data: any[]) => {
  // Update the type declaration for result
  const result: Record<string, Record<string, { count: number; ids: string[] }>> = {};
  
  data.forEach((anomaly) => {
    // Check if datetime, anomalyType, and _id are present
    if (!anomaly.datetime || !anomaly.anomalyType || !anomaly._id) return;

    const date = new Date(anomaly.datetime);
    // Format the date in European structure (dd-mm-yyyy)
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    // // Format the time in hh:mm
    // const hours = String(date.getHours()).padStart(2, '0');
    // const minutes = String(date.getMinutes()).padStart(2, '0');
    //const formattedTime = `${hours}:${minutes}`;
    const formattedDate = `${day}-${month}-${year}`;


    const type = anomaly.anomalyType;
    const id = anomaly.id;

    if (!result[formattedDate]) {
      result[formattedDate] = {};
    }

    if (!result[formattedDate][type]) {
      result[formattedDate][type] = { count: 0, ids: [] }; // Initialize with count and ids
    }

    result[formattedDate][type].count += 1;
    result[formattedDate][type].ids.push(id);
  });

  const formattedResult = [];

  for (const [time, types] of Object.entries(result)) {
    for (const [type, { count, ids }] of Object.entries(types)) {
      formattedResult.push({ time, type, total: count, ids });
    }
  }
  return formattedResult;
};

// Process by time instead of date
export const processAnomalyDataToTime = (data: any[]) => {
  // Update the type declaration for result
  const result: Record<string, Record<string, { count: number; ids: string[] }>> = {};
  
  data.forEach((anomaly) => {
    // Check if datetime, anomalyType, and _id are present
    if (!anomaly.datetime || !anomaly.anomalyType || !anomaly._id) return;

    const date = new Date(anomaly.datetime);

    // Format the time in hh:mm
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const formattedDate = `${hours}:${minutes}`;


    const type = anomaly.anomalyType;
    const id = anomaly.id;

    if (!result[formattedDate]) {
      result[formattedDate] = {};
    }

    if (!result[formattedDate][type]) {
      result[formattedDate][type] = { count: 0, ids: [] }; // Initialize with count and ids
    }

    result[formattedDate][type].count += 1;
    result[formattedDate][type].ids.push(id);
  });

  const formattedResult = [];

  for (const [time, types] of Object.entries(result)) {
    for (const [type, { count, ids }] of Object.entries(types)) {
      formattedResult.push({ time, type, total: count, ids });
    }
  }
  return formattedResult;
};

// Function to process the data
export const processDataDetection = (data: any[])=> {
  const result: Record<string, Record<string,  { count: number; ids: string[] }>> = {};
  data.forEach((anomaly) => {
    
       // Check if datetime and anomalyType are present
       if (!anomaly.datetime || !anomaly.detectionType || !anomaly._id) return;

       const date = new Date(anomaly.datetime);
       // Format the date in European structure (dd-mm-yyyy)
       const day = String(date.getDate()).padStart(2, '0');
       const month = String(date.getMonth() + 1).padStart(2, '0');
       const year = date.getFullYear();
       const formattedDate = `${day}-${month}-${year}`;
   
       const type = anomaly.detectionType;
       const id = anomaly.id;

       if (!result[formattedDate]) {
         result[formattedDate] = {};
       }
   
       if (!result[formattedDate][type]) {
        result[formattedDate][type] = { count: 0, ids: [] }; // Initialize with count and ids       
      }
      //  result[formattedDate][type]=Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
      result[formattedDate][type].count += 1;
      result[formattedDate][type].ids.push(id);
       });
  const formattedResult= [];

  for (const [time, types] of Object.entries(result)) {
    for (const [type, { count, ids }] of Object.entries(types)) {
      formattedResult.push({ time, type, total: count, ids });
    }
  }
  return formattedResult;
};
// Function to process the data
export const processDataDetectionToTime = (data: any[])=> {
  const result: Record<string, Record<string,  { count: number; ids: string[] }>> = {};
  data.forEach((anomaly) => {
    
       // Check if datetime and anomalyType are present
       if (!anomaly.datetime || !anomaly.detectionType || !anomaly._id) return;

       const date = new Date(anomaly.datetime);
        // Format the time in hh:mm
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const formattedDate = `${hours}:${minutes}`;
   
       const type = anomaly.detectionType;
       const id = anomaly.id;

       if (!result[formattedDate]) {
         result[formattedDate] = {};
       }
   
       if (!result[formattedDate][type]) {
        result[formattedDate][type] = { count: 0, ids: [] }; // Initialize with count and ids       
      }
      //  result[formattedDate][type]=Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
      result[formattedDate][type].count += 1;
      result[formattedDate][type].ids.push(id);
       });
  const formattedResult= [];

  for (const [time, types] of Object.entries(result)) {
    for (const [type, { count, ids }] of Object.entries(types)) {
      formattedResult.push({ time, type, total: count, ids });
    }
  }
  return formattedResult;
};

export const totalDataTypesPerDay = (data: any[])=> {
  const counts: { [key: string]: number } = {};

  data.forEach((record, index) => {
    if(record) {
      try {
      const date = new Date(record.datetime).toISOString().split('T')[0]; // '2024-01-25'
      if (counts[date]) {
          counts[date]++;
      } else {
          counts[date] = 1;
      }
    }
  
  catch (error:any) {
    // Catch any error and log the problematic record
    console.error(`Error processing record at index ${index}:`, record);
    console.error('Error message:', error.message);
  }
 } });

  return counts

}

export const getAnomalyLineColor=(type:string)=>{
  let lineColor = "#cf1578";
  if(type.includes('UnusualBehaviourOutOfBounds')){
    lineColor="#2389ff";
   //lineColor="#2389ff";
  }
  else if(type.includes('UnusualBehaviourRunning')){
    lineColor="#0dcccc";
   //lineColor="#002353";
  }
  else if(type.includes('SuspiciousDrivingPattern')){
    lineColor="#7f6bff";

  }
  else if(type.includes('PersonMisVerified')){
    lineColor="#c1952f";

  }
  else if(type.includes('PersonOutOfBounds')){
    lineColor="#2f97b7";

  }
  else if(type.includes('PersonRunning')){
    lineColor="#2389ff";

  }
  else if(type.includes('HumanTrafficking')){
    lineColor="#68c738";

  }
  else if(type.includes('Contraband')){
    lineColor="#f3ca20";

  }
  else if(type.includes('Smuggling')){
    lineColor="#d72631";

  }
  else if(type.includes('FalsifiedDocuments')){
    lineColor="#a2d5c6";

  }
  else if(type.includes('SuspiciousDrivingPattern')){
    lineColor="#077b8a";

  }
  else if(type.includes('UnlawfulParkingVehicle')){
    lineColor="#5c3c92";
  }
  else{
    lineColor="#ff87cd";

  }
  return lineColor;
}

export const getDetectionLineColor=(type:string)=>{
  let lineColor = "#cf1578";
  if(type.includes('UnusualPatternDetection')){
    lineColor="#2389ff";
  }
  else if(type.includes('FaceVerificationIdentification')){
    lineColor="#0dcccc";

  }
  else if(type.includes('PersonPattern')){
    lineColor="#7f6bff";

  }
  else if(type.includes('PersonIdentification')){
    lineColor="#c1952f";

  }
  else if(type.includes('PersonVerification')){
    lineColor="#2f97b7";

  }
  else if(type.includes('BlockchainVerification')){
    lineColor="#2389ff";

  }
  else if(type.includes('Vesselrecognition')){
    lineColor="#68c738";

  }
  else if(type.includes('Contraband')){
    lineColor="#f3ca20";

  }
  else if(type.includes('Smuggling')){
    lineColor="#d72631";

  }
  else if(type.includes('Dangeroussubstance')){
    lineColor="#a2d5c6";

  }
  else if(type.includes('HumanTrafficking')){
    lineColor="#077b8a";

  }
  else if(type.includes('PersonPattern')){
    lineColor="#5c3c92";
  }
  else{
    lineColor="#ff87cd";

  }
  return lineColor;
}

// type CountData = {
//   [date: string]: number;
// };

type CombinedData = {
  [date: string]: {
    anomalyCount: number;
    detectionCount: number;
  };
};

interface DataPoint {
  date: string;
  anomalyCount: number;
  detectionCount: number;
}
 /**
* Merges anomaly and detection data by date and prepares it for charting.
* @param anomalyData - Object with anomaly counts by date.
* @param detectionData - Object with detection counts by date.
* @returns An array of data points ready for charting.
*/
export function mergeAndPrepareData(anomalyData: any, detectionData: any): any[] {
 // Merge and combine anomaly and detection data
 const allDates = new Set([...Object.keys(anomalyData), ...Object.keys(detectionData)]);
 const combinedData: CombinedData = {};

 allDates.forEach(date => {
   combinedData[date] = {
     anomalyCount: anomalyData[date] || 0,
     detectionCount: detectionData[date] || 0
   };
 });

 // Transform the combined data into an array of DataPoint for charting
 const chartData: DataPoint[] = Object.entries(combinedData).map(([date, { anomalyCount, detectionCount }]) => ({
   date,
   anomalyCount,
   detectionCount
 }));
  // Transform data to fit the seriesField requirement
  const transformedData = chartData.flatMap(item => [
    { date: item.date, type: 'anomalyCount', value: item.anomalyCount },
    { date: item.date, type: 'detectionCount', value: item.detectionCount }
  ]);
 return transformedData;
}