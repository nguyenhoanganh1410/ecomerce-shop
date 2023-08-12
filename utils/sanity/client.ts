import { createClient } from "next-sanity";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.NEXT_PUBLIC_SANITY_USER_ADDER_TOKEN,
  apiVersion: '2023-03-03',
  useCdn: true,
});

export const sanityClientNoCaching = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.NEXT_PUBLIC_SANITY_USER_ADDER_TOKEN,
  apiVersion: '2023-03-03',
  useCdn: false,
});