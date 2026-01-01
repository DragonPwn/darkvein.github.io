---
title: Redirectors
---

# Redirectors & OpSec

Exposing your Team Server directly to the internet is dangerous. It risks attribution and infrastructure burn. DarkVein is designed to work behind **Redirectors**.

## What is a Redirector?

A Redirector is a dumb proxy (usually Nginx, Apache, or Socat) that sits between the Target and your Team Server. It forwards valid C2 traffic and drops/redirects invalid traffic.

## Dumb Pipe Setup (socat)

The simplest redirector simply forwards TCP traffic.

```bash
# On a VPS (Redirector)
socat TCP4-LISTEN:80,fork TCP4:YOUR_TEAM_SERVER_IP:8080
```

## Smart Redirector (Nginx)

Filter traffic based on User-Agent or URI to block Blue Team scanners.

```nginx
server {
    listen 80;
    server_name stats.google.com;

    location /login {
        proxy_pass http://YOUR_TEAM_SERVER_IP:8080;
        proxy_set_header Host $host;
    }

    # Redirect scanners away
    location / {
        return 301 https://www.google.com;
    }
}
```

In your Listener configuration, set the `Host` to your **Redirector's Domain**, but keep the `Bind Address` as `0.0.0.0` on your Team Server.
