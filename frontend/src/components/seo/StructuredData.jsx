import React from "react";
import { Helmet } from "react-helmet";

export default function StructuredData({ type, data }) {
  const generateSchema = () => {
    const baseUrl = "https://travel.urbansmart34.co.za";
    
    switch (type) {
      case "Person":
        return {
          "@context": "https://schema.org",
          "@type": "Person",
          name: data.name,
          description: data.description,
          url: `${baseUrl}/travel/founders/${data.slug}`,
          image: data.image,
          jobTitle: "Travel Founder",
          worksFor: {
            "@type": "Organization",
            name: "Travel by UrbanSmart-34"
          },
          memberOf: {
            "@type": "Organization",
            name: "Travel Founder Network"
          }
        };

      case "LocalBusiness":
        return {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: data.name,
          description: data.description,
          url: `${baseUrl}/travel/routes/${data.slug}`,
          address: {
            "@type": "PostalAddress",
            addressLocality: data.origin,
            addressRegion: data.region || "South Africa"
          },
          geo: data.coordinates ? {
            "@type": "GeoCoordinates",
            latitude: data.coordinates.lat,
            longitude: data.coordinates.lng
          } : undefined,
          priceRange: data.priceRange || "R50-R500"
        };

      case "Offer":
        return {
          "@context": "https://schema.org",
          "@type": "Offer",
          name: data.name,
          description: data.description,
          url: `${baseUrl}/travel/routes/${data.slug}`,
          price: data.price,
          priceCurrency: "ZAR",
          availability: "https://schema.org/InStock",
          seller: {
            "@type": "Organization",
            name: "Travel by UrbanSmart-34"
          }
        };

      case "Organization":
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Travel by UrbanSmart-34",
          url: baseUrl,
          logo: `${baseUrl}/images/logo.png`,
          description: "Community-driven ridesharing platform across South Africa",
          foundingDate: "2024",
          founders: data.founders || []
        };

      default:
        return null;
    }
  };

  const schema = generateSchema();

  if (!schema) return null;

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}