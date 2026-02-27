import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ChevronRight, Home } from "lucide-react";
import { Helmet } from "react-helmet";

export default function Breadcrumbs({ items }) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `https://travel.urbansmart34.co.za${item.url}`
    }))
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>
      
      <nav className="flex items-center space-x-2 text-sm text-slate-600 mb-6">
        <Link to={createPageUrl('Home')} className="hover:text-blue-600 flex items-center">
          <Home className="w-4 h-4" />
        </Link>
        
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <ChevronRight className="w-4 h-4" />
            {index === items.length - 1 ? (
              <span className="text-slate-900 font-medium">{item.label}</span>
            ) : (
              <Link to={item.url} className="hover:text-blue-600">
                {item.label}
              </Link>
            )}
          </React.Fragment>
        ))}
      </nav>
    </>
  );
}