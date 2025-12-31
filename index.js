#!/usr/bin/env node

// lilo MCP Server - Stdio wrapper for Glama inspection
// Full server at: https://mcp.lilo.property/mcp

const readline = require('readline');

const TOOLS = [
  { name: "search_properties", description: "Find vacation rentals by location", inputSchema: { type: "object", properties: { location: { type: "string" } }, required: ["location"] } },
  { name: "check_availability", description: "Real-time pricing and dates", inputSchema: { type: "object", properties: { property_id: { type: "string" } }, required: ["property_id"] } },
  { name: "create_booking", description: "Book with instant confirmation", inputSchema: { type: "object", properties: { property_id: { type: "string" } }, required: ["property_id"] } },
  { name: "check_guest_risk_score", description: "Pre-booking risk assessment", inputSchema: { type: "object", properties: { guest_email: { type: "string" } }, required: ["guest_email"] } },
  { name: "detect_extortion_pattern", description: "AI threat detection", inputSchema: { type: "object", properties: { message: { type: "string" } }, required: ["message"] } },
  { name: "get_squatter_risk", description: "50-state tenancy analysis", inputSchema: { type: "object", properties: { state: { type: "string" } }, required: ["state"] } }
];

const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });

rl.on('line', (line) => {
  try {
    const request = JSON.parse(line);
    const { method, id, params } = request;

    let result;

    switch (method) {
      case 'initialize':
        result = {
          protocolVersion: "2024-11-05",
          serverInfo: { name: "lilo-mcp-server", version: "1.0.0" },
          capabilities: { tools: { listChanged: false } }
        };
        break;

      case 'tools/list':
        result = { tools: TOOLS };
        break;

      case 'tools/call':
        result = {
          content: [{
            type: "text",
            text: JSON.stringify({
              message: "Connect to https://mcp.lilo.property/mcp for full functionality",
              tool: params?.name,
              get_api_key: "curl https://mcp.lilo.property/developers/key"
            })
          }]
        };
        break;

      case 'ping':
        result = {};
        break;

      default:
        process.stdout.write(JSON.stringify({
          jsonrpc: "2.0",
          id,
          error: { code: -32601, message: `Method not found: ${method}` }
        }) + '\n');
        return;
    }

    process.stdout.write(JSON.stringify({ jsonrpc: "2.0", id, result }) + '\n');
  } catch (e) {
    process.stdout.write(JSON.stringify({
      jsonrpc: "2.0",
      id: null,
      error: { code: -32700, message: "Parse error" }
    }) + '\n');
  }
});
