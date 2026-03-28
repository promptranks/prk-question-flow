#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { readFile } from "fs/promises";
import { homedir } from "os";
import { join } from "path";

const API_BASE = "https://admin-api.promptranks.org";
let apiKey: string | null = null;

async function loadApiKey() {
  try {
    const keyPath = join(homedir(), ".promptranks", "mcp_api_key.json");
    const data = await readFile(keyPath, "utf-8");
    const parsed = JSON.parse(data);
    apiKey = parsed.key;
  } catch (err) {
    console.error("Failed to load API key:", err);
  }
}

async function callApi(endpoint: string, body: any) {
  if (!apiKey) throw new Error("API key not loaded");

  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${await res.text()}`);
  }

  return res.json();
}

const server = new Server(
  { name: "prk-questions-mcp", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "get_or_create_industry",
      description: "Get or create an industry by slug",
      inputSchema: {
        type: "object",
        properties: {
          name: { type: "string" },
          slug: { type: "string" },
          description: { type: "string" }
        },
        required: ["name", "slug", "description"]
      }
    },
    {
      name: "get_or_create_role",
      description: "Get or create a role by slug and industry_id",
      inputSchema: {
        type: "object",
        properties: {
          name: { type: "string" },
          slug: { type: "string" },
          industry_id: { type: "string" },
          responsibilities: { type: "array", items: { type: "string" } }
        },
        required: ["name", "slug", "industry_id", "responsibilities"]
      }
    }
  ]
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "get_or_create_industry") {
    const result = await callApi("/mcp/industries", args);
    return { content: [{ type: "text", text: JSON.stringify(result) }] };
  }

  if (name === "get_or_create_role") {
    const result = await callApi("/mcp/roles", args);
    return { content: [{ type: "text", text: JSON.stringify(result) }] };
  }

  throw new Error(`Unknown tool: ${name}`);
});

async function main() {
  await loadApiKey();
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
