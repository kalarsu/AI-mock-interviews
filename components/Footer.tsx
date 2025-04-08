import React from 'react'
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
    return (
        <section className="mt-30 text-xs">
            <div className="flex flex-col justify-center items-center w-full">
                <p>
                    <span className="font-semibold">Built with: </span>
                    <span>React · Next.js · TypeScript · Tailwind CSS · Vapi AI Voice· Google Gemini · Firebase</span>
                </p>
                <p>
                    <span className="font-semibold">Hosted on: </span>
                    <span>Vercel</span>
                </p>
                <div className="mt-5">
                    <Link href="mailto:c.hsiang.su@gmail.com" target="_blank"
                          rel="noopener noreferrer">
                        <div className="flex flex-row justify-center items-center">
                            <Image src="/email.svg" alt="email icon" width={20} height={20}/>
                            <span className="ml-2">Contact Me</span>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="flex flex-row w-full justify-center items-center pt-4">
                <div>Copyright © {new Date().getFullYear()} Chi Su</div>
            </div>
        </section>
    )
}
export default Footer
