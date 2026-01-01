---
title: Developing Custom BOFs
date: 2025-01-05
author: DragonPwn
tags: [Tutorial, Development, BOF]
excerpt: A comprehensive guide to writing and compiling Beacon Object Files for DarkVein agents.
---

# Beacon Object Files (BOF)

Beacon Object Files (BOFs) are compiled C object files that are executed by the DarkVein agent in a separate thread. This allows you to extend the agent's capabilities without recompiling the beacon itself.

## Why use BOFs?

1.  **Stealth**: BOFs run in the agent's memory. No `fork()` or `exec()`.
2.  **Size**: Keep the agent small. Load functionality only when needed.
3.  **Community**: Use thousands of existing CS-compatible BOFs.

## Writing a Hello World BOF

Create a file named `hello.c`:

```c
#include <windows.h>
#include "beacon.h"

void go(char* args, int alen) {
    BeaconPrintf(CALLBACK_OUTPUT, "Hello from BOF!");
}
```

## Compiling

You can use MinGW or MSVC.

```bash
x86_64-w64-mingw32-gcc -c hello.c -o hello.o
```

## Executing in DarkVein

From the dashboard console:

```bash
inline-execute hello.o
```

DarkVein handles the linking and resolving of symbols automatically.
