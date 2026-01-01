---
title: BOFs
---

# Beacon Object Files (BOF)

DarkVein supports the execution of Beacon Object Files (BOFs). This allows you to extend the agent's capabilities without recompiling the agent or dropping DLLs to disk.

## How it works

The Toxin agent includes a custom COFF loader (`coff_loader.cpp`) that:
1.  Allocates memory for the BOF.
2.  Resolves relocations and symbols for the target architecture.
3.  Executes the entry point.
4.  Captures output and sends it back to the server.

## Usage

Use the `bof` command:

```bash
bof /path/to/my_extension.x64.o argument1 argument2
```

## Developing BOFs

You can compile standard C code into COFF files using Mingw-w64 or Visual Studio `cl.exe`.

```c
#include <windows.h>
#include "beacon.h"

void go(char* args, int len) {
    BeaconPrintf(CALLBACK_OUTPUT, "Hello from BOF!");
}
```
