import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
}

export default function SEOHead({ 
  title = 'SUMILAND & SUB STUDIO | Creative Design Agency',
  description = 'Award-winning design studio delivering stunning designs, SEO-optimized websites, and comprehensive branding solutions that drive real business growth.',
  image = 'https://jaytpfztifhtzcruxguj.supabase.co/storage/v1/object/public/Sumiland%20Design//SUMIL&SUB%20STUDIO%20LOGO.png',
  type = 'website'
}: SEOProps) {
  const location = useLocation();
  const canonicalUrl = `https://sumiland.studio${location.pathname}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  );
}