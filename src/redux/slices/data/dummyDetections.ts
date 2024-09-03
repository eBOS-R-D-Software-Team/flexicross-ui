export const detectionDummy: any[]=[
    {
      "_id": {
        "$oid": "65c5e60a9c57101e28eba6ea"
      },
      "id": "1e0ee7f0-1b35-49e6-a79f-b06024e47b29",
      "datetime": "2024-01-25T16:10:33.964Z",
      "type": "Detection",
      "detectionType": "UnusualPatternDetection",
      "involvedObjects": [
        {
          "type": "Person",
          "visualId": 8,
          "location": {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                18.194721,
                40.364065
              ]
            },
            "properties": {
              "detectionConfidence": 0.8337095975875854,
              "trackingConfidence": 0.8337095975875854
            }
          }
        },
        {
          "type": "Person",
          "location": {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                18.160046,
                40.348891
              ]
            },
            "properties": {
              "detectionConfidence": 0.8447586297988892,
              "trackingConfidence": 0.8447586297988892
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
              23.78358124523576,
              37.978414814211135
            ]
          }
        },
        "geometries": []
      }
    },
    {
      "_id": {
        "$oid": "65c5e60a9c57101e28eba6ec"
      },
      "id": "5",
      "datetime": "2024-01-26T17:10:06.187Z",
      "type": "Detection",
      "detectionType": "FaceVerificationIdentification",
      "location": {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            23.7835493,
            37.978512
          ]
        }
      },
      "involvedObjects": [
        {
          "visualId": 1,
          "type": "Person",
          "height": 172,
          "nationality": "GR",
          "birthday": "1981-07-24",
          "name": "Duffy",
          "eye_color": "Brown",
          "gender": "Male",
          "surname": "Belrose",
          "aliases": [
            "Cherry-pick",
            "White fang"
          ]
        },
        {
          "idNumber": "EB1235L",
          "visualId": 17,
          "type": "Person",
          "height": 172,
          "nationality": "GR",
          "birthday": "1982-07-12",
          "name": "Ethan",
          "eye_color": "Brown",
          "gender": "Male",
          "surname": "Johnson",
          "aliases": [
            "Cherry-pick",
            "White fang"
          ]
        },
        {
          "visualId": 3,
          "type": "Person",
          "height": 172,
          "nationality": "GR",
          "birthday": "1985-07-13",
          "name": "Caleb",
          "eye_color": "Brown",
          "gender": "Male",
          "surname": "Turner",
          "aliases": [
            "Cherry-pick",
            "White fang"
          ]
        },
        {
          "idNumber": "DB1234K",
          "visualId": 4,
          "type": "Person",
          "height": 172,
          "nationality": "GR",
          "birthday": "1970-03-01",
          "name": "Davis",
          "eye_color": "Green",
          "gender": "Male",
          "surname": "Mason",
          "aliases": [
            "Cherry-pick"
          ]
        }
      ],
      "faceDetection": {
        "images": [
          "data:image/png;base64,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",
          "data:image/png;base64,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",
          "data:image/png;base64,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",
          "data:image/png;base64,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"
        ]
      }
    },
    {
      "_id": {
        "$oid": "66447b5a18618013dcdff433"
      },
      "datetime": "2024-01-25T16:11:37.650Z",
      "detectionType": "UnusualPatternDetection",
      "id": "6646f689-0326-4f56-8479-9d5564edce7c",
      "involvedObjects": [
        {
          "visualId": 18,
          "type": "Person",
          "height": 4,
          "nationality": "IT",
          "birthday": "1963-07-24",
          "name": "Mario",
          "eye_color": "Brown",
          "gender": "Male",
          "surname": "Rossi"
        }
      ],
      "trackingDetection": {
        "geometries": [],
        "uavLocation": {
          "geometry": {
            "coordinates": [
              23.783579707189286,
              37.97841704365938
            ],
            "type": "Point"
          },
          "type": "Feature"
        }
      },
      "type": "Detection",
      "_etag": {
        "$oid": "66447b5a18618013dcdff432"
      }
    },
    {
      "_id": {
        "$oid": "66757723797e672bd02e1469"
      },
      "id": "98",
      "datetime": "2024-01-25T16:10:33.964Z",
      "type": "Detection",
      "detectionType": "FaceVerificationIdentification",
      "involvedObjects": [
        {
          "visualId": 17,
          "type": "Person",
          "height": 172,
          "nationality": "GR",
          "birthday": "1981-07-24",
          "name": "Duffy",
          "eye_color": "Brown",
          "gender": "Male",
          "surname": "Belrose",
          "aliases": [
            "Cherry-pick",
            "White fang"
          ]
        }
      ],
      "trackingDetection": {
        "uavLocation": {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              23.78358124523576,
              37.978414814211135
            ]
          },
          "properties": {}
        },
        "geometries": []
      },
      "faceDetection": {
        "images": [
          "imageBASE64",
          "imageBASE64",
          "imageBASE64"
        ]
      },
      "metadata": [
        {
          "fileMediaType": "MPG",
          "description": "Video",
          "fileURI": "http://myhost.com/path/video.avi"
        }
      ]
    }
  ]