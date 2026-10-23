# Webruit Demo Shop

The site Webruit is pointed at. This repository is a demo storefront, not a folder inside the product. [Webruit](https://github.com/Ranbir5ingh/Webruit) is the intelligence platform. This shop is the website that platform watches, understands, and proposes changes for.

The storefront sells **ResumeKit Pro**: a landing page with a hero, feature list, reviews, FAQ, and a buy action, plus the legal pages and a small admin view of payments. It is wired the same way a customer site would be. The build plugin runs when the client compiles, and the tracking SDK runs in the browser.

**This demo is frontend-only.** There is no shop backend: checkout is a dummy flow, "payments" are recorded in the visitor's own browser (localStorage), and the admin view reads them back from there. A banner on the site says so. The only real server involved is Webruit's own API.

## How Webruit is attached

At build time, `@webruit/build-plugin` is registered in the Vite config. It walks the React tree, stamps `data-wb-id` and `data-wb-el-id` onto the JSX, and uploads a manifest so a click can be traced back to a component and a file.

At runtime, the page loads `@webruit/tracking` with the shop's project key. Page views, clicks, scroll, and the rest of the SDK's events are sent to Webruit against those IDs. The shop itself does not analyze anything. It only renders the product and records behavior.

Both packages come from npm (`@webruit/tracking`, `@webruit/build-plugin`) and default to the hosted Webruit Cloud (api.webruit.tech), so no endpoint configuration is needed outside local development.

On page load, a wake-up gate pings the Webruit API's `/health`: the API naps on free hosting, so the gate holds a request open to spin it up and renders the shop once the API answers — which also means the tracking on this page is live, not simulated. The Webruit dashboard uses the same pattern.

## What the shop does

The public site is the ResumeKit Pro sales page: hero, features, reviews, a call to action, and FAQ. Checkout runs a dummy UPI payment flow and records the "payment" in the browser. Legal pages cover privacy, terms, disclaimer, refunds, and contact.

`/admin/payments` is a password-gated view of those locally stored payment records (the password check is client-side; it is a demo, not a vault).

## Repository

```text
.
└── client/            # Vite + React storefront — the whole demo
```
