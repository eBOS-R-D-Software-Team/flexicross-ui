export interface InvolvedObject {
    type: string;
    visualId?: number;
    shipType?: string;
    mmsi?: string;
    name?: string;
    imoNumber?: string;
    callSign?: string;
    navigationStatus?: string;
    plate?: string;
    role?:string;
    totalPersonOnBoard?: number;
    externalAttributes?: {
      unlawfulParkingId?: string;
      uTurnId?: string;
      uTurnConfLevel?: string;
    };
    location: {
      type: string;
      geometry: {
        type: string;
        coordinates: any;
      };
      properties: Record<string, any>;
    };
    cargo?: {
      quantity: number;
      unit: string;
      description: string;
      type: string;
    }[];
    metadata?: {
      fileMediaType: string;
      description: string;
      fileURI: string;
    }[];
  }
  
  export interface dataItem {
    id: string;
    datetime: string;
    type: string;
    riskType: string;
    severity: string;
    probability: string;
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