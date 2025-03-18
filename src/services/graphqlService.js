import { gql } from "@apollo/client";

export const SEARCH_BY_NAME = gql`
  query SearchByName($name: String!) {
    searchByName(name: $name) {
      id
      name
      dateLost
      description
      location
    }
  }
`;

export const SEARCH_BY_DATE = gql`
  query SearchByDate($dateLost: String!) {
    searchByDate(dateLost: $dateLost) {
      id
      name
      dateLost
      description
      location
    }
  }
`;

export const SEARCH_BY_LOCATION = gql`
  query SearchByLocation($location: String!) {
    searchByLocation(location: $location) {
      id
      name
      dateLost
      description
      location
    }
  }
`;

export const SEARCH_BY_DESCRIPTION = gql`
  query SearchByDescription($description: String!) {
    searchByDescription(description: $description) {
      id
      name
      dateLost
      description
      location
    }
  }
`;
