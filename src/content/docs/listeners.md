---
title: Listeners
---

# Listeners

Listeners are the C2 endpoints that agents connect to. DarkVein supports multiple protocols for flexibility and resilience.

## HTTP Listener

The standard HTTP listener uses simple GET/POST requests to exchange data.

*   **Host**: The IP or Domain of the Redirector/C2.
*   **Port**: Port to bind on (e.g., 80, 443, 8080).
*   **UserAgent**: The User-Agent string to spoof (e.g., `Mozilla/5.0...`).

## DNS Listener

The DNS listener uses TXT and A records to tunnel communication, effective for restricted networks where only DNS is allowed.

*   **Mode**: `TXT` (Recommended, higher bandwidth) or `A` (Legacy).
*   **Poll**: Interval in seconds.

## SMB Pivot Listener

The SMB Listener allows for peer-to-peer communication between agents over Named Pipes.

*   **Pipe Name**: The name of the pipe (e.g., `mojo.568.10`).
*   **Usage**: Create a "Link" command from an existing agent to the SMB pipe of the target agent.

### Setup Example

1.  Navigate to **Listeners** in the sidebar.
2.  Click **Create Listener**.
3.  Select protocol (e.g., `HTTP`).
4.  Configure `Bind Port` (80) and `Host` (192.168.1.5).
5.  Click **Save**.
