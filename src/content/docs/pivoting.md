---
title: SMB Pivoting
---

# SMB Pivoting

Pivoting allows you to use a compromised host to route traffic deeper into the target network. DarkVein uses SMB Named Pipes for peer-to-peer (P2P) communication between agents.

## Concept

1.  **Gateway Agent**: Connected to Team Server via HTTP/DNS.
2.  **Internal Agent**: Cannot reach the internet, but can reach the Gateway via SMB.

## Step-by-Step

1.  **Compromise Gateway**: Get your first HTTP beacon on `Host A`.
2.  **Create Listener**:
    *   Go to Listeners -> Create SMB Listener.
    *   Name: `smb_pivot`.
    *   Pipe Name: `mojo.568.10` (or leave default).
3.  **Deploy SMB Agent**:
    *   Generate a new agent payload.
    *   Select `SMB` as the listener type.
    *   Execute this payload on `Host B` (Internal).
4.  **Link**:
    *   From `Host A`'s console, run:
        ```bash
        link_smb mojo.568.10
        ```
    *   The Gateway (`Host A`) will connect to the pipe on `Host B`.
5.  **Success**: You will see a new agent appear in the Graph View, linked to `Host A`.
