import { up as createEarthquakeCollection } from "./migrations/001-create-earthquake-collection.js";
import { up as seedEarthquakeData } from "./migrations/002-seed-earthquake-data.js";

(async () => {
    await createEarthquakeCollection();
    await seedEarthquakeData();
    console.log("Migration completed.");
    process.exit(0);
})();