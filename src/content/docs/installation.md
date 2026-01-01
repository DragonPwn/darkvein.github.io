---
title: Installation
---

# Installation Guide

## Server Requirements

*   **OS**: Windows, Linux, or macOS.
*   **Go**: Version 1.21+ installed.
*   **Mingw-w64**: Required for compiling agents on Windows/Linux.

## Building the Team Server

1.  Clone the repository.
2.  Navigate to the `server/` directory.
3.  Install dependencies:
    ```bash
    go mod download
    ```
4.  Run the server:
    ```bash
    go run main.go
    ```

## Setting up the Client

1.  Navigate to the `client/` directory.
2.  Install Node.js dependencies:
    ```bash
    npm install
    ```
3.  Start the development interface:
    ```bash
    npm run dev
    ```
4.  Navigate to `http://localhost:5173` to log in. Default credentials: `admin` / `password`.
