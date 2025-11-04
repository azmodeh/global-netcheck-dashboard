import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Node {
  location: string;
  lat: number;
  lng: number;
  status: string;
  responseTime: number;
}

interface Props {
  nodes: Node[];
}

export function MapView({ nodes }: Props) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    if (!mapRef.current) {
      mapRef.current = L.map(containerRef.current).setView(
        [20, 0],
        2
      );

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        {
          attribution: "©OpenStreetMap, ©CartoDB",
        }
      ).addTo(mapRef.current);
    }

    const map = mapRef.current;
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    nodes.forEach((node) => {
      const icon = L.divIcon({
        className: "custom-marker",
        html: `<div style="background: ${
          node.status === "online" ? "#22c55e" : "#ef4444"
        }; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>`,
      });

      L.marker([node.lat, node.lng], { icon })
        .addTo(map)
        .bindPopup(
          `<b>${node.location}</b><br/>${node.status} - ${node.responseTime.toFixed(0)}ms`
        );
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [nodes]);

  return (
    <div
      ref={containerRef}
      className="w-full h-96 rounded-lg overflow-hidden border border-white/10"
    />
  );
}
