# HostelGuide - Style Guide

> Conventions de code et design pour le projet.

---

## Conventions de nommage

### Fichiers

| Type | Convention | Exemple |
|------|------------|---------|
| Composants Astro | PascalCase | `SpotCard.astro`, `WiFiCard.astro` |
| Pages | kebab-case | `index.astro`, `spot/[id].astro` |
| Utilitaires TS | camelCase | `content.ts`, `deeplinks.ts` |
| JSON content | kebab-case | `settings.json`, `house-rules.md` |
| Images | kebab-case | `pad-thai-heaven.jpg` |

### Code

| Type | Convention | Exemple |
|------|------------|---------|
| Variables | camelCase | `const spotData = ...` |
| Constantes | UPPER_SNAKE | `const MAX_SPOTS = 50` |
| Types/Interfaces | PascalCase | `interface Spot { }` |
| Fonctions | camelCase | `function getSpots()` |
| CSS classes | kebab-case | `.spot-card`, `.action-btn` |
| CSS variables | --kebab-case | `--color-primary` |
| JSON keys | camelCase | `{ "hostelName": "..." }` |

---

## Structure des fichiers

### Composant Astro typique

```astro
---
// 1. Imports
import BaseLayout from '../layouts/BaseLayout.astro';
import type { Spot } from '../lib/types';

// 2. Props interface
interface Props {
  spot: Spot;
  showBadge?: boolean;
}

// 3. Destructure props
const { spot, showBadge = false } = Astro.props;

// 4. Data fetching / logic
const formattedPrice = formatPrice(spot.priceRange);
---

<!-- 5. Template -->
<article class="spot-card">
  <h2>{spot.name}</h2>
  {showBadge && <span class="badge">{spot.cuisineType}</span>}
</article>

<!-- 6. Styles (scoped) -->
<style>
  .spot-card {
    /* ... */
  }
</style>

<!-- 7. Scripts (si nécessaire) -->
<script>
  // Client-side JS minimal
</script>
```

### Fichier utilitaire TypeScript

```typescript
// src/lib/content.ts

// 1. Imports
import type { Settings, Spot, Event } from './types';

// 2. Types locaux (si non exportés)
type SpotCategory = 'restaurants' | 'bars' | 'laundry' | 'transport' | 'activities';

// 3. Fonctions exportées
export async function getSettings(): Promise<Settings> {
  const data = await import('../../content/settings.json');
  return data.default;
}

export async function getSpots(category: SpotCategory): Promise<Spot[]> {
  const data = await import(`../../content/spots/${category}.json`);
  return data.default.spots;
}

// 4. Helpers privés (en bas)
function validateSpot(spot: unknown): spot is Spot {
  // ...
}
```

---

## TypeScript

### Règles

- **Strict mode** activé (`"strict": true`)
- **Pas de `any`** — utiliser `unknown` si type inconnu
- **Interfaces pour objets** — `interface Spot { }` pas `type Spot = { }`
- **Types explicites** pour fonctions publiques
- **Optionnel avec `?`** — pas `| undefined`

### Exemples

```typescript
// Bon
interface Spot {
  id: string;
  name: string;
  description?: string;  // Optionnel
}

function getSpot(id: string): Promise<Spot | undefined> {
  // ...
}

// Mauvais
type Spot = {
  id: any;
  name: string;
  description: string | undefined;
}
```

---

## CSS / Tailwind

### Principes

1. **Mobile-first** — styles de base pour mobile, breakpoints pour desktop
2. **Utility-first** — préférer classes Tailwind au CSS custom
3. **CSS variables** — pour les valeurs dynamiques (couleurs du thème)
4. **Scoped styles** — utiliser `<style>` dans les composants Astro

### Classes personnalisées (global.css)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* CSS variables injectées depuis settings */
:root {
  --color-primary: #2563eb;
  --color-accent: #f59e0b;
  --color-bg: #ffffff;
  --color-text: #1f2937;
  --color-muted: #6b7280;
  --radius: 12px;
}

/* Utility classes custom */
@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}

/* Component classes réutilisables */
@layer components {
  .btn-primary {
    @apply bg-primary text-white px-4 py-3 rounded-xl font-medium;
  }

  .card {
    @apply bg-white rounded-xl shadow-sm border border-gray-100;
  }
}
```

### Breakpoints

```css
/* Mobile first */
.element {
  padding: 1rem;           /* Mobile: 375px+ */
}

@media (min-width: 640px) {
  .element {
    padding: 1.5rem;       /* sm: 640px+ */
  }
}

@media (min-width: 768px) {
  .element {
    padding: 2rem;         /* md: 768px+ */
  }
}
```

### Touch targets

```css
/* Minimum 44x44px pour les éléments interactifs */
.touch-target {
  min-height: 44px;
  min-width: 44px;
}
```

---

## Commits

### Format Conventional Commits

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

| Type | Description |
|------|-------------|
| `feat` | Nouvelle fonctionnalité |
| `fix` | Correction de bug |
| `docs` | Documentation uniquement |
| `style` | Formatage (pas de changement de code) |
| `refactor` | Refactoring (pas de nouvelle feature ni fix) |
| `test` | Ajout/modification de tests |
| `chore` | Maintenance, dépendances, config |

### Exemples

```bash
feat(spots): add cuisine filter to restaurants page
fix(wifi): copy button not working on iOS Safari
docs: update README with setup instructions
style: format components with prettier
refactor(content): simplify spot loading logic
chore: update astro to 4.15
```

### Scope suggérés

- `home` — Page d'accueil
- `spots` — Système de spots (cards, detail)
- `events` — Calendrier et événements
- `wifi` — WiFi card
- `pwa` — Configuration PWA
- `content` — Chargement contenu
- `layout` — Layout et navigation
- `cms` — Configuration PagesCMS

---

## Accessibilité

### Règles minimales

1. **Contraste AA** — ratio 4.5:1 pour texte normal
2. **Alt text** — sur toutes les images informatives
3. **Labels** — sur tous les éléments de formulaire
4. **Focus visible** — ne pas supprimer les outlines
5. **Sémantique** — utiliser les bonnes balises HTML

### Exemple

```astro
<!-- Bon -->
<button aria-label="Copy WiFi password">
  <span class="sr-only">Copy</span>
  <CopyIcon />
</button>

<!-- Image avec alt -->
<img src={spot.image} alt={`Photo of ${spot.name}`} />

<!-- Skip link -->
<a href="#main" class="sr-only focus:not-sr-only">
  Skip to main content
</a>
```

---

## Performance

### Guidelines

1. **Images** — Utiliser `<Image>` d'Astro pour optimisation
2. **JS minimal** — Astro par défaut n'envoie pas de JS
3. **Lazy loading** — `loading="lazy"` sur images below-the-fold
4. **Fonts** — System fonts ou preload si custom

### Objectifs Lighthouse

| Métrique | Cible |
|----------|-------|
| Performance | > 90 |
| Accessibility | > 90 |
| Best Practices | > 90 |
| SEO | > 90 |
