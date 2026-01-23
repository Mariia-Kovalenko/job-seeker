import { useTheme } from "../context/ThemeContext";
import { SearchIcon } from "../icons/SearchIcon";
import { FilterIcon } from "../icons/FilterIcon";
import LocationIconLight from "../icons/LocationIconLight";
import LocationIcon from "../icons/Location";
import SearchIconLight from "../icons/SearchIconLight";
import { motion } from "framer-motion";
import { CATEGORIES } from "../utils/constants";
import { useState } from "react";
import { useFormik } from "formik";

interface JobsSearchProps {
    activeCategory: string;
    setActiveCategory: (activeCategory: string) => void;
    onSubmit: (values: any) => void;
    clearFilters: () => void;
}

export default function JobsSearch({
    activeCategory,
    setActiveCategory,
    onSubmit,
    clearFilters,
}: JobsSearchProps) {
    const { theme } = useTheme();
    const [showFilter, setShowFilter] = useState<boolean>(false);

    const form = useFormik({
        initialValues: {
            search: "",
            location: "",
            workType: "",
            categories: "",
        },
        onSubmit: (values) => {
            // console.log("will submit form with values:", values);
            onSubmit(values);
        },
    });

    const handleClearFilters = () => {
        form.resetForm(); // Resets form to initial values
        setActiveCategory("All"); // Reset active category if needed
        clearFilters();
    };
    const handleClearSearchFilter = () => {
        form.setFieldValue("search", "");
        form.submitForm();
    };
    const handleClearLocationFilter = () => {
        form.setFieldValue("location", "");
        // form.submitForm();
    };

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        form.handleChange(event);
    };

    return (
        <form className="relative" onSubmit={form.handleSubmit}>
            <div className="flex items-center gap-2 md:gap-4">
                <fieldset
                    className={`h-14 w-full flex items-center relative rounded-full border-[1.3px] ${
                        theme == "dark" ? "border-white" : "border-gray-500"
                    } pl-14`}
                >
                    <input
                        type="text"
                        placeholder="Search your dream job..."
                        className="w-full p-2 pl-0 bg-transparent focus:outline-none"
                        onChange={handleChange}
                        onBlur={form.handleBlur}
                        value={form.values.search}
                        name="search"
                    />

                    {/* clear search button */}
                    {form.values.search && (
                        <button
                            type="button"
                            onClick={handleClearSearchFilter}
                            className="h-11 w-11 rounded-full px-4 shrink-0 text-white flex items-center justify-center"
                        >
                            {theme == "dark" ? (
                                <svg
                                    width="13"
                                    height="13"
                                    viewBox="0 0 13 13"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M7.26374 6.5001L10.6762 3.09302C10.7782 2.99102 10.8355 2.85268 10.8355 2.70843C10.8355 2.56419 10.7782 2.42585 10.6762 2.32385C10.5742 2.22185 10.4359 2.16455 10.2917 2.16455C10.1474 2.16455 10.0091 2.22185 9.90707 2.32385L6.49999 5.73635L3.0929 2.32385C2.99091 2.22185 2.85257 2.16455 2.70832 2.16455C2.56407 2.16455 2.42574 2.22185 2.32374 2.32385C2.22174 2.42585 2.16444 2.56419 2.16444 2.70843C2.16444 2.85268 2.22174 2.99102 2.32374 3.09302L5.73624 6.5001L2.32374 9.90718C2.27297 9.95754 2.23267 10.0174 2.20517 10.0835C2.17767 10.1495 2.16351 10.2203 2.16351 10.2918C2.16351 10.3633 2.17767 10.4341 2.20517 10.5001C2.23267 10.5661 2.27297 10.626 2.32374 10.6763C2.37409 10.7271 2.434 10.7674 2.50001 10.7949C2.56602 10.8224 2.63681 10.8366 2.70832 10.8366C2.77983 10.8366 2.85063 10.8224 2.91663 10.7949C2.98264 10.7674 3.04255 10.7271 3.0929 10.6763L6.49999 7.26385L9.90707 10.6763C9.95743 10.7271 10.0173 10.7674 10.0833 10.7949C10.1493 10.8224 10.2201 10.8366 10.2917 10.8366C10.3632 10.8366 10.434 10.8224 10.5 10.7949C10.566 10.7674 10.6259 10.7271 10.6762 10.6763C10.727 10.626 10.7673 10.5661 10.7948 10.5001C10.8223 10.4341 10.8365 10.3633 10.8365 10.2918C10.8365 10.2203 10.8223 10.1495 10.7948 10.0835C10.7673 10.0174 10.727 9.95754 10.6762 9.90718L7.26374 6.5001Z"
                                        fill="white"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    width="13"
                                    height="13"
                                    viewBox="0 0 13 13"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M7.26374 6.5001L10.6762 3.09302C10.7782 2.99102 10.8355 2.85268 10.8355 2.70843C10.8355 2.56419 10.7782 2.42585 10.6762 2.32385C10.5742 2.22185 10.4359 2.16455 10.2917 2.16455C10.1474 2.16455 10.0091 2.22185 9.90707 2.32385L6.49999 5.73635L3.0929 2.32385C2.99091 2.22185 2.85257 2.16455 2.70832 2.16455C2.56407 2.16455 2.42574 2.22185 2.32374 2.32385C2.22174 2.42585 2.16444 2.56419 2.16444 2.70843C2.16444 2.85268 2.22174 2.99102 2.32374 3.09302L5.73624 6.5001L2.32374 9.90718C2.27297 9.95754 2.23267 10.0174 2.20517 10.0835C2.17767 10.1495 2.16351 10.2203 2.16351 10.2918C2.16351 10.3633 2.17767 10.4341 2.20517 10.5001C2.23267 10.5661 2.27297 10.626 2.32374 10.6763C2.37409 10.7271 2.434 10.7674 2.50001 10.7949C2.56602 10.8224 2.63681 10.8366 2.70832 10.8366C2.77983 10.8366 2.85063 10.8224 2.91663 10.7949C2.98264 10.7674 3.04255 10.7271 3.0929 10.6763L6.49999 7.26385L9.90707 10.6763C9.95743 10.7271 10.0173 10.7674 10.0833 10.7949C10.1493 10.8224 10.2201 10.8366 10.2917 10.8366C10.3632 10.8366 10.434 10.8224 10.5 10.7949C10.566 10.7674 10.6259 10.7271 10.6762 10.6763C10.727 10.626 10.7673 10.5661 10.7948 10.5001C10.8223 10.4341 10.8365 10.3633 10.8365 10.2918C10.8365 10.2203 10.8223 10.1495 10.7948 10.0835C10.7673 10.0174 10.727 9.95754 10.6762 9.90718L7.26374 6.5001Z"
                                        fill="#2C2C2C"
                                        fill-opacity="0.8"
                                    />
                                </svg>
                            )}
                        </button>
                    )}

                    {/* submit search button */}
                    <button
                        type="submit"
                        className="absolute left-2 top-[50%] translate-y-[-50%] h-10 w-10 rounded-full shrink-0 bg-primary text-white flex items-center justify-center"
                    >
                        <SearchIconLight className="shrink-0" />
                    </button>
                </fieldset>

                {/* clear all filters button */}
                <button
                    type="button"
                    onClick={handleClearFilters}
                    className={`h-14 rounded-full shrink-0 border-[1.3px] ${
                        theme == "dark" ? "border-white" : "border-gray-500"
                    } text-sm px-2 md:px-4 py-2 flex items-center justify-center gap-1 md:gap-2 disabled:opacity-50`}
                    disabled={
                        !form.values.search &&
                        !form.values.location &&
                        !form.values.workType &&
                        !form.values.categories
                    }
                >
                    {theme == "dark" ? (
                        <svg
                            width="13"
                            height="13"
                            viewBox="0 0 13 13"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M7.26374 6.5001L10.6762 3.09302C10.7782 2.99102 10.8355 2.85268 10.8355 2.70843C10.8355 2.56419 10.7782 2.42585 10.6762 2.32385C10.5742 2.22185 10.4359 2.16455 10.2917 2.16455C10.1474 2.16455 10.0091 2.22185 9.90707 2.32385L6.49999 5.73635L3.0929 2.32385C2.99091 2.22185 2.85257 2.16455 2.70832 2.16455C2.56407 2.16455 2.42574 2.22185 2.32374 2.32385C2.22174 2.42585 2.16444 2.56419 2.16444 2.70843C2.16444 2.85268 2.22174 2.99102 2.32374 3.09302L5.73624 6.5001L2.32374 9.90718C2.27297 9.95754 2.23267 10.0174 2.20517 10.0835C2.17767 10.1495 2.16351 10.2203 2.16351 10.2918C2.16351 10.3633 2.17767 10.4341 2.20517 10.5001C2.23267 10.5661 2.27297 10.626 2.32374 10.6763C2.37409 10.7271 2.434 10.7674 2.50001 10.7949C2.56602 10.8224 2.63681 10.8366 2.70832 10.8366C2.77983 10.8366 2.85063 10.8224 2.91663 10.7949C2.98264 10.7674 3.04255 10.7271 3.0929 10.6763L6.49999 7.26385L9.90707 10.6763C9.95743 10.7271 10.0173 10.7674 10.0833 10.7949C10.1493 10.8224 10.2201 10.8366 10.2917 10.8366C10.3632 10.8366 10.434 10.8224 10.5 10.7949C10.566 10.7674 10.6259 10.7271 10.6762 10.6763C10.727 10.626 10.7673 10.5661 10.7948 10.5001C10.8223 10.4341 10.8365 10.3633 10.8365 10.2918C10.8365 10.2203 10.8223 10.1495 10.7948 10.0835C10.7673 10.0174 10.727 9.95754 10.6762 9.90718L7.26374 6.5001Z"
                                fill="white"
                            />
                        </svg>
                    ) : (
                        <svg
                            width="13"
                            height="13"
                            viewBox="0 0 13 13"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M7.26374 6.5001L10.6762 3.09302C10.7782 2.99102 10.8355 2.85268 10.8355 2.70843C10.8355 2.56419 10.7782 2.42585 10.6762 2.32385C10.5742 2.22185 10.4359 2.16455 10.2917 2.16455C10.1474 2.16455 10.0091 2.22185 9.90707 2.32385L6.49999 5.73635L3.0929 2.32385C2.99091 2.22185 2.85257 2.16455 2.70832 2.16455C2.56407 2.16455 2.42574 2.22185 2.32374 2.32385C2.22174 2.42585 2.16444 2.56419 2.16444 2.70843C2.16444 2.85268 2.22174 2.99102 2.32374 3.09302L5.73624 6.5001L2.32374 9.90718C2.27297 9.95754 2.23267 10.0174 2.20517 10.0835C2.17767 10.1495 2.16351 10.2203 2.16351 10.2918C2.16351 10.3633 2.17767 10.4341 2.20517 10.5001C2.23267 10.5661 2.27297 10.626 2.32374 10.6763C2.37409 10.7271 2.434 10.7674 2.50001 10.7949C2.56602 10.8224 2.63681 10.8366 2.70832 10.8366C2.77983 10.8366 2.85063 10.8224 2.91663 10.7949C2.98264 10.7674 3.04255 10.7271 3.0929 10.6763L6.49999 7.26385L9.90707 10.6763C9.95743 10.7271 10.0173 10.7674 10.0833 10.7949C10.1493 10.8224 10.2201 10.8366 10.2917 10.8366C10.3632 10.8366 10.434 10.8224 10.5 10.7949C10.566 10.7674 10.6259 10.7271 10.6762 10.6763C10.727 10.626 10.7673 10.5661 10.7948 10.5001C10.8223 10.4341 10.8365 10.3633 10.8365 10.2918C10.8365 10.2203 10.8223 10.1495 10.7948 10.0835C10.7673 10.0174 10.727 9.95754 10.6762 9.90718L7.26374 6.5001Z"
                                fill="#2C2C2C"
                                fill-opacity="0.8"
                            />
                        </svg>
                    )}
                    <span className="text-sm">Clear All</span>
                </button>
            </div>

            {/* categories */}
            <div className="categories mb-8">
                <h3 className="text-md font-medium mt-6">Categories</h3>
                <div className="flex flex-wrap gap-2 mt-4">
                    {[
                        "All",
                        ...CATEGORIES.map((category) => category.name),
                    ].map((category, idx) => (
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                setActiveCategory(category);
                                if (category === "All") {
                                    form.setFieldValue("categories", "");
                                } else {
                                    form.setFieldValue("categories", category);
                                }
                                form.submitForm();
                            }}
                            key={idx}
                            className={`px-3 py-1 rounded-full border-[1px] text-sm transition-all duration-300 
                                        ${
                                            activeCategory === category
                                                ? "bg-primary text-white border-primary hover:bg-primary hover:text-white"
                                                : theme == "dark"
                                                ? "text-white border-white hover:text-primary hover:border-primary hover:bg-primary/5"
                                                : "text-gray-500 border-gray-600 hover:text-primary hover:border-primary hover:bg-primary/5"
                                        }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            <div className="advanced">
                <h3 className="text-md font-medium mt-6">Advanced</h3>
                <div className="flex flex-col smallMobile:flex-row smallMobile:items-end gap-4 mt-4">
                    <fieldset className=" w-full flex flex-col gap-2">
                        <label
                            htmlFor="location"
                            className="text-xs opacity-70 font-medium"
                        >
                            Location
                        </label>
                        <div
                            className={`h-11 w-full flex items-center gap-2 relative rounded-full border-[1.3px] ${
                                theme == "dark"
                                    ? "border-white"
                                    : "border-gray-500"
                            } pl-8`}
                        >
                            {/* <LocationIcon className="w-5 h-5 absolute left-4" /> */}
                            {theme == "dark" ? (
                                <LocationIconLight className="w-5 h-5 absolute left-3" />
                            ) : (
                                <LocationIcon className="w-5 h-5 absolute left-3" />
                            )}
                            <input
                                type="text"
                                id="location"
                                placeholder="Location"
                                className="w-full p-2 bg-transparent focus:outline-none"
                                onChange={handleChange}
                                onBlur={form.handleBlur}
                                value={form.values.location}
                                name="location"
                            />

                            {form.values.location && (
                                <button
                                    type="button"
                                    onClick={handleClearLocationFilter}
                                    className="h-11 w-11 rounded-full px-4 shrink-0 text-white flex items-center justify-center"
                                >
                                    {theme == "dark" ? (
                                        <svg
                                            width="13"
                                            height="13"
                                            viewBox="0 0 13 13"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M7.26374 6.5001L10.6762 3.09302C10.7782 2.99102 10.8355 2.85268 10.8355 2.70843C10.8355 2.56419 10.7782 2.42585 10.6762 2.32385C10.5742 2.22185 10.4359 2.16455 10.2917 2.16455C10.1474 2.16455 10.0091 2.22185 9.90707 2.32385L6.49999 5.73635L3.0929 2.32385C2.99091 2.22185 2.85257 2.16455 2.70832 2.16455C2.56407 2.16455 2.42574 2.22185 2.32374 2.32385C2.22174 2.42585 2.16444 2.56419 2.16444 2.70843C2.16444 2.85268 2.22174 2.99102 2.32374 3.09302L5.73624 6.5001L2.32374 9.90718C2.27297 9.95754 2.23267 10.0174 2.20517 10.0835C2.17767 10.1495 2.16351 10.2203 2.16351 10.2918C2.16351 10.3633 2.17767 10.4341 2.20517 10.5001C2.23267 10.5661 2.27297 10.626 2.32374 10.6763C2.37409 10.7271 2.434 10.7674 2.50001 10.7949C2.56602 10.8224 2.63681 10.8366 2.70832 10.8366C2.77983 10.8366 2.85063 10.8224 2.91663 10.7949C2.98264 10.7674 3.04255 10.7271 3.0929 10.6763L6.49999 7.26385L9.90707 10.6763C9.95743 10.7271 10.0173 10.7674 10.0833 10.7949C10.1493 10.8224 10.2201 10.8366 10.2917 10.8366C10.3632 10.8366 10.434 10.8224 10.5 10.7949C10.566 10.7674 10.6259 10.7271 10.6762 10.6763C10.727 10.626 10.7673 10.5661 10.7948 10.5001C10.8223 10.4341 10.8365 10.3633 10.8365 10.2918C10.8365 10.2203 10.8223 10.1495 10.7948 10.0835C10.7673 10.0174 10.727 9.95754 10.6762 9.90718L7.26374 6.5001Z"
                                                fill="white"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            width="13"
                                            height="13"
                                            viewBox="0 0 13 13"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M7.26374 6.5001L10.6762 3.09302C10.7782 2.99102 10.8355 2.85268 10.8355 2.70843C10.8355 2.56419 10.7782 2.42585 10.6762 2.32385C10.5742 2.22185 10.4359 2.16455 10.2917 2.16455C10.1474 2.16455 10.0091 2.22185 9.90707 2.32385L6.49999 5.73635L3.0929 2.32385C2.99091 2.22185 2.85257 2.16455 2.70832 2.16455C2.56407 2.16455 2.42574 2.22185 2.32374 2.32385C2.22174 2.42585 2.16444 2.56419 2.16444 2.70843C2.16444 2.85268 2.22174 2.99102 2.32374 3.09302L5.73624 6.5001L2.32374 9.90718C2.27297 9.95754 2.23267 10.0174 2.20517 10.0835C2.17767 10.1495 2.16351 10.2203 2.16351 10.2918C2.16351 10.3633 2.17767 10.4341 2.20517 10.5001C2.23267 10.5661 2.27297 10.626 2.32374 10.6763C2.37409 10.7271 2.434 10.7674 2.50001 10.7949C2.56602 10.8224 2.63681 10.8366 2.70832 10.8366C2.77983 10.8366 2.85063 10.8224 2.91663 10.7949C2.98264 10.7674 3.04255 10.7271 3.0929 10.6763L6.49999 7.26385L9.90707 10.6763C9.95743 10.7271 10.0173 10.7674 10.0833 10.7949C10.1493 10.8224 10.2201 10.8366 10.2917 10.8366C10.3632 10.8366 10.434 10.8224 10.5 10.7949C10.566 10.7674 10.6259 10.7271 10.6762 10.6763C10.727 10.626 10.7673 10.5661 10.7948 10.5001C10.8223 10.4341 10.8365 10.3633 10.8365 10.2918C10.8365 10.2203 10.8223 10.1495 10.7948 10.0835C10.7673 10.0174 10.727 9.95754 10.6762 9.90718L7.26374 6.5001Z"
                                                fill="#2C2C2C"
                                                fill-opacity="0.8"
                                            />
                                        </svg>
                                    )}
                                </button>
                            )}
                        </div>
                    </fieldset>

                    <fieldset className=" w-full flex flex-col gap-2">
                        <label
                            htmlFor="worktype"
                            className="text-xs opacity-70 font-medium"
                        >
                            Worktype
                        </label>
                        <div
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
                                id="worktype"
                                name="workType"
                                className="w-full h-full p-2 px-4 bg-transparent focus:outline-none rounded-full appearance-none"
                            >
                                <option
                                    value="any"
                                    className={
                                        theme === "dark"
                                            ? "bg-darkBackground text-white"
                                            : "bg-white text-black"
                                    }
                                >
                                    Any
                                </option>
                                <option
                                    value="In House"
                                    className={
                                        theme === "dark"
                                            ? "bg-darkBackground text-white"
                                            : "bg-white text-black"
                                    }
                                >
                                    In House
                                </option>
                                <option
                                    value="Remote"
                                    className={
                                        theme === "dark"
                                            ? "bg-darkBackground text-white"
                                            : "bg-white text-black"
                                    }
                                >
                                    Remote
                                </option>
                                <option
                                    className={
                                        theme === "dark"
                                            ? "bg-darkBackground text-white"
                                            : "bg-white text-black"
                                    }
                                >
                                    Hybrid
                                </option>
                            </select>
                            <span className="absolute right-4 pointer-events-none">
                                <svg
                                    className={`${
                                        theme === "dark"
                                            ? "text-white"
                                            : "text-darkBackground"
                                    }`}
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
                        </div>
                    </fieldset>
                    {/* submit button */}
                    <button
                        type="submit"
                        className="h-11 w-full smallMobile:w-fit px-6 shrink-0 rounded-full bg-primary text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!form.dirty}
                    >
                        Apply
                    </button>

                    {/* <button
                        onClick={handleClearFilters}
                        className="h-11 w-11 shrink-0 rounded-full bg-primary text-white flex items-center justify-center"
                    >
                        <svg
                            width="21"
                            height="21"
                            viewBox="0 0 21 21"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M11.7338 10.5002L17.2463 4.99641C17.411 4.83165 17.5036 4.60818 17.5036 4.37516C17.5036 4.14215 17.411 3.91868 17.2463 3.75391C17.0815 3.58915 16.858 3.49658 16.625 3.49658C16.392 3.49658 16.1685 3.58915 16.0038 3.75391L10.5 9.26641L4.99626 3.75391C4.83149 3.58915 4.60802 3.49658 4.37501 3.49658C4.14199 3.49658 3.91852 3.58915 3.75376 3.75391C3.58899 3.91868 3.49643 4.14215 3.49643 4.37516C3.49643 4.60818 3.58899 4.83165 3.75376 4.99641L9.26626 10.5002L3.75376 16.0039C3.67175 16.0853 3.60665 16.182 3.56223 16.2887C3.51781 16.3953 3.49493 16.5097 3.49493 16.6252C3.49493 16.7407 3.51781 16.855 3.56223 16.9617C3.60665 17.0683 3.67175 17.1651 3.75376 17.2464C3.8351 17.3284 3.93188 17.3935 4.0385 17.4379C4.14513 17.4824 4.2595 17.5052 4.37501 17.5052C4.49052 17.5052 4.60489 17.4824 4.71151 17.4379C4.81814 17.3935 4.91491 17.3284 4.99626 17.2464L10.5 11.7339L16.0038 17.2464C16.0851 17.3284 16.1819 17.3935 16.2885 17.4379C16.3951 17.4824 16.5095 17.5052 16.625 17.5052C16.7405 17.5052 16.8549 17.4824 16.9615 17.4379C17.0681 17.3935 17.1649 17.3284 17.2463 17.2464C17.3283 17.1651 17.3934 17.0683 17.4378 16.9617C17.4822 16.855 17.5051 16.7407 17.5051 16.6252C17.5051 16.5097 17.4822 16.3953 17.4378 16.2887C17.3934 16.182 17.3283 16.0853 17.2463 16.0039L11.7338 10.5002Z"
                                fill="white"
                            />
                        </svg>
                    </button> */}
                </div>
            </div>
        </form>
    );
}
