# lilo MCP Server

<!-- mcp-name: io.github.lilo-property/mcp-server -->

The vacation rental MCP server for AI agents. Search properties, verify host credentials, check availability, and book directly — all through structured property data. 0% commission.

## Quick Start

### Remote (Recommended)

Add to your MCP client config:

```json
{
  "mcpServers": {
    "lilo": {
      "type": "streamable-http",
      "url": "https://mcp.lilo.property/mcp"
    }
  }
}
```

### Get an API Key

```bash
curl -X POST https://mcp.lilo.property/developers/key \
  -H "Content-Type: application/json" \
  -d '{"email":"you@example.com"}'
```

## 64 Tools Across 8 Categories

| Category | Tools | Examples |
|----------|-------|---------|
| **Discovery** | 8 | Search properties, natural language search, compare properties |
| **Booking** | 3 | Check availability, create booking, verify guest identity |
| **Evidence** | 6 | Query evidence chain, verify records, dispute evidence bundles |
| **Protection** | 7 | Guest risk assessment, booking risk analysis, flag suspicious activity |
| **Intelligence** | 4 | Pricing intelligence, demand forecast, chargeback risk prediction |
| **Compliance** | 5 | Jurisdiction rules, permit requirements, insurance guidance |
| **Operations** | 7 | Inventory management, maintenance scheduling, cleaning coordination |
| **Trust** | 2 | Trust certificates, independent verification |

Plus Philadelphia destination tools, property manifests, host reputation, and more.

## Documentation

- [Full tool reference](https://mcp.lilo.property/llms.txt)
- [API documentation](https://docs.lilo.property/mcp)
- [Privacy policy](https://lilo.property/privacy)

## Credit Pricing

| Credits | Access Level |
|---------|-------------|
| Free | Property manifests, evidence verification, network stats |
| 1 | Property search, availability checks |
| 2 | Booking creation, evidence bundles |
| 3-5 | Risk assessment, compliance tools |
| 10 | Premium protection tools |

Free tier: 1,000 requests/month.

## Support

- Email: support@lilo.property
- Documentation: https://docs.lilo.property

## License

Proprietary. See [LICENSE](LICENSE) for details.
