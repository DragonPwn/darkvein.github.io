---
title: Quick Start
---

# Quick Start Guide

This guide will help you launch your first operation in 5 minutes.

## 1. Start the Server

Server runs on port `5000` (API) and `5173` (Client dev server).

```bash
# Terminal 1
cd server
go run main.go

# Terminal 2
cd client
npm run dev
```

## 2. Login

Open `http://localhost:5173`.
*   **User**: `admin`
*   **Pass**: `password` (Default)

## 3. Create a Listener

1.  Click **Listeners** in the sidebar.
2.  Select **Create**.
3.  Choose **HTTP**.
4.  Set Port to `8080`.
5.  Click **Start Listener**.

## 4. Generate Payload

1.  Click **Payloads** -> **Generate**.
2.  Select Listener: `http_8080`.
3.  Arch: `x64`.
4.  Technique: `Indirect Syscalls` (for best evasion).
5.  Click **Generate**. A `.exe` file will download.

## 5. Execute & Interact

1.  Transfer the EXE to a Windows test VM.
2.  Run it.
3.  Check the **Dashboard** or **Graph** in the browser. You should see a green node appear.
4.  Right-click the node -> **Interact**.
5.  Type `whoami` to verify access.
