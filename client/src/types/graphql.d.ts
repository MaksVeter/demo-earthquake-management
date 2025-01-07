export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: string; output: string; }
  Location: { input: string; output: string; }
};

/** Input type for adding a new earthquake. */
export type AddEarthquakeInput = {
  /** The date when the earthquake occurred. */
  date: Scalars['Date']['input'];
  /** The location of the earthquake. */
  location: Scalars['Location']['input'];
  /** The magnitude of the earthquake. */
  magnitude: Scalars['Float']['input'];
};

/** Represents an earthquake event with its details. */
export type Earthquake = {
  __typename?: 'Earthquake';
  /** Date when the earthquake occurred. */
  date: Scalars['Date']['output'];
  /** Unique identifier for the earthquake. */
  id: Scalars['ID']['output'];
  /** Location of the earthquake (combination of lat and lon). */
  location: Scalars['Location']['output'];
  /** Magnitude of the earthquake on the Richter scale. */
  magnitude: Scalars['Float']['output'];
};

/** The root mutation type for modifying data. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Adds a new earthquake record to the database. */
  addEarthquake: Earthquake;
  /** Deletes an earthquake record from the database. */
  deleteEarthquake: Scalars['Boolean']['output'];
  /** Updates an existing earthquake record in the database. */
  updateEarthquake: Earthquake;
};


/** The root mutation type for modifying data. */
export type MutationAddEarthquakeArgs = {
  input: AddEarthquakeInput;
};


/** The root mutation type for modifying data. */
export type MutationDeleteEarthquakeArgs = {
  id: Scalars['ID']['input'];
};


/** The root mutation type for modifying data. */
export type MutationUpdateEarthquakeArgs = {
  input: UpdateEarthquakeInput;
};

/** The root query type for fetching data. */
export type Query = {
  __typename?: 'Query';
  /** Fetches a list of all recorded earthquakes with optional pagination. */
  earthquakes: Array<Earthquake>;
  /** Total amount of earthquakes. */
  totalEarthquakes: Scalars['Int']['output'];
};


/** The root query type for fetching data. */
export type QueryEarthquakesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Input type for updating an existing earthquake. */
export type UpdateEarthquakeInput = {
  /** The new date of the earthquake (optional). */
  date?: InputMaybe<Scalars['Date']['input']>;
  /** The unique ID of the earthquake to update. */
  id: Scalars['ID']['input'];
  /** The new location of the earthquake (optional). */
  location?: InputMaybe<Scalars['Location']['input']>;
  /** The new magnitude of the earthquake (optional). */
  magnitude?: InputMaybe<Scalars['Float']['input']>;
};

export type AddEarthquakeMutationVariables = Exact<{
  input: AddEarthquakeInput;
}>;


export type AddEarthquakeMutation = { __typename?: 'Mutation', addEarthquake: { __typename?: 'Earthquake', id: string, location: string, magnitude: number, date: string } };

export type DeleteEarthquakeMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteEarthquakeMutation = { __typename?: 'Mutation', deleteEarthquake: boolean };

export type UpdateEarthquakeMutationVariables = Exact<{
  input: UpdateEarthquakeInput;
}>;


export type UpdateEarthquakeMutation = { __typename?: 'Mutation', updateEarthquake: { __typename?: 'Earthquake', id: string, location: string, magnitude: number, date: string } };

export type GetEarthquakesQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetEarthquakesQuery = { __typename?: 'Query', totalEarthquakes: number, earthquakes: Array<{ __typename?: 'Earthquake', id: string, location: string, magnitude: number, date: string }> };
