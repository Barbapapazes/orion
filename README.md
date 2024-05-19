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

## Restructuration de la gestion des utilisateurs

- [x] On sauvegarde une fois (get if not exists save) et on check les diff pour les mises à jour
- [x] On sauvegarde les mails (email)
- [x] Rename username en login
- [x] On sauvegarde le nom d'utilisateur (name) (en plus du login)
- [x] Gestion des admins et ban des utilisateurs dans l'interface d'administration
- [x] Voir pour ajouter un created at et un updated at
- [x] Revoir les données envoyées lors du login (pas besoin du githubId)

## Création du formulaire pour les templates

## On continue le formulaire des templates

Template

- [ ] Création du formulaire pour ajouter un template
- [ ] Endpoint pour ajouter un template
- [ ] Gestion du md pour la description
- [ ] Visualisation des thèmes dans la partie administration
- [ ] Gestion des id de l'url via https://github.com/ai/nanoid

Première page (hors stream pour le contenu et les texts)

- [ ] Ajout d'une page d'accueil

PR à ajouter dans les contributions:

https://github.com/nuxt-hub/core/pull/113
https://github.com/nuxt/ui-pro/issues/372

(il faut voir si le problème de couleurs vient de ui, ui pro ou nuxt hub ?
