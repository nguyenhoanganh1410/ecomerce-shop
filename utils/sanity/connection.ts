import { createClient } from "next-sanity";

export const sanityClientValue = createClient({
  projectId: "qh2wu8cw",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token:
    "skX1vGMVYe2d51xzXVwKd9Vh7n3EL0VC8MrfTvUI8e3yMZ48qodXQniEuXSlmRUmCBlDa3XqODXVVQ32wQbi9t4kLJPDC4OgOIq8BwMh1AWokNSbx1S0jjJ6iFK2newuNJ2bJ0DfiMb5WvY9BarUSxEb8zCH4iZYZ9wdb6QNYPYDqqlpUjSc",
  apiVersion: "2023-03-03",
  useCdn: true,
});

export const sanityClientValueNoCaching = createClient({
  projectId: "qh2wu8cw",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token:
    "skX1vGMVYe2d51xzXVwKd9Vh7n3EL0VC8MrfTvUI8e3yMZ48qodXQniEuXSlmRUmCBlDa3XqODXVVQ32wQbi9t4kLJPDC4OgOIq8BwMh1AWokNSbx1S0jjJ6iFK2newuNJ2bJ0DfiMb5WvY9BarUSxEb8zCH4iZYZ9wdb6QNYPYDqqlpUjSc",
  apiVersion: "2023-03-03",
  useCdn: false,
});