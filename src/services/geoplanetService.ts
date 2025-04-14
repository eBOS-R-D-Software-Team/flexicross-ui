import axios from 'axios';
import { CaseStudies, Indicator, Habitats, SpeciesPostResponse, IndicatorsPostResponse } from '../interfaces';

const API_KEY = '2b10IIRdVxkhYtdx530XXHVIUe';
const BASE_URL = 'https://my-api.plantnet.org/v2/guarden';

export const postSpeciesArea = async (extent: any, exact_match: boolean,code: string): Promise<SpeciesPostResponse> => {
  try {
    const response = await axios.post<SpeciesPostResponse>(
      `${BASE_URL}/${code}/species/area?lang=en&api-key=${API_KEY}`,
      { extent, exact_match },
      {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error fetching species data:', error);
    throw error;
  }
};


export const fetchCaseStudies = async (): Promise<CaseStudies[]> => {
  try {
    const response = await axios.get<CaseStudies[]>(`${BASE_URL}/cs?api-key=${API_KEY}`, {
      headers: {
        'accept': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching garden data:', error);
    throw error;
  }
};


export const fetchHabitats = async (flag:any): Promise<Habitats> => {
    console.log(flag!);
    try {
      const response = await axios.get<Habitats>(`${BASE_URL}/${flag}/habitats?api-key=${API_KEY}`, {
        headers: {
          'accept': 'application/json',
        },
      });
      var takis =response.data;
      console.log('takis', takis);

      return response.data;
    } catch (error) {
      console.error('Error fetching garden data:', error);
      throw error;
    }
};


export const fetchIndicatorsData = async (): Promise<Indicator[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/indicators?api-key=${API_KEY}`, {
      headers: {
        'accept': 'application/json',
      },
    });
    return response.data.indicators;
  } catch (error) {
    console.error('Error fetching garden data:', error);
    throw error;
  }
};

export const postIndicatorsAreaData = async (extent: any, exact_match: boolean,code: any): Promise<IndicatorsPostResponse> => {
  try {
    const response = await axios.post<IndicatorsPostResponse>(
      `${BASE_URL}/${code}/indicators/area?api-key=${API_KEY}`,
      { extent, exact_match },
      {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching species data:', error);
    throw error;
  }
};

