import { networkInterfaces } from "node:os";
import type { NextConfig } from "next";

/**
 * Next blocks cross-origin requests to dev resources by default, which breaks
 * HMR if you open the "Network" URL it prints (e.g. http://192.168.0.x:3000)
 * instead of localhost. Allow this machine's own LAN addresses so either URL
 * works, without hardcoding an IP that changes with DHCP.
 */
function localAddresses(): string[] {
  return Object.values(networkInterfaces())
    .flat()
    .filter((iface) => iface && !iface.internal && iface.family === "IPv4")
    .map((iface) => iface!.address);
}

const nextConfig: NextConfig = {
  // The reference site serves every route with a trailing slash (/en/software/).
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  reactStrictMode: true,
  allowedDevOrigins: localAddresses(),
};

export default nextConfig;
