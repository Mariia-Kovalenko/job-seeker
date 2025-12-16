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



export const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            email,
            jwt_token
        }
    }
`;

export const GOOGLE_LOGIN = gql`
    mutation Login($token: String!) {
        googleLogin(token: $token) {
            email,
            jwt_token
        }
    }
`;
export const GOOGLE_REGISTER = gql`
    mutation GoogleRegister($email: String!, $companyName: String!) {
        googleRegister(email: $email, companyName: $companyName) {
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