---
name: AI provider fallback
description: What to do when hosted Replit AI setup requires an account upgrade
---

When hosted AI provisioning is unavailable because the account requires an upgrade, use the secure workspace secret flow for the explicitly requested provider's own API key rather than retrying provisioning or asking for the key in chat.

**Why:** Hosted AI setup can exit into an account-upgrade flow, and repeating it is not useful; API keys must never be exposed in conversation.

**How to apply:** Keep the provider API call server-side, use the existing secret name, and continue building non-AI product surfaces while the secure secret request is pending.