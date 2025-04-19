
import { dataItem } from "./interfaces/riskData";

const riskTypes = ["SuspiciousDrivingPattern", "HumanTrafficking", "UTurnVehicle", "Contraband"];
const severities = [
  "PotentialOBUMisoperation",
  "NoSeverity",
  "LowSeverity",
  "MediumSeverity",
  "HighSeverity",
  "NegligableSeverity",
];
const probabilities = ["Rare", "AlmostImprobable", "HighlyProbable", "Frequent", "Occasional", "VeryProbable"];

// <-- new array for involved‐object types
const involvedTypes = ["Person", "Vessel", "Vehicule"];
let visualIdCounter = 1;              // ← initialize counter


// Helper: random element from an array
const randomElement = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// Helper: generate a random date between two dates
const randomDateInInterval = (start: Date, end: Date): Date => {
  const diff = end.getTime() - start.getTime();
  const randomOffset = Math.floor(Math.random() * diff);
  return new Date(start.getTime() + randomOffset);
};

export const generateDummyData = (count: number): dataItem[] => {
  const dummyData: dataItem[] = [];
  const startDate = new Date("2024-01-26T17:12:43.225Z");
  const endDate = new Date("2024-01-31T17:12:43.225Z");

  for (let i = 0; i < count; i++) {
    // For each iteration, generate a group with the same date & riskType
    const duplicates = Math.floor(Math.random() * 5) + 1; // 1 to 5 items
    const randomDate = randomDateInInterval(startDate, endDate).toISOString();
    const riskType = randomElement(riskTypes);
    const severity = randomElement(severities);
    const probability = randomElement(probabilities);

    for (let j = 0; j < duplicates; j++) {
      const riskItem: dataItem = {
        id: `${i}-${j}`, // unique id
        datetime: randomDate,
        type: "Risk",
        riskType,
        severity,
        probability,
        involvedObjects: [
          {
            type: randomElement(involvedTypes),
            visualId: visualIdCounter++,
            location: {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [23.78352554, 37.97843493],
              },
              properties: {
                detectionConfidence: parseFloat(Math.random().toFixed(2)),
                trackingConfidence: parseFloat(Math.random().toFixed(2)),
              },
            },
            role: "Carrier|Passenger|Stowaways",
            metadata: [
              {
                fileMediaType: "JPG",
                description: "Officer picture",
                fileURI: "http://myhost.com/path/image.jpg",
              },
            ],
          },
        ],
        location: {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [23.7834875, 37.9785241],
          },
          properties: {},
        },
        trackingDetection: {
          uavLocation: {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [23.783581129277605, 37.978414892115768],
            },
            properties: {},
          },
          detectionConfidence: [
            parseFloat(Math.random().toFixed(2)),
            parseFloat(Math.random().toFixed(2)),
          ],
          trackingConfidence: [
            parseFloat(Math.random().toFixed(2)),
            parseFloat(Math.random().toFixed(2)),
          ],
          geometries: [
            {
              type: "Feature",
              geometry: {
                type: "Polygon",
                coordinates: [
                  [
                    [23.783488, 37.9784476],
                    [23.7835765, 37.9784476],
                    [23.783614, 37.9784053],
                    [23.7835658, 37.9783799],
                    [23.7835604, 37.9784053],
                    [23.7835255, 37.9784037],
                    [23.7834746, 37.9784095],
                    [23.7834766, 37.9784465],
                    [23.783488, 37.9784476],
                  ],
                ],
              },
              properties: { prohibited_area: "internal" },
            },
          ],
        },
        faceDetection: { images: ["imageBASE64"] },
        metrics: [
          { unit: "number", description: "Number of vans", key: "num_vans", value: "1" },
          { unit: "number", description: "Number of motorcycles", key: "num_motorcycles", value: "1" },
          {
            unit: "kg",
            description: "Modeled vehicle weight",
            key: "modeled_vehicle_weight",
            value: "13000",
          },
          {
            unit: "kg",
            description: "Registered cargo weight",
            key: "registered_cargo_weight",
            value: "8000",
          },
          { unit: "ppm", description: "CO2 levels", key: "CO2_levels", value: "130" },
          {
            unit: "counted",
            description: "Estimated number of people",
            key: "estimated_number_of_people",
            value: "1",
          },
        ],
        metadata: [
          {
            fileMediaType: "JPG",
            description: "Vessel picture",
            fileURI: "http://myhost.com/path/image.jpg",
          },
        ],
      };
      dummyData.push(riskItem);
    }
  }
  return dummyData;
};

export const dummyData = generateDummyData(25);


