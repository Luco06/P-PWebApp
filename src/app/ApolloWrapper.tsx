"use client"
import { HttpLink } from "@apollo/client";
import { ApolloNextAppProvider, ApolloClient, InMemoryCache, } from "@apollo/experimental-nextjs-app-support";
import dotenv from "dotenv"
import React from "react";

dotenv.config
function makeClient() {
    console.log(process.env.NEXT_PUBLIC_API_URL,"urlgraphql")
    let token = null;

    if (typeof window !== "undefined") {
        token = localStorage.getItem("authToken");
    }

    const httpLink = new HttpLink({
        uri: process.env.NEXT_PUBLIC_API_URL,
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
        },
    });

    return new ApolloClient({
        cache: new InMemoryCache(),
        link: httpLink,
    });
}

export function ApolloWrapper({children}: React.PropsWithChildren){
    return (
        <ApolloNextAppProvider makeClient={makeClient}>
            {children}
        </ApolloNextAppProvider>
    )
}