---
title: Introduction
---

# Welcome to DarkVein

DarkVein is a platform for Adversary Simulations and Red Team Operations. It is designed to execute post-exploitation agent-based tasks with a focus on **stealth**, **evasion**, and **flexibility**.

## Core Philosophy

DarkVein differs from other C2 frameworks by prioritizing **Native API Evasion**. Instead of relying on standard Windows APIs which are heavily hooked by EDRs, DarkVein's agents (Toxin) can dynamically switch between:

*   **Direct Syscalls**: Executing syscalls directly to bypass userland hooks.
*   **Indirect Syscalls**: Jumping through valid `ntdll` gadgets to mask the call origin.
*   **Native APIs**: Using `ntdll` exports directly when appropriate.

## Architecture

The framework is composed of three main components:

1.  **Team Server**: The C2 controller written in Go. It manages listeners, agents, and data storage.
2.  **Client**: A modern React-based dashboard for operators to interact with the server.
3.  **Toxin Agent**: The advanced payload (C++) deployed on target systems.

## Key Features

*   **Multi-User Collaboration**: Multiple operators can connect to the same Team Server.
*   **Graph View**: Visualize agent relationships and pivot chains in real-time.
*   **Beacon Object Files (BOF)**: Run COFF object files (`.o`) from memory.
*   **SMB Pivoting**: Chain agents through named pipes to reach segmented networks.
