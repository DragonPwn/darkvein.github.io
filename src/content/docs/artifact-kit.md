---
title: Artifact Kit
---

# Artifact Kit

The Artifact Kit is the collection of source code and build scripts used to generate Toxin payloads.

## Purpose

Antivirus and EDR solutions often signature static binaries. The Artifact Kit allows any operator with a C/C++ compiler to modify the loader stubs and recompile the payloads, changing their signature completely.

## Structure

*   `toxin_new/src/main/`: The main entry point (Shellcode runner).
*   `toxin_new/src/Ldr/`: Loaders for COFF and .NET.
*   `toxin_new/includes/Config.h`: Default configuration template.

## Customization

To evade signatures:

1.  **Change Strings**: Obfuscate or remove debug strings in `Config.h`.
2.  **Modify Imports**: Change how APIs are resolved in `syscalls.cpp`.
3.  **Entropy Reduction**: The framework automatically XOR encodes shellcode, but you can add your own encryption layers in `main.cpp`.

## Compilation

The artifacts are compiled server-side when you click "Generate".
However, you can manually verify compilation locally:

```bash
cd toxin_new
# Requires MinGW
x86_64-w64-mingw32-g++ -o toxin.exe src/main/main.cpp -I includes ...
```
