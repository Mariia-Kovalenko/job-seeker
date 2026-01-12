type Job = {
    _id: string;
    name: string;
    description: string;
    location: string;
    salaryRange: string;
    shortDescription: string;
    stack: string[];
    title: string;
    createdAt: string;
    workType: string | null;
    category: string[];
    company: string;
};

type JobsData = {
    jobs: {
        edges: {
            node: Job;
            cursor: string;
        }[];
        pageInfo: {
            hasNextPage: boolean;
            endCursor: string;
        };
    };
}
type UserJobsData = {
    jobsByUser: {
        edges: {
            node: Job;
            cursor: string;
        }[];
        pageInfo: {
            hasNextPage: boolean;
            endCursor: string;
        };
    };
}

type User = {
    email: string;
    token?: string;
    company?: string;
}

export type { Job, JobsData, User, UserJobsData };