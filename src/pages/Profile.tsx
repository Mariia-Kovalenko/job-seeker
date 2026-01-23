import { useUserStore } from "../store/userStore";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import JobForm from "../components/JobForm";
import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";
import { useQuery, useMutation } from "@apollo/client/react";
import { MY_JOBS } from "../graphql/queries";
import { DELETE_JOB } from "../graphql/mutations";
import { Job, UserJobsData } from "../utils/types";
import JobSkeleton from "../components/JobSkeleton";
import JobComponent from "../components/Job";
import { PAGE_SIZE } from "../utils/constants";
import JobDetails from "../components/JobDetails";
import Modal from "../common/Modal";
import Avatar from "../common/Avatar";
import {isTokenExpired} from '../utils/jwtUtils';
import { useLogout } from "../hooks/useLogout";

export default function Profile() {
    const user = useUserStore((state) => state.user);
    const navigate = useNavigate();
    const [addJobModalOpen, setAddJobModalOpen] = useState(false);
    const [viewJobModalOpen, setViewJobModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"add" | "edit">("add");
    const [jobToEdit, setJobToEdit] = useState<Job | null>(null);
    const [jobToView, setJobToView] = useState<Job | null>(null);
    const [jobIdToDelete, setJobIdToDelete] = useState<string | null>(null);
    const { theme } = useTheme();

    const [deleteJob] = useMutation(DELETE_JOB);

    // query for user jobs
    const { data, loading, error, fetchMore, refetch } = useQuery<UserJobsData>(MY_JOBS, {
        variables: {
            first: PAGE_SIZE,
            after: null,
        },
        context: {
            headers: {
                Authorization: `Bearer ${user?.token}`,
            },
        },
        skip: !user?.token,
    });

    const [jobs, setJobs] = useState<Job[]>([]);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const [hasNextPage, setHasNextPage] = useState<boolean>(false);

    useEffect(() => {
        if (data?.jobsByUser?.edges) {
            setJobs(data.jobsByUser.edges.map(({ node }: { node: Job }) => node));
            setHasNextPage(data.jobsByUser.pageInfo.hasNextPage);
        }
    }, [data]);

    const handleRefetch = async () => {
        // close job form modal
        closeModal();
        await refetch();
    };

    const closeModal = () => {
        setAddJobModalOpen(false);
        setModalMode("add");
        setJobToEdit(null);
    };

    const handleLoadMore = async () => {
        setLoadingMore(true);
        try {
            // const cursor = data?.jobsByUser?.edges ? data.jobsByUser.edges[data.jobsByUser.edges.length - 1].cursor : null;
            const lastJob = jobs[jobs.length - 1];
            const cursor = new Date(Number(lastJob.createdAt)).toISOString();

            const res = await fetchMore({
                variables: {
                    first: PAGE_SIZE,
                    after: cursor,
                },
            });
            setJobs((prevJobs) => [
                ...prevJobs,
                ...(res.data?.jobsByUser?.edges.map(({ node }: { node: Job }) => node) || []),
            ]);
            setHasNextPage(res.data?.jobsByUser?.pageInfo.hasNextPage ?? false);
        } finally {
            setLoadingMore(false);
        }
    };

    // const logout = () => {
    //     useUserStore.getState().logout();
    //     navigate("/");
    // };
    const logout = useLogout();

    const handleDelete = (id: string) => {
        setJobIdToDelete(id);
        setDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!jobIdToDelete) return;

        try {
            await deleteJob({
                variables: { id: jobIdToDelete },
                context: {
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                    },
                },
            });
            await refetch();
        } catch (err) {
            console.error("Error deleting job:", err);
        } finally {
            setDeleteModalOpen(false);
            setJobIdToDelete(null);
        }
    };

    const handleEditJob = (id: string) => {
        setModalMode("edit");
        // set form valued to job data
        setJobToEdit(jobs.find((job) => job._id === id) || null);
        setAddJobModalOpen(true);
    };

    const handleViewJob = (id: string) => {
        const selectedJob = jobs.find((job) => job._id === id);
        if (selectedJob) {
            setJobToView(selectedJob);
            setViewJobModalOpen(true); 
        }
    };


    return (
        <>
            <div className="max-w-4xl mx-auto px-4 pt-8">
                <h1 className="text-3xl font-bold mb-8">Profile</h1>

                {/* user info */}
                <div className={`p-4 md:p-6 rounded-2xl border mb-8 flex flex-col sm:flex-row items-center gap-4 md:gap-6 ${
                    theme === "dark" ? "bg-lightGrey border-lighterGrey/30" : "bg-white border-gray-200 shadow-sm"
                }`}>
                    {user && <Avatar user={user} size="16" />}
                    <div className="flex-grow text-center sm:text-left overflow-hidden w-full">
                        <h2 className="text-xl font-bold truncate">{user?.company || "Company Name"}</h2>
                        <p className="opacity-60 text-sm md:text-base truncate">{user?.email}</p>
                    </div>
                    <Button onClick={logout} className="w-fit sm:w-auto shrink-0 !bg-red-500/10 !text-red-500 hover:!bg-red-500 hover:!text-white border-none">
                        Logout
                    </Button>
                </div>

                <div className="mt-4 py-8 border-t border-lighterGrey/20">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold">Jobs Posted</h2>
                        <Button onClick={() => {
                            setAddJobModalOpen(true);
                            setModalMode("add");
                        }}>Add Job</Button>
                    </div>

                    {/* jobs list */}
                    {
                        (loading && jobs.length === 0) ? (
                            <div className="w-full">
                                <JobSkeleton />
                                <JobSkeleton />
                                <JobSkeleton />
                            </div>
                        ) : (
                            <ul className="w-full">
                                {jobs.length === 0 && !loading && !error && (
                                    <p className="text-center opacity-50 py-10">You haven't posted any jobs yet.</p>
                                )}
                                {jobs.map((job: Job) => (
                                            <motion.div
                                                key={job._id}
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <JobComponent 
                                                    job={job} 
                                                    isUserProfile={true} 
                                                    onDelete={handleDelete} 
                                                    onEdit={handleEditJob} 
                                                    onView={handleViewJob}
                                                />
                                            </motion.div>
                                ))}
                            </ul>
                        )
                    }

                    {error && <p className="text-red-500 text-center py-4">Error loading your jobs. Please try again later.</p>}

                    {hasNextPage && (
                        <Button loading={loadingMore} onClick={handleLoadMore} center className="mb-8">
                            Load More
                        </Button>
                    )}
                </div>
            </div>

            {/* add/edit job modal */}
            <Modal 
                isOpen={addJobModalOpen} 
                onClose={closeModal} 
                title={modalMode == "add" ? "Add Job": "Edit Job"}
            >
                <JobForm
                    modalMode={modalMode}
                    setModalMode={setModalMode}
                    job={jobToEdit}
                    onSuccess={handleRefetch}
                />
            </Modal>

            {/* view job modal */}
            <Modal isOpen={viewJobModalOpen} onClose={() => setViewJobModalOpen(false)} padding="p-0">
                {jobToView && <JobDetails job={jobToView} isInModal={true} />}
            </Modal>

            {/* delete confirmation modal */}
            <Modal 
                isOpen={deleteModalOpen} 
                onClose={() => setDeleteModalOpen(false)} 
                maxWidth="max-w-md"
                >
                <div className="flex flex-col items-center text-center">
                    <h3 className="text-xl font-bold mb-2">Delete Job?</h3>
                    <p className={`mb-8 opacity-70 ${theme === 'dark' ? 'text-white' : 'text-darkBackground'}`}>
                        Are you sure you want to delete this job listing? This action cannot be undone.
                    </p>
                    <div className="flex gap-4 w-full">
                        <Button 
                            onClick={() => setDeleteModalOpen(false)} 
                            className={`flex-1 !bg-transparent border ${
                                theme === 'dark' 
                                    ? 'border-white/10 text-white hover:bg-white/5'
                                    : 'border-gray-200 !text-gray-900 hover:bg-gray-50'
                            }`}
                        >
                            Cancel
                        </Button>
                        <Button 
                            onClick={confirmDelete} 
                            className="flex-1 !bg-red-500 hover:!bg-red-600 text-white border-none"
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
