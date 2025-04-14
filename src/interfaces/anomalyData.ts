import { InvolvedObject } from "./riskData";

export interface AnomalyItem {

    id: string;
    datetime: string;
    type: string;
    anomalyType: string;
    involvedObjects: InvolvedObject[];
    location: {
      type: string;
      geometry: {
        type: string;
        coordinates: any;
      };
      properties: Record<string, any>;
    };
    trackingDetection: {
      uavLocation: {
        type: string;
        geometry: {
          type: string;
          coordinates: any;
        };
        properties: Record<string, any>;
      };
      detectionConfidence: number[];
      trackingConfidence: number[];
      geometries: {
        type: string;
        geometry: {
          type: string;
          coordinates: any;
        };
        properties: {
          prohibited_area: string;
        };
      }[];
    };
    faceDetection: {
      images: string[];
    };
    metrics: {
      unit: string;
      description: string;
      key: string;
      value: string;
    }[];
    metadata: {
      fileMediaType: string;
      description: string;
      fileURI: string;
    }[];
  }