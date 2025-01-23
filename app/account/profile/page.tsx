import UpdateProfileForm from "@/app/_components/UpdateProfileForm";
import SelectCountry from "@/app/_components/SelectCountry";
import React from "react";
import {auth} from "@/app/_lib/auth";
import {getGuest} from "@/app/_lib/data-service";
import {IGuest} from "@/app/_lib/types";

export const metadata = {
    title:  "Update profile - The Oasis Hotel",
}
export default async function Page() {

    const session = await auth();
    const guest: IGuest = await getGuest(session?.user?.email as string);
    return (
        <div>
            <h2 className="font-semibold text-2xl text-accent-400 mb-4">
                Update your guest profile
            </h2>

            <p className="text-lg mb-8 text-primary-200">
                Providing the following information will make your check-in process
                faster and smoother. See you soon!
            </p>

            <UpdateProfileForm guest={guest}>
                {/* using a server component inside a client component ~ as a child or props */}
                <SelectCountry
                    name="nationality"
                    id="nationality"
                    className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
                    defaultCountry={guest.nationality}
                />
            </UpdateProfileForm>
        </div>
    );
}
