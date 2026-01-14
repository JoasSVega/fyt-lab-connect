#!/bin/bash
# Script de verificación: Validar que el SPA routing y SEO está correctamente configurado

echo "╔════════════════════════════════════════════════════════╗"
echo "║   VERIFICACIÓN: SPA Routing y SEO Configuration        ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

check_file() {
  local file=$1
  local pattern=$2
  local description=$3
  
  if [ -f "$file" ]; then
    if grep -q "$pattern" "$file"; then
      echo -e "${GREEN}✅${NC} $description"
      return 0
    else
      echo -e "${RED}❌${NC} $description (pattern not found: $pattern)"
      return 1
    fi
  else
    echo -e "${RED}❌${NC} $description (file not found: $file)"
    return 1
  fi
}

echo -e "${BLUE}1. Verificando archivos de configuración SPA:${NC}"
echo ""

# 1. Verificar index.html
check_file "index.html" "sessionStorage.getItem('redirectPath')" "index.html - SPA redirect handler"

# 2. Verificar public/404.html
check_file "public/404.html" "sessionStorage.setItem('redirectPath'" "public/404.html - SPA redirect setter"

# 3. Verificar postbuild-spa.js
check_file "scripts/postbuild-spa.js" "sessionStorage.setItem('redirectPath'" "scripts/postbuild-spa.js - Post-build SPA generator"

echo ""
echo -e "${BLUE}2. Verificando archivos de SEO:${NC}"
echo ""

# 4. Verificar sitemap.xml existe
if [ -f "public/sitemap.xml" ]; then
  urls=$(grep -c "<loc>" public/sitemap.xml)
  echo -e "${GREEN}✅${NC} public/sitemap.xml - Contiene $urls URLs"
else
  echo -e "${RED}❌${NC} public/sitemap.xml - Archivo no encontrado"
fi

# 5. Verificar robots.txt
check_file "public/robots.txt" "Sitemap:" "public/robots.txt - Referencia a sitemap"

# 6. Verificar _headers
check_file "public/_headers" "Cache-Control" "public/_headers - Cache configuration"

echo ""
echo -e "${BLUE}3. Verificando configuración de build:${NC}"
echo ""

# 7. Verificar que postbuild script está en package.json
if grep -q "postbuild-spa" package.json; then
  echo -e "${GREEN}✅${NC} package.json - postbuild-spa.js en script de build"
else
  echo -e "${YELLOW}⚠️${NC} package.json - postbuild-spa.js no encontrado (puede estar en vite config)"
fi

# 8. Verificar rutas en App.tsx
check_file "src/App.tsx" "/divulgacion" "src/App.tsx - Rutas de divulgación definidas"

echo ""
echo -e "${BLUE}4. Verificando SEO metadata:${NC}"
echo ""

# 9. Verificar canonical en index.html
check_file "index.html" "rel=\"canonical\"" "index.html - Canonical URL tag"

# 10. Verificar Open Graph
check_file "index.html" "property=\"og:" "index.html - Open Graph meta tags"

echo ""
echo -e "${BLUE}5. Estado del repositorio Git:${NC}"
echo ""

# 11. Verificar última confirmación
last_commit=$(git log --oneline -1 2>/dev/null)
if [ -n "$last_commit" ]; then
  echo -e "${GREEN}✅${NC} Último commit: $last_commit"
else
  echo -e "${RED}❌${NC} No hay commits disponibles"
fi

# 12. Verificar si hay cambios sin commitear
if git diff-index --quiet HEAD -- 2>/dev/null; then
  echo -e "${GREEN}✅${NC} Git clean - No hay cambios sin commitear"
else
  changes=$(git status --short | wc -l)
  echo -e "${YELLOW}⚠️${NC} Git dirty - $changes archivos con cambios"
  echo "   Ejecuta: git add . && git commit -m 'mensaje'"
fi

echo ""
echo -e "${BLUE}6. Verificación de dist/ (después de build):${NC}"
echo ""

if [ -d "dist" ]; then
  if [ -f "dist/404.html" ]; then
    if grep -q "sessionStorage.setItem" dist/404.html; then
      echo -e "${GREEN}✅${NC} dist/404.html - SPA redirect correctamente generado"
    else
      echo -e "${RED}❌${NC} dist/404.html - No contiene SPA redirect (ejecuta: npm run build)"
    fi
  else
    echo -e "${RED}❌${NC} dist/404.html - Archivo no encontrado (ejecuta: npm run build)"
  fi
  
  if [ -f "dist/sitemap.xml" ]; then
    urls=$(grep -c "<loc>" dist/sitemap.xml)
    echo -e "${GREEN}✅${NC} dist/sitemap.xml - Contiene $urls URLs"
  else
    echo -e "${RED}❌${NC} dist/sitemap.xml - No encontrado"
  fi
else
  echo -e "${YELLOW}⚠️${NC} Carpeta dist/ no existe (ejecuta: npm run build)"
fi

echo ""
echo "╔════════════════════════════════════════════════════════╗"
echo "║                    RESUMEN                             ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""
echo "✅ Si todos los checks pasan:"
echo "   1. El SPA routing está correctamente configurado"
echo "   2. El SEO está optimizado"
echo "   3. Puedes hacer deploy a GitHub Pages"
echo ""
echo "⚠️ Si hay warnings o errores:"
echo "   1. Asegúrate de ejecutar: npm run build"
echo "   2. Verifica los archivos listados arriba"
echo "   3. Consulta INDEXATION_FIX_SUMMARY.md para más detalles"
echo ""
