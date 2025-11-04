import type { DNSRecord } from "~backend/netcheck/check";

interface Props {
  records: DNSRecord[];
}

export function DNSRecords({ records }: Props) {
  const recordsByType = records.reduce(
    (acc, record) => {
      if (!acc[record.type]) acc[record.type] = [];
      acc[record.type].push(record);
      return acc;
    },
    {} as Record<string, DNSRecord[]>
  );

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
      <h3 className="text-xl font-semibold mb-4">
        DNS Records
      </h3>
      
      <div className="space-y-4">
        {Object.entries(recordsByType).map(([type, recs]) => (
          <div key={type} className="space-y-2">
            <h4 className="text-sm font-semibold text-blue-400">
              {type} Records
            </h4>
            <div className="space-y-1">
              {recs.map((record, idx) => (
                <div
                  key={idx}
                  className="bg-black/30 rounded px-3 py-2 font-mono text-sm"
                >
                  {record.value}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
