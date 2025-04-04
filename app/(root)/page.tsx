import React from 'react'
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import InterviewCard from "@/components/InterviewCard";
import {getCurrentUser} from "@/lib/actions/auth.action";
import {getInterviewsByUserId, getLatestInterviews} from "@/lib/actions/general.action";

const Page = async () => {
    const user = await getCurrentUser();

    const [userInterviews, latestInterviews] = await Promise.all([
        await getInterviewsByUserId(user?.id!),
        await getLatestInterviews({userId: user?.id!})
    ]); //Parallel loading multiple await when one doesn't reply on the other, double the speed
    // const userInterviews = await getInterviewsByUserId(user?.id!);
    // const latestInterviews = await getLatestInterviews({userId: user?.id!});

    const hasPastInterviews = userInterviews?.length > 0;
    const hasUpCommingInterviews = latestInterviews?.length > 0;

    return (
        <>
            <section className="card-cta">
                <div className="flex flex-col gap-6 max-w-lg">
                    <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
                    <p className="text-lg !text-purple-950">Practice on real interview questions & get instant feedback</p>
                    <Button className="max-sm:w-full btn-primary">
                        <Link href="/interview">Start an Interview</Link>
                    </Button>
                </div>
                <Image src="/bot-interview.gif" alt="AI-reobot" width={400} height={400} className="max-sm:hidden" />
            </section>

            <section className="felx flex-col gap-6 mt-8">
                <h2>Your Interviews</h2>
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
                <h2>Take an Interview</h2>
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
        </>
    )
}
export default Page
