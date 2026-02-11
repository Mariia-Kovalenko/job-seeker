import React, { createContext, useContext } from "react";
import { Job } from "../utils/types";
import { useTheme } from "../context/ThemeContext";
import { daysAgo } from "../helpers";
import TimeIcon from "../icons/TimeIcon";
import TimeIconLight from "../icons/TimeIconLight";
import Avatar from "../common/Avatar";

/* ---------------- CONTEXT ---------------- */

type JobDetailsContextType = {
  job: Job;
  isInModal?: boolean;
};

const JobDetailsContext = createContext<JobDetailsContextType | null>(null);

function useJobDetails() {
  const ctx = useContext(JobDetailsContext);
  if (!ctx) throw new Error("JobDetails components must be used inside Root");
  return ctx;
}

/* ---------------- ROOT ---------------- */

type RootProps = {
  job: Job;
  isInModal?: boolean;
  children: React.ReactNode;
};

function Root({ job, isInModal, children }: RootProps) {
  const { theme } = useTheme();

  return (
    <JobDetailsContext.Provider value={{ job, isInModal }}>
      <div
        className={`job-details p-1 md:p-2 rounded-xl border ${
          theme === "dark"
            ? "bg-[#1E1E20] text-white border-lighterGrey/50"
            : "bg-[#f4f4f4] text-darkBackground border-gray-300"
        }`}
      >
        <div
          className={`flex flex-col rounded-xl gap-3 p-4 border ${
            theme === "dark"
              ? "bg-[rgba(255,255,255,0.05)] border-lighterGrey/50"
              : "bg-white border-gray-300"
          }`}
        >
          {children}
        </div>
      </div>
    </JobDetailsContext.Provider>
  );
}

/* ---------------- HEADER ---------------- */

function Header() {
  const { job, isInModal } = useJobDetails();
  const { theme } = useTheme();

  return (
    <div className={`${isInModal ? "mt-10" : ""} flex gap-4`}>
      <div className="flex-shrink-0">
        {job.company && <Avatar companyName={job.company} size="12" />}
      </div>

      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between w-full">
          <h2 className="text-lg font-bold">{job.title}</h2>

          <span className="hidden sm:flex gap-1 items-center opacity-80">
            {theme === "dark" ? <TimeIconLight /> : <TimeIcon />}
            {daysAgo(job.createdAt)}
          </span>
        </div>

        <div className="text-sm mt-1 opacity-75">
          {job.company} {job.location && `• ${job.location}`}
        </div>
      </div>
    </div>
  );
}

/* ---------------- CATEGORIES ---------------- */

function Categories() {
  const { job } = useJobDetails();

  if (!job.category?.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {job.category.map((cat) => (
        <span
          key={cat}
          className="text-[0.75rem] bg-[#f4f4f4] text-gray-600 border-gray-300 inline-block py-1 px-2 rounded-full font-medium border"
        >
          {cat}
        </span>
      ))}
    </div>
  );
}

/* ---------------- SALARY ---------------- */

function Salary() {
  const { job } = useJobDetails();

  if (!job.salaryRange && !job.workType) return null;

  return (
    <div className="flex gap-2 items-baseline w-full">
      {job.salaryRange && (
        <div className="text-md">
          <span className="text-lg md:text-xl font-bold text-primary">
            {job.salaryRange}
          </span>
          <span className="text-xs md:text-sm opacity-80">/month</span>
        </div>
      )}

      {job.salaryRange && job.workType && (
        <span className="text-gray-500">•</span>
      )}

      {job.workType && (
        <div className="text-sm opacity-75 capitalize">{job.workType}</div>
      )}
    </div>
  );
}

/* ---------------- MOBILE DATE ---------------- */

function MobileDate() {
  const { job } = useJobDetails();
  const { theme } = useTheme();

  return (
    <span className="sm:hidden text-xs flex gap-1 items-center opacity-80">
      {theme === "dark" ? <TimeIconLight /> : <TimeIcon />}
      {daysAgo(job.createdAt)}
    </span>
  );
}

/* ---------------- DIVIDER ---------------- */

function Divider() {
  return <div className="w-full h-[1px] bg-gray-300 my-2" />;
}

/* ---------------- SHORT DESCRIPTION ---------------- */

function ShortDescription() {
  const { job } = useJobDetails();
  if (!job.shortDescription) return null;

  return (
    <div>
      <h3 className="text-md font-bold">About the job</h3>
      <p className="text-sm mt-1 opacity-75">{job.shortDescription}</p>
    </div>
  );
}

/* ---------------- STACK ---------------- */

function Stack() {
  const { job } = useJobDetails();
  if (!job.stack?.length) return null;

  return (
    <div>
      <h3 className="text-md font-bold">Stack</h3>
      <p className="text-sm mt-1 opacity-75">{job.stack.join(", ")}</p>
    </div>
  );
}

/* ---------------- FULL DESCRIPTION ---------------- */

function FullDescription() {
  const { job } = useJobDetails();
  if (!job.description) return null;

  return (
    <div>
      <h3 className="text-md font-bold">Full Description</h3>
      <div
        className="text-sm mt-1 opacity-75"
        dangerouslySetInnerHTML={{ __html: job.description }}
      />
    </div>
  );
}

/* ---------------- PREBUILT VARIANTS ---------------- */

function Card({ job }: { job: Job }) {
  return (
    <Root job={job}>
      <Header />
      <Categories />
      <Salary />
      <MobileDate />
      <Divider />
      <ShortDescription />
      <Stack />
      <FullDescription />
    </Root>
  );
}

function Modal({ job }: { job: Job }) {
  return (
    <Root job={job} isInModal>
      <Header />
      <Categories />
      <Salary />
      <MobileDate />
      <Divider />
      <ShortDescription />
      <Stack />
      <FullDescription />
    </Root>
  );
}

/* ---------------- EXPORT ---------------- */

export const JobDetails = {
  Root,
  Header,
  Categories,
  Salary,
  Divider,
  ShortDescription,
  Stack,
  FullDescription,
  MobileDate,
  Card,
  Modal,
};
