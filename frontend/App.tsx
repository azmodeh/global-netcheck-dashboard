import { useState } from "react";
import { MapView } from "./components/MapView";
import { CheckInput } from "./components/CheckInput";
import { MeshGradient } from "./components/MeshGradient";
import { LiquidGlass } from "./components/LiquidGlass";
import { Sparkles } from "./components/Sparkles";
import { AnimatedFooter } from "./components/AnimatedFooter";
import type { CheckResponse } from "~backend/netcheck/check";

export default function App() {
  const [result, setResult] = useState<CheckResponse | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white relative">
      <MeshGradient />
      <Sparkles />
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Global NetCheck Dashboard
          </h1>
          <p className="text-gray-400 text-lg">
            Checker Vista - Monitor network from global nodes
          </p>
        </header>

        <LiquidGlass>
          <CheckInput
            onResult={setResult}
            loading={loading}
            setLoading={setLoading}
          />
          
          {result && (
            <div className="mt-8">
              <MapView nodes={result.nodes} />
              
              <div className="mt-6 grid gap-4">
                {result.nodes.map((node, idx) => (
                  <div
                    key={idx}
                    className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">
                          {node.location}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {node.country}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-green-400 font-mono">
                          {node.status}
                        </p>
                        <p className="text-sm text-gray-400">
                          {node.responseTime.toFixed(0)}ms
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </LiquidGlass>
      </div>

      <AnimatedFooter />
    </div>
  );
}
