import React from 'react'
import Agent from "@/components/Agent";
import {getCurrentUser, isAuthenticated} from "@/lib/actions/auth.action";
import {redirect} from "next/navigation";

const Page = async () => {
    const isUserAuthenticated = await isAuthenticated();
    if(!isUserAuthenticated) redirect('/sign-in');

    const user = await getCurrentUser();

    return (
        <>
            <h3>Interview Generation</h3>
            <Agent userName={user?.name} userId={user?.id} type="generate"></Agent>
        </>
    )
}
export default Page
