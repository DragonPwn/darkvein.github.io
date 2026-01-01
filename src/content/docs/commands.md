---
title: Console Commands
---

# Console Commands

The Toxin agent supports the following console commands. These are typed into the Interact console.

| Command | Description | Syntax |
| :--- | :--- | :--- |
| `ps` | List running processes using unmanaged PowerShell. | `ps` |
| `whoami` | Get current user context (Native/BOF). | `whoami` |
| `ls` / `fs_list` | List files in a directory. | `fs_list C:\Users\` |
| `upload` | Upload a file to the target. | `upload /local/path /remote/dest` |
| `download` | Download a file from the target. | `download C:\path\to\file.ext` |
| `kill` | Terminate a process by ID. | `kill <PID>` |
| `link_smb` | Connect to an SMB pipe for pivoting. | `link_smb <PIPE_NAME>` |

## Beacon Object Files (BOF)

You can execute arbitrary BOFs using the built-in loader.

```bash
bof /path/to/my_tool.x64.o <args>
```

## Scripting

Toxin also supports an internal scripting engine for automating sequences of commands. See the [Automation](/docs/automation) section.
