#!/usr/bin/env node

// lilo MCP Server - STDIO wrapper for registry inspection
// Full 64-tool server at: https://mcp.lilo.property/mcp

const readline = require('readline');

const TOOLS = [
  { name: "search_properties", description: "Search vacation rental properties by location, dates, and amenities", inputSchema: { type: "object", properties: { location: { type: "string", description: "City, state, or address to search" } }, required: ["location"] } },
  { name: "check_availability", description: "Check real-time availability and pricing for a property", inputSchema: { type: "object", properties: { property_id: { type: "string" }, check_in_date: { type: "string" }, check_out_date: { type: "string" } }, required: ["property_id", "check_in_date", "check_out_date"] } },
  { name: "create_booking", description: "Create a direct booking for a vacation rental property", inputSchema: { type: "object", properties: { property_id: { type: "string" }, guest_name: { type: "string" }, guest_email: { type: "string" }, check_in_date: { type: "string" }, check_out_date: { type: "string" } }, required: ["property_id", "guest_name", "guest_email", "check_in_date", "check_out_date"] } },
  { name: "get_property", description: "Get detailed information about a vacation rental property", inputSchema: { type: "object", properties: { property_id: { type: "string" } }, required: ["property_id"] } },
  { name: "get_trust_certificate", description: "Get verified property credentials and trust data", inputSchema: { type: "object", properties: { lilo_code: { type: "string" } }, required: ["lilo_code"] } },
  { name: "verify_evidence", description: "Verify an independently verified evidence record", inputSchema: { type: "object", properties: { evidence_id: { type: "string" } }, required: ["evidence_id"] } }
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
              message: "This is a preview. Connect to the full server for 64 tools.",
              remote_url: "https://mcp.lilo.property/mcp",
              tool: params?.name
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
          error: { code: -32601, message: "Method not found" }
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
