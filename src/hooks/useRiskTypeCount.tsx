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

// Define the RiskItem type for raw risk events
export interface RiskItem {
  id: string;
  riskType: string;
  severity: 'PotentialOBUMisoperation' | 'NegligableSeverity' | 'NoSeverity' | 'LowSeverity' | 'MediumSeverity' | 'HighSeverity';
  // additional properties as needed...
}

// Define the aggregated data structure for the chart
export interface ChartDataItem {
  riskType: string;
  total: number;
  HighSeverity: number;
  MediumSeverity: number;
  LowSeverity: number;
  NoSeverity: number;
  NegligableSeverity: number;
  PotentialOBUMisoperation: number;
}
// New aggregation function that groups by riskType and counts severity levels
export const countRiskTypesForBarChart = (data: RiskItem[]): ChartDataItem[] => {
  const aggregation: { [riskType: string]: ChartDataItem } = {};
  if (data) {
    data.forEach((item) => {
      const { riskType, severity } = item;
      if (!aggregation[riskType]) {
        aggregation[riskType] = {
          riskType,
          total: 0,
          HighSeverity: 0,
          MediumSeverity: 0,
          LowSeverity: 0,
          NoSeverity: 0,
          NegligableSeverity: 0,
          PotentialOBUMisoperation: 0,
        };
      }
      aggregation[riskType].total += 1;
      // Increase the count for the appropriate severity, if it exists
      if (severity in aggregation[riskType]) {
        aggregation[riskType][severity as keyof Omit<ChartDataItem, 'riskType' | 'total'>] += 1;
      }
    });
    return Object.values(aggregation);
  }
  return [];
};

export const countRiskTypesForRiskPieChart = (data: any[], flag: string): any[] => {
  const counts: { [key: string]: number } = {};
  if (data) {
    data.forEach(item => {
      let keyValue: string | undefined;
      if (flag === 'riskType') {
        keyValue = item.riskType;
      } else if (flag === 'severity') {
        keyValue = item.severity;
      } else if (flag === 'probability') {
        keyValue = item.probability;
      } else {
        keyValue = item.type;
      }
      if (keyValue) {
        counts[keyValue] = (counts[keyValue] || 0) + 1;
      }
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }
  return [];
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
export const getAnomalyLineColor = (type: string) => {
  let lineColor = "#32c7c1"; // default to secondary (light blue)
  if (type.includes('UnusualBehaviourOutOfBounds')) {
    lineColor = "#002353"; // primary dark blue
  } else if (type.includes('UnusualBehaviourRunning')) {
    lineColor = "#32c7c1"; // secondary light blue
  } else if (type.includes('SuspiciousDrivingPattern')) {
    lineColor = "#003f72"; // complementary dark blue variant
  } else if (type.includes('PersonMisVerified')) {
    lineColor = "#2cc1ba"; // complementary variant
  } else if (type.includes('PersonOutOfBounds')) {
    lineColor = "#002353"; // primary dark blue
  } else if (type.includes('PersonRunning')) {
    lineColor = "#32c7c1"; // secondary light blue
  } else if (type.includes('HumanTrafficking')) {
    lineColor = "#001f40"; // even darker variant of primary
  } else if (type.includes('Contraband')) {
    lineColor = "#2cc1ba"; // complementary variant
  } else if (type.includes('Smuggling')) {
    lineColor = "#5ad4d0"; // lighter complementary blue
  } else if (type.includes('FalsifiedDocuments')) {
    lineColor = "#32c7c1"; // secondary light blue
  } else if (type.includes('UnlawfulParkingVehicle')) {
    lineColor = "#001f40"; // very dark variant
  } else {
    lineColor = "#32c7c1"; // default secondary light blue
  }
  return lineColor;
};


export const getDetectionLineColor = (type: string) => {
  let lineColor = "#32c7c1"; // default to secondary (light blue)
  if (type.includes('UnusualPatternDetection')) {
    lineColor = "#002353"; // primary dark blue
  } else if (type.includes('FaceVerificationIdentification')) {
    lineColor = "#32c7c1"; // secondary light blue
  } else if (type.includes('PersonPattern')) {
    lineColor = "#003f72"; // complementary dark blue variant
  } else if (type.includes('PersonIdentification')) {
    lineColor = "#2cc1ba"; // complementary variant
  } else if (type.includes('PersonVerification')) {
    lineColor = "#002353"; // primary dark blue
  } else if (type.includes('BlockchainVerification')) {
    lineColor = "#32c7c1"; // secondary light blue
  } else if (type.includes('Vesselrecognition')) {
    lineColor = "#001f40"; // very dark variant
  } else if (type.includes('Contraband')) {
    lineColor = "#2cc1ba"; // complementary variant
  } else if (type.includes('Smuggling')) {
    lineColor = "#5ad4d0"; // lighter complementary blue
  } else if (type.includes('Dangeroussubstance')) {
    lineColor = "#32c7c1"; // secondary light blue
  } else if (type.includes('HumanTrafficking')) {
    lineColor = "#001f40"; // very dark variant
  } else {
    lineColor = "#32c7c1"; // default secondary light blue
  }
  return lineColor;
};

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

// Helper function to format a date string.
// If the string is already in DD-MM-YYYY format, you can adjust as needed.
export function formatDateTime(dateStr: string) {
  // If the string is in DD-MM-YYYY (without time), you can simply return it.
  // Otherwise, if it's an ISO string, format it.
  if (dateStr.match(/^\d{2}-\d{2}-\d{4}$/)) {
    return dateStr;
  }
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return date.toLocaleString(undefined, options);
}
