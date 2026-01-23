import React, { useState } from "react";
import { useFormik } from "formik";
import Button from '../common/Button';
import { useMutation } from "@apollo/client/react";
import { ADD_JOB, UPDATE_JOB } from "../graphql/mutations";
import { useTheme } from "../context/ThemeContext";
import { SUGGESTED_CATEGORIES } from "../utils/constants";
import { useUserStore } from "../store/userStore";
import { Job } from "../utils/types";
import RichTextInput from "../common/RichTextInput";
import DOMPurify from "dompurify";

type JobFormProps = {
    setAddJobModalOpen?: (open: boolean) => void;
    modalMode: "add" | "edit";
    setModalMode: (mode: "add" | "edit") => void;
    job?: Job | null;
    onSuccess: () => void;
};
function JobForm({ modalMode, setModalMode, job, onSuccess }: JobFormProps) {
    const { theme } = useTheme();
    const [ postNewJob, { loading }] = useMutation(ADD_JOB);
    const [ updateJob, { loading: updateLoading }] = useMutation(UPDATE_JOB);

    const user = useUserStore((state) => state.user);

    const formik = useFormik({
        initialValues: {
            title: job?.title || "",
            shortDescription: job?.shortDescription || "",
            description: job?.description || "",
            company: job?.company || "",
            location: job?.location || "",
            salaryRange: job?.salaryRange || "",
            stack: job?.stack || [] as string[],
            category: job?.category || [] as string[],
            workType: job?.workType || ""
        },
        onSubmit: async (values) => {
 
            const sanitizedDescription = DOMPurify.sanitize(values.description);

            const variables = {
                ...values,
                description: sanitizedDescription,
                workType: values.workType.toLowerCase()
            };

            try {
                if (modalMode === "edit") {
                    const updateVariables = {
                        ...variables,
                        _id: job?._id
                    };
                    await updateJob({ variables: updateVariables, context: { headers: { Authorization: `Bearer ${user?.token}` } } });
                } else {
                    await postNewJob({ variables, context: { headers: { Authorization: `Bearer ${user?.token}` } } });
                }
                
                onSuccess();
            } catch (err) {
                console.error("Mutation error:", err);
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

    const handleAddCategory = (value?: string) => {
        const categoryToAdd = value || categoryInput;
        if (categoryToAdd && !formik.values.category.includes(categoryToAdd) && formik.values.category.length < 3) {
            formik.setFieldValue("category", [...formik.values.category, categoryToAdd]);
            if (!value) setCategoryInput("");
        }
    };

    const handleRemoveCategory = (item: string) => {
        formik.setFieldValue("category", formik.values.category.filter((i) => i !== item));
    };

    const handleDescriptionChange = (value: string) => {
        console.log('value', value);
        formik.setFieldValue("description", value);
    }

    return (
        <div className="relative">
            {/* <div className={`sticky top-0 ${theme === "dark" ? "bg-lightGrey" : "bg-white"} z-10 pt-4 pb-2`}>
                <h1 className="text-2xl font-bold mb-4 text-primary">
                    {modalMode === "edit" ? "Update Job" : "Add Job"}
                </h1>
            </div> */}

            <p className={`text-md font-medium ${theme === "dark" ? "text-white" : "text-gray-500"} mb-2`}>Create a new job listing by filling out the details below.</p>
                <div className={`text-sm ${theme === "dark" ? "text-white" : "text-gray-500"} mb-10`}>Ensure all required fields are filled out accurately.</div>

            <form onSubmit={formik.handleSubmit} className={`md:grid md:grid-cols-2 md:gap-6 flex flex-col gap-6 items-start mb-8`}>
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
                                : theme === "dark"
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
                                : theme === "dark"
                                ? "text-white bg-lightGrey border-gray-300"
                                : "text-darkBackground bg-white border-lighterGrey"
                        }`}
                    />
                </fieldset>

                <fieldset className="w-full flex flex-col gap-2 items-start col-span-2">
                    <label className="text-sm font-semibold" htmlFor="shortDescription">Short Description *</label>
                    <textarea
                        id="shortDescription"
                        name="shortDescription"
                        onChange={formik.handleChange}
                        value={formik.values.shortDescription}
                        required
                        className={`w-full p-2 bg-transparent border-[1.3px] rounded-lg h-24 resize-none ${
                            formik.touched.shortDescription &&
                            formik.errors.shortDescription
                                ? "border-red-600"
                                : theme === "dark"
                                ? "text-white bg-lightGrey border-gray-300"
                                : "text-darkBackground bg-white border-lighterGrey"
                        }`}
                    ></textarea>
                </fieldset>

                <fieldset className="w-full flex flex-col gap-2 items-start col-span-2">
                    <label className="text-sm font-semibold" htmlFor="description">Description *</label>
                    {/* <textarea
                        id="description"
                        name="description"
                        onChange={formik.handleChange}
                        value={formik.values.description}
                        required
                        className={`w-full p-2 bg-transparent border-[1.3px] rounded-lg h-48 resize-none ${
                            formik.touched.description &&
                            formik.errors.description
                                ? "border-red-600"
                                : theme === "dark"
                                ? "text-white bg-lightGrey border-gray-300"
                                : "text-darkBackground bg-white border-lighterGrey"
                        }`}
                    ></textarea> */}

                    <RichTextInput
                        onChange={(value) => handleDescriptionChange(value)}
                        value={formik.values.description}
                     />
                </fieldset>

                <fieldset className="w-full flex flex-col gap-2 items-start col-span-2">
                    <label className="text-sm font-semibold" htmlFor="category">Category *</label>
                    <div className="flex items-center w-full">
                        <input
                            id="categoryInput"
                            type="text"
                            value={categoryInput}
                            onChange={(e) => setCategoryInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleAddCategory();
                                }
                            }}
                            className={`w-full p-2 bg-transparent border-[1.3px] rounded-l-lg h-12 ${
                                theme === "dark"
                                ? "text-white bg-lightGrey border-gray-300"
                                : "text-darkBackground bg-white border-lighterGrey"
                            }`}
                            style={{ borderRight: "none" }}
                        />
                        <button
                            type="button"
                            onClick={() => handleAddCategory()}
                            className={`py-2 px-4 rounded-r-lg h-12 border-[1.3px] ${
                                theme === "dark"
                                ? "text-white bg-lightGrey border-gray-300"
                                : "text-darkBackground bg-lightGrey/5 border-lighterGrey"
                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                            disabled={formik.values.category.length >= 3}
                        >Add</button>
                    </div>
                    
                    {/* Suggestion pills */}
                    <div className="flex flex-wrap gap-2 mt-1">
                        <span className="text-[10px] uppercase font-bold opacity-50 w-full mb-1">Suggestions:</span>
                        {SUGGESTED_CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => handleAddCategory(cat)}
                                disabled={formik.values.category.includes(cat) || formik.values.category.length >= 3}
                                className={`text-[11px] px-2 py-0.5 rounded-full border transition-all ${
                                    theme === 'dark' 
                                    ? 'border-white/20 text-white/60 hover:bg-white/10 disabled:opacity-20' 
                                    : 'border-black/10 text-black/60 hover:bg-black/5 disabled:opacity-20'
                                }`}
                            >
                                + {cat}
                            </button>
                        ))}
                    </div>

                    <div className="flex gap-2 flex-wrap mt-2">
                        {formik.values.category.map((item) => (
                            <span key={item} className={`bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-1 text-sm flex items-center gap-2 font-medium`}>
                                {item}
                                <button type="button" onClick={() => handleRemoveCategory(item)} className="hover:text-red-500 transition-colors">✕</button>
                            </span>
                        ))}
                    </div>
                </fieldset>

                <fieldset className="w-full flex flex-col gap-2 items-start">
                    <label className="text-sm font-semibold" htmlFor="workType">Work Type *</label>
                    <div className="relative w-full">
                        <select
                            id="workType"
                            name="workType"
                            onChange={formik.handleChange}
                            value={formik.values.workType}
                            required
                            className={`w-full p-2 bg-transparent border-[1.3px] rounded-lg h-12 appearance-none ${
                                formik.touched.workType && formik.errors.workType
                                    ? "border-red-600"
                                    : theme === "dark"
                                    ? "text-white bg-lightGrey border-gray-300"
                                    : "text-darkBackground bg-white border-lighterGrey"
                            }`}
                        >
                            <option value="" disabled className={theme === "dark" ? "bg-lightGrey text-gray-400" : "bg-white text-gray-400"}>Select work type</option>
                            <option value="In House" className={theme === "dark" ? "bg-lightGrey text-white" : "bg-white text-darkBackground"}>In House</option>
                            <option value="Remote" className={theme === "dark" ? "bg-lightGrey text-white" : "bg-white text-darkBackground"}>Remote</option>
                            <option value="Hybrid" className={theme === "dark" ? "bg-lightGrey text-white" : "bg-white text-darkBackground"}>Hybrid</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                            <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                    </div>
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
                                : theme === "dark"
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
                                : theme === "dark"
                                ? "text-white bg-lightGrey border-gray-300"
                                : "text-darkBackground bg-white border-lighterGrey"
                        }`}
                    />
                </fieldset>

                <fieldset className="w-full flex flex-col gap-2 items-start col-span-2">
                    <label className="text-sm font-semibold" htmlFor="stack">Stack</label>
                    <div className="flex items-center w-full">
                        <input
                            id="stackInput"
                            type="text"
                            value={stackInput}
                            onChange={(e) => setStackInput(e.target.value)}
                            className={`w-full p-2 bg-transparent border-[1.3px] rounded-l-lg h-12 ${
                                theme === "dark"
                                ? "text-white bg-lightGrey border-gray-300"
                                : "text-darkBackground bg-white border-lighterGrey"
                            }`}
                            style={{ borderRight: "none" }}
                        />
                        <button
                            type="button"
                            onClick={handleAddStack}
                            className={`py-2 px-4 rounded-r-lg h-12 border-[1.3px] ${
                                theme === "dark"
                                ? "text-white bg-lightGrey border-gray-300"
                                : "text-darkBackground bg-lightGrey/5 border-lighterGrey"
                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                            disabled={formik.values.stack.length >= 10}
                        >Add</button>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        {formik.values.stack.map((item) => (
                            <span key={item} className={`bg-gray-200 rounded-full px-3 py-1 text-sm flex items-center gap-2 ${
                                theme === "dark" ? "text-black" : "text-darkBackground"
                            }`}>
                                {item}
                                <button type="button" onClick={() => handleRemoveStack(item)} className="text-black">✕</button>
                            </span>
                        ))}
                    </div>
                </fieldset>

                <Button type="submit" loading={modalMode === "edit" ? updateLoading : loading} fullWidthDesktop fullWidthMobile className="col-span-2">
                    {modalMode === "edit" ? "Update Job" : "Submit"}
                </Button>
            </form>
        </div>
    );
};

export default JobForm;
