# Security Policy

## Reporting a vulnerability

Please do not publish exploitable security vulnerabilities in a public issue.

If you discover a security problem, contact the maintainer privately through the contact methods listed on the maintainer's GitHub profile. Include a short description, reproduction steps, affected version/commit, and the potential impact.

## Secrets and credentials

Watchpath is designed to run without private API credentials. Never commit passwords, API keys, access tokens, private keys, signing files, `.env` files, or Vercel/local credentials to the repository.

If a secret is accidentally committed, removing it in a later commit is not sufficient. Revoke/rotate the secret immediately and remove it from Git history where appropriate.

## User data

Watchpath currently stores viewing progress locally in the browser. Device transfer links/QR codes contain viewing-progress data and language preference. They must not be extended to contain passwords, authentication tokens, email addresses, or other sensitive personal information.

## Third-party content

Marvel, Disney, X-Men and other names, trademarks and poster artwork are owned by their respective rights holders. The MIT license applies to Watchpath's source code, not third-party artwork, trademarks, or other copyrighted assets.
