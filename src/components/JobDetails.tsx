import React from "react";
import { Job } from "../utils/types";
import { useTheme } from "../context/ThemeContext";
import { daysAgo } from "../helpers";
import TimeIcon from "../icons/TimeIcon";
import TimeIconLight from "../icons/TimeIconLight";
import Avatar from "../common/Avatar";

type JobDetailsProps = {
    job: Job;
    isInModal?: boolean;
};

export default function JobDetails({ job, isInModal }: JobDetailsProps) {
    const { theme } = useTheme();

    return (
        <div
            className={`job-details p-1 md:p-2 text-white rounded-xl border ${
                theme === "dark"
                    ? "bg-[#1E1E20] text-white border-lighterGrey/50"
                    : "bg-[#f4f4f4] text-darkBackground border-gray-300"
            }`}
        >
            <div
                className={`flex flex-col rounded-xl gap-3 p-4 border ${
                    theme === "dark"
                        ? "bg-[rgba(255,255,255,0.05)] text-white border-lighterGrey/50"
                        : "bg-white text-darkBackground border-gray-300"
                }`}
            >
                {/* title */}
                <div className={`${isInModal ? "mt-10": ""} text-left w-full flex gap-4`}>
                    <div className="flex-shrink-0">
                        {job.company && <Avatar companyName={job.company} size="12" />}
                        {/* <img
                            src="/default-logo.png"
                            alt="Company"
                            className="w-12 h-12 rounded-full border-none"
                        /> */}
                    </div>
                    <div className="flex flex-col w-full">
                        <div className="flex items-center justify-between w-full">
                            <h2 className="text-lg font-bold">
                                {job.title}
                            </h2>
                            <span className="mr-2 hidden sm:flex flex-row gap-1 items-center whitespace-nowrap opacity-80">
                                {theme === "dark" ? (
                                    <TimeIconLight />
                                ) : (
                                    <TimeIcon />
                                )}
                                {daysAgo(job.createdAt)}
                            </span>
                        </div>

                        <div className="text-sm mt-1 opacity-75">
                            <span>
                                {job.company} •{" "}
                                {job.location}
                            </span>
                        </div>
                    </div>
                </div>

                {/* categories */}
                <div className="flex flex-wrap gap-2 w-full">
                    {job.category.length > 0 && (
                        <div className="text-sm">
                            <div className="flex flex-wrap gap-2">
                                {job.category.map(cat => <span
                                className={`mr-2 text-[0.75rem] bg-[#f4f4f4] text-gray-600 border-gray-300 inline-block py-1 px-2 rounded-full font-medium border`}
                            >{cat}</span>)}
                            </div>
                        </div>
                    )}
                </div>

                {/* salary */}
                <div className="flex gap-2 items-baseline w-full">
                    {job.salaryRange && (
                        <div className="text-md mb-1 text-right flex-grow-1">
                            <span className="inline-block">
                                <span className="text-lg md:text-xl font-bold text-primary">
                                    {job.salaryRange}
                                </span>
                                <span className="text-xs md:text-sm opacity-80">
                                    /month
                                </span>
                            </span>
                        </div>
                    )}

                    {
                        job.salaryRange && <span className="text-gray-500">•</span>
                    }


                    {/* worktype */}
                    <div className="text-sm mt-1 opacity-75 capitalize">
                        <span className="capitalize">{job.workType}</span>
                    </div>
                </div>

                <span className="mr-2 sm:hidden text-xs flex gap-1 items-center whitespace-nowrap opacity-80">
                    {theme === "dark" ? (
                        <TimeIconLight />
                    ) : (
                        <TimeIcon />
                    )}
                    {daysAgo(job.createdAt)}
                </span>

                {/* divider */}
                <div className="w-full h-[1px] bg-gray-300 my-2"></div>

                {/* job full description */}
                <div className="w-full mb-4">
                    <h3 className="text-md font-bold">
                        About the job
                    </h3>
                    <p className="text-sm mt-1 opacity-75">
                        {job.shortDescription}
                    </p>
                </div>

                <div className="w-full mb-4">
                    <h3 className="text-md font-bold">Stack</h3>
                    <p className="text-sm mt-1 opacity-75">
                        {job.stack.join(", ")}
                    </p>
                </div>
                <div className="w-full mb-4">
                    <h3 className="text-md font-bold">
                        Full Description
                    </h3>
                    <div className="text-sm mt-1 opacity-75">
                        <div dangerouslySetInnerHTML={{ __html: job.description }} />
                    </div>
                </div>
            </div>
        </div>
    );
}
