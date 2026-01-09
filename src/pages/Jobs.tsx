import { useQuery } from "@apollo/client/react";
import { GET_JOBS } from "../graphql/queries";
import { Job, JobsData } from "../utils/types";
import JobComponent from "../components/Job";
import { useState, useEffect } from "react";
import JobSkeleton from "../components/JobSkeleton";
import Button from "../common/Button";
import { PAGE_SIZE } from "../utils/constants";
import { motion } from "framer-motion";
import { SearchIcon } from "../icons/SearchIcon";
import { useTheme } from "../context/ThemeContext";
import { FilterIcon } from "../icons/FilterIcon";
import { CATEGORIES } from '../utils/constants';
import JobsSearch from "../components/JobsSearch";

export default function Jobs() {
    // filters
    const [filters, setFilters] = useState({
        search: '',
        location: '',
        workType: '',
        categories: '',
    });

    // query for jobs
    const { data, loading, error, fetchMore, refetch } = useQuery<JobsData>(GET_JOBS, {
        variables: {
            search: filters.search,
            location: filters.location,
            workType: filters.workType,
            categories: filters.categories ? [filters.categories] : [],
            first: PAGE_SIZE,
            after: null,
        },
    });

    const [jobs, setJobs] = useState<Job[]>([]);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const [hasNextPage, setHasNextPage] = useState<boolean>(false);
    const [activeCategory, setActiveCategory] = useState<string>('All');
    const { theme } = useTheme();

    useEffect(() => {
        if (data?.jobs?.edges) {
            if (jobs.length === 0) {
                // Only set jobs initially if the list is empty
                setJobs(data.jobs.edges.map(({ node }) => node));
            }
            setHasNextPage(data.jobs.pageInfo.hasNextPage);
        }
    }, [data]);

    useEffect(() => {
        console.log("filters updated", loading);
        refetch({
            search: filters.search,
            location: filters.location,
            workType: filters.workType,
            categories: filters.categories ? [filters.categories] : [],
            first: PAGE_SIZE,
            after: null,
        })
        .then(response => {
            console.log("Refetch response:", response);
            if (response.data) {
                setJobs(response.data.jobs.edges.map(({ node }) => node));
            }
        })
        .catch(err => {
            console.error("Refetch error:", err);
        });
    }, [filters, refetch]);

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

    const handleFilterSubmit = (values: any) => {
        console.log("values", values);
        setFilters(values);
    };

    const handleClearFilters = () => {
        setFilters({
            search: '',
            location: '',
            workType: '',
            categories: '',
        });
    };

    return (
        <div>
            {/* filter form */}
            <div className="max-w-4xl mx-auto px-4 pt-8 pb-2">
                <JobsSearch 
                    activeCategory={activeCategory} 
                    setActiveCategory={setActiveCategory}
                    onSubmit={handleFilterSubmit} 
                    clearFilters={handleClearFilters} />
            </div>
            {
                (loading && jobs.length === 0) ? 
                <div className="max-w-4xl mx-auto px-4 py-8">
                    <JobSkeleton />
                    <JobSkeleton />
                    <JobSkeleton />
                </div> : (
                    <ul className="max-w-4xl mx-auto px-4 py-8">
                        {jobs.length === 0 && !loading && <p className="text-center opacity-50 py-10">No jobs found</p>}
                    {jobs.map((job: Job) => (
                        <motion.div
                            key={job._id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <JobComponent job={job} />
                        </motion.div>
                    ))}
                </ul>
                )
            }
            {
                error && <p>Error :</p>
            }
           
            {hasNextPage && (
                <Button loading={loadingMore} onClick={handleLoadMore} center className="mb-8">
                    Load More
                </Button>
            )}
        </div>
    );
}
