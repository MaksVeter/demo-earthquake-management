import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  env:{
    GRAPHQL_SERVER_URL: process.env.GRAPHQL_SERVER_URL || "http://localhost:5050/graphql",
  }
};

export default nextConfig;
