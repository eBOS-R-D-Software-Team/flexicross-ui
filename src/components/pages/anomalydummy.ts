import { AnomalyItem } from "../../interfaces/anomalyData"

export const anomalyDummy: any[]=
[
	{
	  "_id": {
		"$oid": "65c5e60a9c57101e28eba6e6"
	  },
	  "id": "64ab2d1b-0e52-4b0c-88ed-b56391162107",
	  "datetime": "2024-01-25T16:11:37.730Z",
	  "type": "Anomaly",
	  "anomalyType": "UnusualBehaviourOutOfBounds",
	  "involvedObjects": [
		{
		  "type": "Person",
		  "visualId": 1,
		  "location": {
			"type": "Feature",
			"geometry": {
			  "type": "Point",
			  "coordinates": [
				23.7835255,
				37.9784349
			  ]
			},
			"properties": {
			  "detectionConfidence": 0.8601178288459778,
			  "trackingConfidence": 0.7801178288459778
			}
		  }
		}
	  ],
	  "trackingDetection": {
		"uavLocation": {
		  "type": "Feature",
		  "geometry": {
			"type": "Point",
			"coordinates": [
			  23.783579707189286,
			  37.11841704365938
			]
		  }
		},
		"detectionConfidence": [
		  0.7601178288459778
		],
		"trackingConfidence": [
		  0.7601178288459778
		],
		"geometries": [
		  {
			"type": "Feature",
			"geometry": {
			  "type": "LineString",
			  "coordinates": [
				[
				  23.7834585,
				  37.9785765
				],
				[
				  23.7834772,
				  37.9782594
				]
			  ]
			},
			"properties": {
			  "prohibited_area": 90
			}
		  }
		]
	  }
	},
	{
	  "_id": {
		"$oid": "65c5e60a9c57101e28eba6e7"
	  },
	  "id": "27d9a23a-8846-4250-ab61-ebdfc518295b_1",
	  "datetime": "2024-01-25T16:10:32.113Z",
	  "type": "Anomaly",
	  "anomalyType": "UnusualBehaviourRunning",
	  "involvedObjects": [
		{
		  "type": "Person",
		  "visualId": 1,
		  "location": {
			"type": "Feature",
			"geometry": {
			  "type": "Point",
			  "coordinates": [
				23.78352554,
				37.97843493
			  ]
			},
			"properties": {
			  "detectionConfidence": 0.8222631216049194,
			  "trackingConfidence": 0.7522631216049194
			}
		  }
		},
		{
		  "callSign": "ABC123",
		  "cargo": {
			"description": "Electronics",
			"quantity": 100,
			"type": "HighValue",
			"unit": "Tons"
		  },
		  "id": "vessel789",
		  "imoNumber": "IMO456",
		  "mmsi": "MMSI789",
		  "shipType": "Cargo",
		  "type": "Vessel"
		}
	  ],
	  "trackingDetection": {
		"uavLocation": {
		  "type": "Feature",
		  "geometry": {
			"type": "Point",
			"coordinates": [
			  23.783581129277604,
			  37.978414892115765
			]
		  }
		},
		"detectionConfidence": [
		  0.8222631216049194
		],
		"trackingConfidence": [
		  0.7522631216049194
		],
		"geometries": [
		  {
			"type": "Feature",
			"geometry": {
			  "type": "Polygon",
			  "coordinates": [
				[
				  [
					23.783488,
					37.9784476
				  ],
				  [
					23.7835765,
					37.9784476
				  ],
				  [
					23.783614,
					37.9784053
				  ],
				  [
					23.7835658,
					37.9783799
				  ],
				  [
					23.7835604,
					37.9784053
				  ],
				  [
					23.7835255,
					37.9784037
				  ],
				  [
					23.7834746,
					37.9784095
				  ],
				  [
					23.7834766,
					37.9784465
				  ],
				  [
					23.783488,
					37.9784476
				  ]
				]
			  ]
			},
			"properties": {
			  "prohibited_area": "internal"
			}
		  }
		]
	  }
	},
	{
	  "_id": {
		"$oid": "65c5e60a9c57101e28eba6e8"
	  },
	  "id": "27d9a23a-8846-4250-ab61-ebdfc518295b_2",
	  "datetime": "2024-01-25T16:10:32.113Z",
	  "type": "Anomaly",
	  "anomalyType": "UnusualBehaviourOutOfBounds",
	  "involvedObjects": [
		{
		  "type": "Person",
		  "visualId": 1,
		  "location": {
			"type": "Feature",
			"geometry": {
			  "type": "Point",
			  "coordinates": [
				23.783581129277604,
				37.118414892115766
			  ]
			},
			"properties": {
			  "detectionConfidence": 0.7222631216049193,
			  "trackingConfidence": 0.8622631216049194
			}
		  }
		},
		{
		  "type": "Person",
		  "visualId": 4,
		  "location": {
			"type": "Feature",
			"geometry": {
			  "type": "Point",
			  "coordinates": [
				23.7836765,
				37.9783299
			  ]
			},
			"properties": {
			  "detectionConfidence": 0.7486086249351501,
			  "trackingConfidence": 0.8486086249351501
			}
		  }
		}
	  ],
	  "trackingDetection": {
		"uavLocation": {
		  "type": "Feature",
		  "geometry": {
			"type": "Point",
			"coordinates": [
			  23.783581129277604,
			  37.978414892115765
			]
		  }
		},
		"detectionConfidence": [
		  0.7722631216049194,
		  0.8486086249351501
		],
		"trackingConfidence": [
		  0.8222631216049194,
		  0.645860862493515
		],
		"geometries": [
		  {
			"type": "Feature",
			"geometry": {
			  "type": "Polygon",
			  "coordinates": [
				[
				  [
					23.783438,
					37.9786976
				  ],
				  [
					23.7836765,
					37.9786976
				  ],
				  [
					23.7836765,
					37.9783299
				  ],
				  [
					23.783438,
					37.9783299
				  ],
				  [
					23.783438,
					37.9786976
				  ]
				]
			  ]
			},
			"properties": {
			  "prohibited_area": "internal"
			}
		  }
		]
	  }
	},
	{
	  "_id": {
		"$oid": "66475cb43461ce0be2f2ad84"
	  },
	  "anomalyType": "SuspiciousDrivingPattern",
	  "datetime": "2024-01-26T17:12:43.225Z",
	  "id": "1",
	  "involvedObjects": [
		{
		  "name": "Express",
		  "nationality": "US",
		  "type": "Train"
		}
	  ],
	  "_etag": {
		"$oid": "66475cb43461ce0be2f2ad83"
	  }
	},
	{
	  "_id": {
		"$oid": "66757723797e672bd02e146c"
	  },
	  "id": "98",
	  "datetime": "2024-01-26T17:12:43.225Z",
	  "type": "Anomaly",
	  "anomalyType": "UnusualBehaviourOutOfBounds",
	  "involvedObjects": [
		{
		  "type": "Vessel",
		  "shipType": "GeneralCargoShip",
		  "mmsi": "249891000",
		  "name": "B GAS NEPTUNE",
		  "imoNumber": "9269374",
		  "callSign": "9HA2059",
		  "navigationStatus": "UnderWay",
		  "location": {
			"type": "Feature",
			"geometry": {
			  "type": "Point",
			  "coordinates": [
				23.783485549232722,
				37.978891183660906
			  ]
			},
			"properties": {}
		  },
		  "role": "Contraband",
		  "cargo": [
			{
			  "quantity": 1000,
			  "unit": "tons",
			  "description": "cotton socks",
			  "type": "Good|Contraband"
			}
		  ]
		},
		{
		  "type": "Train",
		  "plate": "ABCDE1234",
		  "totalPersonOnBoard": 12,
		  "location": {
			"type": "Feature",
			"geometry": {
			  "type": "Point",
			  "coordinates": [
				23.783485549232722,
				37.978891183660906
			  ]
			},
			"properties": {}
		  },
		  "externalAttributes": {
			"unlawfulParkingId": "UP_001",
			"uTurnId": "UT_001"
		  }
		}
	  ],
	  "location": {
		"type": "Feature",
		"geometry": {
		  "type": "Point",
		  "coordinates": [
			23.7834875,
			37.9785241
		  ]
		},
		"properties": {}
	  },
	  "trackingDetection": {
		"uavLocation": {
		  "type": "Feature",
		  "geometry": {
			"type": "Point",
			"coordinates": [
			  23.783581129277604,
			  37.978414892115765
			]
		  },
		  "properties": {}
		},
		"detectionConfidence": [
		  0.8222631216049194,
		  0.6486086249351501
		],
		"trackingConfidence": [
		  0.8222631216049194,
		  0.6486086249351501
		],
		"geometries": [
		  {
			"type": "Feature",
			"geometry": {
			  "type": "Polygon",
			  "coordinates": [
				[
				  [
					23.783488,
					37.9784476
				  ],
				  [
					23.7835765,
					37.9784476
				  ],
				  [
					23.783614,
					37.9784053
				  ],
				  [
					23.7835658,
					37.9783799
				  ],
				  [
					23.7835604,
					37.9784053
				  ],
				  [
					23.7835255,
					37.9784037
				  ],
				  [
					23.7834746,
					37.9784095
				  ],
				  [
					23.7834766,
					37.9784465
				  ],
				  [
					23.783488,
					37.9784476
				  ]
				]
			  ]
			},
			"properties": {
			  "prohibited_area": "internal"
			}
		  }
		]
	  },
	  "faceDetection": {
		"images": [
		  "imageBASE64"
		]
	  },
	  "metrics": [
		{
		  "unit": "number",
		  "description": "Number of vans",
		  "key": "num_vans",
		  "value": "1"
		},
		{
		  "unit": "number",
		  "description": "Number of motorcycles",
		  "key": "num_motorcycles",
		  "value": "1"
		},
		{
		  "unit": "kg",
		  "description": "Weight of the vehicle determined by modeling the outputs of the On-Board Unit (OBU) using eigenfrequency analysis.",
		  "key": "modeled_vehicle_weight",
		  "value": "13000"
		},
		{
		  "unit": "kg",
		  "description": "Registered weight of the cargo carried by the vehicle from the WINGS Citizen App.",
		  "key": "registered_cargo_weight",
		  "value": "8000"
		},
		{
		  "unit": "ppm",
		  "description": "Evolution of CO2 levels measured by the CO2 sensor",
		  "key": "CO2_levels",
		  "value": "130"
		},
		{
		  "unit": "counted",
		  "description": "Estimated number of people in the vehicle based on the fitted model",
		  "key": "estimated_number_of_people",
		  "value": "1"
		}
	  ],
	  "metadata": [
		{
		  "fileMediaType": "JPG",
		  "description": "Vessel picture",
		  "fileURI": "http://myhost.com/path/image.jpg"
		}
	  ]
	}
  ]
// export const anomalyDummy: AnomalyItem[]=
// [
// 	{
// 		"id": "6",
// 		"datetime": "2024-01-26T17:12:43.225Z",
// 		"type": "Anomaly",
// 		"anomalyType": "PersonMisVerified",
// 		"involvedObjects": [
// 			{
// 				"type": "Person",
// 				"visualId": 1,
// 				"location": {
// 					"type": "Feature",
// 					"geometry": {
// 						"type": "Point",
// 						"coordinates": [
// 							23.78352554,
// 							37.97843493
// 						]
// 					},
// 					"properties": {
// 						"detectionConfidence": 0.8222631216049194,
// 						"trackingConfidence": 0.8222631216049194
// 					}
// 				},
// 				"role": "Carrier|Passenger|Stowaways",
// 				"metadata": [
// 					{
// 						"fileMediaType": "JPG",
// 						"description": "Officier picture",
// 						"fileURI": "http://myhost.com/path/image.jpg"
// 					}
// 				]
// 			},
// 		{
// 			"type": "Vessel",
// 			"shipType": "PassengerShip|FishingVessel|NuclearShip|BulkCarrier|OilTanker|GeneralCargoShip|HighSpeedCraft|MobileOffShoreDrillingUnit|SpecialPurposeShip|Other",
// 			"mmsi": "249891000",
// 			"name": "B GAS NEPTUNE",
// 			"imoNumber": "9269374",
// 			"callSign": "9HA2059",
// 			"navigationStatus": "UnderWayUsingEngine|AtAnchor|NotUnderCommand|RestrictedManoeuvrability|ConstrainedByHerDraught|Moored|Aground|EngagedInFishing|UnderWaySailing|EngagedInFishingOtherThanTrawling|AirCushionVesselInNonDisplamenetModeOrWIGCraftTakingOffLandingOrInFlight|PowerDrivenVesselTowingAstern|PowerDrivenVesselTowigAheadOrPushingAlongside|InDistressOrRequiringAssistance|AISSARTSeekingToAttractAttention|UndefinedDefault|Other",
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
// 				"uTurnId": "UT_001"
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
// 	},	
//     {
// 		"id": "62132123",
// 		"datetime": "2024-01-26T17:12:43.225Z",
// 		"type": "Anomaly",
// 		"anomalyType": "PersonMisVerified",
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
// 			"shipType": "PassengerShip|FishingVessel|NuclearShip|BulkCarrier|OilTanker|GeneralCargoShip|HighSpeedCraft|MobileOffShoreDrillingUnit|SpecialPurposeShip|Other",
// 			"mmsi": "249891000",
// 			"name": "B GAS NEPTUNE",
// 			"imoNumber": "9269374",
// 			"callSign": "9HA2059",
// 			"navigationStatus": "UnderWayUsingEngine|AtAnchor|NotUnderCommand|RestrictedManoeuvrability|ConstrainedByHerDraught|Moored|Aground|EngagedInFishing|UnderWaySailing|EngagedInFishingOtherThanTrawling|AirCushionVesselInNonDisplamenetModeOrWIGCraftTakingOffLandingOrInFlight|PowerDrivenVesselTowingAstern|PowerDrivenVesselTowigAheadOrPushingAlongside|InDistressOrRequiringAssistance|AISSARTSeekingToAttractAttention|UndefinedDefault|Other",
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
// 				"uTurnId": "UT_001"
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
// 	},
// 	{
// 		"id": "7",
// 		"datetime": "2024-01-26T17:12:43.225Z",
// 		"type": "Anomaly",
// 		"anomalyType": "PersonOutOfBounds",
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
// 			"shipType": "PassengerShip|FishingVessel|NuclearShip|BulkCarrier|OilTanker|GeneralCargoShip|HighSpeedCraft|MobileOffShoreDrillingUnit|SpecialPurposeShip|Other",
// 			"mmsi": "249891000",
// 			"name": "B GAS NEPTUNE",
// 			"imoNumber": "9269374",
// 			"callSign": "9HA2059",
// 			"navigationStatus": "UnderWayUsingEngine|AtAnchor|NotUnderCommand|RestrictedManoeuvrability|ConstrainedByHerDraught|Moored|Aground|EngagedInFishing|UnderWaySailing|EngagedInFishingOtherThanTrawling|AirCushionVesselInNonDisplamenetModeOrWIGCraftTakingOffLandingOrInFlight|PowerDrivenVesselTowingAstern|PowerDrivenVesselTowigAheadOrPushingAlongside|InDistressOrRequiringAssistance|AISSARTSeekingToAttractAttention|UndefinedDefault|Other",
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
// 				"uTurnId": "UT_001"
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
// 	},
// 	{
// 		"id": "8",
// 		"datetime": "2024-01-28T17:12:43.225Z",
// 		"type": "Anomaly",
// 		"anomalyType": "PersonRunning",
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
// 			"shipType": "PassengerShip|FishingVessel|NuclearShip|BulkCarrier|OilTanker|GeneralCargoShip|HighSpeedCraft|MobileOffShoreDrillingUnit|SpecialPurposeShip|Other",
// 			"mmsi": "249891000",
// 			"name": "B GAS NEPTUNE",
// 			"imoNumber": "9269374",
// 			"callSign": "9HA2059",
// 			"navigationStatus": "UnderWayUsingEngine|AtAnchor|NotUnderCommand|RestrictedManoeuvrability|ConstrainedByHerDraught|Moored|Aground|EngagedInFishing|UnderWaySailing|EngagedInFishingOtherThanTrawling|AirCushionVesselInNonDisplamenetModeOrWIGCraftTakingOffLandingOrInFlight|PowerDrivenVesselTowingAstern|PowerDrivenVesselTowigAheadOrPushingAlongside|InDistressOrRequiringAssistance|AISSARTSeekingToAttractAttention|UndefinedDefault|Other",
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
// 				"uTurnId": "UT_001"
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
// 	},
// 	{
// 		"id": "9",
// 		"datetime": "2024-01-28T17:12:43.225Z",
// 		"type": "Anomaly",
// 		"anomalyType": "HumanTrafficking",
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
// 			"shipType": "PassengerShip|FishingVessel|NuclearShip|BulkCarrier|OilTanker|GeneralCargoShip|HighSpeedCraft|MobileOffShoreDrillingUnit|SpecialPurposeShip|Other",
// 			"mmsi": "249891000",
// 			"name": "B GAS NEPTUNE",
// 			"imoNumber": "9269374",
// 			"callSign": "9HA2059",
// 			"navigationStatus": "UnderWayUsingEngine|AtAnchor|NotUnderCommand|RestrictedManoeuvrability|ConstrainedByHerDraught|Moored|Aground|EngagedInFishing|UnderWaySailing|EngagedInFishingOtherThanTrawling|AirCushionVesselInNonDisplamenetModeOrWIGCraftTakingOffLandingOrInFlight|PowerDrivenVesselTowingAstern|PowerDrivenVesselTowigAheadOrPushingAlongside|InDistressOrRequiringAssistance|AISSARTSeekingToAttractAttention|UndefinedDefault|Other",
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
// 				"uTurnId": "UT_001"
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
// 	},
// 	{
// 		"id": "10",
// 		"datetime": "2024-01-30T17:12:43.225Z",
// 		"type": "Anomaly",
// 		"anomalyType": "Contraband",
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
// 			"shipType": "PassengerShip|FishingVessel|NuclearShip|BulkCarrier|OilTanker|GeneralCargoShip|HighSpeedCraft|MobileOffShoreDrillingUnit|SpecialPurposeShip|Other",
// 			"mmsi": "249891000",
// 			"name": "B GAS NEPTUNE",
// 			"imoNumber": "9269374",
// 			"callSign": "9HA2059",
// 			"navigationStatus": "UnderWayUsingEngine|AtAnchor|NotUnderCommand|RestrictedManoeuvrability|ConstrainedByHerDraught|Moored|Aground|EngagedInFishing|UnderWaySailing|EngagedInFishingOtherThanTrawling|AirCushionVesselInNonDisplamenetModeOrWIGCraftTakingOffLandingOrInFlight|PowerDrivenVesselTowingAstern|PowerDrivenVesselTowigAheadOrPushingAlongside|InDistressOrRequiringAssistance|AISSARTSeekingToAttractAttention|UndefinedDefault|Other",
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
// 				"uTurnId": "UT_001"
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
// 	},
// 	{
// 		"id": "11",
// 		"datetime": "2024-01-31T17:12:43.225Z",
// 		"type": "Anomaly",
// 		"anomalyType": "Smuggling",
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
// 			"shipType": "PassengerShip|FishingVessel|NuclearShip|BulkCarrier|OilTanker|GeneralCargoShip|HighSpeedCraft|MobileOffShoreDrillingUnit|SpecialPurposeShip|Other",
// 			"mmsi": "249891000",
// 			"name": "B GAS NEPTUNE",
// 			"imoNumber": "9269374",
// 			"callSign": "9HA2059",
// 			"navigationStatus": "UnderWayUsingEngine|AtAnchor|NotUnderCommand|RestrictedManoeuvrability|ConstrainedByHerDraught|Moored|Aground|EngagedInFishing|UnderWaySailing|EngagedInFishingOtherThanTrawling|AirCushionVesselInNonDisplamenetModeOrWIGCraftTakingOffLandingOrInFlight|PowerDrivenVesselTowingAstern|PowerDrivenVesselTowigAheadOrPushingAlongside|InDistressOrRequiringAssistance|AISSARTSeekingToAttractAttention|UndefinedDefault|Other",
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
// 				"uTurnId": "UT_001"
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
// 	},
// 	{
// 		"id": "12",
// 		"datetime": "2024-02-01T17:12:43.225Z",
// 		"type": "Anomaly",
// 		"anomalyType": "FalsifiedDocuments",
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
// 			"shipType": "PassengerShip|FishingVessel|NuclearShip|BulkCarrier|OilTanker|GeneralCargoShip|HighSpeedCraft|MobileOffShoreDrillingUnit|SpecialPurposeShip|Other",
// 			"mmsi": "249891000",
// 			"name": "B GAS NEPTUNE",
// 			"imoNumber": "9269374",
// 			"callSign": "9HA2059",
// 			"navigationStatus": "UnderWayUsingEngine|AtAnchor|NotUnderCommand|RestrictedManoeuvrability|ConstrainedByHerDraught|Moored|Aground|EngagedInFishing|UnderWaySailing|EngagedInFishingOtherThanTrawling|AirCushionVesselInNonDisplamenetModeOrWIGCraftTakingOffLandingOrInFlight|PowerDrivenVesselTowingAstern|PowerDrivenVesselTowigAheadOrPushingAlongside|InDistressOrRequiringAssistance|AISSARTSeekingToAttractAttention|UndefinedDefault|Other",
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
// 				"uTurnId": "UT_001"
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
// 	},
// 	{
// 		"id": "13",
// 		"datetime": "2024-02-02T17:12:43.225Z",
// 		"type": "Anomaly",
// 		"anomalyType": "SuspiciousDrivingPattern",
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
// 			"shipType": "PassengerShip|FishingVessel|NuclearShip|BulkCarrier|OilTanker|GeneralCargoShip|HighSpeedCraft|MobileOffShoreDrillingUnit|SpecialPurposeShip|Other",
// 			"mmsi": "249891000",
// 			"name": "B GAS NEPTUNE",
// 			"imoNumber": "9269374",
// 			"callSign": "9HA2059",
// 			"navigationStatus": "UnderWayUsingEngine|AtAnchor|NotUnderCommand|RestrictedManoeuvrability|ConstrainedByHerDraught|Moored|Aground|EngagedInFishing|UnderWaySailing|EngagedInFishingOtherThanTrawling|AirCushionVesselInNonDisplamenetModeOrWIGCraftTakingOffLandingOrInFlight|PowerDrivenVesselTowingAstern|PowerDrivenVesselTowigAheadOrPushingAlongside|InDistressOrRequiringAssistance|AISSARTSeekingToAttractAttention|UndefinedDefault|Other",
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
// 				"uTurnId": "UT_001"
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
// 	},
// 	{
// 		"id": "14",
// 		"datetime": "2024-02-03T17:12:43.225Z",
// 		"type": "Anomaly",
// 		"anomalyType": "UnlawfulParkingVehicle",
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
// 			"shipType": "PassengerShip|FishingVessel|NuclearShip|BulkCarrier|OilTanker|GeneralCargoShip|HighSpeedCraft|MobileOffShoreDrillingUnit|SpecialPurposeShip|Other",
// 			"mmsi": "249891000",
// 			"name": "B GAS NEPTUNE",
// 			"imoNumber": "9269374",
// 			"callSign": "9HA2059",
// 			"navigationStatus": "UnderWayUsingEngine|AtAnchor|NotUnderCommand|RestrictedManoeuvrability|ConstrainedByHerDraught|Moored|Aground|EngagedInFishing|UnderWaySailing|EngagedInFishingOtherThanTrawling|AirCushionVesselInNonDisplamenetModeOrWIGCraftTakingOffLandingOrInFlight|PowerDrivenVesselTowingAstern|PowerDrivenVesselTowigAheadOrPushingAlongside|InDistressOrRequiringAssistance|AISSARTSeekingToAttractAttention|UndefinedDefault|Other",
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
// 				"uTurnId": "UT_001"
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
// 	},
// 	{
// 		"id": "15",
// 		"datetime": "2024-02-04T17:12:43.225Z",
// 		"type": "Anomaly",
// 		"anomalyType": "UturnVehicle",
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
// 			"shipType": "PassengerShip|FishingVessel|NuclearShip|BulkCarrier|OilTanker|GeneralCargoShip|HighSpeedCraft|MobileOffShoreDrillingUnit|SpecialPurposeShip|Other",
// 			"mmsi": "249891000",
// 			"name": "B GAS NEPTUNE",
// 			"imoNumber": "9269374",
// 			"callSign": "9HA2059",
// 			"navigationStatus": "UnderWayUsingEngine|AtAnchor|NotUnderCommand|RestrictedManoeuvrability|ConstrainedByHerDraught|Moored|Aground|EngagedInFishing|UnderWaySailing|EngagedInFishingOtherThanTrawling|AirCushionVesselInNonDisplamenetModeOrWIGCraftTakingOffLandingOrInFlight|PowerDrivenVesselTowingAstern|PowerDrivenVesselTowigAheadOrPushingAlongside|InDistressOrRequiringAssistance|AISSARTSeekingToAttractAttention|UndefinedDefault|Other",
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
// 				"uTurnId": "UT_001"
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
// 	},
// 	{
// 		"id": "16",
// 		"datetime": "2024-02-05T17:12:43.225Z",
// 		"type": "Anomaly",
// 		"anomalyType": "BiometricDataInconsistency",
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
// 			"shipType": "PassengerShip|FishingVessel|NuclearShip|BulkCarrier|OilTanker|GeneralCargoShip|HighSpeedCraft|MobileOffShoreDrillingUnit|SpecialPurposeShip|Other",
// 			"mmsi": "249891000",
// 			"name": "B GAS NEPTUNE",
// 			"imoNumber": "9269374",
// 			"callSign": "9HA2059",
// 			"navigationStatus": "UnderWayUsingEngine|AtAnchor|NotUnderCommand|RestrictedManoeuvrability|ConstrainedByHerDraught|Moored|Aground|EngagedInFishing|UnderWaySailing|EngagedInFishingOtherThanTrawling|AirCushionVesselInNonDisplamenetModeOrWIGCraftTakingOffLandingOrInFlight|PowerDrivenVesselTowingAstern|PowerDrivenVesselTowigAheadOrPushingAlongside|InDistressOrRequiringAssistance|AISSARTSeekingToAttractAttention|UndefinedDefault|Other",
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
// 				"uTurnId": "UT_001"
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
// 	},
// 	{
// 		"id": "17",
// 		"datetime": "2024-02-06T17:12:43.225Z",
// 		"type": "Anomaly",
// 		"anomalyType": "UnlawfulCrossingBorder",
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
// 			"shipType": "PassengerShip|FishingVessel|NuclearShip|BulkCarrier|OilTanker|GeneralCargoShip|HighSpeedCraft|MobileOffShoreDrillingUnit|SpecialPurposeShip|Other",
// 			"mmsi": "249891000",
// 			"name": "B GAS NEPTUNE",
// 			"imoNumber": "9269374",
// 			"callSign": "9HA2059",
// 			"navigationStatus": "UnderWayUsingEngine|AtAnchor|NotUnderCommand|RestrictedManoeuvrability|ConstrainedByHerDraught|Moored|Aground|EngagedInFishing|UnderWaySailing|EngagedInFishingOtherThanTrawling|AirCushionVesselInNonDisplamenetModeOrWIGCraftTakingOffLandingOrInFlight|PowerDrivenVesselTowingAstern|PowerDrivenVesselTowigAheadOrPushingAlongside|InDistressOrRequiringAssistance|AISSARTSeekingToAttractAttention|UndefinedDefault|Other",
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
// 				"uTurnId": "UT_001"
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
// 	},
// 	{
// 		"id": "18",
// 		"datetime": "2024-02-07T17:12:43.225Z",
// 		"type": "Anomaly",
// 		"anomalyType": "AbnormalWeight",
//         "involvedObjects": [
//             {
//                 "type": "Person",
//                 "visualId": 1,
//                 "location": {
//                     "type": "Feature",
//                     "geometry": {
//                         "type": "Point",
//                         "coordinates": [
//                             23.78352554,
//                             37.97843493
//                         ]
//                     },
//                     "properties": {
//                         "detectionConfidence": 0.8222631216049194,
//                         "trackingConfidence": 0.8222631216049194
//                     }
//                 },
//                 "role": "Carrier|Passenger|Stowaways",
//                 "metadata": [
//                     {
//                         "fileMediaType": "JPG",
//                         "description": "Officier picture",
//                         "fileURI": "http://myhost.com/path/image.jpg"
//                     }
//                 ]
//             },
//             {
//                 "type": "Vessel",
//                 "shipType": "PassengerShip|FishingVessel|NuclearShip|BulkCarrier|OilTanker|GeneralCargoShip|HighSpeedCraft|MobileOffShoreDrillingUnit|SpecialPurposeShip|Other",
//                 "mmsi": "249891000",
//                 "name": "B GAS NEPTUNE",
//                 "imoNumber": "9269374",
//                 "callSign": "9HA2059",
//                 "navigationStatus": "UnderWayUsingEngine|AtAnchor|NotUnderCommand|RestrictedManoeuvrability|ConstrainedByHerDraught|Moored|Aground|EngagedInFishing|UnderWaySailing|EngagedInFishingOtherThanTrawling|AirCushionVesselInNonDisplamenetModeOrWIGCraftTakingOffLandingOrInFlight|PowerDrivenVesselTowingAstern|PowerDrivenVesselTowigAheadOrPushingAlongside|InDistressOrRequiringAssistance|AISSARTSeekingToAttractAttention|UndefinedDefault|Other",
//                 "location": {
//                     "type": "Feature",
//                     "geometry": {
//                         "type": "Point",
//                         "coordinates": [
//                             23.783485549232723,
//                             37.978891183660909
//                         ]
//                     },
//                     "properties": {}
//                 },
//                 "role": "Carrier|Passenger|Stowaways|Goods|Contraband",
//                 "cargo": [
//                     {
//                         "quantity": 1000,
//                         "unit": "tons",
//                         "description": "cotton socks",
//                         "type": "Good|Contraband"
//                     }
//                 ]
//             },
//             {
//                 "type": "Van|Car|Bycicle|Motorcycle|Bus|Scooter|Truck|Semi-Truck|Train",
//                 "plate": "ABCDE1234",
//                 "totalPersonOnBoard": 12,
//                 "location": {
//                     "type": "Feature",
//                     "geometry": {
//                         "type": "Point",
//                         "coordinates": [
//                             23.783485549232723,
//                             37.978891183660909
//                         ]
//                     },
//                     "properties": {}
//                 },
//                 "externalAttributes": {
//                     "unlawfulParkingId": "UP_001",
//                     "uTurnId": "UT_001"
//                 }
//             }
//         ],
//         "location": {
//             "type": "Feature",
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [
//                     23.7834875,
//                     37.9785241
//                 ]
//             },
//             "properties": {}
//         },
//         "trackingDetection": {
//             "uavLocation": {
//                 "type": "Feature",
//                 "geometry": {
//                     "type": "Point",
//                     "coordinates": [
//                         23.783581129277605,
//                         37.978414892115768
//                     ]
//                 },
//                 "properties": {}
//             },
//             "detectionConfidence": [
//                 0.8222631216049194,
//                 0.6486086249351502
//             ],
//             "trackingConfidence": [
//                 0.8222631216049194,
//                 0.6486086249351502
//             ],
//             "geometries": [
//                 {
//                     "type": "Feature",
//                     "geometry": {
//                         "type": "Polygon",
//                         "coordinates": [
//                             [
//                                 [
//                                     23.783488,
//                                     37.9784476
//                                 ],
//                                 [
//                                     23.7835765,
//                                     37.9784476
//                                 ],
//                                 [
//                                     23.783614,
//                                     37.9784053
//                                 ],
//                                 [
//                                     23.7835658,
//                                     37.9783799
//                                 ],
//                                 [
//                                     23.7835604,
//                                     37.9784053
//                                 ],
//                                 [
//                                     23.7835255,
//                                     37.9784037
//                                 ],
//                                 [
//                                     23.7834746,
//                                     37.9784095
//                                 ],
//                                 [
//                                     23.7834766,
//                                     37.9784465
//                                 ],
//                                 [
//                                     23.783488,
//                                     37.9784476
//                                 ]
//                             ]
//                         ]
//                     },
//                     "properties": {
//                         "prohibited_area": "internal"
//                     }
//                 }
//             ]
//         },
//         "faceDetection": {
//             "images": [
//                 "imageBASE64"
//             ]
//         },
//         "metrics": [
//             {
//                 "unit": "number",
//                 "description": "Number of vans",
//                 "key": "num_vans",
//                 "value": "1"
//             },
//             {
//                 "unit": "number",
//                 "description": "Number of motorcycles",
//                 "key": "num_motorcycles",
//                 "value": "1"
//             },
//             {
//                 "unit": "kg",
//                 "description": "Weight of the vehicle determined by modeling the outputs of the On-Board Unit (OBU) using eigenfrequency analysis.",
//                 "key": "modeled_vehicle_weight",
//                 "value": "13000"
//             },
//             {
//                 "unit": "kg",
//                 "description": "Registered weight of the cargo carried by the vehicle from the WINGS Citizen App.",
//                 "key": "registered_cargo_weight",
//                 "value": "8000"
//             },
//             {
//                 "unit": "ppm",
//                 "description": "Evolution of CO2 levels measured by the CO2 sensor",
//                 "key": "CO2_levels",
//                 "value": "130"
//             },
//             {
//                 "unit": "counted",
//                 "description": "Estimated number of people in the vehicle based on the fitted model",
//                 "key": "estimated_number_of_people",
//                 "value": "1"
//             }
//         ],
//         "metadata": [
//             {
//                 "fileMediaType": "JPG",
//                 "description": "Vessel picture",
//                 "fileURI": "http://myhost.com/path/image.jpg"
//             }
//         ]
// 	},
// 	{
// 		"id": "19",
// 		"datetime": "2024-02-08T17:12:43.225Z",
// 		"type": "Anomaly",
// 		"anomalyType": "BlockchainMisVerification",
//         "involvedObjects": [
//             {
//                 "type": "Person",
//                 "visualId": 1,
//                 "location": {
//                     "type": "Feature",
//                     "geometry": {
//                         "type": "Point",
//                         "coordinates": [
//                             23.78352554,
//                             37.97843493
//                         ]
//                     },
//                     "properties": {
//                         "detectionConfidence": 0.8222631216049194,
//                         "trackingConfidence": 0.8222631216049194
//                     }
//                 },
//                 "role": "Carrier|Passenger|Stowaways",
//                 "metadata": [
//                     {
//                         "fileMediaType": "JPG",
//                         "description": "Officier picture",
//                         "fileURI": "http://myhost.com/path/image.jpg"
//                     }
//                 ]
//             },
//             {
//                 "type": "Vessel",
//                 "shipType": "PassengerShip|FishingVessel|NuclearShip|BulkCarrier|OilTanker|GeneralCargoShip|HighSpeedCraft|MobileOffShoreDrillingUnit|SpecialPurposeShip|Other",
//                 "mmsi": "249891000",
//                 "name": "B GAS NEPTUNE",
//                 "imoNumber": "9269374",
//                 "callSign": "9HA2059",
//                 "navigationStatus": "UnderWayUsingEngine|AtAnchor|NotUnderCommand|RestrictedManoeuvrability|ConstrainedByHerDraught|Moored|Aground|EngagedInFishing|UnderWaySailing|EngagedInFishingOtherThanTrawling|AirCushionVesselInNonDisplamenetModeOrWIGCraftTakingOffLandingOrInFlight|PowerDrivenVesselTowingAstern|PowerDrivenVesselTowigAheadOrPushingAlongside|InDistressOrRequiringAssistance|AISSARTSeekingToAttractAttention|UndefinedDefault|Other",
//                 "location": {
//                     "type": "Feature",
//                     "geometry": {
//                         "type": "Point",
//                         "coordinates": [
//                             23.783485549232723,
//                             37.978891183660909
//                         ]
//                     },
//                     "properties": {}
//                 },
//                 "role": "Carrier|Passenger|Stowaways|Goods|Contraband",
//                 "cargo": [
//                     {
//                         "quantity": 1000,
//                         "unit": "tons",
//                         "description": "cotton socks",
//                         "type": "Good|Contraband"
//                     }
//                 ]
//             },
//             {
//                 "type": "Van|Car|Bycicle|Motorcycle|Bus|Scooter|Truck|Semi-Truck|Train",
//                 "plate": "ABCDE1234",
//                 "totalPersonOnBoard": 12,
//                 "location": {
//                     "type": "Feature",
//                     "geometry": {
//                         "type": "Point",
//                         "coordinates": [
//                             23.783485549232723,
//                             37.978891183660909
//                         ]
//                     },
//                     "properties": {}
//                 },
//                 "externalAttributes": {
//                     "unlawfulParkingId": "UP_001",
//                     "uTurnId": "UT_001"
//                 }
//             }
//         ],
//         "location": {
//             "type": "Feature",
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [
//                     23.7834875,
//                     37.9785241
//                 ]
//             },
//             "properties": {}
//         },
//         "trackingDetection": {
//             "uavLocation": {
//                 "type": "Feature",
//                 "geometry": {
//                     "type": "Point",
//                     "coordinates": [
//                         23.783581129277605,
//                         37.978414892115768
//                     ]
//                 },
//                 "properties": {}
//             },
//             "detectionConfidence": [
//                 0.8222631216049194,
//                 0.6486086249351502
//             ],
//             "trackingConfidence": [
//                 0.8222631216049194,
//                 0.6486086249351502
//             ],
//             "geometries": [
//                 {
//                     "type": "Feature",
//                     "geometry": {
//                         "type": "Polygon",
//                         "coordinates": [
//                             [
//                                 [
//                                     23.783488,
//                                     37.9784476
//                                 ],
//                                 [
//                                     23.7835765,
//                                     37.9784476
//                                 ],
//                                 [
//                                     23.783614,
//                                     37.9784053
//                                 ],
//                                 [
//                                     23.7835658,
//                                     37.9783799
//                                 ],
//                                 [
//                                     23.7835604,
//                                     37.9784053
//                                 ],
//                                 [
//                                     23.7835255,
//                                     37.9784037
//                                 ],
//                                 [
//                                     23.7834746,
//                                     37.9784095
//                                 ],
//                                 [
//                                     23.7834766,
//                                     37.9784465
//                                 ],
//                                 [
//                                     23.783488,
//                                     37.9784476
//                                 ]
//                             ]
//                         ]
//                     },
//                     "properties": {
//                         "prohibited_area": "internal"
//                     }
//                 }
//             ]
//         },
//         "faceDetection": {
//             "images": [
//                 "imageBASE64"
//             ]
//         },
//         "metrics": [
//             {
//                 "unit": "number",
//                 "description": "Number of vans",
//                 "key": "num_vans",
//                 "value": "1"
//             },
//             {
//                 "unit": "number",
//                 "description": "Number of motorcycles",
//                 "key": "num_motorcycles",
//                 "value": "1"
//             },
//             {
//                 "unit": "kg",
//                 "description": "Weight of the vehicle determined by modeling the outputs of the On-Board Unit (OBU) using eigenfrequency analysis.",
//                 "key": "modeled_vehicle_weight",
//                 "value": "13000"
//             },
//             {
//                 "unit": "kg",
//                 "description": "Registered weight of the cargo carried by the vehicle from the WINGS Citizen App.",
//                 "key": "registered_cargo_weight",
//                 "value": "8000"
//             },
//             {
//                 "unit": "ppm",
//                 "description": "Evolution of CO2 levels measured by the CO2 sensor",
//                 "key": "CO2_levels",
//                 "value": "130"
//             },
//             {
//                 "unit": "counted",
//                 "description": "Estimated number of people in the vehicle based on the fitted model",
//                 "key": "estimated_number_of_people",
//                 "value": "1"
//             }
//         ],
//         "metadata": [
//             {
//                 "fileMediaType": "JPG",
//                 "description": "Vessel picture",
//                 "fileURI": "http://myhost.com/path/image.jpg"
//             }
//         ]
// 	},
// 	{
// 		"id": "20",
// 		"datetime": "2024-02-09T17:12:43.225Z",
// 		"type": "Anomaly",
// 		"anomalyType": "GoodsFromEphidemicRegion",
//         "involvedObjects": [
//             {
//                 "type": "Person",
//                 "visualId": 1,
//                 "location": {
//                     "type": "Feature",
//                     "geometry": {
//                         "type": "Point",
//                         "coordinates": [
//                             23.78352554,
//                             37.97843493
//                         ]
//                     },
//                     "properties": {
//                         "detectionConfidence": 0.8222631216049194,
//                         "trackingConfidence": 0.8222631216049194
//                     }
//                 },
//                 "role": "Carrier|Passenger|Stowaways",
//                 "metadata": [
//                     {
//                         "fileMediaType": "JPG",
//                         "description": "Officier picture",
//                         "fileURI": "http://myhost.com/path/image.jpg"
//                     }
//                 ]
//             },
//             {
//                 "type": "Vessel",
//                 "shipType": "PassengerShip|FishingVessel|NuclearShip|BulkCarrier|OilTanker|GeneralCargoShip|HighSpeedCraft|MobileOffShoreDrillingUnit|SpecialPurposeShip|Other",
//                 "mmsi": "249891000",
//                 "name": "B GAS NEPTUNE",
//                 "imoNumber": "9269374",
//                 "callSign": "9HA2059",
//                 "navigationStatus": "UnderWayUsingEngine|AtAnchor|NotUnderCommand|RestrictedManoeuvrability|ConstrainedByHerDraught|Moored|Aground|EngagedInFishing|UnderWaySailing|EngagedInFishingOtherThanTrawling|AirCushionVesselInNonDisplamenetModeOrWIGCraftTakingOffLandingOrInFlight|PowerDrivenVesselTowingAstern|PowerDrivenVesselTowigAheadOrPushingAlongside|InDistressOrRequiringAssistance|AISSARTSeekingToAttractAttention|UndefinedDefault|Other",
//                 "location": {
//                     "type": "Feature",
//                     "geometry": {
//                         "type": "Point",
//                         "coordinates": [
//                             23.783485549232723,
//                             37.978891183660909
//                         ]
//                     },
//                     "properties": {}
//                 },
//                 "role": "Carrier|Passenger|Stowaways|Goods|Contraband",
//                 "cargo": [
//                     {
//                         "quantity": 1000,
//                         "unit": "tons",
//                         "description": "cotton socks",
//                         "type": "Good|Contraband"
//                     }
//                 ]
//             },
//             {
//                 "type": "Van|Car|Bycicle|Motorcycle|Bus|Scooter|Truck|Semi-Truck|Train",
//                 "plate": "ABCDE1234",
//                 "totalPersonOnBoard": 12,
//                 "location": {
//                     "type": "Feature",
//                     "geometry": {
//                         "type": "Point",
//                         "coordinates": [
//                             23.783485549232723,
//                             37.978891183660909
//                         ]
//                     },
//                     "properties": {}
//                 },
//                 "externalAttributes": {
//                     "unlawfulParkingId": "UP_001",
//                     "uTurnId": "UT_001"
//                 }
//             }
//         ],
//         "location": {
//             "type": "Feature",
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [
//                     23.7834875,
//                     37.9785241
//                 ]
//             },
//             "properties": {}
//         },
//         "trackingDetection": {
//             "uavLocation": {
//                 "type": "Feature",
//                 "geometry": {
//                     "type": "Point",
//                     "coordinates": [
//                         23.783581129277605,
//                         37.978414892115768
//                     ]
//                 },
//                 "properties": {}
//             },
//             "detectionConfidence": [
//                 0.8222631216049194,
//                 0.6486086249351502
//             ],
//             "trackingConfidence": [
//                 0.8222631216049194,
//                 0.6486086249351502
//             ],
//             "geometries": [
//                 {
//                     "type": "Feature",
//                     "geometry": {
//                         "type": "Polygon",
//                         "coordinates": [
//                             [
//                                 [
//                                     23.783488,
//                                     37.9784476
//                                 ],
//                                 [
//                                     23.7835765,
//                                     37.9784476
//                                 ],
//                                 [
//                                     23.783614,
//                                     37.9784053
//                                 ],
//                                 [
//                                     23.7835658,
//                                     37.9783799
//                                 ],
//                                 [
//                                     23.7835604,
//                                     37.9784053
//                                 ],
//                                 [
//                                     23.7835255,
//                                     37.9784037
//                                 ],
//                                 [
//                                     23.7834746,
//                                     37.9784095
//                                 ],
//                                 [
//                                     23.7834766,
//                                     37.9784465
//                                 ],
//                                 [
//                                     23.783488,
//                                     37.9784476
//                                 ]
//                             ]
//                         ]
//                     },
//                     "properties": {
//                         "prohibited_area": "internal"
//                     }
//                 }
//             ]
//         },
//         "faceDetection": {
//             "images": [
//                 "imageBASE64"
//             ]
//         },
//         "metrics": [
//             {
//                 "unit": "number",
//                 "description": "Number of vans",
//                 "key": "num_vans",
//                 "value": "1"
//             },
//             {
//                 "unit": "number",
//                 "description": "Number of motorcycles",
//                 "key": "num_motorcycles",
//                 "value": "1"
//             },
//             {
//                 "unit": "kg",
//                 "description": "Weight of the vehicle determined by modeling the outputs of the On-Board Unit (OBU) using eigenfrequency analysis.",
//                 "key": "modeled_vehicle_weight",
//                 "value": "13000"
//             },
//             {
//                 "unit": "kg",
//                 "description": "Registered weight of the cargo carried by the vehicle from the WINGS Citizen App.",
//                 "key": "registered_cargo_weight",
//                 "value": "8000"
//             },
//             {
//                 "unit": "ppm",
//                 "description": "Evolution of CO2 levels measured by the CO2 sensor",
//                 "key": "CO2_levels",
//                 "value": "130"
//             },
//             {
//                 "unit": "counted",
//                 "description": "Estimated number of people in the vehicle based on the fitted model",
//                 "key": "estimated_number_of_people",
//                 "value": "1"
//             }
//         ],
//         "metadata": [
//             {
//                 "fileMediaType": "JPG",
//                 "description": "Vessel picture",
//                 "fileURI": "http://myhost.com/path/image.jpg"
//             }
//         ]
// 	},
// 	{
// 		"id": "21",
// 		"datetime": "2024-02-10T17:12:43.225Z",
// 		"type": "Anomaly",
// 		"anomalyType": "UnaccompaniedMinor",
//         "involvedObjects": [
//             {
//                 "type": "Person",
//                 "visualId": 1,
//                 "location": {
//                     "type": "Feature",
//                     "geometry": {
//                         "type": "Point",
//                         "coordinates": [
//                             23.78352554,
//                             37.97843493
//                         ]
//                     },
//                     "properties": {
//                         "detectionConfidence": 0.8222631216049194,
//                         "trackingConfidence": 0.8222631216049194
//                     }
//                 },
//                 "role": "Carrier|Passenger|Stowaways",
//                 "metadata": [
//                     {
//                         "fileMediaType": "JPG",
//                         "description": "Officier picture",
//                         "fileURI": "http://myhost.com/path/image.jpg"
//                     }
//                 ]
//             },
//             {
//                 "type": "Vessel",
//                 "shipType": "PassengerShip|FishingVessel|NuclearShip|BulkCarrier|OilTanker|GeneralCargoShip|HighSpeedCraft|MobileOffShoreDrillingUnit|SpecialPurposeShip|Other",
//                 "mmsi": "249891000",
//                 "name": "B GAS NEPTUNE",
//                 "imoNumber": "9269374",
//                 "callSign": "9HA2059",
//                 "navigationStatus": "UnderWayUsingEngine|AtAnchor|NotUnderCommand|RestrictedManoeuvrability|ConstrainedByHerDraught|Moored|Aground|EngagedInFishing|UnderWaySailing|EngagedInFishingOtherThanTrawling|AirCushionVesselInNonDisplamenetModeOrWIGCraftTakingOffLandingOrInFlight|PowerDrivenVesselTowingAstern|PowerDrivenVesselTowigAheadOrPushingAlongside|InDistressOrRequiringAssistance|AISSARTSeekingToAttractAttention|UndefinedDefault|Other",
//                 "location": {
//                     "type": "Feature",
//                     "geometry": {
//                         "type": "Point",
//                         "coordinates": [
//                             23.783485549232723,
//                             37.978891183660909
//                         ]
//                     },
//                     "properties": {}
//                 },
//                 "role": "Carrier|Passenger|Stowaways|Goods|Contraband",
//                 "cargo": [
//                     {
//                         "quantity": 1000,
//                         "unit": "tons",
//                         "description": "cotton socks",
//                         "type": "Good|Contraband"
//                     }
//                 ]
//             },
//             {
//                 "type": "Van|Car|Bycicle|Motorcycle|Bus|Scooter|Truck|Semi-Truck|Train",
//                 "plate": "ABCDE1234",
//                 "totalPersonOnBoard": 12,
//                 "location": {
//                     "type": "Feature",
//                     "geometry": {
//                         "type": "Point",
//                         "coordinates": [
//                             23.783485549232723,
//                             37.978891183660909
//                         ]
//                     },
//                     "properties": {}
//                 },
//                 "externalAttributes": {
//                     "unlawfulParkingId": "UP_001",
//                     "uTurnId": "UT_001"
//                 }
//             }
//         ],
//         "location": {
//             "type": "Feature",
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [
//                     23.7834875,
//                     37.9785241
//                 ]
//             },
//             "properties": {}
//         },
//         "trackingDetection": {
//             "uavLocation": {
//                 "type": "Feature",
//                 "geometry": {
//                     "type": "Point",
//                     "coordinates": [
//                         23.783581129277605,
//                         37.978414892115768
//                     ]
//                 },
//                 "properties": {}
//             },
//             "detectionConfidence": [
//                 0.8222631216049194,
//                 0.6486086249351502
//             ],
//             "trackingConfidence": [
//                 0.8222631216049194,
//                 0.6486086249351502
//             ],
//             "geometries": [
//                 {
//                     "type": "Feature",
//                     "geometry": {
//                         "type": "Polygon",
//                         "coordinates": [
//                             [
//                                 [
//                                     23.783488,
//                                     37.9784476
//                                 ],
//                                 [
//                                     23.7835765,
//                                     37.9784476
//                                 ],
//                                 [
//                                     23.783614,
//                                     37.9784053
//                                 ],
//                                 [
//                                     23.7835658,
//                                     37.9783799
//                                 ],
//                                 [
//                                     23.7835604,
//                                     37.9784053
//                                 ],
//                                 [
//                                     23.7835255,
//                                     37.9784037
//                                 ],
//                                 [
//                                     23.7834746,
//                                     37.9784095
//                                 ],
//                                 [
//                                     23.7834766,
//                                     37.9784465
//                                 ],
//                                 [
//                                     23.783488,
//                                     37.9784476
//                                 ]
//                             ]
//                         ]
//                     },
//                     "properties": {
//                         "prohibited_area": "internal"
//                     }
//                 }
//             ]
//         },
//         "faceDetection": {
//             "images": [
//                 "imageBASE64"
//             ]
//         },
//         "metrics": [
//             {
//                 "unit": "number",
//                 "description": "Number of vans",
//                 "key": "num_vans",
//                 "value": "1"
//             },
//             {
//                 "unit": "number",
//                 "description": "Number of motorcycles",
//                 "key": "num_motorcycles",
//                 "value": "1"
//             },
//             {
//                 "unit": "kg",
//                 "description": "Weight of the vehicle determined by modeling the outputs of the On-Board Unit (OBU) using eigenfrequency analysis.",
//                 "key": "modeled_vehicle_weight",
//                 "value": "13000"
//             },
//             {
//                 "unit": "kg",
//                 "description": "Registered weight of the cargo carried by the vehicle from the WINGS Citizen App.",
//                 "key": "registered_cargo_weight",
//                 "value": "8000"
//             },
//             {
//                 "unit": "ppm",
//                 "description": "Evolution of CO2 levels measured by the CO2 sensor",
//                 "key": "CO2_levels",
//                 "value": "130"
//             },
//             {
//                 "unit": "counted",
//                 "description": "Estimated number of people in the vehicle based on the fitted model",
//                 "key": "estimated_number_of_people",
//                 "value": "1"
//             }
//         ],
//         "metadata": [
//             {
//                 "fileMediaType": "JPG",
//                 "description": "Vessel picture",
//                 "fileURI": "http://myhost.com/path/image.jpg"
//             }
//         ]
// 	},
//     {
//         "id": "22",
//         "datetime": "2024-02-11T10:30:00.000Z",
//         "type": "Anomaly",
//         "anomalyType": "Contraband",
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
// 			"shipType": "PassengerShip|FishingVessel|NuclearShip|BulkCarrier|OilTanker|GeneralCargoShip|HighSpeedCraft|MobileOffShoreDrillingUnit|SpecialPurposeShip|Other",
// 			"mmsi": "249891000",
// 			"name": "B GAS NEPTUNE",
// 			"imoNumber": "9269374",
// 			"callSign": "9HA2059",
// 			"navigationStatus": "UnderWayUsingEngine|AtAnchor|NotUnderCommand|RestrictedManoeuvrability|ConstrainedByHerDraught|Moored|Aground|EngagedInFishing|UnderWaySailing|EngagedInFishingOtherThanTrawling|AirCushionVesselInNonDisplamenetModeOrWIGCraftTakingOffLandingOrInFlight|PowerDrivenVesselTowingAstern|PowerDrivenVesselTowigAheadOrPushingAlongside|InDistressOrRequiringAssistance|AISSARTSeekingToAttractAttention|UndefinedDefault|Other",
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
// 				"uTurnId": "UT_001"
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
//         "id": "23",
//         "datetime": "2024-02-12T14:15:00.000Z",
//         "type": "Anomaly",
//         "anomalyType": "UnaccompaniedMinor",
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
// 			"shipType": "PassengerShip|FishingVessel|NuclearShip|BulkCarrier|OilTanker|GeneralCargoShip|HighSpeedCraft|MobileOffShoreDrillingUnit|SpecialPurposeShip|Other",
// 			"mmsi": "249891000",
// 			"name": "B GAS NEPTUNE",
// 			"imoNumber": "9269374",
// 			"callSign": "9HA2059",
// 			"navigationStatus": "UnderWayUsingEngine|AtAnchor|NotUnderCommand|RestrictedManoeuvrability|ConstrainedByHerDraught|Moored|Aground|EngagedInFishing|UnderWaySailing|EngagedInFishingOtherThanTrawling|AirCushionVesselInNonDisplamenetModeOrWIGCraftTakingOffLandingOrInFlight|PowerDrivenVesselTowingAstern|PowerDrivenVesselTowigAheadOrPushingAlongside|InDistressOrRequiringAssistance|AISSARTSeekingToAttractAttention|UndefinedDefault|Other",
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
// 				"uTurnId": "UT_001"
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
//         "id": "24",
//         "datetime": "2024-02-13T08:45:00.000Z",
//         "type": "Anomaly",
//         "anomalyType": "SuspiciousDrivingPattern",
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
// 			"shipType": "PassengerShip|FishingVessel|NuclearShip|BulkCarrier|OilTanker|GeneralCargoShip|HighSpeedCraft|MobileOffShoreDrillingUnit|SpecialPurposeShip|Other",
// 			"mmsi": "249891000",
// 			"name": "B GAS NEPTUNE",
// 			"imoNumber": "9269374",
// 			"callSign": "9HA2059",
// 			"navigationStatus": "UnderWayUsingEngine|AtAnchor|NotUnderCommand|RestrictedManoeuvrability|ConstrainedByHerDraught|Moored|Aground|EngagedInFishing|UnderWaySailing|EngagedInFishingOtherThanTrawling|AirCushionVesselInNonDisplamenetModeOrWIGCraftTakingOffLandingOrInFlight|PowerDrivenVesselTowingAstern|PowerDrivenVesselTowigAheadOrPushingAlongside|InDistressOrRequiringAssistance|AISSARTSeekingToAttractAttention|UndefinedDefault|Other",
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
// 				"uTurnId": "UT_001"
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
//         "id": "25",
//         "datetime": "2024-02-14T16:20:00.000Z",
//         "type": "Anomaly",
//         "anomalyType": "UnlawfulParkingVehicle",
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
// 			"shipType": "PassengerShip|FishingVessel|NuclearShip|BulkCarrier|OilTanker|GeneralCargoShip|HighSpeedCraft|MobileOffShoreDrillingUnit|SpecialPurposeShip|Other",
// 			"mmsi": "249891000",
// 			"name": "B GAS NEPTUNE",
// 			"imoNumber": "9269374",
// 			"callSign": "9HA2059",
// 			"navigationStatus": "UnderWayUsingEngine|AtAnchor|NotUnderCommand|RestrictedManoeuvrability|ConstrainedByHerDraught|Moored|Aground|EngagedInFishing|UnderWaySailing|EngagedInFishingOtherThanTrawling|AirCushionVesselInNonDisplamenetModeOrWIGCraftTakingOffLandingOrInFlight|PowerDrivenVesselTowingAstern|PowerDrivenVesselTowigAheadOrPushingAlongside|InDistressOrRequiringAssistance|AISSARTSeekingToAttractAttention|UndefinedDefault|Other",
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
// 				"uTurnId": "UT_001"
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
//         "id": "26",
//         "datetime": "2024-02-15T11:50:00.000Z",
//         "type": "Anomaly",
//         "anomalyType": "PersonRunning",
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
// 			"shipType": "PassengerShip|FishingVessel|NuclearShip|BulkCarrier|OilTanker|GeneralCargoShip|HighSpeedCraft|MobileOffShoreDrillingUnit|SpecialPurposeShip|Other",
// 			"mmsi": "249891000",
// 			"name": "B GAS NEPTUNE",
// 			"imoNumber": "9269374",
// 			"callSign": "9HA2059",
// 			"navigationStatus": "UnderWayUsingEngine|AtAnchor|NotUnderCommand|RestrictedManoeuvrability|ConstrainedByHerDraught|Moored|Aground|EngagedInFishing|UnderWaySailing|EngagedInFishingOtherThanTrawling|AirCushionVesselInNonDisplamenetModeOrWIGCraftTakingOffLandingOrInFlight|PowerDrivenVesselTowingAstern|PowerDrivenVesselTowigAheadOrPushingAlongside|InDistressOrRequiringAssistance|AISSARTSeekingToAttractAttention|UndefinedDefault|Other",
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
// 				"uTurnId": "UT_001"
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
//         "id": "27",
//         "datetime": "2024-02-16T09:10:00.000Z",
//         "type": "Anomaly",
//         "anomalyType": "Smuggling",
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
// 			"shipType": "PassengerShip|FishingVessel|NuclearShip|BulkCarrier|OilTanker|GeneralCargoShip|HighSpeedCraft|MobileOffShoreDrillingUnit|SpecialPurposeShip|Other",
// 			"mmsi": "249891000",
// 			"name": "B GAS NEPTUNE",
// 			"imoNumber": "9269374",
// 			"callSign": "9HA2059",
// 			"navigationStatus": "UnderWayUsingEngine|AtAnchor|NotUnderCommand|RestrictedManoeuvrability|ConstrainedByHerDraught|Moored|Aground|EngagedInFishing|UnderWaySailing|EngagedInFishingOtherThanTrawling|AirCushionVesselInNonDisplamenetModeOrWIGCraftTakingOffLandingOrInFlight|PowerDrivenVesselTowingAstern|PowerDrivenVesselTowigAheadOrPushingAlongside|InDistressOrRequiringAssistance|AISSARTSeekingToAttractAttention|UndefinedDefault|Other",
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
// 				"uTurnId": "UT_001"
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
//         "id": "28",
//         "datetime": "2024-02-17T13:35:00.000Z",
//         "type": "Anomaly",
//         "anomalyType": "BiometricDataInconsistency",
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
// 			"shipType": "PassengerShip|FishingVessel|NuclearShip|BulkCarrier|OilTanker|GeneralCargoShip|HighSpeedCraft|MobileOffShoreDrillingUnit|SpecialPurposeShip|Other",
// 			"mmsi": "249891000",
// 			"name": "B GAS NEPTUNE",
// 			"imoNumber": "9269374",
// 			"callSign": "9HA2059",
// 			"navigationStatus": "UnderWayUsingEngine|AtAnchor|NotUnderCommand|RestrictedManoeuvrability|ConstrainedByHerDraught|Moored|Aground|EngagedInFishing|UnderWaySailing|EngagedInFishingOtherThanTrawling|AirCushionVesselInNonDisplamenetModeOrWIGCraftTakingOffLandingOrInFlight|PowerDrivenVesselTowingAstern|PowerDrivenVesselTowigAheadOrPushingAlongside|InDistressOrRequiringAssistance|AISSARTSeekingToAttractAttention|UndefinedDefault|Other",
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
// 				"uTurnId": "UT_001"
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
//         "id": "29",
//         "datetime": "2024-02-18T18:40:00.000Z",
//         "type": "Anomaly",
//         "anomalyType": "PersonMisVerified",
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
// 			"shipType": "PassengerShip|FishingVessel|NuclearShip|BulkCarrier|OilTanker|GeneralCargoShip|HighSpeedCraft|MobileOffShoreDrillingUnit|SpecialPurposeShip|Other",
// 			"mmsi": "249891000",
// 			"name": "B GAS NEPTUNE",
// 			"imoNumber": "9269374",
// 			"callSign": "9HA2059",
// 			"navigationStatus": "UnderWayUsingEngine|AtAnchor|NotUnderCommand|RestrictedManoeuvrability|ConstrainedByHerDraught|Moored|Aground|EngagedInFishing|UnderWaySailing|EngagedInFishingOtherThanTrawling|AirCushionVesselInNonDisplamenetModeOrWIGCraftTakingOffLandingOrInFlight|PowerDrivenVesselTowingAstern|PowerDrivenVesselTowigAheadOrPushingAlongside|InDistressOrRequiringAssistance|AISSARTSeekingToAttractAttention|UndefinedDefault|Other",
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
// 				"uTurnId": "UT_001"
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
//         "id": "30",
//         "datetime": "2024-02-19T15:25:00.000Z",
//         "type": "Anomaly",
//         "anomalyType": "AbnormalWeight",
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
// 			"shipType": "PassengerShip|FishingVessel|NuclearShip|BulkCarrier|OilTanker|GeneralCargoShip|HighSpeedCraft|MobileOffShoreDrillingUnit|SpecialPurposeShip|Other",
// 			"mmsi": "249891000",
// 			"name": "B GAS NEPTUNE",
// 			"imoNumber": "9269374",
// 			"callSign": "9HA2059",
// 			"navigationStatus": "UnderWayUsingEngine|AtAnchor|NotUnderCommand|RestrictedManoeuvrability|ConstrainedByHerDraught|Moored|Aground|EngagedInFishing|UnderWaySailing|EngagedInFishingOtherThanTrawling|AirCushionVesselInNonDisplamenetModeOrWIGCraftTakingOffLandingOrInFlight|PowerDrivenVesselTowingAstern|PowerDrivenVesselTowigAheadOrPushingAlongside|InDistressOrRequiringAssistance|AISSARTSeekingToAttractAttention|UndefinedDefault|Other",
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
// 				"uTurnId": "UT_001"
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
//         "id": "31",
//         "datetime": "2024-02-20T12:05:00.000Z",
//         "type": "Anomaly",
//         "anomalyType": "UturnVehicle",
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
// 			"shipType": "PassengerShip|FishingVessel|NuclearShip|BulkCarrier|OilTanker|GeneralCargoShip|HighSpeedCraft|MobileOffShoreDrillingUnit|SpecialPurposeShip|Other",
// 			"mmsi": "249891000",
// 			"name": "B GAS NEPTUNE",
// 			"imoNumber": "9269374",
// 			"callSign": "9HA2059",
// 			"navigationStatus": "UnderWayUsingEngine|AtAnchor|NotUnderCommand|RestrictedManoeuvrability|ConstrainedByHerDraught|Moored|Aground|EngagedInFishing|UnderWaySailing|EngagedInFishingOtherThanTrawling|AirCushionVesselInNonDisplamenetModeOrWIGCraftTakingOffLandingOrInFlight|PowerDrivenVesselTowingAstern|PowerDrivenVesselTowigAheadOrPushingAlongside|InDistressOrRequiringAssistance|AISSARTSeekingToAttractAttention|UndefinedDefault|Other",
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
// 				"uTurnId": "UT_001"
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
//         "id": "32",
//         "datetime": "2024-02-21T17:55:00.000Z",
//         "type": "Anomaly",
//         "anomalyType": "GoodsFromEphidemicRegion",
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
// 			"shipType": "PassengerShip|FishingVessel|NuclearShip|BulkCarrier|OilTanker|GeneralCargoShip|HighSpeedCraft|MobileOffShoreDrillingUnit|SpecialPurposeShip|Other",
// 			"mmsi": "249891000",
// 			"name": "B GAS NEPTUNE",
// 			"imoNumber": "9269374",
// 			"callSign": "9HA2059",
// 			"navigationStatus": "UnderWayUsingEngine|AtAnchor|NotUnderCommand|RestrictedManoeuvrability|ConstrainedByHerDraught|Moored|Aground|EngagedInFishing|UnderWaySailing|EngagedInFishingOtherThanTrawling|AirCushionVesselInNonDisplamenetModeOrWIGCraftTakingOffLandingOrInFlight|PowerDrivenVesselTowingAstern|PowerDrivenVesselTowigAheadOrPushingAlongside|InDistressOrRequiringAssistance|AISSARTSeekingToAttractAttention|UndefinedDefault|Other",
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
// 				"uTurnId": "UT_001"
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
//         "id": "33",
//         "datetime": "2024-02-22T20:30:00.000Z",
//         "type": "Anomaly",
//         "anomalyType": "FalsifiedDocuments",
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
// 			"shipType": "PassengerShip|FishingVessel|NuclearShip|BulkCarrier|OilTanker|GeneralCargoShip|HighSpeedCraft|MobileOffShoreDrillingUnit|SpecialPurposeShip|Other",
// 			"mmsi": "249891000",
// 			"name": "B GAS NEPTUNE",
// 			"imoNumber": "9269374",
// 			"callSign": "9HA2059",
// 			"navigationStatus": "UnderWayUsingEngine|AtAnchor|NotUnderCommand|RestrictedManoeuvrability|ConstrainedByHerDraught|Moored|Aground|EngagedInFishing|UnderWaySailing|EngagedInFishingOtherThanTrawling|AirCushionVesselInNonDisplamenetModeOrWIGCraftTakingOffLandingOrInFlight|PowerDrivenVesselTowingAstern|PowerDrivenVesselTowigAheadOrPushingAlongside|InDistressOrRequiringAssistance|AISSARTSeekingToAttractAttention|UndefinedDefault|Other",
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
// 				"uTurnId": "UT_001"
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
//         "id": "34",
//         "datetime": "2024-02-23T19:40:00.000Z",
//         "type": "Anomaly",
//         "anomalyType": "UnlawfulCrossingBorder",
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
// 			"shipType": "PassengerShip|FishingVessel|NuclearShip|BulkCarrier|OilTanker|GeneralCargoShip|HighSpeedCraft|MobileOffShoreDrillingUnit|SpecialPurposeShip|Other",
// 			"mmsi": "249891000",
// 			"name": "B GAS NEPTUNE",
// 			"imoNumber": "9269374",
// 			"callSign": "9HA2059",
// 			"navigationStatus": "UnderWayUsingEngine|AtAnchor|NotUnderCommand|RestrictedManoeuvrability|ConstrainedByHerDraught|Moored|Aground|EngagedInFishing|UnderWaySailing|EngagedInFishingOtherThanTrawling|AirCushionVesselInNonDisplamenetModeOrWIGCraftTakingOffLandingOrInFlight|PowerDrivenVesselTowingAstern|PowerDrivenVesselTowigAheadOrPushingAlongside|InDistressOrRequiringAssistance|AISSARTSeekingToAttractAttention|UndefinedDefault|Other",
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
// 				"uTurnId": "UT_001"
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
//         "id": "35",
//         "datetime": "2024-02-24T08:15:00.000Z",
//         "type": "Anomaly",
//         "anomalyType": "HumanTrafficking",
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
// 			"shipType": "PassengerShip|FishingVessel|NuclearShip|BulkCarrier|OilTanker|GeneralCargoShip|HighSpeedCraft|MobileOffShoreDrillingUnit|SpecialPurposeShip|Other",
// 			"mmsi": "249891000",
// 			"name": "B GAS NEPTUNE",
// 			"imoNumber": "9269374",
// 			"callSign": "9HA2059",
// 			"navigationStatus": "UnderWayUsingEngine|AtAnchor|NotUnderCommand|RestrictedManoeuvrability|ConstrainedByHerDraught|Moored|Aground|EngagedInFishing|UnderWaySailing|EngagedInFishingOtherThanTrawling|AirCushionVesselInNonDisplamenetModeOrWIGCraftTakingOffLandingOrInFlight|PowerDrivenVesselTowingAstern|PowerDrivenVesselTowigAheadOrPushingAlongside|InDistressOrRequiringAssistance|AISSARTSeekingToAttractAttention|UndefinedDefault|Other",
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
// 				"uTurnId": "UT_001"
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
//         "id": "36",
//         "datetime": "2024-02-25T14:00:00.000Z",
//         "type": "Anomaly",
//         "anomalyType": "Contraband",
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
// 			"shipType": "PassengerShip|FishingVessel|NuclearShip|BulkCarrier|OilTanker|GeneralCargoShip|HighSpeedCraft|MobileOffShoreDrillingUnit|SpecialPurposeShip|Other",
// 			"mmsi": "249891000",
// 			"name": "B GAS NEPTUNE",
// 			"imoNumber": "9269374",
// 			"callSign": "9HA2059",
// 			"navigationStatus": "UnderWayUsingEngine|AtAnchor|NotUnderCommand|RestrictedManoeuvrability|ConstrainedByHerDraught|Moored|Aground|EngagedInFishing|UnderWaySailing|EngagedInFishingOtherThanTrawling|AirCushionVesselInNonDisplamenetModeOrWIGCraftTakingOffLandingOrInFlight|PowerDrivenVesselTowingAstern|PowerDrivenVesselTowigAheadOrPushingAlongside|InDistressOrRequiringAssistance|AISSARTSeekingToAttractAttention|UndefinedDefault|Other",
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
// 				"uTurnId": "UT_001"
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
//         "id": "37",
//         "datetime": "2024-02-26T07:45:00.000Z",
//         "type": "Anomaly",
//         "anomalyType": "BlockchainMisVerification",
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
// 			"shipType": "PassengerShip|FishingVessel|NuclearShip|BulkCarrier|OilTanker|GeneralCargoShip|HighSpeedCraft|MobileOffShoreDrillingUnit|SpecialPurposeShip|Other",
// 			"mmsi": "249891000",
// 			"name": "B GAS NEPTUNE",
// 			"imoNumber": "9269374",
// 			"callSign": "9HA2059",
// 			"navigationStatus": "UnderWayUsingEngine|AtAnchor|NotUnderCommand|RestrictedManoeuvrability|ConstrainedByHerDraught|Moored|Aground|EngagedInFishing|UnderWaySailing|EngagedInFishingOtherThanTrawling|AirCushionVesselInNonDisplamenetModeOrWIGCraftTakingOffLandingOrInFlight|PowerDrivenVesselTowingAstern|PowerDrivenVesselTowigAheadOrPushingAlongside|InDistressOrRequiringAssistance|AISSARTSeekingToAttractAttention|UndefinedDefault|Other",
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
// 				"uTurnId": "UT_001"
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
//         "id": "38",
//         "datetime": "2024-02-27T11:10:00.000Z",
//         "type": "Anomaly",
//         "anomalyType": "PersonOutOfBounds",
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
// 			"shipType": "PassengerShip|FishingVessel|NuclearShip|BulkCarrier|OilTanker|GeneralCargoShip|HighSpeedCraft|MobileOffShoreDrillingUnit|SpecialPurposeShip|Other",
// 			"mmsi": "249891000",
// 			"name": "B GAS NEPTUNE",
// 			"imoNumber": "9269374",
// 			"callSign": "9HA2059",
// 			"navigationStatus": "UnderWayUsingEngine|AtAnchor|NotUnderCommand|RestrictedManoeuvrability|ConstrainedByHerDraught|Moored|Aground|EngagedInFishing|UnderWaySailing|EngagedInFishingOtherThanTrawling|AirCushionVesselInNonDisplamenetModeOrWIGCraftTakingOffLandingOrInFlight|PowerDrivenVesselTowingAstern|PowerDrivenVesselTowigAheadOrPushingAlongside|InDistressOrRequiringAssistance|AISSARTSeekingToAttractAttention|UndefinedDefault|Other",
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
// 				"uTurnId": "UT_001"
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
//         "id": "39",
//         "datetime": "2024-02-28T16:35:00.000Z",
//         "type": "Anomaly",
//         "anomalyType": "SuspiciousDrivingPattern",
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
// 			"shipType": "PassengerShip|FishingVessel|NuclearShip|BulkCarrier|OilTanker|GeneralCargoShip|HighSpeedCraft|MobileOffShoreDrillingUnit|SpecialPurposeShip|Other",
// 			"mmsi": "249891000",
// 			"name": "B GAS NEPTUNE",
// 			"imoNumber": "9269374",
// 			"callSign": "9HA2059",
// 			"navigationStatus": "UnderWayUsingEngine|AtAnchor|NotUnderCommand|RestrictedManoeuvrability|ConstrainedByHerDraught|Moored|Aground|EngagedInFishing|UnderWaySailing|EngagedInFishingOtherThanTrawling|AirCushionVesselInNonDisplamenetModeOrWIGCraftTakingOffLandingOrInFlight|PowerDrivenVesselTowingAstern|PowerDrivenVesselTowigAheadOrPushingAlongside|InDistressOrRequiringAssistance|AISSARTSeekingToAttractAttention|UndefinedDefault|Other",
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
// 				"uTurnId": "UT_001"
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
//         "id": "40",
//         "datetime": "2024-02-29T13:20:00.000Z",
//         "type": "Anomaly",
//         "anomalyType": "UturnVehicle",
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
// 			"shipType": "PassengerShip|FishingVessel|NuclearShip|BulkCarrier|OilTanker|GeneralCargoShip|HighSpeedCraft|MobileOffShoreDrillingUnit|SpecialPurposeShip|Other",
// 			"mmsi": "249891000",
// 			"name": "B GAS NEPTUNE",
// 			"imoNumber": "9269374",
// 			"callSign": "9HA2059",
// 			"navigationStatus": "UnderWayUsingEngine|AtAnchor|NotUnderCommand|RestrictedManoeuvrability|ConstrainedByHerDraught|Moored|Aground|EngagedInFishing|UnderWaySailing|EngagedInFishingOtherThanTrawling|AirCushionVesselInNonDisplamenetModeOrWIGCraftTakingOffLandingOrInFlight|PowerDrivenVesselTowingAstern|PowerDrivenVesselTowigAheadOrPushingAlongside|InDistressOrRequiringAssistance|AISSARTSeekingToAttractAttention|UndefinedDefault|Other",
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
// 				"uTurnId": "UT_001"
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
//         "id": "41",
//         "datetime": "2024-03-01T09:50:00.000Z",
//         "type": "Anomaly",
//         "anomalyType": "UnaccompaniedMinor",
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
// 			"shipType": "PassengerShip|FishingVessel|NuclearShip|BulkCarrier|OilTanker|GeneralCargoShip|HighSpeedCraft|MobileOffShoreDrillingUnit|SpecialPurposeShip|Other",
// 			"mmsi": "249891000",
// 			"name": "B GAS NEPTUNE",
// 			"imoNumber": "9269374",
// 			"callSign": "9HA2059",
// 			"navigationStatus": "UnderWayUsingEngine|AtAnchor|NotUnderCommand|RestrictedManoeuvrability|ConstrainedByHerDraught|Moored|Aground|EngagedInFishing|UnderWaySailing|EngagedInFishingOtherThanTrawling|AirCushionVesselInNonDisplamenetModeOrWIGCraftTakingOffLandingOrInFlight|PowerDrivenVesselTowingAstern|PowerDrivenVesselTowigAheadOrPushingAlongside|InDistressOrRequiringAssistance|AISSARTSeekingToAttractAttention|UndefinedDefault|Other",
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
// 				"uTurnId": "UT_001"
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
//     }
// ]
