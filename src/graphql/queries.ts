import { gql } from "@apollo/client";

export const GET_JOBS = gql`
    query Jobs($search: String, $location: String, $workType: String, $categories: [String], $first: Int, $after: String) {
        jobs(search: $search, location: $location, workType: $workType, categories: $categories, first: $first, after: $after) {
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

export const GET_JOB = gql`
    query Job($id: ID!) {
        job(id: $id) {
            _id
            title
            description
        }
    }
`;


export const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            email,
            jwt_token
        }
    }
`;


export const CREATE_USER = gql`
    mutation CreateUser($email: String!, $password: String!) {
        createUser(email: $email, password: $password) {
            email, password
        }
    }
`;