import React from "react";
import ReactDOM from "react-dom/client"; // Correct import for React 18
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import App from "./App";

const client = new ApolloClient({
  uri: "http://localhost:8094/graphql", // Correct GraphQL API URL
  cache: new InMemoryCache(),
});


// Create root and render the app
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
