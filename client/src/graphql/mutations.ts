import {gql} from '@apollo/client';

export const ADD_EARTHQUAKE = gql`
  mutation AddEarthquake($input: AddEarthquakeInput!) {
    addEarthquake(input: $input) {
      id
      location
      magnitude
      date
    }
  }
`;

export const DELETE_EARTHQUAKE = gql`
  mutation DeleteEarthquake($id: ID!) {
    deleteEarthquake(id: $id)
  }
`;

export const UPDATE_EARTHQUAKE = gql`
  mutation UpdateEarthquake($input: UpdateEarthquakeInput!) {
    updateEarthquake(input: $input) {
      id
      location
      magnitude
      date
  }
}
`
