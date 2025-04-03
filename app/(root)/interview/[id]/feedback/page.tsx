import React from 'react'
import {getCurrentUser} from "@/lib/actions/auth.action";
import {getFeedbackByInterviewId, getInterviewsById} from "@/lib/actions/general.action";
import {redirect} from "next/navigation";
import Image from "next/image";
import dayjs from "dayjs";
import {Button} from "@/components/ui/button";
import Link from "next/link";

const Page = async ({params} : RouteParams) => {
    const {id:interviewId} = await params;
    const user = await getCurrentUser();

    const interview = await getInterviewsById(interviewId);
    if(!interview) redirect('/');

    const feedback = await getFeedbackByInterviewId({
        interviewId: interviewId,
        userId: user?.id!,
    });
    console.log('feedback', feedback);
    console.log('interview', interview);

    return (
        <section className="section-feedback">
            <div className="flex flex-col gap-6 justify-center">
                <div className="flex flex-col items-center">
                    <h1 className="text-4xl font-semibold justify-center">
                        Feedback on the Interview -<br/>
                        <span className="capitalize">{interview?.role} Interview</span>
                    </h1>
                </div>
                <div className="flex flex-row items-center gap-6 justify-center">
                    <div className="flex flex-row gap-2">
                        <Image src="/star.svg" alt="star" width={22} height={22} />
                        <p>Overall Impression: <span className="text-purple-200 font-bold">{feedback?.totalScore}</span>/100</p>
                    </div>
                    <div className="flex flex-row gap-2">
                        <Image src="/calendar.svg" alt="star" width={22} height={22} />
                        <p className="text-purple-200 font-bold">
                            {feedback?.createdAt
                                ? dayjs(feedback.createdAt).format("MMM D, YYYY")
                                : 'N/A'}
                        </p>
                    </div>
                </div>
                <hr />
                <div>
                    {feedback?.finalAssessment}
                </div>
                <div className="flex flex-col gap-5">
                    <h3>Breakdown of Evaluation:</h3>
                    {feedback?.categoryScores.map((item,key) => (
                        <div key={key}>
                            <p className="font-semibold text-blue-200">{`${key+1}. ${item.name} (${Math.floor(item.score/100*20)}/20)`}</p>
                            <p className="pl-4">{item.comment}</p>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col gap-3">
                    <h3>Areas for Improvement:</h3>
                    <ul>
                        {feedback?.areasForImprovement.map((item, key)=>(
                            <li key={key}>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex flex-row justify-center items-center gap-4">
                    <Button className="btn-secondary flex-1/2">
                        <Link href="/">Back to dashboard</Link>
                    </Button>
                    <Button className="btn-primary flex-1/2">
                        <Link href={`/interview/${interviewId}`}>Retake interview</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
export default Page
