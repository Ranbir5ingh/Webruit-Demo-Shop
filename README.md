# Webruit Demo Shop

The site Webruit is pointed at. This repository is a real storefront, not a folder inside the product. [Webruit](https://github.com/Ranbir5ingh/Webruit) is the intelligence platform. This shop is the website that platform watches, understands, and proposes changes for.

The storefront sells **ResumeKit Pro**: a landing page with a hero, feature list, reviews, FAQ, and a buy action, plus the legal pages and a small admin view of payments. It is wired the same way a customer site would be. The build plugin runs when the client compiles, and the tracking SDK runs in the browser.

## How Webruit is attached

At build time, `@webruit/build-plugin` is registered in the Vite config. It walks the React tree, stamps `data-wb-id` and `data-wb-el-id` onto the JSX, and uploads a manifest so a click can be traced back to a component and a file.

At runtime, the page loads `@webruit/tracking` with the shop's project key. Page views, clicks, scroll, and the rest of the SDK's events are sent to Webruit against those IDs. The shop itself does not analyze anything. It only renders the product and records behavior.

## What the shop does

The public site is the ResumeKit Pro sales page: hero, features, reviews, a call to action, and FAQ. Checkout starts a UPI payment, then the API stores the payment and can email the kit once the status is marked complete. Legal pages cover privacy, terms, disclaimer, refunds, and contact.

`/admin/payments` is a protected view of those payment records.

## Repository

```text
.
├── client/            # Vite + React storefront
└── server/            # Express API for payments
```

`client` is the site visitors use, and the only part the build plugin and tracking SDK touch. `server` is the shop's own API: MongoDB-backed payment records, status updates, and the email that follows a completed payment. It is not the Webruit API.
