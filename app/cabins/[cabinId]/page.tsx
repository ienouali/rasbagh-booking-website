import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import {getBookedDatesByCabinId, getCabin, getCabins, getSettings} from "@/app/_lib/data-service";

import Image from "next/image";
import TextExpander from "@/app/_components/TextExpander";
import Reservation from "@/app/_components/Reservation";
import {Suspense} from "react";
import Spinner from "@/app/_components/Spinner";
import Cabin from "@/app/_components/Cabin";

export async function generateMetadata({ params }: { params: { cabinId: number, name: string }}) {
    const { name } = await getCabin(params.cabinId);
    return {
        title: 'Cabin ' + name
    };
}
export async function generateStaticParams(): Promise<{cabinId: String}[]> {
    const cabins = await getCabins();
    return cabins.map(cabin => ({ cabinId:  String(cabin.id) }))
}
/** RSC **/
export default async function Page({ params }: { params: { cabinId: number } }) {
   const cabin = await getCabin(params.cabinId);


    const { name } = cabin;
    return (
        <div className="max-w-6xl mx-auto mt-8">
            <Cabin cabin={cabin} />
            <div>
                <h2 className="text-5xl mb-10 text-accent-400 font-semibold text-center">
                    Reserve {name} today. Pay on arrival.
                </h2>

                <Suspense fallback={<Spinner />}>
                    <Reservation cabin={cabin} />
                </Suspense>

            </div>
        </div>
    );
}
