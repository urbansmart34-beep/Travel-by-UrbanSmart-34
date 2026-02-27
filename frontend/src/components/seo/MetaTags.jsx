import React from "react";
import { Helmet } from "react-helmet";

export default function MetaTags({ 
  title, 
  description, 
  canonical, 
  image,
  type = "website",
  author,
  keywords
}) {
  const baseUrl = "https://travel.urbansmart34.co.za";
  const fullTitle = title ? `${title} | Travel by UrbanSmart-34` : "Travel by UrbanSmart-34 - Ridesharing Platform";
  const fullDescription = description || "Affordable ridesharing across South Africa. Connect with verified drivers and founders.";
  const fullImage = image || "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69793aa8b086913e8a1ee223/96e6ee55b_ChatGPTImageJan29202602_48_52AM.png";
  const fullCanonical = canonical ? `${baseUrl}${canonical}` : baseUrl;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={fullDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      {author && <meta name="author" content={author} />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonical} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={fullImage} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullCanonical} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={fullDescription} />
      <meta property="twitter:image" content={fullImage} />
    </Helmet>
  );
}