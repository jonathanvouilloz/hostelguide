# HostelGuide - Décisions Techniques

> Log des décisions techniques importantes prises pendant le développement.

---

## Format

| Date | Décision | Contexte | Alternatives considérées |
|------|----------|----------|--------------------------|

---

## Décisions

### 2026-01-10 | Chargement contenu : Custom loader functions

**Contexte** : Choix entre Content Collections Astro et fonctions custom pour charger le contenu JSON/MD.

**Décision** : Utiliser des fonctions custom dans `src/lib/content.ts`.

**Justification** :
- PagesCMS édite du JSON brut, pas le format Content Collections
- Plus de contrôle sur le typage TypeScript
- Structure exactement alignée avec le PRD

**Alternatives rejetées** :
- Astro Content Collections : Nécessiterait schema duplication, format différent
- Import direct : Moins de contrôle, pas de validation

---

### 2026-01-10 | Routing spots : Route dynamique unique

**Contexte** : Comment router les pages de détail pour tous les types de spots (restaurants, bars, etc.).

**Décision** : Utiliser `/spot/[id].astro` unique pour tous les spots.

**Justification** :
- IDs uniques (UUID générés par PagesCMS)
- Moins de duplication de code
- Un seul fichier à maintenir

**Alternatives rejetées** :
- Routes par catégorie (`/restaurants/[id]`) : Duplication, plus de fichiers
- Query params (`/spot?id=xxx`) : Pas SSG-friendly

---

### 2026-01-10 | Theming : CSS variables injectées au build-time

**Contexte** : Comment appliquer les couleurs configurées dans settings.json.

**Décision** : Injecter les CSS variables via `<style define:vars={}>` dans BaseLayout.

**Justification** :
- Compatible SSG (pas de JavaScript runtime)
- Tailwind peut référencer les CSS variables
- Simple à implémenter dans Astro

**Alternatives rejetées** :
- JS runtime : Ajoute du JavaScript, flash de contenu
- Tailwind config statique : Nécessite rebuild pour changer les couleurs

---

### 2026-01-10 | Clipboard feedback : Changement de texte inline

**Contexte** : Comment indiquer à l'utilisateur que le texte a été copié.

**Décision** : Changer le texte du bouton "Copy" → "Copied!" pendant 2 secondes.

**Justification** :
- Zero dépendance externe
- Feedback immédiat au point d'interaction
- Meilleure accessibilité

**Alternatives rejetées** :
- Toast library : Dépendance supplémentaire, plus complexe
- Toast custom : Plus de code, moins immédiat

---

### 2026-01-10 | Timezone : Utiliser timezone hostel (pas device)

**Contexte** : Comment afficher les heures des événements.

**Décision** : Afficher les heures telles que stockées (timezone hostel).

**Justification** :
- PRD explicite : "Timezone correcte (locale du hostel, pas du device)"
- Les guests sont physiquement à l'hostel, même timezone
- Simplifie l'implémentation SSG

**Alternatives rejetées** :
- Conversion timezone device : Confusion pour les guests sur place
- Indicateur timezone : Surcharge d'information

---

### 2026-01-10 | Images : Astro Image component

**Contexte** : Comment gérer les images des spots et événements.

**Décision** : Utiliser le composant `<Image>` d'Astro.

**Justification** :
- Optimisation automatique (WebP, resize)
- Responsive sizing
- Pas de service externe requis

**Alternatives rejetées** :
- `<img>` standard : Pas d'optimisation
- CDN externe (Cloudinary) : Dépendance, coût potentiel

---

### 2026-01-10 | Pages catégories : Fichiers séparés

**Contexte** : Comment organiser les pages de catégories (restaurants, bars, etc.).

**Décision** : Un fichier .astro par catégorie.

**Justification** :
- PRD liste explicitement les pages séparées
- Meilleur SEO (URLs dédiées)
- Flexibilité (restaurants a un filtre, les autres non)

**Alternatives rejetées** :
- Route dynamique `/category/[slug]` : Moins flexible pour personnalisation
- Tabs client-side : Pas SSG-friendly

---

## Template pour nouvelles décisions

```markdown
### YYYY-MM-DD | Titre court

**Contexte** : Pourquoi cette décision était nécessaire.

**Décision** : Ce qui a été décidé.

**Justification** :
- Raison 1
- Raison 2

**Alternatives rejetées** :
- Option A : Pourquoi rejetée
- Option B : Pourquoi rejetée
```
