import { gql } from "@apollo/client";

export const GET_JOBS = gql`
    query Jobs($first: Int, $after: String) {
        jobs(first: $first, after: $after) {
            edges {
                node {
                    _id
                    company
                    createdAt
                    description
                    location
                    salaryRange
                    shortDescription
                    stack
                    title
                    updatedAt
                    workType
                    category
                }
                cursor
            }
            pageInfo {
                endCursor
                hasNextPage
            }
        }
    }
`;