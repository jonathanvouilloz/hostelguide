# HostelGuide

## Résumé

PWA "brochure digitale" pour hostels en Asie du Sud-Est. Les guests scannent un QR code et accèdent instantanément aux infos essentielles (WiFi, restaurants, services, événements). Le owner gère le contenu via PagesCMS sans toucher au code.

## Stack technique

| Couche | Technologie |
|--------|-------------|
| Framework | Astro (SSG) |
| Styling | Tailwind CSS |
| CMS | PagesCMS (édition via GitHub) |
| Hosting | Vercel |
| PWA | manifest.json (install prompt, pas d'offline) |

## Commandes utiles

```bash
# Développement
npm run dev         # Démarre le serveur de dev (localhost:4321)

# Build
npm run build       # Build de production
npm run preview     # Preview du build

# Vérification
npm run check       # Vérification TypeScript
```

## Structure du projet

```
/content          # JSON/MD édité via PagesCMS
/public           # Assets statiques (images, manifest)
/src
  /components     # Composants Astro (.astro)
  /layouts        # Layouts (BaseLayout)
  /pages          # Pages (routing automatique)
  /lib            # Utilitaires TypeScript
  /styles         # CSS global + Tailwind
```

## Conventions de code

- **Composants** : PascalCase (`SpotCard.astro`)
- **Utilitaires** : camelCase (`deeplinks.ts`)
- **JSON keys** : camelCase
- **CSS variables** : kebab-case (`--color-primary`)
- **Pas de `any`** en TypeScript
- **Langue UI** : Anglais uniquement (pas d'i18n pour MVP)

## Pointeurs documentation

| Fichier | Description |
|---------|-------------|
| [docs/PRD.md](docs/PRD.md) | Product Requirements Document complet |
| [docs/PLAN.md](docs/PLAN.md) | Plan d'exécution avec statuts |
| [docs/DECISIONS.md](docs/DECISIONS.md) | Log des décisions techniques |
| [docs/STYLEGUIDE.md](docs/STYLEGUIDE.md) | Conventions code et design |
| [docs/features/](docs/features/) | Détail par feature/epic |

## État actuel

**Phase** : Epic 8 (PWA Configuration) terminé
**Dernière mise à jour** : 2026-01-10

### Fait
- [x] Structure documentation créée
- [x] PRD déplacé vers docs/
- [x] Projet Astro initialisé avec TypeScript strict
- [x] Tailwind CSS 4 configuré avec CSS variables
- [x] Structure /content créée (settings, spots, events, markdown)
- [x] Types TypeScript complets (src/lib/types.ts)
- [x] Content loader avec typage strict (src/lib/content.ts)
- [x] BaseLayout avec injection CSS variables dynamique
- [x] Composant Header avec logo et nom de l'hostel
- [x] Système de theming dynamique fonctionnel
- [x] WiFiCard avec tap-to-copy (Clipboard API + feedback)
- [x] CategoryCard pour navigation
- [x] Page d'accueil complète (grille 2x2 + cartes pleine largeur)
- [x] EmergencyContacts avec liens tel:
- [x] Styles .prose pour markdown
- [x] Page /info avec house rules, how to get here, contacts urgence
- [x] SpotCard avec image 16:9, badges (cuisine/prix), description tronquée
- [x] Filtre cuisine intégré (URL params)
- [x] Pages catégories : /restaurants, /laundry, /transport, /bars, /activities
- [x] Page spot detail dynamique /spot/[id]
- [x] Boutons sticky : Directions (Google Maps) + Copy Address
- [x] deeplinks.ts pour URLs Maps + WhatsApp
- [x] EventCard avec date, horaires, CTA WhatsApp
- [x] Page /events avec événements de la semaine
- [x] manifest.json avec icônes et metadata PWA
- [x] Icônes PWA générées (192x192, 512x512, favicon)

### Prochaines étapes (Epic 9 - Deploy & Polish)
- [ ] Configurer Vercel pour le déploiement
- [ ] Tester PWA install prompt sur mobile
- [ ] Polish et ajustements finaux
