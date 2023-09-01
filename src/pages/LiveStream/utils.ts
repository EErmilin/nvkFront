import { LIVESTEAMS } from "../../gql/query/livestreams/LiveStreams";
import { RADIOS } from "../../gql/query/Radios";
import { getUpdateClient } from "../../requests/updateHeaders";

export const fetchStreams = async  () => {
    try {

      const client = await getUpdateClient();

      const steam_response = client.query({
        query: LIVESTEAMS
      });

      const radio_response = client.query({
        query: RADIOS
      });

      return Promise.all([steam_response, radio_response])
        .then(([steamResponse, radioResponse]) => {
            return [
                ...steamResponse.data.liveStreams,
                ...radioResponse.data.radios
              ]          
        })
        .catch(error => {
            throw error;           

        });
    } catch (error) {
        throw error; 
    }
  }