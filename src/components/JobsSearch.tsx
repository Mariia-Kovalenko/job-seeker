import { useTheme } from "../context/ThemeContext";
import { SearchIcon } from "../icons/SearchIcon";
import { FilterIcon } from "../icons/FilterIcon";
import { motion } from "framer-motion";
import { CATEGORIES } from '../utils/constants';
import { useState } from "react";
import { useFormik } from "formik";

interface JobsSearchProps {
    activeCategory: string;
    setActiveCategory: (activeCategory: string) => void;
    onSubmit: (values: any) => void;
    clearFilters: () => void;
}

export default function JobsSearch({activeCategory, setActiveCategory, onSubmit, clearFilters}: JobsSearchProps) {
    const {theme} = useTheme();
    const [showFilter, setShowFilter] = useState<boolean>(false);

    const form = useFormik({
        initialValues: {
            search: "",
            location: "",
            workType: "",
            categories: "",
        },
        onSubmit: (values) => {
            console.log('will submit form with values:', values);
            onSubmit(values);
        },
    })

    const handleClearFilters = () => {
        form.resetForm(); // Resets form to initial values
        setActiveCategory('All'); // Reset active category if needed
        clearFilters();
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        form.handleChange(event);
    };

    return (
        <form className="relative" onSubmit={form.handleSubmit}>
                    <div className="flex items-center gap-2">
                        <fieldset
                            className={`h-11 w-full flex items-center gap-2 relative rounded-full border-[1.3px] ${
                                theme == "dark"
                                    ? "border-white"
                                    : "border-gray-500"
                            } pl-10`}
                        >
                            <SearchIcon
                                className="w-5 h-5 absolute left-4"
                                theme={theme}
                            />
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full p-2 bg-transparent focus:outline-none"
                                onChange={handleChange}
                                onBlur={form.handleBlur}
                                value={form.values.search}
                                name="search"
                            />
                        </fieldset>

                        <button
                            onClick={handleClearFilters}
                            className="h-11 w-11 shrink-0 rounded-full bg-primary text-white flex items-center justify-center"
                        >
                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.7338 10.5002L17.2463 4.99641C17.411 4.83165 17.5036 4.60818 17.5036 4.37516C17.5036 4.14215 17.411 3.91868 17.2463 3.75391C17.0815 3.58915 16.858 3.49658 16.625 3.49658C16.392 3.49658 16.1685 3.58915 16.0038 3.75391L10.5 9.26641L4.99626 3.75391C4.83149 3.58915 4.60802 3.49658 4.37501 3.49658C4.14199 3.49658 3.91852 3.58915 3.75376 3.75391C3.58899 3.91868 3.49643 4.14215 3.49643 4.37516C3.49643 4.60818 3.58899 4.83165 3.75376 4.99641L9.26626 10.5002L3.75376 16.0039C3.67175 16.0853 3.60665 16.182 3.56223 16.2887C3.51781 16.3953 3.49493 16.5097 3.49493 16.6252C3.49493 16.7407 3.51781 16.855 3.56223 16.9617C3.60665 17.0683 3.67175 17.1651 3.75376 17.2464C3.8351 17.3284 3.93188 17.3935 4.0385 17.4379C4.14513 17.4824 4.2595 17.5052 4.37501 17.5052C4.49052 17.5052 4.60489 17.4824 4.71151 17.4379C4.81814 17.3935 4.91491 17.3284 4.99626 17.2464L10.5 11.7339L16.0038 17.2464C16.0851 17.3284 16.1819 17.3935 16.2885 17.4379C16.3951 17.4824 16.5095 17.5052 16.625 17.5052C16.7405 17.5052 16.8549 17.4824 16.9615 17.4379C17.0681 17.3935 17.1649 17.3284 17.2463 17.2464C17.3283 17.1651 17.3934 17.0683 17.4378 16.9617C17.4822 16.855 17.5051 16.7407 17.5051 16.6252C17.5051 16.5097 17.4822 16.3953 17.4378 16.2887C17.3934 16.182 17.3283 16.0853 17.2463 16.0039L11.7338 10.5002Z" fill="white"/>
                            </svg>
                        </button>
                    </div>

                    <div
                        
                    >
                        <div className="flex gap-2 md:gap-4 mt-4">
                            <fieldset
                                className={`h-11 w-full flex items-center gap-2 relative rounded-full border-[1.3px] ${
                                    theme == "dark"
                                        ? "border-white"
                                        : "border-gray-500"
                                } pl-10`}
                            >
                                {/* <LocationIcon className="w-5 h-5 absolute left-4" /> */}
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5 absolute left-4"
                                >
                                    <path
                                        d="M9 1.5C7.4087 1.5 5.88258 2.13214 4.75736 3.25736C3.63214 4.38258 3 5.9087 3 7.5C3 11.55 8.2875 16.125 8.5125 16.32C8.64835 16.4362 8.82124 16.5 9 16.5C9.17876 16.5 9.35165 16.4362 9.4875 16.32C9.75 16.125 15 11.55 15 7.5C15 5.9087 14.3679 4.38258 13.2426 3.25736C12.1174 2.13214 10.5913 1.5 9 1.5ZM9 14.7375C7.4025 13.2375 4.5 10.005 4.5 7.5C4.5 6.30653 4.97411 5.16193 5.81802 4.31802C6.66193 3.47411 7.80653 3 9 3C10.1935 3 11.3381 3.47411 12.182 4.31802C13.0259 5.16193 13.5 6.30653 13.5 7.5C13.5 10.005 10.5975 13.245 9 14.7375ZM9 4.5C8.40666 4.5 7.82664 4.67595 7.33329 5.00559C6.83994 5.33524 6.45542 5.80377 6.22836 6.35195C6.0013 6.90013 5.94189 7.50333 6.05764 8.08527C6.1734 8.66721 6.45912 9.20176 6.87868 9.62132C7.29824 10.0409 7.83279 10.3266 8.41473 10.4424C8.99667 10.5581 9.59987 10.4987 10.1481 10.2716C10.6962 10.0446 11.1648 9.66006 11.4944 9.16671C11.8241 8.67336 12 8.09334 12 7.5C12 6.70435 11.6839 5.94129 11.1213 5.37868C10.5587 4.81607 9.79565 4.5 9 4.5ZM9 9C8.70333 9 8.41332 8.91203 8.16665 8.7472C7.91997 8.58238 7.72771 8.34811 7.61418 8.07403C7.50065 7.79994 7.47094 7.49834 7.52882 7.20736C7.5867 6.91639 7.72956 6.64912 7.93934 6.43934C8.14912 6.22956 8.41639 6.0867 8.70736 6.02882C8.99834 5.97094 9.29994 6.00065 9.57403 6.11418C9.84811 6.22771 10.0824 6.41997 10.2472 6.66665C10.412 6.91332 10.5 7.20333 10.5 7.5C10.5 7.89782 10.342 8.27936 10.0607 8.56066C9.77936 8.84196 9.39782 9 9 9Z"
                                        fill="#2C2C2C"
                                        fill-opacity="0.6"
                                    />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Location"
                                    className="w-full p-2 bg-transparent focus:outline-none"
                                    onChange={handleChange}
                                    onBlur={form.handleBlur}
                                    value={form.values.location}
                                    name="location"
                                />
                            </fieldset>
                            <fieldset
                                className={`h-11 w-full flex items-center gap-2 relative rounded-full border-[1.3px] ${
                                    theme == "dark"
                                        ? "border-white"
                                        : "border-gray-500"
                                }`}
                            >
                                <select 
                                    onChange={handleChange}
                                    onBlur={form.handleBlur}
                                    value={form.values.workType}
                                    name="workType"
                                    className="w-full h-full p-2 px-4 bg-transparent focus:outline-none rounded-full appearance-none">
                                    <option className={theme === 'dark' ? 'bg-darkBackground text-white' : 'bg-white text-black'}>In House</option>
                                    <option className={theme === 'dark' ? 'bg-darkBackground text-white' : 'bg-white text-black'}>Remote</option>
                                    <option className={theme === 'dark' ? 'bg-darkBackground text-white' : 'bg-white text-black'}>Hybrid</option>
                                </select>
                                <span className="absolute right-4 pointer-events-none">
                                    <svg
                                      className={`${theme === 'dark' ? 'text-white' : 'text-darkBackground'}`}
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M8 10l4 4 4-4"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                </span>
                            </fieldset>
                            {/* submit button */}
                            <button
                                type="submit"
                                className="h-11 w-fit px-4 shrink-0 rounded-full bg-primary text-white flex items-center justify-center"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>

                    {/* categories */}
                    <h3 className="text-md font-medium mt-6">Categories</h3>
                    <div className="flex flex-wrap gap-2 mt-4">
                        {['All', ...CATEGORIES.map(category => category.name)].map((category, idx) => (
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActiveCategory(category);
                                    if (category === 'All') {
                                        form.setFieldValue('categories', '');
                                    } else {
                                        form.setFieldValue('categories', category);
                                    }
                                    form.submitForm();
                                }}
                                key={idx}
                                className={`px-3 py-1 rounded-full border-[1px] text-sm transition-all duration-300
                                    ${activeCategory === category ? 'bg-primary text-white' : theme == "dark" ? 'text-white border-white' : 'text-gray-500 border-gray-600'}`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </form>
    )
}