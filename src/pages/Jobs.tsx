import { useQuery } from "@apollo/client/react";
import { GET_JOBS } from "../graphql/queries";
import { Job, JobsData } from "../utils/types";
import JobComponent from "../components/Job";
import { useState, useEffect } from "react";
import JobSkeleton from "../components/JobSkeleton";
import Button from "../common/Button";
import { PAGE_SIZE } from "../utils/constants";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { CATEGORIES } from "../utils/constants";
import JobsSearch from "../components/JobsSearch";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import ErrorComponent from "../common/Error";

export default function Jobs() {
    const [searchParams, setSearchParams] = useSearchParams();
    const categoryFromUrl = searchParams.get("category");
    const initialCategory = categoryFromUrl ?? "";

    const initialFilters = {
        search: searchParams.get("search") || "",
        location: searchParams.get("location") || "",
        workType: searchParams.get("workType") || "",
        categories: searchParams.get("category") || "",
    };
    // filters
    const [filters, setFilters] = useState(initialFilters);

    // query for jobs
    const { data, loading, error, fetchMore, refetch } = useQuery<JobsData>(
        GET_JOBS,
        {
            variables: {
                search: filters.search,
                location: filters.location,
                workType: filters.workType,
                categories: filters.categories ? [filters.categories] : [],
                first: PAGE_SIZE,
                after: null,
            },
        }
    );

    const [jobs, setJobs] = useState<Job[]>([]);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const [hasNextPage, setHasNextPage] = useState<boolean>(false);
    const [activeCategory, setActiveCategory] = useState<string>(
        initialCategory || "All"
    );
    const { theme } = useTheme();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (data?.jobs?.edges) {
            if (jobs.length === 0) {
                // Only set jobs initially if the list is empty
                setJobs(data.jobs.edges.map(({ node }) => node));
            }
            setHasNextPage(data.jobs.pageInfo.hasNextPage);
        }

        if (error) {
            setJobs([]);
        }
    }, [data, error]);

    useEffect(() => {
        const params = new URLSearchParams();
    
        if (filters.search) params.set("search", filters.search);
        if (filters.location) params.set("location", filters.location);
        if (filters.workType) params.set("workType", filters.workType);
        if (filters.categories) params.set("category", filters.categories);
        // Update the URL without adding a new history entry
        setSearchParams(params, { replace: true });
    
        // Refetch jobs whenever filters change
        refetch({
            search: filters.search,
            location: filters.location,
            workType: filters.workType,
            categories: filters.categories ? [filters.categories] : [],
            first: PAGE_SIZE,
            after: null,
        }).then((response) => {
            if (response.data) {
                setJobs(response.data.jobs.edges.map(({ node }) => node));
            }
        });
    }, [filters, refetch, setSearchParams]);
    

    // useEffect(() => {
    //     refetch({
    //         search: filters.search,
    //         location: filters.location,
    //         workType: filters.workType,
    //         categories: filters.categories ? [filters.categories] : [],
    //         first: PAGE_SIZE,
    //         after: null,
    //     })
    //         .then((response) => {
    //             console.log("Refetch response:", response);
    //             if (response.data) {
    //                 setJobs(response.data.jobs.edges.map(({ node }) => node));
    //             }
    //         })
    //         .catch((err) => {
    //             console.error("Refetch error:", err);
    //         });
    // }, [filters, refetch]);

    const handleLoadMore = async () => {
        setLoadingMore(true);
        try {
            // const cursor = data?.jobs.edges[data?.jobs.edges.length - 1].cursor;
            const lastJob = jobs[jobs.length - 1];
            const cursor = new Date(Number(lastJob.createdAt)).toISOString();

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
        setFilters(values);
    };

    const handleClearFilters = () => {
        setFilters({
            search: "",
            location: "",
            workType: "",
            categories: "",
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
                    clearFilters={handleClearFilters}
                />
            </div>
            {loading && !loadingMore || (loading && jobs.length === 0) ? (
                <div className="max-w-4xl mx-auto px-4 py-8">
                    <JobSkeleton />
                    <JobSkeleton />
                    <JobSkeleton />
                </div>
            ) : (
                <ul className="max-w-4xl mx-auto px-4 py-8">
                    {jobs.length === 0 && !loading && !error && (
                        <p className="text-center opacity-50 py-10">
                            No jobs found
                        </p>
                    )}
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
            )}
            {error && <ErrorComponent message="An error occured"/>}

            {hasNextPage && (
                <Button
                    loading={loadingMore}
                    onClick={handleLoadMore}
                    center
                    className="mb-8"
                >
                    Load More
                </Button>
            )}
        </div>
    );
}
