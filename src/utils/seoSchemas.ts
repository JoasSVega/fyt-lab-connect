/**
 * Schemas JSON-LD para Google Rich Snippets
 * Estos ayudan a Google a entender el contenido de tu sitio
 */

export const baseUrl = 'https://fyt-research.org';
export const logoUrl = `${baseUrl}/logo-fyt.png`;

/**
 * Schema Organization: Identifica quién eres como grupo
 * Se usa principalmente en la página Home
 */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Grupo de Investigación Farmacología y Terapéutica',
    alternateName: ['Grupo FyT', 'FyT'],
    url: baseUrl,
    logo: logoUrl,
    description:
      'Grupo de Investigación especializado en Farmacología y Terapéutica. Desarrollamos herramientas científicas, investigación rigurosa e impacto en la salud.',
    sameAs: [
      'https://www.facebook.com/grupofyt',
      'https://twitter.com/grupofyt',
      'https://www.linkedin.com/company/grupo-fyt',
      'https://www.instagram.com/grupo_fyt',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'farmacologiayterapeutica.gi@gmail.com',
    },
    foundingDate: '2009', // Ajusta según tu fundación
  };
}

/**
 * Schema Person: Define un investigador o miembro del equipo
 * Se usa en páginas de perfil de investigadores
 */
export function getPersonSchema(personData: {
  name: string;
  jobTitle: string;
  description?: string;
  image?: string;
  affiliation?: string;
  url?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personData.name,
    jobTitle: personData.jobTitle,
    description: personData.description || `${personData.jobTitle} en ${personData.affiliation || 'Grupo FyT'}`,
    image: personData.image,
    affiliation: {
      '@type': 'Organization',
      name: personData.affiliation || 'Grupo de Investigación Farmacología y Terapéutica',
    },
    ...(personData.url && { url: personData.url }),
  };
}

/**
 * Schema SoftwareApplication: Define una herramienta/calculadora como aplicación web
 * Se usa en páginas de herramientas
 */
export function getSoftwareApplicationSchema(appData: {
  name: string;
  description: string;
  category: string; // ej: "Medical", "Utility", "Science"
  url: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: appData.name,
    description: appData.description,
    url: appData.url,
    applicationCategory: `https://schema.org/${appData.category}Application`,
    image: appData.image || logoUrl,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '100',
    },
  };
}

/**
 * Schema WebPage: Define una página del sitio
 * Se usa como base para todas las páginas internas
 */
export function getWebPageSchema(pageData: {
  title: string;
  description: string;
  url: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: pageData.title,
    description: pageData.description,
    url: pageData.url,
    image: pageData.image || logoUrl,
    isPartOf: {
      '@id': baseUrl,
    },
  };
}

/**
 * Schema BreadcrumbList: Migas de pan para navegación
 * Mejora la usabilidad en búsqueda de Google
 */
export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
