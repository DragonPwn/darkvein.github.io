---
title: Architecture
---

# Architecture Overview

DarkVein uses a distributed Client-Server architecture designed for scalability and operational security.

## Components

### Team Server
The Team Server is the core controller.
*   **Language**: Go
*   **Role**: Manages listeners, handles agent callbacks, stores loot (credentials, files), and synchronizes state between operators.
*   **Database**: Uses an embedded SQLite database for portability.

### Client (Dashboard)
The Operator Interface.
*   **Tech Stack**: React, TypeScript, Tailwind CSS.
*   **Communication**: Connects to Team Server via Secure Websockets (WSS).
*   **Features**:
    *   **Graph View**: Visualization of the agent mesh.
    *   **Interact Console**: Terminal-like interface for tasking agents.

### Toxin (Agent)
The Implant deployed on target.
*   **Language**: C/C++ (No unrelated dependencies).
*   **Design**: Modular and position-independent (PIC) capable (via Donut) or compiled as EXE/DLL.
*   **Capabilities**:
    *   Native API execution.
    *   DOTNET assembly execution without dropping files.
    *   COFF (BOF) execution engine.

## Communications Flow

1.  **Agent -> Listener**: Toxin calls back to HTTP/DNS listener.
2.  **Listener -> Server**: Listener passes encrypted data to Team Server.
3.  **Server -> Client**: Team Server broadcasts events to active Clients via Websockets.
