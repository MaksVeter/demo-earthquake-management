import {AddEarthquakeInput, Earthquake, UpdateEarthquakeInput} from '../types/earthquake.js';
import {ObjectId, Db} from 'mongodb'

const isValidLocation = (value: string): boolean => {
    const locationRegex = /^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/;
    return locationRegex.test(value);
}
const resolvers = {
    Date: {
        __serialize(value: Date): string {
            return value.toISOString();
        },
        __parseValue(value: string): Date {
            return new Date(value);
        },
        __parseLiteral(ast: any): Date | null {
            if (ast.kind === 'StringValue') {
                return new Date(ast.value);
            }
            return null;
        },
    },
    Location: {
        __serialize(value: string): string {
            return value;
        },
        __parseValue(value: string): string {
            if (!isValidLocation(value)) {
                throw new Error('Location must be in the format "latitude,longitude"');
            }
            return value;
        },
        __parseLiteral(ast: any): string | null {
            if (ast.kind === 'StringValue' && isValidLocation(ast.value)) {
                return ast.value;
            }
            return null;
        },
    },

    Query: {
        async earthquakes(_: unknown, {limit = 10, offset = 0}, {db}: { db: Db }): Promise<Earthquake[]> {
            const earthquakesCollection = db.collection('earthquakes');
            const earthquakes = await earthquakesCollection.find().skip(offset).limit(limit).toArray();

            return earthquakes.map(({_id, location, magnitude, date}) => {
                const magnitudeValue: number = typeof magnitude === 'number' ? magnitude : 0;
                const dateValue: Date = date instanceof Date ? date : new Date(date);

                return {
                    id: _id.toString(),
                    location: location || '',
                    magnitude: magnitudeValue,
                    date: dateValue,
                };
            });
        },
        async totalEarthquakes(_: unknown, __: unknown, {db}: { db: Db }): Promise<number> {
            const earthquakesCollection = db.collection('earthquakes');
            return await earthquakesCollection.countDocuments();
        }
    },

    Mutation: {
        async addEarthquake(_: unknown, {
            input
        }: { input: AddEarthquakeInput }, {db}: { db: Db }): Promise<Earthquake> {
            const earthquakesCollection = db.collection('earthquakes');

            const result = await earthquakesCollection.insertOne({...input, _id: new ObjectId()});
            if (result.acknowledged) {
                return {...input, id: result.insertedId.toString()}
            } else {
                throw new Error("Failed to add earthquake.");
            }
        },

        async updateEarthquake(_: unknown, {input}: { input: UpdateEarthquakeInput }, {db}: { db: Db }): Promise<Earthquake> {
            const {id, location, magnitude, date} = input;

            const earthquakesCollection = db.collection('earthquakes');

            const updateFields: Partial<Omit<Earthquake, 'id'>> = {};
            if (location) updateFields.location = location;
            if (magnitude) updateFields.magnitude = magnitude;
            if (date) updateFields.date = date;

            const result = await earthquakesCollection.findOneAndUpdate(
                {_id: new ObjectId(id)},
                {$set: updateFields},
                {returnDocument: 'after'}
            );
            if (result.value) {
                return {
                    id: result.value._id.toString(),
                    location: result.value.location,
                    magnitude: result.value.magnitude,
                    date: result.value.date,
                };
            } else {
                throw new Error(`Earthquake with ID ${id} not found.`);
            }
        },

        async deleteEarthquake(_: unknown, {id}: { id: string }, {db}: { db: Db }) {
            const earthquakesCollection = db.collection('earthquakes');
            const result = await earthquakesCollection.deleteOne({_id: new ObjectId(id)});
            return result.deletedCount > 0;
        },
    },
};

export default resolvers;
