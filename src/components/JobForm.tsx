import React, { useState } from "react";
import { useFormik } from "formik";
import Button from '../common/Button';
import { useMutation } from "@apollo/client/react";
import { ADD_JOB } from "../graphql/mutations";
import { useTheme } from "../context/ThemeContext";

const JobForm: React.FC = () => {
    const { theme } = useTheme();
    const [addJob, { loading }] = useMutation(ADD_JOB);

    const formik = useFormik({
        initialValues: {
            title: "",
            shortDescription: "",
            description: "",
            company: "",
            location: "",
            salaryRange: "",
            stack: [] as string[],
            category: [] as string[],
            workType: ""
        },
        onSubmit: async (values) => {
            try {
                await addJob({ variables: values });
                alert("Job added successfully!");
            } catch (error) {
                console.error("Error adding job:", error);
            }
        },
    });

    const [stackInput, setStackInput] = useState("");
    const [categoryInput, setCategoryInput] = useState("");

    const handleAddStack = () => {
        if (stackInput && !formik.values.stack.includes(stackInput) && formik.values.stack.length < 10) {
            formik.setFieldValue("stack", [...formik.values.stack, stackInput]);
            setStackInput("");
        }
    };

    const handleRemoveStack = (item: string) => {
        formik.setFieldValue("stack", formik.values.stack.filter((i) => i !== item));
    };

    const handleAddCategory = () => {
        if (categoryInput && !formik.values.category.includes(categoryInput) && formik.values.category.length < 3) {
            formik.setFieldValue("category", [...formik.values.category, categoryInput]);
            setCategoryInput("");
        }
    };

    const handleRemoveCategory = (item: string) => {
        formik.setFieldValue("category", formik.values.category.filter((i) => i !== item));
    };

    return (
        <div className="mx-auto px-4 py-6 max-w-2xl">
            <h1 className="text-3xl font-bold mb-4">Add Job</h1>
            <p className={`text-md font-medium ${theme == "dark" ? "text-white" : "text-gray-500"} mb-2`}>Create a new job listing by filling out the details below.</p>
            <div className={`text-sm ${theme == "dark" ? "text-white" : "text-gray-500"} mb-10`}>Ensure all required fields are filled out accurately.</div>
            <form onSubmit={formik.handleSubmit} className="md:grid md:grid-cols-2 md:gap-6 flex flex-col gap-6 items-start">
                <fieldset className="w-full flex flex-col gap-2 items-start">
                    <label className="text-sm font-semibold" htmlFor="title">Title *</label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.title}
                        required
                        className={`w-full p-2 bg-transparent border-[1.3px] rounded-lg h-12 ${
                            formik.touched.title &&
                            formik.errors.title
                                ? "border-red-600"
                                : theme == "dark"
                                ? "text-white bg-lightGrey border-gray-300"
                                : "text-darkBackground bg-white border-lighterGrey"
                        }`}
                    />
                </fieldset>

                <fieldset className="w-full flex flex-col gap-2 items-start">
                    <label className="text-sm font-semibold" htmlFor="company">Company *</label>
                    <input
                        id="company"
                        name="company"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.company}
                        required
                        className={`w-full p-2 bg-transparent border-[1.3px] rounded-lg h-12 ${
                            formik.touched.company &&
                            formik.errors.company
                                ? "border-red-600"
                                : theme == "dark"
                                ? "text-white bg-lightGrey border-gray-300"
                                : "text-darkBackground bg-white border-lighterGrey"
                        }`}
                    />
                </fieldset>

                <fieldset className="w-full flex flex-col gap-2 items-start col-span-2">
                    <label className="text-sm font-semibold" htmlFor="description">Description *</label>
                    <textarea
                        id="description"
                        name="description"
                        onChange={formik.handleChange}
                        value={formik.values.description}
                        required
                        className={`w-full p-2 bg-transparent border-[1.3px] rounded-lg h-48 resize-none ${
                            formik.touched.description &&
                            formik.errors.description
                                ? "border-red-600"
                                : theme == "dark"
                                ? "text-white bg-lightGrey border-gray-300"
                                : "text-darkBackground bg-white border-lighterGrey"
                        }`}
                    ></textarea>
                </fieldset>

                <fieldset className="w-full flex flex-col gap-2 items-start">
                    <label className="text-sm font-semibold" htmlFor="category">Category *</label>
                    <div className="flex items-center w-full">
                        <input
                            id="categoryInput"
                            type="text"
                            value={categoryInput}
                            onChange={(e) => setCategoryInput(e.target.value)}
                            className={`w-full p-2 bg-transparent border-[1.3px] rounded-l-lg h-12 ${
                                theme == "dark"
                                ? "text-white bg-lightGrey border-gray-300"
                                : "text-darkBackground bg-white border-lighterGrey"
                            }`}
                            style={{ borderRight: "none" }}
                        />
                        <button
                            type="button"
                            onClick={handleAddCategory}
                            className={`py-2 px-4 rounded-r-lg h-12 border-[1.3px] ${
                                theme == "dark"
                                ? "text-white bg-lightGrey border-gray-300"
                                : "text-darkBackground bg-lightGrey/5 border-lighterGrey"
                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                            disabled={formik.values.category.length >= 3}
                        >Add</button>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        {formik.values.category.map((item) => (
                            <span key={item} className={`bg-gray-200 rounded-full px-3 py-1 text-sm flex items-center gap-2 ${
                                theme == "dark" ? "text-black" : "text-darkBackground"
                            }`}>
                                {item}
                                <button type="button" onClick={() => handleRemoveCategory(item)} className="text-black">✕</button>
                            </span>
                        ))}
                    </div>
                </fieldset>

                <fieldset className="w-full flex flex-col gap-2 items-start">
                    <label className="text-sm font-semibold" htmlFor="workType">Work Type *</label>
                    <input
                        id="workType"
                        name="workType"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.workType}
                        required
                        className={`w-full p-2 bg-transparent border-[1.3px] rounded-lg h-12 ${
                            formik.touched.workType &&
                            formik.errors.workType
                                ? "border-red-600"
                                : theme == "dark"
                                ? "text-white bg-lightGrey border-gray-300"
                                : "text-darkBackground bg-white border-lighterGrey"
                        }`}
                    />
                </fieldset>

                <fieldset className="w-full flex flex-col gap-2 items-start">
                    <label className="text-sm font-semibold" htmlFor="shortDescription">Short Description</label>
                    <input
                        id="shortDescription"
                        name="shortDescription"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.shortDescription}
                        className={`w-full p-2 bg-transparent border-[1.3px] rounded-lg h-12 ${
                            formik.touched.shortDescription &&
                            formik.errors.shortDescription
                                ? "border-red-600"
                                : theme == "dark"
                                ? "text-white bg-lightGrey border-gray-300"
                                : "text-darkBackground bg-white border-lighterGrey"
                        }`}
                    />
                </fieldset>

                <fieldset className="w-full flex flex-col gap-2 items-start">
                    <label className="text-sm font-semibold" htmlFor="location">Location</label>
                    <input
                        id="location"
                        name="location"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.location}
                        className={`w-full p-2 bg-transparent border-[1.3px] rounded-lg h-12 ${
                            formik.touched.location &&
                            formik.errors.location
                                ? "border-red-600"
                                : theme == "dark"
                                ? "text-white bg-lightGrey border-gray-300"
                                : "text-darkBackground bg-white border-lighterGrey"
                        }`}
                    />
                </fieldset>

                <fieldset className="w-full flex flex-col gap-2 items-start">
                    <label className="text-sm font-semibold" htmlFor="salaryRange">Salary Range</label>
                    <input
                        id="salaryRange"
                        name="salaryRange"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.salaryRange}
                        className={`w-full p-2 bg-transparent border-[1.3px] rounded-lg h-12 ${
                            formik.touched.salaryRange &&
                            formik.errors.salaryRange
                                ? "border-red-600"
                                : theme == "dark"
                                ? "text-white bg-lightGrey border-gray-300"
                                : "text-darkBackground bg-white border-lighterGrey"
                        }`}
                    />
                </fieldset>

                <fieldset className="w-full flex flex-col gap-2 items-start">
                    <label className="text-sm font-semibold" htmlFor="stack">Stack</label>
                    <div className="flex items-center w-full">
                        <input
                            id="stackInput"
                            type="text"
                            value={stackInput}
                            onChange={(e) => setStackInput(e.target.value)}
                            className={`w-full p-2 bg-transparent border-[1.3px] rounded-l-lg h-12 ${
                                theme == "dark"
                                ? "text-white bg-lightGrey border-gray-300"
                                : "text-darkBackground bg-white border-lighterGrey"
                            }`}
                            style={{ borderRight: "none" }}
                        />
                        <button
                            type="button"
                            onClick={handleAddStack}
                            className={`py-2 px-4 rounded-r-lg h-12 border-[1.3px] ${
                                theme == "dark"
                                ? "text-white bg-lightGrey border-gray-300"
                                : "text-darkBackground bg-lightGrey/5 border-lighterGrey"
                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                            disabled={formik.values.stack.length >= 10}
                        >Add</button>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        {formik.values.stack.map((item) => (
                            <span key={item} className={`bg-gray-200 rounded-full px-3 py-1 text-sm flex items-center gap-2 ${
                                theme == "dark" ? "text-black" : "text-darkBackground"
                            }`}>
                                {item}
                                <button type="button" onClick={() => handleRemoveStack(item)} className="text-black">✕</button>
                            </span>
                        ))}
                    </div>
                </fieldset>

                <Button type="submit" loading={loading} fullWidthDesktop fullWidthMobile className="col-span-2">Submit</Button>
            </form>
        </div>
    );
};

export default JobForm;
