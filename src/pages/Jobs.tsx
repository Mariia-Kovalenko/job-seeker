import { useQuery } from "@apollo/client/react";
import { GET_JOBS } from "../graphql/queries";
import { Job, JobsData } from "../utils/types";
import JobComponent from "../components/Job";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Button from "../common/Button";
import { PAGE_SIZE } from "../utils/constants";
import { motion } from "framer-motion";

export default function Jobs() {
    const { data, loading, error, fetchMore } = useQuery<JobsData>(GET_JOBS, {
        variables: {
            first: PAGE_SIZE,
            after: null,
        },
    });

    const [jobs, setJobs] = useState<Job[]>([]);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const [hasNextPage, setHasNextPage] = useState<boolean>(false);

    useEffect(() => {
        if (data?.jobs?.edges) {
            if (jobs.length === 0) {
                // Only set jobs initially if the list is empty
                setJobs(data.jobs.edges.map(({ node }) => node));
            }
            setHasNextPage(data.jobs.pageInfo.hasNextPage);
        }
    }, [data]);

    const handleLoadMore = async () => {
        console.log("handleLoadMore");
        setLoadingMore(true);
        try {
            const cursor = data?.jobs.edges[data?.jobs.edges.length - 1].cursor;
            console.log("cursor", cursor);
            const res = await fetchMore({
                variables: {
                    first: PAGE_SIZE, // or any number you want to fetch
                    after: cursor,
                },
            });
            setJobs((prevJobs) => [
                ...prevJobs,
                ...(res.data?.jobs.edges.map(({ node }) => node) || []),
            ]);
            setHasNextPage(res.data?.jobs.pageInfo.hasNextPage ?? false);
        } finally {
            setLoadingMore(false);
        }
    };

    // Separate the loading state for initial load and load more
    if (loading && jobs.length === 0) return <Loader />;
    if (error) return <p>Error :</p>;

    return (
        <div>
            <ul className="max-w-4xl mx-auto px-4 py-8">
                {jobs.map((job: Job) => (
                    <motion.div
                        key={job.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <JobComponent job={job} />
                    </motion.div>
                ))}
            </ul>
            {hasNextPage && (
                <Button loading={loadingMore} onClick={handleLoadMore} center>
                    Load More
                </Button>
            )}
        </div>
    );
}
