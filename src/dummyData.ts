
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
            type: "Person",
            visualId: 1,
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


// import { dataItem } from "./interfaces/riskData";

// export const dummyData: dataItem[] = [
//     {
//       "id": "14",
//       "datetime": "2024-01-26T17:12:43.225Z",
//       "type": "Risk",
//       "riskType": "SuspiciousDrivingPattern",
//       "severity": "PotentialOBUMisoperation",
//       "probability": "Rare",	"involvedObjects": [
// 		{
// 			"type": "Person",
// 			"visualId": 1,
// 			"location": {
// 				"type": "Feature",
// 				"geometry": {
// 					"type": "Point",
// 					"coordinates": [
// 						23.78352554,
// 						37.97843493
// 					]
// 				},
// 				"properties": {
// 					"detectionConfidence": 0.8222631216049194,
// 					"trackingConfidence": 0.8222631216049194
// 				}
// 			},
// 			"role": "Carrier|Passenger|Stowaways",
// 			"metadata": [
// 				{
// 					"fileMediaType": "JPG",
// 					"description": "Officier picture",
// 					"fileURI": "http://myhost.com/path/image.jpg"
// 				}
// 			]
// 		},
// 		{
// 			"type": "Vessel",
// 			"shipType": "LPG Tanker",
// 			"mmsi": "249891000",
// 			"name": "B GAS NEPTUNE",
// 			"imoNumber": "9269374",
// 			"callSign": "9HA2059",
// 			"navigationStatus": "Under way",
// 			"location": {
// 				"type": "Feature",
// 				"geometry": {
// 					"type": "Point",
// 					"coordinates": [
// 						23.783485549232723,
// 						37.978891183660909
// 					]
// 				},
// 				"properties": {}
// 			},
// 			"role": "Carrier|Passenger|Stowaways|Goods|Contraband",
// 			"cargo": [
// 				{
// 					"quantity": 1000,
// 					"unit": "tons",
// 					"description": "cotton socks",
// 					"type": "Good|Contraband"
// 				}
// 			]
// 		},
// 		{
// 			"type": "Van|Car|Bycicle|Motorcycle|Bus|Scooter|Truck|Semi-Truck|Train",
// 			"plate": "ABCDE1234",
// 			"totalPersonOnBoard": 12,
// 			"location": {
// 				"type": "Feature",
// 				"geometry": {
// 					"type": "Point",
// 					"coordinates": [
// 						23.783485549232723,
// 						37.978891183660909
// 					]
// 				},
// 				"properties": {}
// 			},
// 			"externalAttributes": {
// 				"unlawfulParkingId": "UP_001",
// 				"uTurnId": "UT_001",
// 				"uTurnConfLevel":"1.1"
// 			}
// 		}
// 	],
// 	"location": {
// 		"type": "Feature",
// 		"geometry": {
// 			"type": "Point",
// 			"coordinates": [
// 				23.7834875,
// 				37.9785241
// 			]
// 		},
// 		"properties": {}
// 	},
// 	"trackingDetection": {
// 		"uavLocation": {
// 			"type": "Feature",
// 			"geometry": {
// 				"type": "Point",
// 				"coordinates": [
// 					23.783581129277605,
// 					37.978414892115768
// 				]
// 			},
// 			"properties": {}
// 		},
// 		"detectionConfidence": [
// 			0.8222631216049194,
// 			0.6486086249351502
// 		],
// 		"trackingConfidence": [
// 			0.8222631216049194,
// 			0.6486086249351502
// 		],
// 		"geometries": [
// 			{
// 				"type": "Feature",
// 				"geometry": {
// 					"type": "Polygon",
// 					"coordinates": [
// 						[
// 							[
// 								23.783488,
// 								37.9784476
// 							],
// 							[
// 								23.7835765,
// 								37.9784476
// 							],
// 							[
// 								23.783614,
// 								37.9784053
// 							],
// 							[
// 								23.7835658,
// 								37.9783799
// 							],
// 							[
// 								23.7835604,
// 								37.9784053
// 							],
// 							[
// 								23.7835255,
// 								37.9784037
// 							],
// 							[
// 								23.7834746,
// 								37.9784095
// 							],
// 							[
// 								23.7834766,
// 								37.9784465
// 							],
// 							[
// 								23.783488,
// 								37.9784476
// 							]
// 						]
// 					]
// 				},
// 				"properties": {
// 					"prohibited_area": "internal"
// 				}
// 			}
// 		]
// 	},
// 	"faceDetection": {
// 		"images": [
// 			"imageBASE64"
// 		]
// 	},
// 	"metrics": [
// 		{
// 			"unit": "number",
// 			"description": "Number of vans",
// 			"key": "num_vans",
// 			"value": "1"
// 		},
// 		{
// 			"unit": "number",
// 			"description": "Number of motorcycles",
// 			"key": "num_motorcycles",
// 			"value": "1"
// 		},
// 		{
// 			"unit": "kg",
// 			"description": "Weight of the vehicle determined by modeling the outputs of the On-Board Unit (OBU) using eigenfrequency analysis.",
// 			"key": "modeled_vehicle_weight",
// 			"value": "13000"
// 		},
// 		{
// 			"unit": "kg",
// 			"description": "Registered weight of the cargo carried by the vehicle from the WINGS Citizen App.",
// 			"key": "registered_cargo_weight",
// 			"value": "8000"
// 		},
// 		{
// 			"unit": "ppm",
// 			"description": "Evolution of CO2 levels measured by the CO2 sensor",
// 			"key": "CO2_levels",
// 			"value": "130"
// 		},
// 		{
// 			"unit": "counted",
// 			"description": "Estimated number of people in the vehicle based on the fitted model",
// 			"key": "estimated_number_of_people",
// 			"value": "1"
// 		}
// 	],
// 	"metadata": [
// 		{
// 			"fileMediaType": "JPG",
// 			"description": "Vessel picture",
// 			"fileURI": "http://myhost.com/path/image.jpg"
// 		}
// 	]
//     },
//     {
//       "id": "15",
//       "datetime": "2024-01-26T17:12:43.225Z",
//       "type": "Risk",
//       "riskType": "SuspiciousDrivingPattern",
//       "severity": "PotentialOBUMisoperation",
//       "probability": "AlmostImprobable",	"involvedObjects": [
// 		{
// 			"type": "Person",
// 			"visualId": 1,
// 			"location": {
// 				"type": "Feature",
// 				"geometry": {
// 					"type": "Point",
// 					"coordinates": [
// 						23.78352554,
// 						37.97843493
// 					]
// 				},
// 				"properties": {
// 					"detectionConfidence": 0.8222631216049194,
// 					"trackingConfidence": 0.8222631216049194
// 				}
// 			},
// 			"role": "Carrier|Passenger|Stowaways",
// 			"metadata": [
// 				{
// 					"fileMediaType": "JPG",
// 					"description": "Officier picture",
// 					"fileURI": "http://myhost.com/path/image.jpg"
// 				}
// 			]
// 		},
// 		{
// 			"type": "Vessel",
// 			"shipType": "LPG Tanker",
// 			"mmsi": "249891000",
// 			"name": "B GAS NEPTUNE",
// 			"imoNumber": "9269374",
// 			"callSign": "9HA2059",
// 			"navigationStatus": "Under way",
// 			"location": {
// 				"type": "Feature",
// 				"geometry": {
// 					"type": "Point",
// 					"coordinates": [
// 						23.783485549232723,
// 						37.978891183660909
// 					]
// 				},
// 				"properties": {}
// 			},
// 			"role": "Carrier|Passenger|Stowaways|Goods|Contraband",
// 			"cargo": [
// 				{
// 					"quantity": 1000,
// 					"unit": "tons",
// 					"description": "cotton socks",
// 					"type": "Good|Contraband"
// 				}
// 			]
// 		},
// 		{
// 			"type": "Van|Car|Bycicle|Motorcycle|Bus|Scooter|Truck|Semi-Truck|Train",
// 			"plate": "ABCDE1234",
// 			"totalPersonOnBoard": 12,
// 			"location": {
// 				"type": "Feature",
// 				"geometry": {
// 					"type": "Point",
// 					"coordinates": [
// 						23.783485549232723,
// 						37.978891183660909
// 					]
// 				},
// 				"properties": {}
// 			},
// 			"externalAttributes": {
// 				"unlawfulParkingId": "UP_001",
// 				"uTurnId": "UT_001",
// 				"uTurnConfLevel":"1.1"
// 			}
// 		}
// 	],
// 	"location": {
// 		"type": "Feature",
// 		"geometry": {
// 			"type": "Point",
// 			"coordinates": [
// 				23.7834875,
// 				37.9785241
// 			]
// 		},
// 		"properties": {}
// 	},
// 	"trackingDetection": {
// 		"uavLocation": {
// 			"type": "Feature",
// 			"geometry": {
// 				"type": "Point",
// 				"coordinates": [
// 					23.783581129277605,
// 					37.978414892115768
// 				]
// 			},
// 			"properties": {}
// 		},
// 		"detectionConfidence": [
// 			0.8222631216049194,
// 			0.6486086249351502
// 		],
// 		"trackingConfidence": [
// 			0.8222631216049194,
// 			0.6486086249351502
// 		],
// 		"geometries": [
// 			{
// 				"type": "Feature",
// 				"geometry": {
// 					"type": "Polygon",
// 					"coordinates": [
// 						[
// 							[
// 								23.783488,
// 								37.9784476
// 							],
// 							[
// 								23.7835765,
// 								37.9784476
// 							],
// 							[
// 								23.783614,
// 								37.9784053
// 							],
// 							[
// 								23.7835658,
// 								37.9783799
// 							],
// 							[
// 								23.7835604,
// 								37.9784053
// 							],
// 							[
// 								23.7835255,
// 								37.9784037
// 							],
// 							[
// 								23.7834746,
// 								37.9784095
// 							],
// 							[
// 								23.7834766,
// 								37.9784465
// 							],
// 							[
// 								23.783488,
// 								37.9784476
// 							]
// 						]
// 					]
// 				},
// 				"properties": {
// 					"prohibited_area": "internal"
// 				}
// 			}
// 		]
// 	},
// 	"faceDetection": {
// 		"images": [
// 			"imageBASE64"
// 		]
// 	},
// 	"metrics": [
// 		{
// 			"unit": "number",
// 			"description": "Number of vans",
// 			"key": "num_vans",
// 			"value": "1"
// 		},
// 		{
// 			"unit": "number",
// 			"description": "Number of motorcycles",
// 			"key": "num_motorcycles",
// 			"value": "1"
// 		},
// 		{
// 			"unit": "kg",
// 			"description": "Weight of the vehicle determined by modeling the outputs of the On-Board Unit (OBU) using eigenfrequency analysis.",
// 			"key": "modeled_vehicle_weight",
// 			"value": "13000"
// 		},
// 		{
// 			"unit": "kg",
// 			"description": "Registered weight of the cargo carried by the vehicle from the WINGS Citizen App.",
// 			"key": "registered_cargo_weight",
// 			"value": "8000"
// 		},
// 		{
// 			"unit": "ppm",
// 			"description": "Evolution of CO2 levels measured by the CO2 sensor",
// 			"key": "CO2_levels",
// 			"value": "130"
// 		},
// 		{
// 			"unit": "counted",
// 			"description": "Estimated number of people in the vehicle based on the fitted model",
// 			"key": "estimated_number_of_people",
// 			"value": "1"
// 		}
// 	],
// 	"metadata": [
// 		{
// 			"fileMediaType": "JPG",
// 			"description": "Vessel picture",
// 			"fileURI": "http://myhost.com/path/image.jpg"
// 		}
// 	]
//     },
//     {
//       "id": "16",
//       "datetime": "2024-01-26T17:12:43.225Z",
//       "type": "Risk",
//       "riskType": "SuspiciousDrivingPattern",
//       "severity": "NoSeverity",
//       "probability": "HighlyProbable",	"involvedObjects": [
// 		{
// 			"type": "Person",
// 			"visualId": 1,
// 			"location": {
// 				"type": "Feature",
// 				"geometry": {
// 					"type": "Point",
// 					"coordinates": [
// 						23.78352554,
// 						37.97843493
// 					]
// 				},
// 				"properties": {
// 					"detectionConfidence": 0.8222631216049194,
// 					"trackingConfidence": 0.8222631216049194
// 				}
// 			},
// 			"role": "Carrier|Passenger|Stowaways",
// 			"metadata": [
// 				{
// 					"fileMediaType": "JPG",
// 					"description": "Officier picture",
// 					"fileURI": "http://myhost.com/path/image.jpg"
// 				}
// 			]
// 		},
// 		{
// 			"type": "Vessel",
// 			"shipType": "LPG Tanker",
// 			"mmsi": "249891000",
// 			"name": "B GAS NEPTUNE",
// 			"imoNumber": "9269374",
// 			"callSign": "9HA2059",
// 			"navigationStatus": "Under way",
// 			"location": {
// 				"type": "Feature",
// 				"geometry": {
// 					"type": "Point",
// 					"coordinates": [
// 						23.783485549232723,
// 						37.978891183660909
// 					]
// 				},
// 				"properties": {}
// 			},
// 			"role": "Carrier|Passenger|Stowaways|Goods|Contraband",
// 			"cargo": [
// 				{
// 					"quantity": 1000,
// 					"unit": "tons",
// 					"description": "cotton socks",
// 					"type": "Good|Contraband"
// 				}
// 			]
// 		},
// 		{
// 			"type": "Van|Car|Bycicle|Motorcycle|Bus|Scooter|Truck|Semi-Truck|Train",
// 			"plate": "ABCDE1234",
// 			"totalPersonOnBoard": 12,
// 			"location": {
// 				"type": "Feature",
// 				"geometry": {
// 					"type": "Point",
// 					"coordinates": [
// 						23.783485549232723,
// 						37.978891183660909
// 					]
// 				},
// 				"properties": {}
// 			},
// 			"externalAttributes": {
// 				"unlawfulParkingId": "UP_001",
// 				"uTurnId": "UT_001",
// 				"uTurnConfLevel":"1.1"
// 			}
// 		}
// 	],
// 	"location": {
// 		"type": "Feature",
// 		"geometry": {
// 			"type": "Point",
// 			"coordinates": [
// 				23.7834875,
// 				37.9785241
// 			]
// 		},
// 		"properties": {}
// 	},
// 	"trackingDetection": {
// 		"uavLocation": {
// 			"type": "Feature",
// 			"geometry": {
// 				"type": "Point",
// 				"coordinates": [
// 					23.783581129277605,
// 					37.978414892115768
// 				]
// 			},
// 			"properties": {}
// 		},
// 		"detectionConfidence": [
// 			0.8222631216049194,
// 			0.6486086249351502
// 		],
// 		"trackingConfidence": [
// 			0.8222631216049194,
// 			0.6486086249351502
// 		],
// 		"geometries": [
// 			{
// 				"type": "Feature",
// 				"geometry": {
// 					"type": "Polygon",
// 					"coordinates": [
// 						[
// 							[
// 								23.783488,
// 								37.9784476
// 							],
// 							[
// 								23.7835765,
// 								37.9784476
// 							],
// 							[
// 								23.783614,
// 								37.9784053
// 							],
// 							[
// 								23.7835658,
// 								37.9783799
// 							],
// 							[
// 								23.7835604,
// 								37.9784053
// 							],
// 							[
// 								23.7835255,
// 								37.9784037
// 							],
// 							[
// 								23.7834746,
// 								37.9784095
// 							],
// 							[
// 								23.7834766,
// 								37.9784465
// 							],
// 							[
// 								23.783488,
// 								37.9784476
// 							]
// 						]
// 					]
// 				},
// 				"properties": {
// 					"prohibited_area": "internal"
// 				}
// 			}
// 		]
// 	},
// 	"faceDetection": {
// 		"images": [
// 			"imageBASE64"
// 		]
// 	},
// 	"metrics": [
// 		{
// 			"unit": "number",
// 			"description": "Number of vans",
// 			"key": "num_vans",
// 			"value": "1"
// 		},
// 		{
// 			"unit": "number",
// 			"description": "Number of motorcycles",
// 			"key": "num_motorcycles",
// 			"value": "1"
// 		},
// 		{
// 			"unit": "kg",
// 			"description": "Weight of the vehicle determined by modeling the outputs of the On-Board Unit (OBU) using eigenfrequency analysis.",
// 			"key": "modeled_vehicle_weight",
// 			"value": "13000"
// 		},
// 		{
// 			"unit": "kg",
// 			"description": "Registered weight of the cargo carried by the vehicle from the WINGS Citizen App.",
// 			"key": "registered_cargo_weight",
// 			"value": "8000"
// 		},
// 		{
// 			"unit": "ppm",
// 			"description": "Evolution of CO2 levels measured by the CO2 sensor",
// 			"key": "CO2_levels",
// 			"value": "130"
// 		},
// 		{
// 			"unit": "counted",
// 			"description": "Estimated number of people in the vehicle based on the fitted model",
// 			"key": "estimated_number_of_people",
// 			"value": "1"
// 		}
// 	],
// 	"metadata": [
// 		{
// 			"fileMediaType": "JPG",
// 			"description": "Vessel picture",
// 			"fileURI": "http://myhost.com/path/image.jpg"
// 		}
// 	]
//     },
//     {
//       "id": "17",
//       "datetime": "2024-01-26T17:12:43.225Z",
//       "type": "Risk",
//       "riskType": "HumanTrafficking",
//       "severity": "NoSeverity",
//       "probability": "Frequent",	"involvedObjects": [
// 		{
// 			"type": "Person",
// 			"visualId": 1,
// 			"location": {
// 				"type": "Feature",
// 				"geometry": {
// 					"type": "Point",
// 					"coordinates": [
// 						23.78352554,
// 						37.97843493
// 					]
// 				},
// 				"properties": {
// 					"detectionConfidence": 0.8222631216049194,
// 					"trackingConfidence": 0.8222631216049194
// 				}
// 			},
// 			"role": "Carrier|Passenger|Stowaways",
// 			"metadata": [
// 				{
// 					"fileMediaType": "JPG",
// 					"description": "Officier picture",
// 					"fileURI": "http://myhost.com/path/image.jpg"
// 				}
// 			]
// 		},
// 		{
// 			"type": "Vessel",
// 			"shipType": "LPG Tanker",
// 			"mmsi": "249891000",
// 			"name": "B GAS NEPTUNE",
// 			"imoNumber": "9269374",
// 			"callSign": "9HA2059",
// 			"navigationStatus": "Under way",
// 			"location": {
// 				"type": "Feature",
// 				"geometry": {
// 					"type": "Point",
// 					"coordinates": [
// 						23.783485549232723,
// 						37.978891183660909
// 					]
// 				},
// 				"properties": {}
// 			},
// 			"role": "Carrier|Passenger|Stowaways|Goods|Contraband",
// 			"cargo": [
// 				{
// 					"quantity": 1000,
// 					"unit": "tons",
// 					"description": "cotton socks",
// 					"type": "Good|Contraband"
// 				}
// 			]
// 		},
// 		{
// 			"type": "Van|Car|Bycicle|Motorcycle|Bus|Scooter|Truck|Semi-Truck|Train",
// 			"plate": "ABCDE1234",
// 			"totalPersonOnBoard": 12,
// 			"location": {
// 				"type": "Feature",
// 				"geometry": {
// 					"type": "Point",
// 					"coordinates": [
// 						23.783485549232723,
// 						37.978891183660909
// 					]
// 				},
// 				"properties": {}
// 			},
// 			"externalAttributes": {
// 				"unlawfulParkingId": "UP_001",
// 				"uTurnId": "UT_001",
// 				"uTurnConfLevel":"1.1"
// 			}
// 		}
// 	],
// 	"location": {
// 		"type": "Feature",
// 		"geometry": {
// 			"type": "Point",
// 			"coordinates": [
// 				23.7834875,
// 				37.9785241
// 			]
// 		},
// 		"properties": {}
// 	},
// 	"trackingDetection": {
// 		"uavLocation": {
// 			"type": "Feature",
// 			"geometry": {
// 				"type": "Point",
// 				"coordinates": [
// 					23.783581129277605,
// 					37.978414892115768
// 				]
// 			},
// 			"properties": {}
// 		},
// 		"detectionConfidence": [
// 			0.8222631216049194,
// 			0.6486086249351502
// 		],
// 		"trackingConfidence": [
// 			0.8222631216049194,
// 			0.6486086249351502
// 		],
// 		"geometries": [
// 			{
// 				"type": "Feature",
// 				"geometry": {
// 					"type": "Polygon",
// 					"coordinates": [
// 						[
// 							[
// 								23.783488,
// 								37.9784476
// 							],
// 							[
// 								23.7835765,
// 								37.9784476
// 							],
// 							[
// 								23.783614,
// 								37.9784053
// 							],
// 							[
// 								23.7835658,
// 								37.9783799
// 							],
// 							[
// 								23.7835604,
// 								37.9784053
// 							],
// 							[
// 								23.7835255,
// 								37.9784037
// 							],
// 							[
// 								23.7834746,
// 								37.9784095
// 							],
// 							[
// 								23.7834766,
// 								37.9784465
// 							],
// 							[
// 								23.783488,
// 								37.9784476
// 							]
// 						]
// 					]
// 				},
// 				"properties": {
// 					"prohibited_area": "internal"
// 				}
// 			}
// 		]
// 	},
// 	"faceDetection": {
// 		"images": [
// 			"imageBASE64"
// 		]
// 	},
// 	"metrics": [
// 		{
// 			"unit": "number",
// 			"description": "Number of vans",
// 			"key": "num_vans",
// 			"value": "1"
// 		},
// 		{
// 			"unit": "number",
// 			"description": "Number of motorcycles",
// 			"key": "num_motorcycles",
// 			"value": "1"
// 		},
// 		{
// 			"unit": "kg",
// 			"description": "Weight of the vehicle determined by modeling the outputs of the On-Board Unit (OBU) using eigenfrequency analysis.",
// 			"key": "modeled_vehicle_weight",
// 			"value": "13000"
// 		},
// 		{
// 			"unit": "kg",
// 			"description": "Registered weight of the cargo carried by the vehicle from the WINGS Citizen App.",
// 			"key": "registered_cargo_weight",
// 			"value": "8000"
// 		},
// 		{
// 			"unit": "ppm",
// 			"description": "Evolution of CO2 levels measured by the CO2 sensor",
// 			"key": "CO2_levels",
// 			"value": "130"
// 		},
// 		{
// 			"unit": "counted",
// 			"description": "Estimated number of people in the vehicle based on the fitted model",
// 			"key": "estimated_number_of_people",
// 			"value": "1"
// 		}
// 	],
// 	"metadata": [
// 		{
// 			"fileMediaType": "JPG",
// 			"description": "Vessel picture",
// 			"fileURI": "http://myhost.com/path/image.jpg"
// 		}
// 	]
//     },
//     {
//       "id": "18",
//       "datetime": "2024-01-26T17:12:43.225Z",
//       "type": "Risk",
//       "riskType": "HumanTrafficking",
//       "severity": "NoSeverity",
//       "probability": "Occasional",	"involvedObjects": [
// 		{
// 			"type": "Person",
// 			"visualId": 1,
// 			"location": {
// 				"type": "Feature",
// 				"geometry": {
// 					"type": "Point",
// 					"coordinates": [
// 						23.78352554,
// 						37.97843493
// 					]
// 				},
// 				"properties": {
// 					"detectionConfidence": 0.8222631216049194,
// 					"trackingConfidence": 0.8222631216049194
// 				}
// 			},
// 			"role": "Carrier|Passenger|Stowaways",
// 			"metadata": [
// 				{
// 					"fileMediaType": "JPG",
// 					"description": "Officier picture",
// 					"fileURI": "http://myhost.com/path/image.jpg"
// 				}
// 			]
// 		},
// 		{
// 			"type": "Vessel",
// 			"shipType": "LPG Tanker",
// 			"mmsi": "249891000",
// 			"name": "B GAS NEPTUNE",
// 			"imoNumber": "9269374",
// 			"callSign": "9HA2059",
// 			"navigationStatus": "Under way",
// 			"location": {
// 				"type": "Feature",
// 				"geometry": {
// 					"type": "Point",
// 					"coordinates": [
// 						23.783485549232723,
// 						37.978891183660909
// 					]
// 				},
// 				"properties": {}
// 			},
// 			"role": "Carrier|Passenger|Stowaways|Goods|Contraband",
// 			"cargo": [
// 				{
// 					"quantity": 1000,
// 					"unit": "tons",
// 					"description": "cotton socks",
// 					"type": "Good|Contraband"
// 				}
// 			]
// 		},
// 		{
// 			"type": "Van|Car|Bycicle|Motorcycle|Bus|Scooter|Truck|Semi-Truck|Train",
// 			"plate": "ABCDE1234",
// 			"totalPersonOnBoard": 12,
// 			"location": {
// 				"type": "Feature",
// 				"geometry": {
// 					"type": "Point",
// 					"coordinates": [
// 						23.783485549232723,
// 						37.978891183660909
// 					]
// 				},
// 				"properties": {}
// 			},
// 			"externalAttributes": {
// 				"unlawfulParkingId": "UP_001",
// 				"uTurnId": "UT_001",
// 				"uTurnConfLevel":"1.1"
// 			}
// 		}
// 	],
// 	"location": {
// 		"type": "Feature",
// 		"geometry": {
// 			"type": "Point",
// 			"coordinates": [
// 				23.7834875,
// 				37.9785241
// 			]
// 		},
// 		"properties": {}
// 	},
// 	"trackingDetection": {
// 		"uavLocation": {
// 			"type": "Feature",
// 			"geometry": {
// 				"type": "Point",
// 				"coordinates": [
// 					23.783581129277605,
// 					37.978414892115768
// 				]
// 			},
// 			"properties": {}
// 		},
// 		"detectionConfidence": [
// 			0.8222631216049194,
// 			0.6486086249351502
// 		],
// 		"trackingConfidence": [
// 			0.8222631216049194,
// 			0.6486086249351502
// 		],
// 		"geometries": [
// 			{
// 				"type": "Feature",
// 				"geometry": {
// 					"type": "Polygon",
// 					"coordinates": [
// 						[
// 							[
// 								23.783488,
// 								37.9784476
// 							],
// 							[
// 								23.7835765,
// 								37.9784476
// 							],
// 							[
// 								23.783614,
// 								37.9784053
// 							],
// 							[
// 								23.7835658,
// 								37.9783799
// 							],
// 							[
// 								23.7835604,
// 								37.9784053
// 							],
// 							[
// 								23.7835255,
// 								37.9784037
// 							],
// 							[
// 								23.7834746,
// 								37.9784095
// 							],
// 							[
// 								23.7834766,
// 								37.9784465
// 							],
// 							[
// 								23.783488,
// 								37.9784476
// 							]
// 						]
// 					]
// 				},
// 				"properties": {
// 					"prohibited_area": "internal"
// 				}
// 			}
// 		]
// 	},
// 	"faceDetection": {
// 		"images": [
// 			"imageBASE64"
// 		]
// 	},
// 	"metrics": [
// 		{
// 			"unit": "number",
// 			"description": "Number of vans",
// 			"key": "num_vans",
// 			"value": "1"
// 		},
// 		{
// 			"unit": "number",
// 			"description": "Number of motorcycles",
// 			"key": "num_motorcycles",
// 			"value": "1"
// 		},
// 		{
// 			"unit": "kg",
// 			"description": "Weight of the vehicle determined by modeling the outputs of the On-Board Unit (OBU) using eigenfrequency analysis.",
// 			"key": "modeled_vehicle_weight",
// 			"value": "13000"
// 		},
// 		{
// 			"unit": "kg",
// 			"description": "Registered weight of the cargo carried by the vehicle from the WINGS Citizen App.",
// 			"key": "registered_cargo_weight",
// 			"value": "8000"
// 		},
// 		{
// 			"unit": "ppm",
// 			"description": "Evolution of CO2 levels measured by the CO2 sensor",
// 			"key": "CO2_levels",
// 			"value": "130"
// 		},
// 		{
// 			"unit": "counted",
// 			"description": "Estimated number of people in the vehicle based on the fitted model",
// 			"key": "estimated_number_of_people",
// 			"value": "1"
// 		}
// 	],
// 	"metadata": [
// 		{
// 			"fileMediaType": "JPG",
// 			"description": "Vessel picture",
// 			"fileURI": "http://myhost.com/path/image.jpg"
// 		}
// 	]
//     },
//     {
//       "id": "19",
//       "datetime": "2024-01-26T17:12:43.225Z",
//       "type": "Risk",
//       "riskType": "HumanTrafficking",
//       "severity": "NoSeverity",
//       "probability": "Rare",	"involvedObjects": [
// 		{
// 			"type": "Person",
// 			"visualId": 1,
// 			"location": {
// 				"type": "Feature",
// 				"geometry": {
// 					"type": "Point",
// 					"coordinates": [
// 						23.78352554,
// 						37.97843493
// 					]
// 				},
// 				"properties": {
// 					"detectionConfidence": 0.8222631216049194,
// 					"trackingConfidence": 0.8222631216049194
// 				}
// 			},
// 			"role": "Carrier|Passenger|Stowaways",
// 			"metadata": [
// 				{
// 					"fileMediaType": "JPG",
// 					"description": "Officier picture",
// 					"fileURI": "http://myhost.com/path/image.jpg"
// 				}
// 			]
// 		},
// 		{
// 			"type": "Vessel",
// 			"shipType": "LPG Tanker",
// 			"mmsi": "249891000",
// 			"name": "B GAS NEPTUNE",
// 			"imoNumber": "9269374",
// 			"callSign": "9HA2059",
// 			"navigationStatus": "Under way",
// 			"location": {
// 				"type": "Feature",
// 				"geometry": {
// 					"type": "Point",
// 					"coordinates": [
// 						23.783485549232723,
// 						37.978891183660909
// 					]
// 				},
// 				"properties": {}
// 			},
// 			"role": "Carrier|Passenger|Stowaways|Goods|Contraband",
// 			"cargo": [
// 				{
// 					"quantity": 1000,
// 					"unit": "tons",
// 					"description": "cotton socks",
// 					"type": "Good|Contraband"
// 				}
// 			]
// 		},
// 		{
// 			"type": "Van|Car|Bycicle|Motorcycle|Bus|Scooter|Truck|Semi-Truck|Train",
// 			"plate": "ABCDE1234",
// 			"totalPersonOnBoard": 12,
// 			"location": {
// 				"type": "Feature",
// 				"geometry": {
// 					"type": "Point",
// 					"coordinates": [
// 						23.783485549232723,
// 						37.978891183660909
// 					]
// 				},
// 				"properties": {}
// 			},
// 			"externalAttributes": {
// 				"unlawfulParkingId": "UP_001",
// 				"uTurnId": "UT_001",
// 				"uTurnConfLevel":"1.1"
// 			}
// 		}
// 	],
// 	"location": {
// 		"type": "Feature",
// 		"geometry": {
// 			"type": "Point",
// 			"coordinates": [
// 				23.7834875,
// 				37.9785241
// 			]
// 		},
// 		"properties": {}
// 	},
// 	"trackingDetection": {
// 		"uavLocation": {
// 			"type": "Feature",
// 			"geometry": {
// 				"type": "Point",
// 				"coordinates": [
// 					23.783581129277605,
// 					37.978414892115768
// 				]
// 			},
// 			"properties": {}
// 		},
// 		"detectionConfidence": [
// 			0.8222631216049194,
// 			0.6486086249351502
// 		],
// 		"trackingConfidence": [
// 			0.8222631216049194,
// 			0.6486086249351502
// 		],
// 		"geometries": [
// 			{
// 				"type": "Feature",
// 				"geometry": {
// 					"type": "Polygon",
// 					"coordinates": [
// 						[
// 							[
// 								23.783488,
// 								37.9784476
// 							],
// 							[
// 								23.7835765,
// 								37.9784476
// 							],
// 							[
// 								23.783614,
// 								37.9784053
// 							],
// 							[
// 								23.7835658,
// 								37.9783799
// 							],
// 							[
// 								23.7835604,
// 								37.9784053
// 							],
// 							[
// 								23.7835255,
// 								37.9784037
// 							],
// 							[
// 								23.7834746,
// 								37.9784095
// 							],
// 							[
// 								23.7834766,
// 								37.9784465
// 							],
// 							[
// 								23.783488,
// 								37.9784476
// 							]
// 						]
// 					]
// 				},
// 				"properties": {
// 					"prohibited_area": "internal"
// 				}
// 			}
// 		]
// 	},
// 	"faceDetection": {
// 		"images": [
// 			"imageBASE64"
// 		]
// 	},
// 	"metrics": [
// 		{
// 			"unit": "number",
// 			"description": "Number of vans",
// 			"key": "num_vans",
// 			"value": "1"
// 		},
// 		{
// 			"unit": "number",
// 			"description": "Number of motorcycles",
// 			"key": "num_motorcycles",
// 			"value": "1"
// 		},
// 		{
// 			"unit": "kg",
// 			"description": "Weight of the vehicle determined by modeling the outputs of the On-Board Unit (OBU) using eigenfrequency analysis.",
// 			"key": "modeled_vehicle_weight",
// 			"value": "13000"
// 		},
// 		{
// 			"unit": "kg",
// 			"description": "Registered weight of the cargo carried by the vehicle from the WINGS Citizen App.",
// 			"key": "registered_cargo_weight",
// 			"value": "8000"
// 		},
// 		{
// 			"unit": "ppm",
// 			"description": "Evolution of CO2 levels measured by the CO2 sensor",
// 			"key": "CO2_levels",
// 			"value": "130"
// 		},
// 		{
// 			"unit": "counted",
// 			"description": "Estimated number of people in the vehicle based on the fitted model",
// 			"key": "estimated_number_of_people",
// 			"value": "1"
// 		}
// 	],
// 	"metadata": [
// 		{
// 			"fileMediaType": "JPG",
// 			"description": "Vessel picture",
// 			"fileURI": "http://myhost.com/path/image.jpg"
// 		}
// 	]
//     },
//     {
//       "id": "20",
//       "datetime": "2024-01-26T17:12:43.225Z",
//       "type": "Risk",
//       "riskType": "HumanTrafficking",
//       "severity": "NoSeverity",
//       "probability": "AlmostImprobable",	"involvedObjects": [
// 		{
// 			"type": "Person",
// 			"visualId": 1,
// 			"location": {
// 				"type": "Feature",
// 				"geometry": {
// 					"type": "Point",
// 					"coordinates": [
// 						23.78352554,
// 						37.97843493
// 					]
// 				},
// 				"properties": {
// 					"detectionConfidence": 0.8222631216049194,
// 					"trackingConfidence": 0.8222631216049194
// 				}
// 			},
// 			"role": "Carrier|Passenger|Stowaways",
// 			"metadata": [
// 				{
// 					"fileMediaType": "JPG",
// 					"description": "Officier picture",
// 					"fileURI": "http://myhost.com/path/image.jpg"
// 				}
// 			]
// 		},
// 		{
// 			"type": "Vessel",
// 			"shipType": "LPG Tanker",
// 			"mmsi": "249891000",
// 			"name": "B GAS NEPTUNE",
// 			"imoNumber": "9269374",
// 			"callSign": "9HA2059",
// 			"navigationStatus": "Under way",
// 			"location": {
// 				"type": "Feature",
// 				"geometry": {
// 					"type": "Point",
// 					"coordinates": [
// 						23.783485549232723,
// 						37.978891183660909
// 					]
// 				},
// 				"properties": {}
// 			},
// 			"role": "Carrier|Passenger|Stowaways|Goods|Contraband",
// 			"cargo": [
// 				{
// 					"quantity": 1000,
// 					"unit": "tons",
// 					"description": "cotton socks",
// 					"type": "Good|Contraband"
// 				}
// 			]
// 		},
// 		{
// 			"type": "Van|Car|Bycicle|Motorcycle|Bus|Scooter|Truck|Semi-Truck|Train",
// 			"plate": "ABCDE1234",
// 			"totalPersonOnBoard": 12,
// 			"location": {
// 				"type": "Feature",
// 				"geometry": {
// 					"type": "Point",
// 					"coordinates": [
// 						23.783485549232723,
// 						37.978891183660909
// 					]
// 				},
// 				"properties": {}
// 			},
// 			"externalAttributes": {
// 				"unlawfulParkingId": "UP_001",
// 				"uTurnId": "UT_001",
// 				"uTurnConfLevel":"1.1"
// 			}
// 		}
// 	],
// 	"location": {
// 		"type": "Feature",
// 		"geometry": {
// 			"type": "Point",
// 			"coordinates": [
// 				23.7834875,
// 				37.9785241
// 			]
// 		},
// 		"properties": {}
// 	},
// 	"trackingDetection": {
// 		"uavLocation": {
// 			"type": "Feature",
// 			"geometry": {
// 				"type": "Point",
// 				"coordinates": [
// 					23.783581129277605,
// 					37.978414892115768
// 				]
// 			},
// 			"properties": {}
// 		},
// 		"detectionConfidence": [
// 			0.8222631216049194,
// 			0.6486086249351502
// 		],
// 		"trackingConfidence": [
// 			0.8222631216049194,
// 			0.6486086249351502
// 		],
// 		"geometries": [
// 			{
// 				"type": "Feature",
// 				"geometry": {
// 					"type": "Polygon",
// 					"coordinates": [
// 						[
// 							[
// 								23.783488,
// 								37.9784476
// 							],
// 							[
// 								23.7835765,
// 								37.9784476
// 							],
// 							[
// 								23.783614,
// 								37.9784053
// 							],
// 							[
// 								23.7835658,
// 								37.9783799
// 							],
// 							[
// 								23.7835604,
// 								37.9784053
// 							],
// 							[
// 								23.7835255,
// 								37.9784037
// 							],
// 							[
// 								23.7834746,
// 								37.9784095
// 							],
// 							[
// 								23.7834766,
// 								37.9784465
// 							],
// 							[
// 								23.783488,
// 								37.9784476
// 							]
// 						]
// 					]
// 				},
// 				"properties": {
// 					"prohibited_area": "internal"
// 				}
// 			}
// 		]
// 	},
// 	"faceDetection": {
// 		"images": [
// 			"imageBASE64"
// 		]
// 	},
// 	"metrics": [
// 		{
// 			"unit": "number",
// 			"description": "Number of vans",
// 			"key": "num_vans",
// 			"value": "1"
// 		},
// 		{
// 			"unit": "number",
// 			"description": "Number of motorcycles",
// 			"key": "num_motorcycles",
// 			"value": "1"
// 		},
// 		{
// 			"unit": "kg",
// 			"description": "Weight of the vehicle determined by modeling the outputs of the On-Board Unit (OBU) using eigenfrequency analysis.",
// 			"key": "modeled_vehicle_weight",
// 			"value": "13000"
// 		},
// 		{
// 			"unit": "kg",
// 			"description": "Registered weight of the cargo carried by the vehicle from the WINGS Citizen App.",
// 			"key": "registered_cargo_weight",
// 			"value": "8000"
// 		},
// 		{
// 			"unit": "ppm",
// 			"description": "Evolution of CO2 levels measured by the CO2 sensor",
// 			"key": "CO2_levels",
// 			"value": "130"
// 		},
// 		{
// 			"unit": "counted",
// 			"description": "Estimated number of people in the vehicle based on the fitted model",
// 			"key": "estimated_number_of_people",
// 			"value": "1"
// 		}
// 	],
// 	"metadata": [
// 		{
// 			"fileMediaType": "JPG",
// 			"description": "Vessel picture",
// 			"fileURI": "http://myhost.com/path/image.jpg"
// 		}
// 	]
//     },
//     {
//       "id": "21",
//       "datetime": "2024-01-26T17:12:43.225Z",
//       "type": "Risk",
//       "riskType": "SuspiciousDrivingPattern",
//       "severity": "LowSeverity",
//       "probability": "HighlyProbable",	"involvedObjects": [
// 		{
// 			"type": "Person",
// 			"visualId": 1,
// 			"location": {
// 				"type": "Feature",
// 				"geometry": {
// 					"type": "Point",
// 					"coordinates": [
// 						23.78352554,
// 						37.97843493
// 					]
// 				},
// 				"properties": {
// 					"detectionConfidence": 0.8222631216049194,
// 					"trackingConfidence": 0.8222631216049194
// 				}
// 			},
// 			"role": "Carrier|Passenger|Stowaways",
// 			"metadata": [
// 				{
// 					"fileMediaType": "JPG",
// 					"description": "Officier picture",
// 					"fileURI": "http://myhost.com/path/image.jpg"
// 				}
// 			]
// 		},
// 		{
// 			"type": "Vessel",
// 			"shipType": "LPG Tanker",
// 			"mmsi": "249891000",
// 			"name": "B GAS NEPTUNE",
// 			"imoNumber": "9269374",
// 			"callSign": "9HA2059",
// 			"navigationStatus": "Under way",
// 			"location": {
// 				"type": "Feature",
// 				"geometry": {
// 					"type": "Point",
// 					"coordinates": [
// 						23.783485549232723,
// 						37.978891183660909
// 					]
// 				},
// 				"properties": {}
// 			},
// 			"role": "Carrier|Passenger|Stowaways|Goods|Contraband",
// 			"cargo": [
// 				{
// 					"quantity": 1000,
// 					"unit": "tons",
// 					"description": "cotton socks",
// 					"type": "Good|Contraband"
// 				}
// 			]
// 		},
// 		{
// 			"type": "Van|Car|Bycicle|Motorcycle|Bus|Scooter|Truck|Semi-Truck|Train",
// 			"plate": "ABCDE1234",
// 			"totalPersonOnBoard": 12,
// 			"location": {
// 				"type": "Feature",
// 				"geometry": {
// 					"type": "Point",
// 					"coordinates": [
// 						23.783485549232723,
// 						37.978891183660909
// 					]
// 				},
// 				"properties": {}
// 			},
// 			"externalAttributes": {
// 				"unlawfulParkingId": "UP_001",
// 				"uTurnId": "UT_001",
// 				"uTurnConfLevel":"1.1"
// 			}
// 		}
// 	],
// 	"location": {
// 		"type": "Feature",
// 		"geometry": {
// 			"type": "Point",
// 			"coordinates": [
// 				23.7834875,
// 				37.9785241
// 			]
// 		},
// 		"properties": {}
// 	},
// 	"trackingDetection": {
// 		"uavLocation": {
// 			"type": "Feature",
// 			"geometry": {
// 				"type": "Point",
// 				"coordinates": [
// 					23.783581129277605,
// 					37.978414892115768
// 				]
// 			},
// 			"properties": {}
// 		},
// 		"detectionConfidence": [
// 			0.8222631216049194,
// 			0.6486086249351502
// 		],
// 		"trackingConfidence": [
// 			0.8222631216049194,
// 			0.6486086249351502
// 		],
// 		"geometries": [
// 			{
// 				"type": "Feature",
// 				"geometry": {
// 					"type": "Polygon",
// 					"coordinates": [
// 						[
// 							[
// 								23.783488,
// 								37.9784476
// 							],
// 							[
// 								23.7835765,
// 								37.9784476
// 							],
// 							[
// 								23.783614,
// 								37.9784053
// 							],
// 							[
// 								23.7835658,
// 								37.9783799
// 							],
// 							[
// 								23.7835604,
// 								37.9784053
// 							],
// 							[
// 								23.7835255,
// 								37.9784037
// 							],
// 							[
// 								23.7834746,
// 								37.9784095
// 							],
// 							[
// 								23.7834766,
// 								37.9784465
// 							],
// 							[
// 								23.783488,
// 								37.9784476
// 							]
// 						]
// 					]
// 				},
// 				"properties": {
// 					"prohibited_area": "internal"
// 				}
// 			}
// 		]
// 	},
// 	"faceDetection": {
// 		"images": [
// 			"imageBASE64"
// 		]
// 	},
// 	"metrics": [
// 		{
// 			"unit": "number",
// 			"description": "Number of vans",
// 			"key": "num_vans",
// 			"value": "1"
// 		},
// 		{
// 			"unit": "number",
// 			"description": "Number of motorcycles",
// 			"key": "num_motorcycles",
// 			"value": "1"
// 		},
// 		{
// 			"unit": "kg",
// 			"description": "Weight of the vehicle determined by modeling the outputs of the On-Board Unit (OBU) using eigenfrequency analysis.",
// 			"key": "modeled_vehicle_weight",
// 			"value": "13000"
// 		},
// 		{
// 			"unit": "kg",
// 			"description": "Registered weight of the cargo carried by the vehicle from the WINGS Citizen App.",
// 			"key": "registered_cargo_weight",
// 			"value": "8000"
// 		},
// 		{
// 			"unit": "ppm",
// 			"description": "Evolution of CO2 levels measured by the CO2 sensor",
// 			"key": "CO2_levels",
// 			"value": "130"
// 		},
// 		{
// 			"unit": "counted",
// 			"description": "Estimated number of people in the vehicle based on the fitted model",
// 			"key": "estimated_number_of_people",
// 			"value": "1"
// 		}
// 	],
// 	"metadata": [
// 		{
// 			"fileMediaType": "JPG",
// 			"description": "Vessel picture",
// 			"fileURI": "http://myhost.com/path/image.jpg"
// 		}
// 	]
//     },
//     {
//       "id": "22",
//       "datetime": "2024-01-26T17:12:43.225Z",
//       "type": "Risk",
//       "riskType": "UTurnVehicle",
//       "severity": "LowSeverity",
//       "probability": "Frequent",	"involvedObjects": [
// 		{
// 			"type": "Person",
// 			"visualId": 1,
// 			"location": {
// 				"type": "Feature",
// 				"geometry": {
// 					"type": "Point",
// 					"coordinates": [
// 						23.78352554,
// 						37.97843493
// 					]
// 				},
// 				"properties": {
// 					"detectionConfidence": 0.8222631216049194,
// 					"trackingConfidence": 0.8222631216049194
// 				}
// 			},
// 			"role": "Carrier|Passenger|Stowaways",
// 			"metadata": [
// 				{
// 					"fileMediaType": "JPG",
// 					"description": "Officier picture",
// 					"fileURI": "http://myhost.com/path/image.jpg"
// 				}
// 			]
// 		},
// 		{
// 			"type": "Vessel",
// 			"shipType": "LPG Tanker",
// 			"mmsi": "249891000",
// 			"name": "B GAS NEPTUNE",
// 			"imoNumber": "9269374",
// 			"callSign": "9HA2059",
// 			"navigationStatus": "Under way",
// 			"location": {
// 				"type": "Feature",
// 				"geometry": {
// 					"type": "Point",
// 					"coordinates": [
// 						23.783485549232723,
// 						37.978891183660909
// 					]
// 				},
// 				"properties": {}
// 			},
// 			"role": "Carrier|Passenger|Stowaways|Goods|Contraband",
// 			"cargo": [
// 				{
// 					"quantity": 1000,
// 					"unit": "tons",
// 					"description": "cotton socks",
// 					"type": "Good|Contraband"
// 				}
// 			]
// 		},
// 		{
// 			"type": "Van|Car|Bycicle|Motorcycle|Bus|Scooter|Truck|Semi-Truck|Train",
// 			"plate": "ABCDE1234",
// 			"totalPersonOnBoard": 12,
// 			"location": {
// 				"type": "Feature",
// 				"geometry": {
// 					"type": "Point",
// 					"coordinates": [
// 						23.783485549232723,
// 						37.978891183660909
// 					]
// 				},
// 				"properties": {}
// 			},
// 			"externalAttributes": {
// 				"unlawfulParkingId": "UP_001",
// 				"uTurnId": "UT_001",
// 				"uTurnConfLevel":"1.1"
// 			}
// 		}
// 	],
// 	"location": {
// 		"type": "Feature",
// 		"geometry": {
// 			"type": "Point",
// 			"coordinates": [
// 				23.7834875,
// 				37.9785241
// 			]
// 		},
// 		"properties": {}
// 	},
// 	"trackingDetection": {
// 		"uavLocation": {
// 			"type": "Feature",
// 			"geometry": {
// 				"type": "Point",
// 				"coordinates": [
// 					23.783581129277605,
// 					37.978414892115768
// 				]
// 			},
// 			"properties": {}
// 		},
// 		"detectionConfidence": [
// 			0.8222631216049194,
// 			0.6486086249351502
// 		],
// 		"trackingConfidence": [
// 			0.8222631216049194,
// 			0.6486086249351502
// 		],
// 		"geometries": [
// 			{
// 				"type": "Feature",
// 				"geometry": {
// 					"type": "Polygon",
// 					"coordinates": [
// 						[
// 							[
// 								23.783488,
// 								37.9784476
// 							],
// 							[
// 								23.7835765,
// 								37.9784476
// 							],
// 							[
// 								23.783614,
// 								37.9784053
// 							],
// 							[
// 								23.7835658,
// 								37.9783799
// 							],
// 							[
// 								23.7835604,
// 								37.9784053
// 							],
// 							[
// 								23.7835255,
// 								37.9784037
// 							],
// 							[
// 								23.7834746,
// 								37.9784095
// 							],
// 							[
// 								23.7834766,
// 								37.9784465
// 							],
// 							[
// 								23.783488,
// 								37.9784476
// 							]
// 						]
// 					]
// 				},
// 				"properties": {
// 					"prohibited_area": "internal"
// 				}
// 			}
// 		]
// 	},
// 	"faceDetection": {
// 		"images": [
// 			"imageBASE64"
// 		]
// 	},
// 	"metrics": [
// 		{
// 			"unit": "number",
// 			"description": "Number of vans",
// 			"key": "num_vans",
// 			"value": "1"
// 		},
// 		{
// 			"unit": "number",
// 			"description": "Number of motorcycles",
// 			"key": "num_motorcycles",
// 			"value": "1"
// 		},
// 		{
// 			"unit": "kg",
// 			"description": "Weight of the vehicle determined by modeling the outputs of the On-Board Unit (OBU) using eigenfrequency analysis.",
// 			"key": "modeled_vehicle_weight",
// 			"value": "13000"
// 		},
// 		{
// 			"unit": "kg",
// 			"description": "Registered weight of the cargo carried by the vehicle from the WINGS Citizen App.",
// 			"key": "registered_cargo_weight",
// 			"value": "8000"
// 		},
// 		{
// 			"unit": "ppm",
// 			"description": "Evolution of CO2 levels measured by the CO2 sensor",
// 			"key": "CO2_levels",
// 			"value": "130"
// 		},
// 		{
// 			"unit": "counted",
// 			"description": "Estimated number of people in the vehicle based on the fitted model",
// 			"key": "estimated_number_of_people",
// 			"value": "1"
// 		}
// 	],
// 	"metadata": [
// 		{
// 			"fileMediaType": "JPG",
// 			"description": "Vessel picture",
// 			"fileURI": "http://myhost.com/path/image.jpg"
// 		}
// 	]
//     },
//     {
//       "id": "23",
//       "datetime": "2024-01-26T17:12:43.225Z",
//       "type": "Risk",
//       "riskType": "UTurnVehicle",
//       "severity": "LowSeverity",
//       "probability": "Occasional",
// 	  "involvedObjects": [
// 		{
// 			"type": "Person",
// 			"visualId": 1,
// 			"location": {
// 				"type": "Feature",
// 				"geometry": {
// 					"type": "Point",
// 					"coordinates": [
// 						23.78352554,
// 						37.97843493
// 					]
// 				},
// 				"properties": {
// 					"detectionConfidence": 0.8222631216049194,
// 					"trackingConfidence": 0.8222631216049194
// 				}
// 			},
// 			"role": "Carrier|Passenger|Stowaways",
// 			"metadata": [
// 				{
// 					"fileMediaType": "JPG",
// 					"description": "Officier picture",
// 					"fileURI": "http://myhost.com/path/image.jpg"
// 				}
// 			]
// 		},
// 		{
// 			"type": "Vessel",
// 			"shipType": "LPG Tanker",
// 			"mmsi": "249891000",
// 			"name": "B GAS NEPTUNE",
// 			"imoNumber": "9269374",
// 			"callSign": "9HA2059",
// 			"navigationStatus": "Under way",
// 			"location": {
// 				"type": "Feature",
// 				"geometry": {
// 					"type": "Point",
// 					"coordinates": [
// 						23.783485549232723,
// 						37.978891183660909
// 					]
// 				},
// 				"properties": {}
// 			},
// 			"role": "Carrier|Passenger|Stowaways|Goods|Contraband",
// 			"cargo": [
// 				{
// 					"quantity": 1000,
// 					"unit": "tons",
// 					"description": "cotton socks",
// 					"type": "Good|Contraband"
// 				}
// 			]
// 		},
// 		{
// 			"type": "Van|Car|Bycicle|Motorcycle|Bus|Scooter|Truck|Semi-Truck|Train",
// 			"plate": "ABCDE1234",
// 			"totalPersonOnBoard": 12,
// 			"location": {
// 				"type": "Feature",
// 				"geometry": {
// 					"type": "Point",
// 					"coordinates": [
// 						23.783485549232723,
// 						37.978891183660909
// 					]
// 				},
// 				"properties": {}
// 			},
// 			"externalAttributes": {
// 				"unlawfulParkingId": "UP_001",
// 				"uTurnId": "UT_001",
// 				"uTurnConfLevel":"1.1"
// 			}
// 		}
// 	],
// 	"location": {
// 		"type": "Feature",
// 		"geometry": {
// 			"type": "Point",
// 			"coordinates": [
// 				23.7834875,
// 				37.9785241
// 			]
// 		},
// 		"properties": {}
// 	},
// 	"trackingDetection": {
// 		"uavLocation": {
// 			"type": "Feature",
// 			"geometry": {
// 				"type": "Point",
// 				"coordinates": [
// 					23.783581129277605,
// 					37.978414892115768
// 				]
// 			},
// 			"properties": {}
// 		},
// 		"detectionConfidence": [
// 			0.8222631216049194,
// 			0.6486086249351502
// 		],
// 		"trackingConfidence": [
// 			0.8222631216049194,
// 			0.6486086249351502
// 		],
// 		"geometries": [
// 			{
// 				"type": "Feature",
// 				"geometry": {
// 					"type": "Polygon",
// 					"coordinates": [
// 						[
// 							[
// 								23.783488,
// 								37.9784476
// 							],
// 							[
// 								23.7835765,
// 								37.9784476
// 							],
// 							[
// 								23.783614,
// 								37.9784053
// 							],
// 							[
// 								23.7835658,
// 								37.9783799
// 							],
// 							[
// 								23.7835604,
// 								37.9784053
// 							],
// 							[
// 								23.7835255,
// 								37.9784037
// 							],
// 							[
// 								23.7834746,
// 								37.9784095
// 							],
// 							[
// 								23.7834766,
// 								37.9784465
// 							],
// 							[
// 								23.783488,
// 								37.9784476
// 							]
// 						]
// 					]
// 				},
// 				"properties": {
// 					"prohibited_area": "internal"
// 				}
// 			}
// 		]
// 	},
// 	"faceDetection": {
// 		"images": [
// 			"imageBASE64"
// 		]
// 	},
// 	"metrics": [
// 		{
// 			"unit": "number",
// 			"description": "Number of vans",
// 			"key": "num_vans",
// 			"value": "1"
// 		},
// 		{
// 			"unit": "number",
// 			"description": "Number of motorcycles",
// 			"key": "num_motorcycles",
// 			"value": "1"
// 		},
// 		{
// 			"unit": "kg",
// 			"description": "Weight of the vehicle determined by modeling the outputs of the On-Board Unit (OBU) using eigenfrequency analysis.",
// 			"key": "modeled_vehicle_weight",
// 			"value": "13000"
// 		},
// 		{
// 			"unit": "kg",
// 			"description": "Registered weight of the cargo carried by the vehicle from the WINGS Citizen App.",
// 			"key": "registered_cargo_weight",
// 			"value": "8000"
// 		},
// 		{
// 			"unit": "ppm",
// 			"description": "Evolution of CO2 levels measured by the CO2 sensor",
// 			"key": "CO2_levels",
// 			"value": "130"
// 		},
// 		{
// 			"unit": "counted",
// 			"description": "Estimated number of people in the vehicle based on the fitted model",
// 			"key": "estimated_number_of_people",
// 			"value": "1"
// 		}
// 	],
// 	"metadata": [
// 		{
// 			"fileMediaType": "JPG",
// 			"description": "Vessel picture",
// 			"fileURI": "http://myhost.com/path/image.jpg"
// 		}
// 	]
//     },
//     {
// 	"id": "6",
// 	"datetime": "2024-01-26T17:12:43.225Z",
// 	"type": "Risk",
// 	"riskType": "HumanTrafficking",
// 	"severity":"LowSeverity",
// 	"probability":"HighlyProbable",
// 	"involvedObjects": [
// 		{
// 			"type": "Person",
// 			"visualId": 1,
// 			"location": {
// 				"type": "Feature",
// 				"geometry": {
// 					"type": "Point",
// 					"coordinates": [
// 						23.78352554,
// 						37.97843493
// 					]
// 				},
// 				"properties": {
// 					"detectionConfidence": 0.8222631216049194,
// 					"trackingConfidence": 0.8222631216049194
// 				}
// 			},
// 			"role": "Carrier|Passenger|Stowaways",
// 			"metadata": [
// 				{
// 					"fileMediaType": "JPG",
// 					"description": "Officier picture",
// 					"fileURI": "http://myhost.com/path/image.jpg"
// 				}
// 			]
// 		},
// 		{
// 			"type": "Vessel",
// 			"shipType": "LPG Tanker",
// 			"mmsi": "249891000",
// 			"name": "B GAS NEPTUNE",
// 			"imoNumber": "9269374",
// 			"callSign": "9HA2059",
// 			"navigationStatus": "Under way",
// 			"location": {
// 				"type": "Feature",
// 				"geometry": {
// 					"type": "Point",
// 					"coordinates": [
// 						23.783485549232723,
// 						37.978891183660909
// 					]
// 				},
// 				"properties": {}
// 			},
// 			"role": "Carrier|Passenger|Stowaways|Goods|Contraband",
// 			"cargo": [
// 				{
// 					"quantity": 1000,
// 					"unit": "tons",
// 					"description": "cotton socks",
// 					"type": "Good|Contraband"
// 				}
// 			]
// 		},
// 		{
// 			"type": "Van|Car|Bycicle|Motorcycle|Bus|Scooter|Truck|Semi-Truck|Train",
// 			"plate": "ABCDE1234",
// 			"totalPersonOnBoard": 12,
// 			"location": {
// 				"type": "Feature",
// 				"geometry": {
// 					"type": "Point",
// 					"coordinates": [
// 						23.783485549232723,
// 						37.978891183660909
// 					]
// 				},
// 				"properties": {}
// 			},
// 			"externalAttributes": {
// 				"unlawfulParkingId": "UP_001",
// 				"uTurnId": "UT_001",
// 				"uTurnConfLevel":"1.1"
// 			}
// 		}
// 	],
// 	"location": {
// 		"type": "Feature",
// 		"geometry": {
// 			"type": "Point",
// 			"coordinates": [
// 				23.7834875,
// 				37.9785241
// 			]
// 		},
// 		"properties": {}
// 	},
// 	"trackingDetection": {
// 		"uavLocation": {
// 			"type": "Feature",
// 			"geometry": {
// 				"type": "Point",
// 				"coordinates": [
// 					23.783581129277605,
// 					37.978414892115768
// 				]
// 			},
// 			"properties": {}
// 		},
// 		"detectionConfidence": [
// 			0.8222631216049194,
// 			0.6486086249351502
// 		],
// 		"trackingConfidence": [
// 			0.8222631216049194,
// 			0.6486086249351502
// 		],
// 		"geometries": [
// 			{
// 				"type": "Feature",
// 				"geometry": {
// 					"type": "Polygon",
// 					"coordinates": [
// 						[
// 							[
// 								23.783488,
// 								37.9784476
// 							],
// 							[
// 								23.7835765,
// 								37.9784476
// 							],
// 							[
// 								23.783614,
// 								37.9784053
// 							],
// 							[
// 								23.7835658,
// 								37.9783799
// 							],
// 							[
// 								23.7835604,
// 								37.9784053
// 							],
// 							[
// 								23.7835255,
// 								37.9784037
// 							],
// 							[
// 								23.7834746,
// 								37.9784095
// 							],
// 							[
// 								23.7834766,
// 								37.9784465
// 							],
// 							[
// 								23.783488,
// 								37.9784476
// 							]
// 						]
// 					]
// 				},
// 				"properties": {
// 					"prohibited_area": "internal"
// 				}
// 			}
// 		]
// 	},
// 	"faceDetection": {
// 		"images": [
// 			"imageBASE64"
// 		]
// 	},
// 	"metrics": [
// 		{
// 			"unit": "number",
// 			"description": "Number of vans",
// 			"key": "num_vans",
// 			"value": "1"
// 		},
// 		{
// 			"unit": "number",
// 			"description": "Number of motorcycles",
// 			"key": "num_motorcycles",
// 			"value": "1"
// 		},
// 		{
// 			"unit": "kg",
// 			"description": "Weight of the vehicle determined by modeling the outputs of the On-Board Unit (OBU) using eigenfrequency analysis.",
// 			"key": "modeled_vehicle_weight",
// 			"value": "13000"
// 		},
// 		{
// 			"unit": "kg",
// 			"description": "Registered weight of the cargo carried by the vehicle from the WINGS Citizen App.",
// 			"key": "registered_cargo_weight",
// 			"value": "8000"
// 		},
// 		{
// 			"unit": "ppm",
// 			"description": "Evolution of CO2 levels measured by the CO2 sensor",
// 			"key": "CO2_levels",
// 			"value": "130"
// 		},
// 		{
// 			"unit": "counted",
// 			"description": "Estimated number of people in the vehicle based on the fitted model",
// 			"key": "estimated_number_of_people",
// 			"value": "1"
// 		}
// 	],
// 	"metadata": [
// 		{
// 			"fileMediaType": "JPG",
// 			"description": "Vessel picture",
// 			"fileURI": "http://myhost.com/path/image.jpg"
// 		}
// 	]
// },{
// 	"id": "4",
// 	"datetime": "2024-01-26T17:12:43.225Z",
// 	"type": "Risk",
// 	"riskType": "Contraband",
// 	"severity":"PotentialOBUMisoperation",
// 	"probability":"HighlyProbable",
// 	"involvedObjects": [
// 		{
// 			"type": "Person",
// 			"visualId": 1,
// 			"location": {
// 				"type": "Feature",
// 				"geometry": {
// 					"type": "Point",
// 					"coordinates": [
// 						23.78352554,
// 						37.97843493
// 					]
// 				},
// 				"properties": {
// 					"detectionConfidence": 0.8222631216049194,
// 					"trackingConfidence": 0.8222631216049194
// 				}
// 			},
// 			"role": "Carrier|Passenger|Stowaways",
// 			"metadata": [
// 				{
// 					"fileMediaType": "JPG",
// 					"description": "Officier picture",
// 					"fileURI": "http://myhost.com/path/image.jpg"
// 				}
// 			]
// 		},
// 		{
// 			"type": "Vessel",
// 			"shipType": "LPG Tanker",
// 			"mmsi": "249891000",
// 			"name": "B GAS NEPTUNE",
// 			"imoNumber": "9269374",
// 			"callSign": "9HA2059",
// 			"navigationStatus": "Under way",
// 			"location": {
// 				"type": "Feature",
// 				"geometry": {
// 					"type": "Point",
// 					"coordinates": [
// 						23.783485549232723,
// 						37.978891183660909
// 					]
// 				},
// 				"properties": {}
// 			},
// 			"role": "Carrier|Passenger|Stowaways|Goods|Contraband",
// 			"cargo": [
// 				{
// 					"quantity": 1000,
// 					"unit": "tons",
// 					"description": "cotton socks",
// 					"type": "Good|Contraband"
// 				}
// 			]
// 		},
// 		{
// 			"type": "Van|Car|Bycicle|Motorcycle|Bus|Scooter|Truck|Semi-Truck|Train",
// 			"plate": "ABCDE1234",
// 			"totalPersonOnBoard": 12,
// 			"location": {
// 				"type": "Feature",
// 				"geometry": {
// 					"type": "Point",
// 					"coordinates": [
// 						23.783485549232723,
// 						37.978891183660909
// 					]
// 				},
// 				"properties": {}
// 			}
// 		}
// 	],
// 	"location": {
// 		"type": "Feature",
// 		"geometry": {
// 			"type": "Point",
// 			"coordinates": [
// 				23.7834875,
// 				37.9785241
// 			]
// 		},
// 		"properties": {}
// 	},
// 	"trackingDetection": {
// 		"uavLocation": {
// 			"type": "Feature",
// 			"geometry": {
// 				"type": "Point",
// 				"coordinates": [
// 					23.783581129277605,
// 					37.978414892115768
// 				]
// 			},
// 			"properties": {}
// 		},
// 		"detectionConfidence": [
// 			0.8222631216049194,
// 			0.6486086249351502
// 		],
// 		"trackingConfidence": [
// 			0.8222631216049194,
// 			0.6486086249351502
// 		],
// 		"geometries": [
// 			{
// 				"type": "Feature",
// 				"geometry": {
// 					"type": "Polygon",
// 					"coordinates": [
// 						[
// 							[
// 								23.783488,
// 								37.9784476
// 							],
// 							[
// 								23.7835765,
// 								37.9784476
// 							],
// 							[
// 								23.783614,
// 								37.9784053
// 							],
// 							[
// 								23.7835658,
// 								37.9783799
// 							],
// 							[
// 								23.7835604,
// 								37.9784053
// 							],
// 							[
// 								23.7835255,
// 								37.9784037
// 							],
// 							[
// 								23.7834746,
// 								37.9784095
// 							],
// 							[
// 								23.7834766,
// 								37.9784465
// 							],
// 							[
// 								23.783488,
// 								37.9784476
// 							]
// 						]
// 					]
// 				},
// 				"properties": {
// 					"prohibited_area": "internal"
// 				}
// 			}
// 		]
// 	},
// 	"faceDetection": {
// 		"images": [
// 			"imageBASE64"
// 		]
// 	},
// 	"metrics": [
// 		{
// 			"unit": "number",
// 			"description": "Number of vans",
// 			"key": "num_vans",
// 			"value": "1"
// 		},
// 		{
// 			"unit": "number",
// 			"description": "Number of motorcycles",
// 			"key": "num_motorcycles",
// 			"value": "1"
// 		},
// 		{
// 			"unit": "kg",
// 			"description": "Weight of the vehicle determined by modeling the outputs of the On-Board Unit (OBU) using eigenfrequency analysis.",
// 			"key": "modeled_vehicle_weight",
// 			"value": "13000"
// 		},
// 		{
// 			"unit": "kg",
// 			"description": "Registered weight of the cargo carried by the vehicle from the WINGS Citizen App.",
// 			"key": "registered_cargo_weight",
// 			"value": "8000"
// 		},
// 		{
// 			"unit": "ppm",
// 			"description": "Evolution of CO2 levels measured by the CO2 sensor",
// 			"key": "CO2_levels",
// 			"value": "130"
// 		},
// 		{
// 			"unit": "counted",
// 			"description": "Estimated number of people in the vehicle based on the fitted model",
// 			"key": "estimated_number_of_people",
// 			"value": "1"
// 		}
// 	],
// 	"metadata": [
// 		{
// 			"fileMediaType": "JPG",
// 			"description": "Vessel picture",
// 			"fileURI": "http://myhost.com/path/image.jpg"
// 		}
// 	]
// },{
// 	"id": "96",
// 	"datetime": "2024-01-29T17:12:43.225Z",
// 	"type": "Risk",
// 	"riskType": "UTurnVehicle",
// 	"severity":"LowSeverity",
// 	"probability":"Occasional",
// 	"involvedObjects": [
// 		{
// 			"type": "Person",
// 			"visualId": 1,
// 			"location": {
// 				"type": "Feature",
// 				"geometry": {
// 					"type": "Point",
// 					"coordinates": [
// 						23.78352554,
// 						37.97843493
// 					]
// 				},
// 				"properties": {
// 					"detectionConfidence": 0.8222631216049194,
// 					"trackingConfidence": 0.8222631216049194
// 				}
// 			},
// 			"role": "Carrier|Passenger|Stowaways",
// 			"metadata": [
// 				{
// 					"fileMediaType": "JPG",
// 					"description": "Officier picture",
// 					"fileURI": "http://myhost.com/path/image.jpg"
// 				}
// 			]
// 		},
// 		{
// 			"type": "Vessel",
// 			"shipType": "LPG Tanker",
// 			"mmsi": "249891000",
// 			"name": "B GAS NEPTUNE",
// 			"imoNumber": "9269374",
// 			"callSign": "9HA2059",
// 			"navigationStatus": "Under way",
// 			"location": {
// 				"type": "Feature",
// 				"geometry": {
// 					"type": "Point",
// 					"coordinates": [
// 						23.783485549232723,
// 						37.978891183660909
// 					]
// 				},
// 				"properties": {}
// 			},
// 			"role": "Carrier|Passenger|Stowaways|Goods|Contraband",
// 			"cargo": [
// 				{
// 					"quantity": 1000,
// 					"unit": "tons",
// 					"description": "cotton socks",
// 					"type": "Good|Contraband"
// 				}
// 			]
// 		},
// 		{
// 			"type": "Van|Car|Bycicle|Motorcycle|Bus|Scooter|Truck|Semi-Truck|Train",
// 			"plate": "ABCDE1234",
// 			"totalPersonOnBoard": 12,
// 			"location": {
// 				"type": "Feature",
// 				"geometry": {
// 					"type": "Point",
// 					"coordinates": [
// 						23.783485549232723,
// 						37.978891183660909
// 					]
// 				},
// 				"properties": {}
// 			},
// 			"externalAttributes": {
// 				"unlawfulParkingId": "UP_001",
// 				"uTurnId": "UT_001",
// 				"uTurnConfLevel":"1.1"
// 			}
// 		}
// 	],
// 	"location": {
// 		"type": "Feature",
// 		"geometry": {
// 			"type": "Point",
// 			"coordinates": [
// 				23.7834875,
// 				37.9785241
// 			]
// 		},
// 		"properties": {}
// 	},
// 	"trackingDetection": {
// 		"uavLocation": {
// 			"type": "Feature",
// 			"geometry": {
// 				"type": "Point",
// 				"coordinates": [
// 					23.783581129277605,
// 					37.978414892115768
// 				]
// 			},
// 			"properties": {}
// 		},
// 		"detectionConfidence": [
// 			0.8222631216049194,
// 			0.6486086249351502
// 		],
// 		"trackingConfidence": [
// 			0.8222631216049194,
// 			0.6486086249351502
// 		],
// 		"geometries": [
// 			{
// 				"type": "Feature",
// 				"geometry": {
// 					"type": "Polygon",
// 					"coordinates": [
// 						[
// 							[
// 								23.783488,
// 								37.9784476
// 							],
// 							[
// 								23.7835765,
// 								37.9784476
// 							],
// 							[
// 								23.783614,
// 								37.9784053
// 							],
// 							[
// 								23.7835658,
// 								37.9783799
// 							],
// 							[
// 								23.7835604,
// 								37.9784053
// 							],
// 							[
// 								23.7835255,
// 								37.9784037
// 							],
// 							[
// 								23.7834746,
// 								37.9784095
// 							],
// 							[
// 								23.7834766,
// 								37.9784465
// 							],
// 							[
// 								23.783488,
// 								37.9784476
// 							]
// 						]
// 					]
// 				},
// 				"properties": {
// 					"prohibited_area": "internal"
// 				}
// 			}
// 		]
// 	},
// 	"faceDetection": {
// 		"images": [
// 			"imageBASE64"
// 		]
// 	},
// 	"metrics": [
// 		{
// 			"unit": "number",
// 			"description": "Number of vans",
// 			"key": "num_vans",
// 			"value": "1"
// 		},
// 		{
// 			"unit": "number",
// 			"description": "Number of motorcycles",
// 			"key": "num_motorcycles",
// 			"value": "1"
// 		},
// 		{
// 			"unit": "kg",
// 			"description": "Weight of the vehicle determined by modeling the outputs of the On-Board Unit (OBU) using eigenfrequency analysis.",
// 			"key": "modeled_vehicle_weight",
// 			"value": "13000"
// 		},
// 		{
// 			"unit": "kg",
// 			"description": "Registered weight of the cargo carried by the vehicle from the WINGS Citizen App.",
// 			"key": "registered_cargo_weight",
// 			"value": "8000"
// 		},
// 		{
// 			"unit": "ppm",
// 			"description": "Evolution of CO2 levels measured by the CO2 sensor",
// 			"key": "CO2_levels",
// 			"value": "130"
// 		},
// 		{
// 			"unit": "counted",
// 			"description": "Estimated number of people in the vehicle based on the fitted model",
// 			"key": "estimated_number_of_people",
// 			"value": "1"
// 		}
// 	],
// 	"metadata": [
// 		{
// 			"fileMediaType": "JPG",
// 			"description": "Vessel picture",
// 			"fileURI": "http://myhost.com/path/image.jpg"
// 		}
// 	]
// }];