import type { IPInfo } from "~backend/netcheck/check";

interface Props {
  info: IPInfo;
}

export function IPInfoPanel({ info }: Props) {
  return (
    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-lg p-6 border border-blue-500/20">
      <h3 className="text-xl font-semibold mb-4">
        IP Information
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <p className="text-sm text-gray-400">IP Address</p>
          <p className="font-mono text-lg">{info.ip}</p>
        </div>
        
        {info.country && (
          <div>
            <p className="text-sm text-gray-400">Country</p>
            <p className="font-semibold">{info.country}</p>
          </div>
        )}
        
        {info.region && (
          <div>
            <p className="text-sm text-gray-400">Region</p>
            <p className="font-semibold">{info.region}</p>
          </div>
        )}
        
        {info.city && (
          <div>
            <p className="text-sm text-gray-400">City</p>
            <p className="font-semibold">{info.city}</p>
          </div>
        )}
        
        {info.latitude && info.longitude && (
          <div>
            <p className="text-sm text-gray-400">Coordinates</p>
            <p className="font-mono text-sm">
              {info.latitude.toFixed(4)}, {info.longitude.toFixed(4)}
            </p>
          </div>
        )}
        
        {info.isp && (
          <div className="col-span-2 md:col-span-1">
            <p className="text-sm text-gray-400">ISP</p>
            <p className="font-semibold text-sm">{info.isp}</p>
          </div>
        )}
      </div>
    </div>
  );
}
