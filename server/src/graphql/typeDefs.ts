import { gql } from 'graphql-tag';

const typeDefs = gql`
  """
  A custom scalar for representing dates in ISO 8601 format.
  """
  scalar Date
  """
  A custom scalar for representing Location strings "lat,lon".
  """
  scalar Location
    
  """
  Represents an earthquake event with its details.
  """
  type Earthquake {
    """
    Unique identifier for the earthquake.
    """
    id: ID!

    """
    Location of the earthquake (combination of lat and lon).
    """
    location: Location!

    """
    Magnitude of the earthquake on the Richter scale.
    """
    magnitude: Float!

    """
    Date when the earthquake occurred.
    """
    date: Date!
  }
  
  """
  Input type for adding a new earthquake.
  """
  input AddEarthquakeInput {
    """
    The location of the earthquake.
    """
    location: Location!

    """
    The magnitude of the earthquake.
    """
    magnitude: Float!

    """
    The date when the earthquake occurred.
    """
    date: Date!
  }
  
  """
  Input type for updating an existing earthquake.
  """
  input UpdateEarthquakeInput {
    """
    The unique ID of the earthquake to update.
    """
    id: ID!

    """
    The new location of the earthquake (optional).
    """
    location: Location

    """
    The new magnitude of the earthquake (optional).
    """
    magnitude: Float

    """
    The new date of the earthquake (optional).
    """
    date: Date
  }

  """
  The root query type for fetching data.
  """
  type Query {
    """
    Fetches a list of all recorded earthquakes with optional pagination.
    """
    earthquakes(limit: Int, offset: Int): [Earthquake!]!
    
    """
    Total amount of earthquakes.
    """
    totalEarthquakes: Int!
  }

  """
  The root mutation type for modifying data.
  """
  type Mutation {
    """
    Adds a new earthquake record to the database.
    """
    addEarthquake(input: AddEarthquakeInput!): Earthquake!

    """
    Updates an existing earthquake record in the database.
    """
    updateEarthquake(input: UpdateEarthquakeInput!): Earthquake!

    """
    Deletes an earthquake record from the database.
    """
    deleteEarthquake(
      """
      The unique ID of the earthquake to delete.
      """
      id: ID!
    ): Boolean!
  }
`;

export default typeDefs;
