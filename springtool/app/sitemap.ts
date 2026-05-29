import type { MetadataRoute } from "next";

const baseUrl = "https://springtool-abc.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          ko: `${baseUrl}/ko`,
          zh: `${baseUrl}/zh`,
          ja: `${baseUrl}/ja`,
        },
      },
    },
    {
      url: `${baseUrl}/ko`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          ko: `${baseUrl}/ko`,
          zh: `${baseUrl}/zh`,
          ja: `${baseUrl}/ja`,
        },
      },
    },
    {
      url: `${baseUrl}/zh`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          ko: `${baseUrl}/ko`,
          zh: `${baseUrl}/zh`,
          ja: `${baseUrl}/ja`,
        },
      },
    },
    {
      url: `${baseUrl}/ja`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          ko: `${baseUrl}/ko`,
          zh: `${baseUrl}/zh`,
          ja: `${baseUrl}/ja`,
        },
      },
    },
  ];
}