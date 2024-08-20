export interface Coordinates {
    _southWest: {
        lat: number;
        lng: number;
    };
    _northEast: {
        lat: number;
        lng: number;
    };
}

export interface Observation {
    id: number;
    title: string;
    // Add more fields as per your observation data structure
}
export interface Species {
    id:number;
    name: string;
    author: string;
    family: string;
    commonNames: string;
    predictedName: string;
    images: { s: string }[];
}
export interface CaseStudies {
    code: string;
    name: string;
    // Add other fields as needed
}
export interface Habitat {
    id: number;
    name: string;
    code: string;
    level: number;
    color:string;
}
export interface Habitats {
    habitats: Habitat[],
    total:number
}
export interface Extent {
    type: string;
    coordinates: any;
}

export interface Image {
    id: string;
    o: string;
    m: string;
    s: string;
}

export interface SpeciesGeoPlanet {
    name: string;
    author: string;
    family: string;
    commonNames: string[];
    images: Image[];
    iucn: string | null;
    predictedName: string;
    gpn_id: number;
    plantnet_id: string;
    gbif_taxon_key: number;
    is_tree: boolean;
    is_invasive: boolean;
    is_eu_directive: boolean;
    is_grin_uses: boolean;
    iucn_red_list_category: string | null;
}

export interface SpeciesPostResponse {
    total: number;
    species: SpeciesGeoPlanet[];
}

export interface Indicator {
    name: string;
    alias: string;
    description: string | null;
}
export interface Indicators {
    total: number;
    indicators: Indicator[];
}

export interface IndicatorArea {
    alias: string;
    min: number;
    max: number;
    mean: number;
}

export interface IndicatorsPostResponse {
    total: number;
    indicators: IndicatorArea[];
}
