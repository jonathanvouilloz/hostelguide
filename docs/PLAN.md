# HostelGuide - Plan d'exécution

> **Dernière mise à jour** : 2026-01-10

## Vue d'ensemble

| # | Epic | Statut | Complexité | Fichier détail |
|---|------|--------|------------|----------------|
| 1 | Foundation | ✅ DONE | M | [01-foundation.md](features/01-foundation.md) |
| 2 | Branding & Theming | ✅ DONE | S | [02-branding.md](features/02-branding.md) |
| 3 | Home & Essential Info | ✅ DONE | M | [03-home.md](features/03-home.md) |
| 4 | Info Page | ✅ DONE | S | [04-info-page.md](features/04-info-page.md) |
| 5 | Spot Categories | ✅ DONE | M | [05-spots.md](features/05-spots.md) |
| 6 | Spot Detail | ✅ DONE | M | [06-spot-detail.md](features/06-spot-detail.md) |
| 7 | Events Calendar | ✅ DONE | L | [07-events.md](features/07-events.md) |
| 8 | PWA Configuration | ✅ DONE | S | [08-pwa.md](features/08-pwa.md) |
| 9 | Deploy & Polish | ⬜ TODO | M | [09-deploy.md](features/09-deploy.md) |

**Légende** : ⬜ TODO | 🟡 EN COURS | ✅ DONE

---

## Prochaines étapes prioritaires

### Immédiat
1. Initialiser projet Astro avec TypeScript
2. Configurer Tailwind CSS
3. Créer structure `/content`

### Ensuite
4. Créer types TypeScript (`src/lib/types.ts`)
5. Créer utilitaires content (`src/lib/content.ts`)
6. Créer BaseLayout avec theming

---

## Dépendances entre epics

```
[1. Foundation] ──> [2. Branding] ──> [3. Home]
       │                                  │
       └──> [4. Info Page]                │
       │                                  │
       └──> [5. Spots] ──> [6. Spot Detail]
       │
       └──> [7. Events]
       │
       └──> [8. PWA]

[Tous] ──> [9. Deploy & Polish]
```

---

## Progression globale

```
[██████████████████░░] 89% (8/9 epics)
```

---

## Notes de session

### 2026-01-10
- Projet initialisé
- Structure documentation créée
- PRD déplacé vers docs/
- **Epic 1 (Foundation) terminé** :
  - Astro 5.16.8 + TypeScript strict
  - Tailwind CSS 4 avec CSS variables
  - Structure /content complète
  - Types TypeScript stricts
  - Content loader fonctionnel
  - BaseLayout avec theming dynamique
  - Page index de test validée
- **Epic 2 (Branding & Theming) terminé** :
  - Répertoire /src/components/ créé
  - Composant Header.astro avec logo et nom
  - Header intégré dans BaseLayout (sticky, primary color)
  - Page index nettoyée
- **Epic 3 (Home & Essential Info) terminé** :
  - WiFiCard.astro avec tap-to-copy (Clipboard API + feedback "Copied!")
  - CategoryCard.astro pour navigation (grille et pleine largeur)
  - Page index complète : WiFi, grille 2x2, This Week, Info/Rules, check-in/out
- **Epic 4 (Info Page) terminé** :
  - EmergencyContacts.astro avec liens tel: cliquables
  - Styles .prose pour rendu markdown
  - Page /info : house rules, how to get here, contacts urgence
- **Epic 5 (Spot Categories) terminé** :
  - SpotCard.astro avec image 16:9, badges, description tronquée
  - Filtre cuisine intégré dans restaurants.astro (URL params)
  - 5 pages catégories : /restaurants, /laundry, /transport, /bars, /activities
- **Epic 6 (Spot Detail) terminé** :
  - Page dynamique /spot/[id].astro avec getStaticPaths
  - deeplinks.ts pour URLs Google Maps
  - findSpotById() dans content.ts
  - Boutons sticky : Directions + Copy Address
- **Epic 7 (Events Calendar) terminé** :
  - getWhatsAppUrl() ajouté à deeplinks.ts
  - EventCard.astro avec date, horaires, CTA
  - Page /events avec liste événements de la semaine
- **Epic 8 (PWA Configuration) terminé** :
  - manifest.json créé avec icônes et metadata
  - Icônes PWA générées (192x192, 512x512, favicon)
  - Meta tags PWA déjà présents dans BaseLayout
