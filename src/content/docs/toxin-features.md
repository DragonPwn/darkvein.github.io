---
title: Toxin Features
---

# Toxin Agent Capabilities

Toxin is our advanced C++ beacon. It requires no external dependencies (like .NET) for its core functionality.

## Evasion & Stealth

*   **Syscall Techniuqes**: Configurable at build time.
    *   *Direct*: Using `syscall` instruction directly.
    *   *Indirect*: Using `JMP` gadgets to `ntdll` to legitimize the call stack.
*   **Sleep Obfuscation**: Toxin encrypts its heap and stack during sleep intervals to hide from memory scanners (e.g., Moneta, Kwya).

## Execution

*   **Bypass**: Toxin avoids standard injection APIs (`CreateRemoteThread`) that are heavily monitored.
*   **Unmanaged PowerShell**: Run standard scripts without `powershell.exe`.

## Resilience

*   **Jitter**: Randomize callback times to break network signatures.
*   **Kill Date**: Agents automatically self-destruct after a set date.
