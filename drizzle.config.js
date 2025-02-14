/** @type { import("drizzle-kit").Config} */
export default {
    schema: "./utils/schema.js",
    dialect: "postgresql",
    dbCredentials: {
        url: 'postgresql://neondb_owner:npg_SB3MUAGmac4k@ep-spring-violet-a86ye4sb-pooler.eastus2.azure.neon.tech/ai-mock-interview-platform?sslmode=require'
    }
};
