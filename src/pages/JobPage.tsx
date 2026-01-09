import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client/react";
import { GET_JOB } from "../graphql/queries";
import { useEffect } from "react";
import { Job, JobsData } from "../utils/types";
import { useTheme } from "../context/ThemeContext";
import { daysAgo } from "../helpers";
import TimeIcon from "../icons/TimeIcon";
import TimeIconLight from "../icons/TimeIconLight";
import ArrowLeftIcon from "../icons/ArrowLeftIcon";
import { GET_JOBS } from "../graphql/queries";
import JobRecommendations from "../components/JobRecommendation";
import JobPageSkeleton from "../components/JobPageSkeleton";
import JobRecommendationSkeleton from "../components/JobRecommendationSkeleton";

type JobData = {
    job: Job;
};

export default function JobPage() {
    // get job by id
    const { id } = useParams();
    const { data, loading, error } = useQuery<JobData>(GET_JOB, {
        variables: { id },
    });

    // query related jobs by category
    const { data: relatedJobsData, loading: relatedJobsLoading, error: relatedJobsError } = useQuery<JobsData>(GET_JOBS, {
        variables: {
            category: data?.job.category,
        },
    });

    const { theme } = useTheme();

    useEffect(() => {
        if (data) {
            console.log("job data", data.job);

            if (relatedJobsData) {
                console.log("related jobs data", relatedJobsData.jobs.edges.map(({ node }) => node));
            }
        }
    }, [data]);
    return (
        <>
            <div className="max-w-4xl mx-auto px-2 md:px-4 pt-8 pb-2">
                <div className="flex justify-between gap-4 items-baseline mb-4">
                    <h1 className="text-xl font-bold">Browse the job</h1>
                    <Link to="/jobs" className="text-primary underline font-semibold flex items-center gap-1">
                        <ArrowLeftIcon />
                        Back to Jobs
                    </Link>
                </div>
                {loading ? (
                    <JobPageSkeleton />
                ) : (
                    data && (
                        <div
                            className={`p-1 md:p-2 text-white rounded-xl border mb-4 md:mb-8 ${
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
                                <div className="text-left w-full flex gap-4">
                                    <div className="flex-shrink-0">
                                        <img
                                            src="/default-logo.png"
                                            alt="Company"
                                            className="w-12 h-12 rounded-full border-none"
                                        />
                                    </div>
                                    <div className="flex flex-col w-full">
                                        <div className="flex items-center justify-between w-full">
                                            <h2 className="text-lg font-bold">
                                                {data.job.title}
                                            </h2>
                                            <span className="mr-2 hidden sm:flex flex-row gap-1 items-center whitespace-nowrap opacity-80">
                                                {theme == "dark" ? (
                                                    <TimeIconLight />
                                                ) : (
                                                    <TimeIcon />
                                                )}
                                                {daysAgo(data.job.createdAt)}
                                            </span>
                                        </div>

                                        <div className="text-sm mt-1 opacity-75">
                                            <span>
                                                {data.job.company} •{" "}
                                                {data.job.location}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* categories */}
                                <div className="flex flex-wrap gap-2 w-full">
                                    {data.job.category.length > 0 && (
                                        <div className="text-sm">
                                            <span
                                                className={`mr-2 text-[0.75rem] bg-[#f4f4f4] text-gray-600 border-gray-300 inline-block py-1 px-2 rounded-full font-medium border`}
                                            >
                                                {data.job.category}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* salary */}
                                <div className="flex gap-2 items-baseline w-full">
                                    {data.job.salaryRange && (
                                        <div className="text-md mb-1 text-right flex-grow-1">
                                            <span className="inline-block">
                                                <span className="text-lg md:text-xl font-bold text-primary">
                                                    {data.job.salaryRange}
                                                </span>
                                                <span className="text-xs md:text-sm opacity-80">
                                                    /month
                                                </span>
                                            </span>
                                        </div>
                                    )}

                                    {
                                        data.job.salaryRange && <span className="text-gray-500">•</span>
                                    }


                                    {/* worktype */}
                                    <div className="text-sm mt-1 opacity-75">
                                        <span>{data.job.workType}</span>
                                    </div>
                                </div>

                                <span className="mr-2 sm:hidden text-xs flex gap-1 items-center whitespace-nowrap opacity-80">
                                    {theme == "dark" ? (
                                        <TimeIconLight />
                                    ) : (
                                        <TimeIcon />
                                    )}
                                    {daysAgo(data.job.createdAt)}
                                </span>

                                {/* divider */}
                                <div className="w-full h-[1px] bg-gray-300 my-2"></div>

                                {/* job full description */}
                                <div className="w-full mb-4">
                                    <h3 className="text-md font-bold">
                                        About the job
                                    </h3>
                                    <p className="text-sm mt-1 opacity-75">
                                        {data.job.shortDescription}
                                    </p>
                                </div>

                                <div className="w-full mb-4">
                                    <h3 className="text-md font-bold">Stack</h3>
                                    <p className="text-sm mt-1 opacity-75">
                                        {data.job.stack.join(", ")}
                                    </p>
                                </div>
                                <div className="w-full mb-4">
                                    <h3 className="text-md font-bold">
                                        Full Description
                                    </h3>
                                    <p className="text-sm mt-1 opacity-75">
                                        <div dangerouslySetInnerHTML={{ __html: data.job.description }} />
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>

        

            {/* TODO: show similar jobs */}
            {relatedJobsLoading ? (
                <JobRecommendationSkeleton />
            ) : (
                <JobRecommendations relatedJobs={relatedJobsData?.jobs.edges.map(({ node }) => node) || []} />
            )}
        </>
    );
}
