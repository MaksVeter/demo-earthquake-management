// components/ApolloProviderWrapper.tsx
"use client"

import { ApolloProvider } from '@apollo/client';
import client from '@/lib/apolloClient';
import React, {ReactNode} from "react";

interface ApolloProviderWrapperProps {
    children: ReactNode;
}
const ApolloProviderWrapper: React.FC<ApolloProviderWrapperProps> = ({ children }) => {
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloProviderWrapper;
