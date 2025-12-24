# SEO Implementation Checklist ✅

## 1. Meta Tags & React Helmet Integration
- [x] `react-helmet-async` installed and configured
- [x] `<HelmetProvider>` wraps entire app in `main.tsx`
- [x] `Seo.tsx` component uses Helmet for dynamic meta tag injection
- [x] Open Graph tags configured (og:title, og:description, og:image, og:url, og:type)
- [x] Twitter Card tags configured (twitter:card, twitter:site, twitter:image)
- [x] Canonical URLs set for each page
- [x] Keywords per-page optimization

## 2. JSON-LD Schemas
- [x] `src/utils/seoSchemas.ts` utilities created with:
  - Organization schema generator
  - Person schema generator
  - SoftwareApplication schema generator
  - WebPage schema generator
  - BreadcrumbList schema generator
- [x] Index.tsx: Organization schema injected (homepage)
- [x] Equipo.tsx: Person schema template created
- [x] Team.tsx: Individual Person schemas for each researcher
- [x] Herramientas.tsx: CollectionPage schema + SoftwareApplication for each tool

## 3. URL Structure & Sitemap
- [x] `public/sitemap.xml` updated with production domain (https://fyt-research.org)
- [x] All URLs changed from fyt-lab-connect.lovable.app to fyt-research.org
- [x] Sitemap priorities set:
  - Homepage: 1.0
  - Main sections: 0.8-0.9
  - Tools: 0.6
  - Legal pages: 0.3
- [x] Robots.txt verified (Allow: /, Sitemap reference present)

## 4. Semantic HTML & Titles
- [x] Index.tsx: h1 main title + Organization schema
- [x] Herramientas.tsx: h1 page title + h2 tool names + SoftwareApplication schemas
- [x] Equipo.tsx: h1 hidden title (sr-only) + Team.tsx h2 researcher names + Person schemas

## 5. Open Graph & Social Sharing
- [x] Index.tsx: og:title, og:description, og:image, og:url configured
- [x] Herramientas.tsx: og:title, og:description, og:image, og:url configured
- [x] Equipo.tsx: og:title, og:description, og:image, og:url configured
- [x] Twitter Card configuration on all pages

## 6. Build & Validation
- [x] `npm run build` successful (all files compiled)
- [x] Canonical links present in built HTML
- [x] Open Graph meta tags present in dist/index.html
- [x] No compilation errors

## Testing Instructions (Manual)
```bash
# 1. Open dev server
npm run dev

# 2. Visit pages and inspect:
# - Open browser DevTools → Application → Manifest
# - Check Network tab for preload links
# - Inspect <head> for meta tags

# 3. Test with Google Tools:
# - Go to: https://search.google.com/test/rich-results
# - Paste: http://localhost:8080/
# - Verify Organization schema renders

# 4. Test with Facebook Debugger:
# - Go to: https://developers.facebook.com/tools/debug/
# - Paste: http://localhost:8080/ (when deployed)
# - Verify og:image and og:title appear correctly

# 5. Test with Twitter Card Validator:
# - Go to: https://cards-dev.twitter.com/validator
# - Paste: http://localhost:8080/herramientas (when deployed)
# - Verify twitter:card displays correctly
```

## Pages Enhanced with SEO
1. **Index.tsx** (Homepage)
   - Title: "Grupo FyT | Grupo de Investigación en Farmacología y Terapéutica"
   - Schema: Organization
   - Keywords: "grupo FyT, investigación farmacéutica, farmacología, terapéutica"

2. **Herramientas.tsx** (Tools Hub)
   - Title: "Herramientas Farmacéuticas | Calculadoras Clínicas | Grupo FyT"
   - Schema: CollectionPage + SoftwareApplication per tool
   - Keywords: "calculadora farmacéutica, herramientas clínicas, función renal, antropométrica"

3. **Equipo.tsx** (Team Page)
   - Title: "Equipo | Investigadores Farmacéuticos | Grupo FyT"
   - Schema: Person schema for each researcher
   - Keywords: "investigadores farmacéuticos, equipo FyT, farmacología"

4. **SobreNosotros.tsx** (About Page)
   - Can be enhanced with WebPage schema and h1/h2 hierarchy

5. **Investigacion.tsx** (Research Page)
   - Can be enhanced with research-specific schemas

## Next Steps (Post-Deployment)
1. Submit sitemap to Google Search Console
2. Verify Organization and Person schemas render in Rich Results Test
3. Monitor CTR and position in Google Search Console
4. Optimize content based on search impressions
5. Request Google to re-index updated URLs

## Keywords Targeted
- "Grupo FyT" - Organization name
- "Calculadora farmacéutica" - Tools
- "Investigación farmacéutica" - Research focus
- "Función renal, antropométrica, farmacovigilancia" - Specific tools
- "Investigadores farmacéuticos" - Team
- "Universidad de Cartagena" - Institution

## Build Size Impact
- react-helmet-async: ~4 packages (~50KB minified+gzipped)
- No impact on Core Web Vitals (Helmet is non-blocking)
- Sitemap URLs now point to production domain
