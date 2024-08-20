import { LatLngBounds } from 'leaflet';
import { Species } from '../interfaces';

const fetchObservations = async (bounds: LatLngBounds) => {
    const url = `https://api.minka-sdg.org/v1/observations?nelat=${bounds.getNorth()}&nelng=${bounds.getEast()}&swlat=${bounds.getSouth()}&swlng=${bounds.getWest()}&order=desc&order_by=created_at`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        console.log(data.results[0],bounds);

                // Map the fetched data to instances of the Species interface
                const speciesList: Species[] = data.results.map((species: any) => ({
                    id:species.id,
                    name: species.taxon ? species.taxon.iconic_taxon_name : (species.iconic_taxon_name) ? species.iconic_taxon_name : '',
                    place: species.place_guess,
                    author: species.user.name ? species.user.name : '',
                    family: species.rank,
                    commonNames: species.taxon ? species.taxon.preferred_common_name : '',
                    predictedName: species.species_guess,
                    images: species.photos.map((image: any) => ({ s: image.url })),
                    // Add more properties as needed based on API response
                }));
                console.log(speciesList);
                return speciesList;
    } catch (error) {
        console.error('Error fetching observations:', error);
        throw error;
    }
};

export default fetchObservations;
