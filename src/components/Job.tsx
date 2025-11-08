import React from "react";
import type { Job } from "../utils/types";

export default function JobComponent({ job }: { job: Job }) {
    return (
        <div className="p-1 bg-gray-100 rounded-lg mb-4 border border-1 border-gray-300">
            <div className="flex flex-col items-center bg-white border border-1 border-gray-300 rounded-lg gap-2 p-4">
                <div className="flex items-center justify-between w-full">
                    {job.category.length > 0 && (
                        <div className="text-sm text-gray-500 mb-1">
                            <span className="mr-2 text-xs font inline-block bg-gray-100 py-1 px-2 rounded-xl">
                                {job.category}
                            </span>
                        </div>
                    )}
                    {job.salaryRange && (
                        <div className="text-md text-gray-500 mb-1 text-right flex-grow-1">
                            <span className="inline-block">
                                <span className="text-xl font-bold text-gray-900">
                                    {job.salaryRange}
                                </span>
                                /month
                            </span>
                        </div>
                    )}
                </div>


                <div className="text-left w-full flex gap-4">
                    <div className="flex-shrink-0">
                        <img
                            src="/default-logo.png"
                            alt="Company"
                            className="w-12 h-12 rounded-full border border-1 border-gray-100"
                        />
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-lg font-bold text-gray-900">
                            {job.title}
                        </h2>
                        <div className="text-sm text-gray-500 mt-1">
                            <span>
                                {job.company} • {job.location}
                            </span>
                        </div>
                    </div>
                </div>

                <p className="text-sm text-gray-700 mt-2 text-left w-full">
                        {job.shortDescription}
                    </p>
            </div>

            <div className="text-sm text-gray-500 my-2 flex items-center gap-2 pl-6">
                <span className="mr-2">
                    {new Date(job.createdAt).toLocaleDateString()} ago
                </span>
                <span className="inline-block">{job.workType}</span>
            </div>
        </div>
    );
}
