# Kali Linux Web Application Security & Terminal Audit Lab

A full-stack secure REST API built with Node.js and audited using terminal security scanners in Kali Linux.

## Security Controls Implemented
* **HTTP Header Hardening:** `helmet` for CSP, HSTS, and clickjacking protection.
* **CSRF Defense:** Double-submit cookie CSRF tokens via `csrf-csrf`.
* **Rate Limiting:** `express-rate-limit` to prevent brute-force attacks.
* **Containerized DB:** PostgreSQL & Redis running via Docker Compose.

## Automated Audit Pipeline (`./audit.sh`)
* **SAST:** Semgrep code analysis.
* **SCA:** `npm audit` dependency checks.
* **DAST:** Nikto web server scanning.

## Quick Start
1. Install dependencies: `npm install`
2. Start databases: `docker compose up -d`
3. Launch server: `node server.js`
4. Run security audit: `./audit.sh`
