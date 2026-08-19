import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname, "../"),
  outputFileTracingIncludes: {
    "/api/**/*": ["../books/**/*", "./books/**/*"],
    "/**/*": ["../books/**/*", "./books/**/*"]
  }
};

export default nextConfig;
