import { Helmet } from 'react-helmet-async';
import { OG_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from '../data/site';

interface SEOProps {
  title?: string;
  description?: string;
}

const SEO = ({ title = SITE_TITLE, description = SITE_DESCRIPTION }: SEOProps) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_NAME,
    url: SITE_URL,
    jobTitle: 'Software Engineer',
    sameAs: [
      'https://github.com/geethanga12',
      'https://www.linkedin.com/in/geethanga-dissanayake/',
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Ultimate Digital Solutions (Pvt) Ltd',
    },
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={SITE_URL} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={SITE_URL} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={OG_IMAGE} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />

      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  );
};

export default SEO;
