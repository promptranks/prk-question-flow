#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import {
  INDUSTRIES,
  ROLES,
  getIndustryById,
  getIndustryBySlug,
  getRoleById,
  getRoleBySlug,
  getRolesByIndustryId,
  getRolesByIndustrySlug
} from "./taxonomy.js";

const server = new Server(
  { name: "prk-questions-mcp", version: "2.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "list_industries",
      description: "List all available industries from the authoritative taxonomy",
      inputSchema: {
        type: "object",
        properties: {},
        required: []
      }
    },
    {
      name: "list_roles",
      description: "List all roles, optionally filtered by industry",
      inputSchema: {
        type: "object",
        properties: {
          industry_id: {
            type: "string",
            description: "Optional industry ID to filter roles"
          },
          industry_slug: {
            type: "string",
            description: "Optional industry slug to filter roles"
          }
        },
        required: []
      }
    },
    {
      name: "get_industry",
      description: "Get a specific industry by ID or slug",
      inputSchema: {
        type: "object",
        properties: {
          id: { type: "string", description: "Industry ID" },
          slug: { type: "string", description: "Industry slug" }
        }
      }
    },
    {
      name: "get_role",
      description: "Get a specific role by ID or slug",
      inputSchema: {
        type: "object",
        properties: {
          id: { type: "string", description: "Role ID" },
          slug: { type: "string", description: "Role slug" }
        }
      }
    }
  ]
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "list_industries") {
    return {
      content: [{
        type: "text",
        text: JSON.stringify(INDUSTRIES, null, 2)
      }]
    };
  }

  if (name === "list_roles") {
    let roles = ROLES;

    if (args?.industry_id) {
      roles = getRolesByIndustryId(args.industry_id as string);
    } else if (args?.industry_slug) {
      roles = getRolesByIndustrySlug(args.industry_slug as string);
    }

    return {
      content: [{
        type: "text",
        text: JSON.stringify(roles, null, 2)
      }]
    };
  }

  if (name === "get_industry") {
    let industry;

    if (args?.id) {
      industry = getIndustryById(args.id as string);
    } else if (args?.slug) {
      industry = getIndustryBySlug(args.slug as string);
    }

    if (!industry) {
      throw new Error("Industry not found");
    }

    return {
      content: [{
        type: "text",
        text: JSON.stringify(industry, null, 2)
      }]
    };
  }

  if (name === "get_role") {
    let role;

    if (args?.id) {
      role = getRoleById(args.id as string);
    } else if (args?.slug) {
      role = getRoleBySlug(args.slug as string);
    }

    if (!role) {
      throw new Error("Role not found");
    }

    return {
      content: [{
        type: "text",
        text: JSON.stringify(role, null, 2)
      }]
    };
  }

  throw new Error(`Unknown tool: ${name}`);
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("PRK Questions MCP Server v2.0.0 started");
}

main().catch(console.error);
