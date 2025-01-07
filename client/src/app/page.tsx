import EarthquakeList from "@/components/EarthquakeList";
import {GetEarthquakesQuery} from "@/types/graphql";
import {GET_EARTHQUAKES} from "@/graphql/queries";
import client from "@/lib/apolloClient";

export default async function Home() {
    const perPage = 3;
    const {
        data
    } = await client.query<GetEarthquakesQuery>({
        query: GET_EARTHQUAKES,
        variables: {limit: perPage, offset: 0},
    });
    if (!data) {
        return <div>Loading...</div>;
    }
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <EarthquakeList initialData={data} perPage={perPage} />
            </main>
        </div>

    );
}
