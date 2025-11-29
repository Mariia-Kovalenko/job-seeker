import React from "react";
import type { Job } from "../utils/types";
import { useTheme } from "../context/ThemeContext";
import TimeIcon from "../icons/TimeIcon";
import TimeIconLight from "../icons/TimeIconLight";
import LocationIcon from "../icons/LocationIcon";
import LocationIconLight from "../icons/LocationIconLight";

function daysAgo(date: string | number): string {
  const created = new Date(Number(date));
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - created.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return `${diffDays} days ago`;
}

export default function JobComponent({ job }: { job: Job }) {
    // console.log("job", job.createdAt, new Date(job.createdAt).toLocaleDateString());
    const {theme} = useTheme();
    return (
        <div key={job.id} className={`p-3  text-white rounded-xl shadow-lg border mb-4 md:mb-8 ${theme == "dark" ? "bg-[#1E1E20] text-white border-lighterGrey/50" : "bg-[#f4f4f4] text-darkBackground border-gray-300"}`}>
            <div className={`flex flex-col items-center rounded-xl gap-3 p-4 border ${theme == "dark" ? "bg-[rgba(255,255,255,0.05)] text-white border-lighterGrey/50" : "bg-white text-darkBackground border-gray-300"}`}>
                <div className="flex items-center justify-between w-full">
                    {job.category.length > 0 && (
                        <div className="text-sm">
                            <span className={`mr-2 text-[0.75rem] inline-block py-1 px-2 rounded-full font-medium ${theme == "dark" ? "bg-secondaryYellow text-black" : "bg-secondaryYellow/40 text-[#CD6337]"}`}>
                                {job.category}
                            </span>
                        </div>
                    )}
                    {job.salaryRange && (
                        <div className="text-md mb-1 text-right flex-grow-1">
                            <span className="inline-block">
                                <span className="text-lg md:text-xl font-bold text-primary">
                                    {job.salaryRange}
                                </span>
                                <span className="text-xs md:text-sm opacity-80">/month</span>
                            </span>
                        </div>
                    )}
                </div>

                <div className="text-left w-full flex gap-4">
                    <div className="flex-shrink-0">
                        <img
                            src="/default-logo.png"
                            alt="Company"
                            className="w-12 h-12 rounded-full border-none"
                        />
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-lg font-bold">
                            {job.title}
                        </h2>
                        <div className="text-sm mt-1 opacity-75">
                            <span>
                                {job.company} • {job.location}
                            </span>
                        </div>
                    </div>
                </div>

                <p className="text-sm mt-2 text-left w-full opacity-80">
                    {job.shortDescription}
                </p>
            </div>
            <div className={`text-sm mt-3 flex items-center gap-3 pl-6 opacity-80 ${theme == "dark" ? "text-white" : "text-darkBackground"}`}>
                <span className="mr-2 flex gap-1 items-center">
                    {theme == "dark" ? <TimeIconLight /> : <TimeIcon />}
                    {daysAgo(job.createdAt)}
                </span>
                <span className="flex gap-1 items-center">
                    {theme == "dark" ? <LocationIconLight /> : <LocationIcon />}
                    {job.workType}
                </span>
            </div>
        </div>
    );
}
