# Chime

Privacy-first SMS client for Android. On-device categorization, no cloud, no telemetry.

**Available on Google Play:** https://play.google.com/store/apps/details?id=com.shrivatsav.chime

The app itself lives in a separate repository — this repo is only the website. When updating feature
copy here, verify claims against the shipping app branch (`fix/chat-polish-reminders-glass`, currently
v0.4.1); the `main` branch in the app repo is stale at v0.2.0.

## Tech Stack

- Kotlin 2.2.10
- Jetpack Compose · BOM 2026.02.01
- Material 3
- Navigation Compose 2.9.8
- SQLite + FTS4
- DataStore Preferences
- WorkManager 2.9.0
- Coil 2.6.0
- JSoup 1.18.3
- Android Gradle Plugin 9.2.1
- minSdk 30 · targetSdk 36

## Website

Built with [Astro](https://astro.build). Run locally:

```sh
bun install
bun run dev
```

Open http://localhost:4321.

## Tests

```sh
bun run test
```

Builds the site and asserts against the output in `dist/`: the price renders,
the inline scripts parse, and the removed currency UI is genuinely gone. Run it
after any change to `index.astro` or `Base.astro`.

## Pages

- `/` — Landing page
- `/privacy` — Privacy Policy
- `/terms` — Terms of Service

## License

Private project.
