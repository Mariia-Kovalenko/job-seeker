import { gql } from "@apollo/client";

export const ADD_JOB = gql`
  mutation AddJob(
    $title: String!,
    $shortDescription: String!,
    $description: String!,
    $company: String!,
    $location: String,
    $salaryRange: String,
    $stack: [String],
    $category: [String]!,
    $workType: String!
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
      shortDescription
      description
      company
      location
      salaryRange
      stack
      category
      workType
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_JOB = gql`
  mutation UpdateJob(
    $_id: ID!,
    $title: String,
    $shortDescription: String,
    $description: String,
    $company: String,
    $location: String,
    $salaryRange: String,
    $stack: [String],
    $category: [String],
    $workType: String
  ) {
    updateJob(
      _id: $_id,
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
      shortDescription
      description
      company
      location
      salaryRange
      stack
      category
      workType
      createdAt
      updatedAt
    }
  }
`;


export const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            email,
            companyName,
            jwt_token
        }
    }
`;

export const GOOGLE_LOGIN = gql`
    mutation Login($token: String!) {
        googleLogin(token: $token) {
            email,
            companyName,
            jwt_token
        }
    }
`;
export const GOOGLE_REGISTER = gql`
    mutation GoogleRegister($email: String!, $companyName: String!) {
        googleRegister(email: $email, companyName: $companyName) {
            email,
            companyName,
            jwt_token
        }
    }
`;


export const CREATE_USER = gql`
    mutation CreateUser($email: String!, $password: String!, $companyName: String!) {
        createUser(email: $email, password: $password, companyName: $companyName) {
            email, companyName,
        }
    }
`;

export const DELETE_JOB = gql`
  mutation DeleteJob($id: ID!) {
    deleteJob(id: $id) {
      _id
    }
  }
`;