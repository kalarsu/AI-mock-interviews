import React from 'react'
import {cn, getTechLogos} from "@/lib/utils";
import Image from "next/image";

const DisplayTechIcons = async ({techstack}: TechIconProps) => {
    const techIcons = await getTechLogos(techstack)
    return (
        <div className="flex flex-row">
            {
                techIcons.slice(0,5).map(({tech , url},index)=>(
                    <div key={index} className={cn("relative group bg-dark-300 rounded-full p-2 flex-center", index>=1 && "-ml-3")}>
                        <span className="tech-tooltip">{tech}</span>
                        <Image src={url} alt={tech} width={20} height={20} className="size-5" />
                    </div>
            ))}
        </div>
    )
}
export default DisplayTechIcons
