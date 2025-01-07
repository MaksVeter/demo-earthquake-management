import db from "../config/db.js";


const collectionName: string = process.env.COLLECTION || "";
if (!collectionName) {
    console.error('COLLECTION environment variable is not set.');
    process.exit(1);
}
export const up = async () => {
    const collections = await db.listCollections({ name: collectionName }).toArray();
    if (collections.length === 0) {
        console.log(`Creating collection: ${collectionName}`);
        await db.createCollection(collectionName);
    } else {
        console.log(`Collection '${collectionName}' already exists.`);
    }
};

export const down = async () => {
    const collections = await db.listCollections({ name: collectionName }).toArray();
    if (collections.length > 0) {
        console.log(`Dropping collection: ${collectionName}`);
        await db.collection(collectionName).drop();
    } else {
        console.log(`Collection '${collectionName}' does not exist.`);
    }
};
