import { api } from "encore.dev/api";
import { secret } from "encore.dev/config";
import dns from "dns/promises";

const ipGeoApiKey = secret("IPGeoLocationKey");

export interface DNSRecord {
  type: string;
  value: string;
  ttl?: number;
}

export interface IPInfo {
  ip: string;
  hostname?: string;
  country?: string;
  countryCode?: string;
  region?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  isp?: string;
  organization?: string;
  timezone?: string;
  currencyCode?: string;
  currencyName?: string;
  callingCode?: string;
  connectionType?: string;
  isTor?: boolean;
  isProxy?: boolean;
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
  ipInfo: IPInfo;
  dnsRecords: DNSRecord[];
  nodes: NodeResult[];
  timestamp: string;
}

async function getDNSRecords(
  hostname: string
): Promise<DNSRecord[]> {
  const records: DNSRecord[] = [];

  try {
    const a = await dns.resolve4(hostname);
    a.forEach((ip) => records.push({ type: "A", value: ip }));
  } catch (e) {
    // Ignore
  }

  try {
    const aaaa = await dns.resolve6(hostname);
    aaaa.forEach((ip) => records.push({ 
      type: "AAAA", 
      value: ip 
    }));
  } catch (e) {
    // Ignore
  }

  try {
    const mx = await dns.resolveMx(hostname);
    mx.forEach((record) =>
      records.push({
        type: "MX",
        value: `${record.priority} ${record.exchange}`,
      })
    );
  } catch (e) {
    // Ignore
  }

  try {
    const ns = await dns.resolveNs(hostname);
    ns.forEach((server) => records.push({ 
      type: "NS", 
      value: server 
    }));
  } catch (e) {
    // Ignore
  }

  try {
    const txt = await dns.resolveTxt(hostname);
    txt.forEach((record) =>
      records.push({ type: "TXT", value: record.join(" ") })
    );
  } catch (e) {
    // Ignore
  }

  try {
    const cname = await dns.resolveCname(hostname);
    cname.forEach((record) => records.push({ 
      type: "CNAME", 
      value: record 
    }));
  } catch (e) {
    // Ignore
  }

  try {
    const soa = await dns.resolveSoa(hostname);
    records.push({
      type: "SOA",
      value: `${soa.nsname} ${soa.hostmaster}`,
    });
  } catch (e) {
    // Ignore
  }

  return records;
}

interface IPGeoResponse {
  ip?: string;
  hostname?: string;
  location?: {
    country_name?: string;
    country_code2?: string;
    state_prov?: string;
    city?: string;
    latitude?: string;
    longitude?: string;
  };
  network?: {
    asn?: {
      organization?: string;
    };
    connection_type?: string;
    company?: {
      name?: string;
    };
  };
  time_zone?: {
    name?: string;
  };
  currency?: {
    code?: string;
    name?: string;
  };
  country_metadata?: {
    calling_code?: string;
  };
  security?: {
    is_tor?: boolean;
    is_proxy?: boolean;
  };
}

async function getIPInfo(
  host: string
): Promise<IPInfo | undefined> {
  try {
    const apiKey = ipGeoApiKey();
    const url = `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${host}&include=security`;
    const response = await fetch(url);
    const data = await response.json() as IPGeoResponse;

    return {
      ip: data.ip || host,
      hostname: data.hostname,
      country: data.location?.country_name,
      countryCode: data.location?.country_code2,
      region: data.location?.state_prov,
      city: data.location?.city,
      latitude: data.location?.latitude
        ? parseFloat(data.location.latitude)
        : undefined,
      longitude: data.location?.longitude
        ? parseFloat(data.location.longitude)
        : undefined,
      isp: data.network?.company?.name,
      organization: data.network?.asn?.organization,
      timezone: data.time_zone?.name,
      currencyCode: data.currency?.code,
      currencyName: data.currency?.name,
      callingCode: data.country_metadata?.calling_code,
      connectionType: data.network?.connection_type,
      isTor: data.security?.is_tor,
      isProxy: data.security?.is_proxy,
    };
  } catch (e) {
    return undefined;
  }
}

// Gets network info and DNS records automatically
export const info = api<void, CheckResponse>(
  { expose: true, method: "GET", path: "/info" },
  async (): Promise<CheckResponse> => {
    const ipInfo = await getIPInfo("");
    
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
        lng: 51.668,
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

    let dnsRecords: DNSRecord[] = [];
    if (ipInfo?.hostname) {
      dnsRecords = await getDNSRecords(ipInfo.hostname);
    }

    return {
      ipInfo: ipInfo || { ip: "unknown" },
      dnsRecords,
      nodes,
      timestamp: new Date().toISOString(),
    };
  }
);
