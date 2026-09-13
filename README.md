# Surge Website

This is the official website for **Surge — Blazing Fast TUI Download Manager**.
You can visit the live website at: [https://surgedm.github.io/](https://surgedm.github.io/)

Surge is a high-performance download manager built in Go, featuring a beautiful terminal UI, multi-threaded downloading, and a highly concurrent architecture.

## Development

The marketing site is served from `public/`; Starlight documentation is available at `/docs/`.

```sh
npm install
npm run dev
```

Deployments are built with `npm run build` and published from `dist/` by GitHub Actions.
