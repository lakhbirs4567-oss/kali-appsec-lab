#!/usr/bin/env bash
echo "========================================="
echo "    KALI TERMINAL APPSEC AUDIT LAB"
echo "========================================="

echo -e "\n[1/3] Running SAST Code Scan (Semgrep)..."
semgrep scan --config auto

echo -e "\n[2/3] Checking Third-Party Dependencies (npm audit)..."
npm audit

echo -e "\n[3/3] Running Runtime DAST Vulnerability Scan (Nikto)..."
nikto -h http://localhost:3000
