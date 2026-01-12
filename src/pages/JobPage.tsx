import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client/react";
import { GET_JOB, GET_JOBS } from "../graphql/queries";
import { useEffect } from "react";
import { Job, JobsData } from "../utils/types";
import { useTheme } from "../context/ThemeContext";
import ArrowLeftIcon from "../icons/ArrowLeftIcon";
import JobRecommendations from "../components/JobRecommendation";
import JobPageSkeleton from "../components/JobPageSkeleton";
import JobRecommendationSkeleton from "../components/JobRecommendationSkeleton";
import JobDetails from "../components/JobDetails";

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
    }, [data, relatedJobsData]);

    return (
        <>
            <div className="max-w-4xl mx-auto px-2 md:px-4 pt-8 pb-2">
                <div className="flex justify-between gap-4 items-baseline mb-4">
                <Link to="/jobs" className="text-primary underline font-semibold flex items-center gap-1">
                        <ArrowLeftIcon />
                        Back to Jobs
                    </Link>
                    <h1 className="text-xl font-bold">Job Details</h1>

                </div>
                {loading ? (
                    <JobPageSkeleton />
                ) : (
                    data && <JobDetails job={data.job} />
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
