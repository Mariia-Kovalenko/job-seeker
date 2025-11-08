type Job = {
    id: string;
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
      }[];
    };
  }

export type { Job, JobsData };