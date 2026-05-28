import { Helmet } from 'react-helmet-async';
import { OG_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from '../data/site';

interface SEOProps {
  title?: string;
  description?: string;
  /** Absolute canonical URL for this page. Omit for pages that should not be canonicalised (e.g. 404). */
  canonical?: string;
  /** Override OG image. Defaults to site-wide OG image. */
  ogImage?: string;
  /** Set to true for pages that must not be indexed (e.g. 404). */
  noIndex?: boolean;
}

const SEO = ({
  title = SITE_TITLE,
  description = SITE_DESCRIPTION,
  canonical,
  ogImage = OG_IMAGE,
  noIndex = false,
}: SEOProps) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: SITE_NAME,
        url: SITE_URL,
        jobTitle: 'Associate Full Stack Developer',
        description: SITE_DESCRIPTION,
        sameAs: [
          'https://github.com/geethanga12',
          'https://www.linkedin.com/in/geethanga-dissanayake/',
        ],
        worksFor: {
          '@type': 'Organization',
          name: 'Ultimate Digital Solutions (Pvt) Ltd',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        author: { '@id': `${SITE_URL}/#person` },
      },
    ],
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      {canonical && <link rel="canonical" href={canonical} />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  );
};

export default SEO;
