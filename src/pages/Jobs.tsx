import { useQuery } from "@apollo/client/react";
import { GET_JOBS } from "../graphql/queries";
import { Job, JobsData } from "../utils/types";
import JobComponent from "../components/Job";

export default function Jobs() {
    const { data, loading, error } = useQuery<JobsData>(GET_JOBS, {
        variables: {
            first: 10,
            after: null,
        },
    });

    console.log(data);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;

    const jobs = data?.jobs?.edges?.map(({ node } : { node: Job }) => node);

    return (
        <ul className="max-w-4xl mx-auto px-4 py-8">
            {jobs && jobs.map((job : Job) => (
                <JobComponent key={job.id} job={job} />
            ))}
        </ul>
    );
}
