import React from 'react'
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import InterviewCard from "@/components/InterviewCard";
import {getCurrentUser, isAuthenticated} from "@/lib/actions/auth.action";
import {getInterviewsByUserId, getLatestInterviews} from "@/lib/actions/general.action";
import Footer from "@/components/Footer";

const Page = async () => {
    const isUserAuthenticated = await isAuthenticated();
    let userId:string = "";
    if(isUserAuthenticated) {
        const user = await getCurrentUser();
        userId = user?.id || "";
    }

    const [userInterviews, latestInterviews] = await Promise.all([
        await getInterviewsByUserId(userId),
        await getLatestInterviews({userId: userId})
    ]); //Parallel loading multiple await when one doesn't reply on the other, double the speed
    // const userInterviews = await getInterviewsByUserId(user?.id!);
    // const latestInterviews = await getLatestInterviews({userId: user?.id!});

    const hasPastInterviews = userInterviews?.length > 0;
    const hasUpCommingInterviews = latestInterviews?.length > 0;

    return (
        <>
            <section className="card-cta">
                <div className="flex flex-col gap-6 max-w-lg">
                    <h2>Ace Your Interviews with AI-Powered Practice & Instant Feedback</h2>
                    <p className="text-lg !text-purple-950">Sharpen your skills with real questions and insights that matter.</p>
                    <Button className="max-sm:w-full btn-primary">
                        <Link href="/interview">Prepare Your Interview Now</Link>
                    </Button>
                </div>
                <Image src="/bot-interview.gif" alt="AI-reobot" width={400} height={400} className="max-sm:hidden" />
            </section>

            <section id="your-interview" className="felx flex-col gap-6 mt-8">
                <h2 className="mb-4">Your Interviews</h2>
                <div className="interviews-section">
                    {
                        hasPastInterviews ? (
                            userInterviews?.map((interview) => (
                            <InterviewCard {...interview} key={interview.id} />
                            ))):(
                            <p>You haven&apos;t taken any interviews yet</p>
                        )
                    }
                </div>
            </section>

            <section className="felx flex-col gap-6 mt-8">
                <h2 className="mb-4">Try Interviews Made by Others</h2>
                <div className="interviews-section">
                    {
                        hasUpCommingInterviews ? (
                            latestInterviews?.map((interview) => (
                                <InterviewCard {...interview} key={interview.id} />
                            ))):(
                            <p>There are no new interviews available</p>
                        )
                    }
                </div>
            </section>
            <Footer />
        </>
    )
}
export default Page
