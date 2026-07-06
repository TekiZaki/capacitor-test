# AI Agent Instructions for Capacitor Android Project

Welcome, Agent. This document outlines the architecture, constraints, and operational guidelines for assisting with this Capacitor Android application. If you don't know about Capacitor, you can learn more about it [here](https://capacitorjs.com/docs).

Please read these instructions carefully before proposing or implementing changes.

---

## 1. Project Architecture

This is a hybrid mobile application built using **Capacitor** and standard web technologies (HTML, CSS, and JavaScript).

* **Web Root Directory (`www/`):** Contains the front-end application code (`index.html`, `styles.css`, `app.js`). This is where the core user interface, styling, and client-side logic reside.
* **Native Android Project (`android/`):** Contains the auto-generated native Android wrapper. It wraps the web content inside a native Android WebView and bridges access to hardware APIs.
* **Configuration:** 
  * `capacitor.config.ts`: Controls the Capacitor bridge behavior, package identifiers, and points to `www` as the web directory.
  * `package.json`: Holds npm packages, scripts, and Capacitor dependencies.

---

## 2. Developer Preferences & Constraints (CRITICAL)

* **No Local Android SDK/Gradle builds:** The developer prefers to avoid local Android environment setup, Gradle builds, and Android SDK command-line dependencies due to environment configuration difficulties and mental trauma.
* **Cloud Builds only:** Android compilation (`.apk` generation) is offloaded entirely to GitHub Actions via the workflow file `.github/workflows/build-apk.yml`.
* **Web-First Live Preview:** Advise the developer to live-preview and test their layout changes on their local computer inside a standard web browser (simulating mobile device screens in Developer Tools) rather than triggering native compilation for design tweaks.

---

## 3. How to Make Changes

When modifying the codebase, prioritize standard web code updates unless a native feature is specifically requested.

### A. Modifying the User Interface / Business Logic
Focus your modifications exclusively inside the `/www` directory:
* **HTML Structure:** `www/index.html`
* **Visual Styling:** `www/styles.css`
* **JavaScript Interactivity:** `www/app.js`

### B. Adding Plugins or NPM Dependencies
If the user requests features requiring device hardware (e.g., Camera, Device info, Storage):
1. Choose the official `@capacitor/` plugin counterpart (e.g., `@capacitor/camera`, `@capacitor/device`).
2. Add the dependency to the `package.json` file.
3. Make sure to specify any required permissions in `android/app/src/main/AndroidManifest.xml`.
4. The GitHub Actions builder will automatically run `npm install` and `npx cap sync android` during the cloud compilation phase.

### C. Modifying the Android Configuration
Only edit files within the `android/` directory if:
* The developer requests to change permissions (`android/app/src/main/AndroidManifest.xml`).
* The developer needs to update SDK compile versions or package variables (`android/variables.gradle`).
* App assets like Launcher icons or splash screens are being replaced.

---

## 4. Key CLI Commands Reference

If the developer does decide to run commands locally, provide these commands for convenience:
* **Run a local web preview server:** `npm run serve` (or `npx serve www`)
