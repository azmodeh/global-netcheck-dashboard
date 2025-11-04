import type { IPInfo } from "~backend/netcheck/info";

interface Props {
  info: IPInfo;
}

export function IPInfoPanel({ info }: Props) {
  const items = [
    { label: "IP Address", value: info.ip, mono: true },
    { label: "Hostname", value: info.hostname },
    { label: "Country", value: info.country },
    { label: "Region", value: info.region },
    { label: "City", value: info.city },
    {
      label: "Coordinates",
      value:
        info.latitude && info.longitude
          ? `${info.latitude.toFixed(4)}, ${info.longitude.toFixed(4)}`
          : undefined,
      mono: true,
    },
    { label: "ISP", value: info.isp },
    { label: "Organization", value: info.organization },
    { label: "Timezone", value: info.timezone },
    {
      label: "Currency",
      value: info.currencyCode
        ? `${info.currencyCode} - ${info.currencyName}`
        : undefined,
    },
    { label: "Calling Code", value: info.callingCode },
    { label: "Connection", value: info.connectionType },
    {
      label: "Security",
      value: info.isTor
        ? "🔴 Tor Network"
        : info.isProxy
        ? "🟡 Proxy"
        : "🟢 Direct",
    },
  ];

  return (
    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-lg p-6 border border-blue-500/20">
      <h3 className="text-xl font-semibold mb-4">
        IP Information
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(
          (item, idx) =>
            item.value && (
              <div key={idx}>
                <p className="text-sm text-gray-400">
                  {item.label}
                </p>
                <p
                  className={
                    item.mono
                      ? "font-mono text-sm"
                      : "font-semibold text-sm"
                  }
                >
                  {item.value}
                </p>
              </div>
            )
        )}
      </div>
    </div>
  );
}
