# Surge Website

This is the official website for **Surge — Blazing Fast TUI Download Manager**.
You can visit the live website at: [https://surgedm.github.io/](https://surgedm.github.io/)

Surge is a high-performance download manager built in Go, featuring a beautiful terminal UI, multi-threaded downloading, and a highly concurrent architecture.

## Development

The homepage, privacy policy, and 404 page are Astro routes in `src/pages/`. Starlight serves the documentation at `/docs/`. Shared site components live in `src/components/`.

```sh
npm install
npm run dev
```

Deployments are built with `npm run build` and published from `dist/` by GitHub Actions.
