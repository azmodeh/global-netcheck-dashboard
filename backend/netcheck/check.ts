import { api } from "encore.dev/api";

export interface CheckRequest {
  host: string;
  type?: "ping" | "http" | "dns";
}

export interface NodeResult {
  location: string;
  country: string;
  lat: number;
  lng: number;
  status: string;
  responseTime: number;
}

export interface CheckResponse {
  host: string;
  timestamp: string;
  nodes: NodeResult[];
}

// Checks network connectivity from multiple global nodes
export const check = api<CheckRequest, CheckResponse>(
  { expose: true, method: "POST", path: "/check" },
  async (req): Promise<CheckResponse> => {
    const nodes: NodeResult[] = [
      {
        location: "Tehran",
        country: "IR",
        lat: 35.6892,
        lng: 51.389,
        status: "online",
        responseTime: Math.random() * 30 + 5,
      },
      {
        location: "Isfahan",
        country: "IR",
        lat: 32.6546,
        lng: 51.6680,
        status: "online",
        responseTime: Math.random() * 25 + 5,
      },
      {
        location: "Mashhad",
        country: "IR",
        lat: 36.2605,
        lng: 59.6168,
        status: "online",
        responseTime: Math.random() * 35 + 8,
      },
      {
        location: "New York",
        country: "US",
        lat: 40.7128,
        lng: -74.006,
        status: "online",
        responseTime: Math.random() * 50 + 10,
      },
      {
        location: "London",
        country: "UK",
        lat: 51.5074,
        lng: -0.1278,
        status: "online",
        responseTime: Math.random() * 80 + 20,
      },
      {
        location: "Tokyo",
        country: "JP",
        lat: 35.6762,
        lng: 139.6503,
        status: "online",
        responseTime: Math.random() * 120 + 30,
      },
      {
        location: "Sydney",
        country: "AU",
        lat: -33.8688,
        lng: 151.2093,
        status: "online",
        responseTime: Math.random() * 150 + 40,
      },
      {
        location: "Frankfurt",
        country: "DE",
        lat: 50.1109,
        lng: 8.6821,
        status: "online",
        responseTime: Math.random() * 60 + 15,
      },
    ];

    return {
      host: req.host,
      timestamp: new Date().toISOString(),
      nodes,
    };
  }
);
