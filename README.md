# Portfolio

Site de présentation personnel (portfolio) sous la forme d'un site statique HTML/CSS/JS.

## Description

Ce dépôt contient le code source d'un site web statique (HTML, CSS, JavaScript) servant de portfolio et de page de
contact pour Alexandre Simoes. Le site comprend :

- une page d'atterrissage `index.html`,
- une page de présentation complète `home.html`,
- les styles dans le dossier `css/` et les scripts dans `js/`,
- les ressources (images, SVG, icônes) dans `img/` et `svg/`, la vidéo dans `video/` et le CV au format PDF dans `pdf/`.

Il s'agit d'un site statique : aucune étape de compilation n'est requise, il peut être ouvert localement dans un
navigateur ou déployé tel quel (par exemple via GitHub Pages).

Objectifs :

- Présenter le profil et le CV (PDF dans `pdf/CV.pdf`).
- Afficher des photos et pictogrammes (dossier `img/png/` et `img/svg/`).
- Intégrer une vidéo de présentation (dossier `videos/`).
- Fournir des liens vers les profils sociaux (GitHub, LinkedIn, e-mail).

## Structure du dépôt

- `index.html`- page d'entrée du site.
- `home.html` - page d'accueil.
- `script.js` - JavaScript (interactions légères).
- `css/` - styles CSS
- `img/` - images utilisées dans le site.
    - `png/` - images au format PNG.
    - `svg/` - images au format SVG.
    - `icon/` - icônes utilisées dans le site.
- `js/` - scripts JavaScript.
- `pdf/CV.pdf` - CV téléchargeable.
- `videos/` - vidéos utilisées dans le site.
- `README.md` - ce fichier.

## Lancer le site en local

Le site étant statique, il peut être ouvert directement dans un navigateur en double-cliquant sur `index.html` après
avoir cloné le dépôt.

## Déploiement (GitHub Pages)

Le site est déployé
sur [https://alexandres78.github.io/portfolio-as.github.io/](https://alexandres78.github.io/portfolio-as.github.io/)

> Pour déployer le projet sur GitHub Pages :
> 1. Allez dans les paramètres du dépôt sur GitHub → Settings → Pages.
> 2. Dans la section "Source" (ou "Build and deployment"), sélectionnez la branche `main` (ou `gh-pages`) et le dossier
     > racine `/(root)`. Enregistrez.
> 3. GitHub Pages publiera votre site à l'URL `https://<votre-utilisateur>.github.io/<nom-du-depot>/`.
>
> Conseil : si `index.html` utilise des chemins relatifs, le site fonctionnera sans autre modification. Sinon, ajoutez
> dans la `<head>` de `index.html` une balise `<base href="/<nom-du-depot>/"\>` (en remplaçant `<nom-du-depot>`) ou
> publiez depuis la branche `gh-pages` pour que la racine corresponde.

## Contact

Vous pouvez me contacter via :

<ul>
  <li>
    <img src="img/svg/icon-mail.svg" alt="Logo Gmail" title="Logo Gmail" width="15" height="15" />
    Email : <a href="mailto:alexandre.simoes.2006@gmail.com" title="Envoyer un e‑mail à Alexandre">alexandre.simoes.2006@gmail.com</a>
  </li>
  <li>
    <img src="img/svg/icon-github.svg" alt="Logo GitHub" title="Logo GitHub" width="15" height="15" />
    GitHub : <a href="https://github.com/AlexandreS78" target="_blank" rel="noopener noreferrer" title="Voir le profil GitHub d'Alexandre">https://github.com/AlexandreS78</a>
  </li>
  <li>
    <img src="img/svg/icon-linkedin.svg" alt="Logo LinkedIn" title="Logo LinkedIn" width="15" height="15" />
    LinkedIn : <a href="https://www.linkedin.com/in/alexandre-simoes-aab7ab274" target="_blank" rel="noopener noreferrer" title="Voir le profil LinkedIn d'Alexandre">https://www.linkedin.com/in/alexandre-simoes-aab7ab274</a>
  </li>
</ul>