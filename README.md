# Orion - A Full-Stack Application Built with Nuxt and Cloudflare

> [!NOTE]
> This application is built during live stream sessions on [Twitch](https://tv.soubiran.dev) (in French). Replays are available on [YouTube](https://yt.soubiran.dev) (in French) and [a blog article](https://soubiran.dev/posts/building-a-full-stack-nuxt-application-on-twitch) (in English) retraces the entire journey. Read it to deeply understand the choices made and the reasons behind them.

Orion is a web application to **centralize themes and templates** created by and for the Nuxt community. Anyone can submit a theme or a template he created to share it with the community. **Feel free to submit your own creation**!

This full-stack application is built with Nuxt and Nuxt UI Pro and deployed using NuxtHub and Cloudflare.

## Contributions

Contributions are welcome! Feel free to open an issue or a pull request.

## Development

Install dependencies

```sh
pnpm install
```

Start the development server

```sh
pnpm dev
```

---

# Création d'une Application Full-Stack avec Nuxt et Cloudflare



## Création du formulaire pour les templates

- [x] Création du schéma pour les templates (sans la gestion des images ni des modules) (uniquement les one to many)
- [x] Création du formulaire dans l'ui (validation des données dans le front-end)
- [x] Création de l'endpoint pour ajouter un template (validation des données dans le back-end)
- [x] Save du template dans la DB
- [x] Affichage des templates dans l'interface d'administration (rappeler que le index.get.ts a posé quelques soucis, pour l'issue de drizzle sur les joins, il faut just spécifier les select (mais à préciser du coup)
Il faut les documenter parce qu'elles sont importantes
https://github.com/drizzle-team/drizzle-orm/issues/555
https://github.com/cloudflare/workers-sdk/issues/3160)

## On continue le formulaire des templates

Template

- [x] Visualisation d'un template (gestion de l'url)
- [x] Parse du MD
- [ ] Intégration de easymde





- [ ] Création de la page permettant l'affichage d'un template (gestion du hash dans l'url et computed de l'url côté server)
- [ ] Gestion du markdown pour la description (markdown-it côté server) (et explication de pourquoi pas de Nuxt Content)
- [ ]



PR à ajouter dans les contributions:
https://github.com/nuxt-hub/core/pull/113
https://github.com/nuxt/ui-pro/issues/372

_Pour l'editeur markdown, faire un poc_
quill (et son format delta chelou) vs easymde
