import { gql } from "@apollo/client";

export const ADD_JOB = gql`
  mutation AddJob(
    $title: String!,
    $shortDescription: String,
    $description: String!,
    $company: String!,
    $location: String,
    $salaryRange: String,
    $stack: [String],
    $category: [String]!,
    $workType: String
  ) {
    addJob(
      title: $title,
      shortDescription: $shortDescription,
      description: $description,
      company: $company,
      location: $location,
      salaryRange: $salaryRange,
      stack: $stack,
      category: $category,
      workType: $workType
    ) {
      _id
      title
      description
    }
  }
`;
