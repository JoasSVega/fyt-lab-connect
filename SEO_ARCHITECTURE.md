# SEO Architecture Diagram

## Application Structure with SEO Components

```
┌─────────────────────────────────────────────────────────────────┐
│                      index.html (Entry Point)                    │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ <head>                                                       │  │
│  │   ✓ Canonical URL (https://fyt-research.org)              │  │
│  │   ✓ Open Graph tags (og:title, og:image, og:url)         │  │
│  │   ✓ Twitter Card tags (twitter:card, twitter:site)       │  │
│  │   ✓ Preload link (LCP image)                             │  │
│  │   ✓ robots.txt reference (Sitemap)                       │  │
│  └────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      main.tsx (React App)                        │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ <HelmetProvider>  (react-helmet-async)                   │  │
│  │   └── Enables dynamic meta tag injection per route        │  │
│  │   └── Manages <head> updates on navigation                │  │
│  └────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
                         ┌────────┐
                         │  <App> │
                         └─────┬──┘
                    ┌──────────┼──────────┐
                    ↓          ↓          ↓
            ┌──────────────┬──────────┬──────────────┐
            │  <Index />   │ <Herr. > │  <Equipo />  │
            └──────────────┴──────────┴──────────────┘
```

## SEO Component Integration Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    Page Component (e.g., Index.tsx)              │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ import Seo from "@/components/Seo"                       │   │
│  │ import { getOrganizationSchema, baseUrl } from "@/.../  │   │
│  │                                                           │   │
│  │ export default function Index() {                        │   │
│  │   return (                                               │   │
│  │     <>                                                   │   │
│  │       <Seo                                               │   │
│  │         title="Grupo FyT | ..."                          │   │
│  │         description="..."                                │   │
│  │         keywords="grupo FyT, ..."                        │   │
│  │         canonical={`${baseUrl}/`}                        │   │
│  │         openGraph={{...}}                                │   │
│  │         twitter={{...}}                                  │   │
│  │         schema={getOrganizationSchema()}                 │   │
│  │       />                                                 │   │
│  │       <main>Page content...</main>                       │   │
│  │     </>                                                  │   │
│  │   )                                                      │   │
│  │ }                                                        │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
              ↓                ↓                ↓
       ┌─────────────────────────────────────────────────┐
       │           <Seo /> Component (React)             │
       │  src/components/Seo.tsx                         │
       │  ┌───────────────────────────────────────────┐  │
       │  │ • Props: title, description, keywords,   │  │
       │  │          canonical, author, robots,      │  │
       │  │          schema, openGraph, twitter,     │  │
       │  │          children                        │  │
       │  │                                           │  │
       │  │ • Returns: <Helmet>...</Helmet>          │  │
       │  │   ✓ Injects <title>                     │  │
       │  │   ✓ Injects <meta name="description">   │  │
       │  │   ✓ Injects <meta name="keywords">      │  │
       │  │   ✓ Injects <meta property="og:*">      │  │
       │  │   ✓ Injects <meta name="twitter:*">     │  │
       │  │   ✓ Injects <link rel="canonical">      │  │
       │  │   ✓ Injects <script type="ld+json">     │  │
       │  └───────────────────────────────────────────┘  │
       └─────────────────────────────────────────────────┘
                            ↓
       ┌─────────────────────────────────────────────────┐
       │      react-helmet-async <Helmet> Component      │
       │  ┌───────────────────────────────────────────┐  │
       │  │ • Updates document <head> asynchronously  │  │
       │  │ • Handles browser history navigation      │  │
       │  │ • Non-blocking (async injection)         │  │
       │  │ • No impact on Core Web Vitals           │  │
       │  └───────────────────────────────────────────┘  │
       └─────────────────────────────────────────────────┘
                            ↓
       ┌─────────────────────────────────────────────────┐
       │              Document <head> Updated             │
       │  ┌───────────────────────────────────────────┐  │
       │  │ <title>Grupo FyT | ...</title>           │  │
       │  │ <meta name="description" content="..." /> │  │
       │  │ <meta name="keywords" content="..." />    │  │
       │  │ <meta property="og:title" content="..." />│  │
       │  │ <meta property="og:image" content="..." />│  │
       │  │ <meta name="twitter:card" content="..." />│  │
       │  │ <link rel="canonical" href="..." />      │  │
       │  │ <script type="application/ld+json">      │  │
       │  │   {"@context": "schema.org", ...}        │  │
       │  │ </script>                                 │  │
       │  └───────────────────────────────────────────┘  │
       └─────────────────────────────────────────────────┘
```

## Schema Generation Utility Flow

```
┌─────────────────────────────────────────────────────────────────┐
│     src/utils/seoSchemas.ts (Schema Generators)                 │
│                                                                   │
│  baseUrl = "https://fyt-research.org"                            │
│  logoUrl = "${baseUrl}/logo-fyt.png"                            │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ getOrganizationSchema()                                  │   │
│  │  ├─ @context: schema.org                                │   │
│  │  ├─ @type: Organization                                 │   │
│  │  ├─ name: "Grupo FyT"                                   │   │
│  │  ├─ alternateName: "Grupo de Investigación..."         │   │
│  │  ├─ url: baseUrl                                        │   │
│  │  ├─ logo: logoUrl                                       │   │
│  │  ├─ description: "..."                                  │   │
│  │  ├─ sameAs: [ORCID links]                              │   │
│  │  └─ contactPoint: {type: ContactPoint, ...}            │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ getPersonSchema(data: {name, jobTitle, ...})            │   │
│  │  ├─ @context: schema.org                                │   │
│  │  ├─ @type: Person                                       │   │
│  │  ├─ name: researcher.name                               │   │
│  │  ├─ jobTitle: researcher.role                           │   │
│  │  ├─ description: researcher.description                 │   │
│  │  ├─ image: researcher.photo URL                         │   │
│  │  └─ url: fragment link                                  │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ getSoftwareApplicationSchema(data)                       │   │
│  │  ├─ @context: schema.org                                │   │
│  │  ├─ @type: SoftwareApplication                          │   │
│  │  ├─ name: tool.name                                     │   │
│  │  ├─ description: tool.description                       │   │
│  │  ├─ category: "Medical"                                 │   │
│  │  └─ url: tool page URL                                  │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ getWebPageSchema(data)                                   │   │
│  │ getBreadcrumbSchema(items)                               │   │
│  │ ... (other generators)                                   │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                            ↓
     Returned to Page Components as JSON Objects
     Injected into <Seo schema={...} /> prop
                            ↓
     Helmet injects into <script type="application/ld+json">
                            ↓
     Google Search Console recognizes structured data
     Rich Snippets & Rich Results rendered in SERP
```

## Multi-Page SEO Configuration

```
┌────────────────────────────────────────────────────────────────┐
│                        Homepage (Index.tsx)                     │
│  ├─ Schema: Organization (full profile)                        │
│  ├─ H1: "Grupo FyT | Grupo de Investigación..."              │
│  ├─ Meta Title: "Grupo FyT | Grupo de Investigación..."       │
│  ├─ OG Image: https://fyt-research.org/apple-touch-icon.png   │
│  └─ Priority: 1.0 (sitemap)                                    │
├────────────────────────────────────────────────────────────────┤
│                 Tools Hub (Herramientas.tsx)                    │
│  ├─ Schema: CollectionPage (with ItemList) + per-tool SoftApp │
│  ├─ H1: "Herramientas Digitales para Profesionales..."        │
│  ├─ H2: Individual tool names                                  │
│  ├─ Keywords: "calculadora farmacéutica, herramientas clínicas"│
│  ├─ OG Image: https://fyt-research.org/logo-fyt.png           │
│  └─ Priority: 0.6 (sitemap)                                    │
├────────────────────────────────────────────────────────────────┤
│                  Team Page (Equipo.tsx + Team.tsx)             │
│  ├─ Schema: Person (per researcher)                            │
│  ├─ H1: "Equipo de Investigadores" (hidden sr-only)           │
│  ├─ H2: Individual researcher names (with IDs)                 │
│  ├─ Keywords: "investigadores farmacéuticos, equipo FyT"       │
│  ├─ OG Image: https://fyt-research.org/logo-fyt.png           │
│  └─ Priority: 0.8 (sitemap)                                    │
├────────────────────────────────────────────────────────────────┤
│              Additional Pages (Future Enhancements)             │
│  ├─ SobreNosotros: WebPage schema                              │
│  ├─ Investigacion: ResearchProject schemas                     │
│  ├─ Publicaciones: ScholarlyArticle schemas                    │
│  └─ Proyectos: Project schemas                                 │
└────────────────────────────────────────────────────────────────┘
            ↓↓↓ All URLs point to https://fyt-research.org ↓↓↓
           Listed in public/sitemap.xml with proper priorities
           Verified in public/robots.txt (Allow: /, Sitemap)
```

## Search Engine Crawl & Indexation Flow

```
┌─────────────────┐
│ Google / Bing   │
│ Web Crawler     │
└────────┬────────┘
         │
         ├─→ robots.txt
         │   ✓ Allow: /
         │   ✓ Sitemap: https://fyt-research.org/sitemap.xml
         │
         ├─→ sitemap.xml
         │   ├─ https://fyt-research.org/ (1.0)
         │   ├─ https://fyt-research.org/herramientas (0.6)
         │   ├─ https://fyt-research.org/equipo (0.8)
         │   └─ ... (38 total URLs)
         │
         ├─→ index.html <head> (Home)
         │   ├─ <title>Grupo FyT | ...</title>
         │   ├─ <meta name="description" ...>
         │   ├─ <meta property="og:title" ...>
         │   ├─ <link rel="canonical" href="https://fyt-research.org">
         │   └─ <script type="application/ld+json">{Organization}</script>
         │
         ├─→ Crawl /herramientas
         │   ├─ <title>Herramientas Farmacéuticas | ...</title>
         │   ├─ <h1>Herramientas Digitales para...</h1>
         │   ├─ <h2>Calculadora Antropométrica</h2>
         │   ├─ <script>{CollectionPage Schema}</script>
         │   ├─ <script>{SoftwareApplication #1}</script>
         │   └─ <script>{SoftwareApplication #2}</script>
         │
         ├─→ Crawl /equipo
         │   ├─ <title>Equipo | Investigadores Farmacéuticos | ...</title>
         │   ├─ <h1 class="sr-only">Equipo de Investigadores...</h1>
         │   ├─ <h2 id="antistio-alviz">Antistio Alviz</h2>
         │   ├─ <script>{Person: Antistio}</script>
         │   ├─ <h2 id="yaneth-garcia">Yaneth García</h2>
         │   └─ <script>{Person: Yaneth}</script>
         │
         └─→ Google Search Console
             ├─ Extract title, meta description, OG tags
             ├─ Parse JSON-LD schemas
             ├─ Create Rich Snippets for Organization
             ├─ Create Rich Snippets for Persons (team)
             ├─ Create Rich Snippets for SoftwareApps (tools)
             └─ Index content by keyword + schema type
```

## Keyword Targeting Architecture

```
                        ┌─────────────────────┐
                        │ "Grupo FyT"         │
                        │ (Organization Name) │
                        └────────┬────────────┘
                                 │
                    ┌────────────┼────────────┐
                    │            │            │
        ┌───────────▼────┐  ┌───▼────────┐  ┌▼─────────────┐
        │ Home (Index)   │  │ Team/Equipo│  │Tools/Herram. │
        │                │  │            │  │              │
        │ • Tier 1:      │  │ • Tier 2:  │  │ • Tier 2:    │
        │   "grupo FyT"  │  │ "investig."│  │ "calculador."│
        │   "investig."  │  │ "farmaceut"│  │ "herramientas"
        │   "farmacolog"│  │ • Tier 3:  │  │ • Tier 3:    │
        │               │  │ "investig."│  │ "calc.  funct"│
        │ • Tier 2:      │  │ "doctor"   │  │ "antropometri"
        │   "investig."  │  │ "university│  │ "dosificación"
        │   "farmacovig"│  │ "cartagena"│  │ "farmacocinét"
        │   "farmacoecon"                │  │ "farmacoveig"
        │                   │            │  │              │
        └────────────────┬──┴────────────┘  └──────────────┘
                         │
                    ┌────▼────────────┐
                    │ Future Pages    │
                    │                 │
                    │ • Research      │
                    │ • Publications  │
                    │ • Projects      │
                    │ • News          │
                    └─────────────────┘
```

## Meta Tag Injection Timeline

```
1. Page Load (t=0ms)
   ├─ main.tsx loads
   ├─ <HelmetProvider> wraps <App>
   └─ Router navigates to page
        │
        └─→ 2. Page Component Renders (t=50ms)
            ├─ <Index /> (or <Herramientas />, etc.)
            ├─ Calls getOrganizationSchema() or similar
            └─ Passes schema to <Seo />
                 │
                 └─→ 3. Seo Component Renders (t=100ms)
                     ├─ Returns <Helmet> with props
                     ├─ Helmet reads all meta tag props
                     └─ Helmet queues DOM updates
                          │
                          └─→ 4. React Helmet Async Injects (t=150ms)
                              ├─ Updates document.title
                              ├─ Injects <meta> tags
                              ├─ Injects <link rel="canonical">
                              ├─ Injects <script type="ld+json">
                              └─ All within <head> element
                                   │
                                   └─→ 5. Ready for Crawlers (t=200ms)
                                       ├─ SEO Spider sees complete <head>
                                       ├─ Google bot sees all meta tags
                                       ├─ Schema.org validator finds JSON-LD
                                       └─ Social crawlers see OG tags

Timeline: All meta tags ready within 200ms
Impact on Core Web Vitals: NONE (async injection)
SSR Equivalent: Full meta tag coverage for SPA
```

## SEO Validation Workflow

```
┌─────────────────────────────────────────────────────────────┐
│                   Development Phase                          │
│                                                              │
│ 1. Code Changes                                             │
│    ├─ Create Seo.tsx with Helmet                           │
│    ├─ Create seoSchemas.ts with generators                 │
│    ├─ Update pages with <Seo /> + schema props             │
│    └─ Run: npm run build ✓                                 │
│                                                              │
│ 2. Local Testing                                            │
│    ├─ npm run dev (starts http://localhost:8080)           │
│    ├─ Open DevTools → Elements                             │
│    ├─ Inspect <head> for meta tags                         │
│    ├─ Verify all OG tags present                           │
│    └─ Verify canonical URL correct                         │
│                                                              │
│ 3. Commit Changes                                           │
│    └─ git commit -m "feat(seo): ..." ✓ Done               │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│               Pre-Deployment Phase                           │
│                                                              │
│ 1. Staging Environment                                      │
│    ├─ Deploy build to staging server                       │
│    ├─ Verify pages load at: https://staging.fyt-research.org
│    ├─ Test Seo component works in production build         │
│    └─ Run DevTools inspection again                        │
│                                                              │
│ 2. SEO Tool Validation                                      │
│    ├─ Google Rich Results Test                             │
│    │  ├─ URL: https://search.google.com/test/rich-results │
│    │  └─ Paste: https://staging.fyt-research.org          │
│    │     Expected: Organization schema with logo ✓          │
│    │                                                        │
│    ├─ Facebook Debugger                                    │
│    │  ├─ URL: https://developers.facebook.com/tools/debug │
│    │  └─ Paste: https://staging.fyt-research.org          │
│    │     Expected: og:image previews ✓                     │
│    │                                                        │
│    └─ Twitter Card Validator                               │
│       ├─ URL: https://cards-dev.twitter.com/validator     │
│       └─ Paste: https://staging.fyt-research.org/tools    │
│          Expected: twitter:card renders ✓                  │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│               Production Phase                               │
│                                                              │
│ 1. Deployment                                               │
│    ├─ Deploy to: https://fyt-research.org ✓               │
│    ├─ Verify pages load correctly                          │
│    └─ Test all meta tags in <head>                         │
│                                                              │
│ 2. Google Search Console Setup                              │
│    ├─ Add property: https://fyt-research.org              │
│    ├─ Verify ownership (DNS/HTML file)                     │
│    ├─ Submit sitemap: https://fyt-research.org/sitemap.xml│
│    ├─ Request indexing for critical pages                  │
│    └─ Monitor crawl stats and indexation progress          │
│                                                              │
│ 3. Monitoring & Optimization                                │
│    ├─ Google Search Console                                │
│    │  ├─ Performance → Monitor impressions & CTR           │
│    │  ├─ Coverage → Verify all pages indexed               │
│    │  └─ Enhancements → Check Rich Results status          │
│    │                                                        │
│    ├─ Google PageSpeed Insights                            │
│    │  ├─ Mobile & Desktop scores                           │
│    │  └─ Core Web Vitals metrics                           │
│    │                                                        │
│    └─ SEO Analytics                                         │
│       ├─ Track keyword positions                           │
│       ├─ Monitor organic traffic                           │
│       └─ Optimize content based on data                    │
└─────────────────────────────────────────────────────────────┘
```
