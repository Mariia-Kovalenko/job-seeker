import React from "react";
import type { Job } from "../utils/types";
import { useTheme } from "../context/ThemeContext";
import TimeIcon from "../icons/TimeIcon";
import TimeIconLight from "../icons/TimeIconLight";
import LocationIconLight from "../icons/LocationIconLight";
import { daysAgo } from "../helpers";
import { useUserStore } from "../store/userStore";

export default function JobComponent({
    job,
    isUserProfile = false,
    onEdit,
    onDelete,
    onView,
}: {
    job: Job;
    isUserProfile?: boolean;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
    onView?: (id: string) => void;
}) {
    console.log("job", job);
    const { theme } = useTheme();

    const handleEdit = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onEdit?.(job._id);
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onDelete?.(job._id);
    };

    const Wrapper = isUserProfile ? "div" : "a";

    const handleView = () => {
        if (isUserProfile) {
            onView?.(job._id);
        }
    };

    return (
        <Wrapper
            {...(!isUserProfile
                ? { href: `/jobs/${job._id}` }
                : { onClick: handleView })}
            className={`group relative block p-3 text-white rounded-xl border mb-4 md:mb-8 hover:shadow-xl transition-all duration-300 ${
                isUserProfile ? "cursor-pointer" : ""
            } ${
                theme === "dark"
                    ? "bg-[#1E1E20] text-white border-lighterGrey/50"
                    : "bg-[#f4f4f4] text-darkBackground border-gray-300"
            }`}
        >
            {/* Actions overlay for Profile page */}
            {(onEdit || onDelete) && isUserProfile && (
                <div className="absolute top-6 right-6 flex gap-2 z-20">
                    {onEdit && (
                        <button
                            onClick={handleEdit}
                            className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all border border-primary/20 shadow-sm"
                            title="Edit Job"
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                        </button>
                    )}
                    {onDelete && (
                        <button
                            onClick={handleDelete}
                            className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all border border-red-500/20 shadow-sm"
                            title="Delete Job"
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                        </button>
                    )}
                </div>
            )}

            <div
                className={`flex flex-col items-start rounded-xl gap-3 p-4 border ${
                    theme === "dark"
                        ? "bg-[rgba(255,255,255,0.05)] text-white border-lighterGrey/50"
                        : "bg-white text-darkBackground border-gray-300"
                }`}
            >
                <div className="flex items-center justify-between w-full">
                    {job.category.length > 0 && (
                        <div className="text-sm flex items-center gap-2">
                            {job.category.map((category) => (
                                <span
                                    className={`mr-2 text-[0.75rem] inline-block py-1 px-2 rounded-full font-medium ${
                                        theme === "dark"
                                            ? "bg-secondaryYellow text-black"
                                            : "bg-secondaryYellow/40 text-[#CD6337]"
                                    }`}
                                >
                                    {category}
                                </span>
                            ))}
                        </div>
                    )}
                    {job.salaryRange && !isUserProfile && (
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
                        <h2 className="text-lg font-bold">{job.title}</h2>
                        <div className="text-sm mt-1 opacity-75">
                            <span>
                                {job.company} • {job.location}
                            </span>
                        </div>
                    </div>
                </div>

                {/* salary range in user profile */}
                {isUserProfile && job.salaryRange && (
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

                <p className="text-sm mt-2 text-left w-full opacity-80">
                    {job.shortDescription}
                </p>
            </div>
            <div
                className={`text-sm mt-3 flex items-center gap-3 pl-6 ${
                    theme === "dark" ? "text-white" : "text-darkBackground"
                }`}
            >
                <span className="mr-2 flex gap-1 items-center whitespace-nowrap opacity-80">
                    {theme === "dark" ? <TimeIconLight /> : <TimeIcon />}
                    {daysAgo(job.createdAt)}
                </span>
                <span className="flex gap-1 items-center whitespace-nowrap opacity-80 capitalize">
                    {theme === "dark" ? (
                        <LocationIconLight />
                    ) : (
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M9 1.5C7.4087 1.5 5.88258 2.13214 4.75736 3.25736C3.63214 4.38258 3 5.9087 3 7.5C3 11.55 8.2875 16.125 8.5125 16.32C8.64835 16.4362 8.82124 16.5 9 16.5C9.17876 16.5 9.35165 16.4362 9.4875 16.32C9.75 16.125 15 11.55 15 7.5C15 5.9087 14.3679 4.38258 13.2426 3.25736C12.1174 2.13214 10.5913 1.5 9 1.5ZM9 14.7375C7.4025 13.2375 4.5 10.005 4.5 7.5C4.5 6.30653 4.97411 5.16193 5.81802 4.31802C6.66193 3.47411 7.80653 3 9 3C10.1935 3 11.3381 3.47411 12.182 4.31802C13.0259 5.16193 13.5 6.30653 13.5 7.5C13.5 10.005 10.5975 13.245 9 14.7375ZM9 4.5C8.40666 4.5 7.82664 4.67595 7.33329 5.00559C6.83994 5.33524 6.45542 5.80377 6.22836 6.35195C6.0013 6.90013 5.94189 7.50333 6.05764 8.08527C6.1734 8.66721 6.45912 9.20176 6.87868 9.62132C7.29824 10.0409 7.83279 10.3266 8.41473 10.4424C8.99667 10.5581 9.59987 10.4987 10.1481 10.2716C10.6962 10.0446 11.1648 9.66006 11.4944 9.16671C11.8241 8.67336 12 8.09334 12 7.5C12 6.70435 11.6839 5.94129 11.1213 5.37868C10.5587 4.81607 9.79565 4.5 9 4.5ZM9 9C8.70333 9 8.41332 8.91203 8.16665 8.7472C7.91997 8.58238 7.72771 8.34811 7.61418 8.07403C7.50065 7.79994 7.47094 7.49834 7.52882 7.20736C7.5867 6.91639 7.72956 6.64912 7.93934 6.43934C8.14912 6.22956 8.41639 6.0867 8.70736 6.02882C8.99834 5.97094 9.29994 6.00065 9.57403 6.11418C9.84811 6.22771 10.0824 6.41997 10.2472 6.66665C10.412 6.91332 10.5 7.20333 10.5 7.5C10.5 7.89782 10.342 8.27936 10.0607 8.56066C9.77936 8.84196 9.39782 9 9 9Z"
                                fill="#2C2C2C"
                                fillOpacity="0.6"
                            />
                        </svg>
                    )}
                    {job.workType}
                </span>
            </div>
        </Wrapper>
    );
}
