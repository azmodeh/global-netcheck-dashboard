import { useState } from "react";
import backend from "~backend/client";
import type { CheckResponse } from "~backend/netcheck/check";

interface Props {
  onResult: (result: CheckResponse) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export function CheckInput({ onResult, loading, setLoading }: Props) {
  const [host, setHost] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!host.trim()) return;

    setLoading(true);
    try {
      const result = await backend.netcheck.check({ host });
      onResult(result);
    } catch (error) {
      console.error("Check failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">
          Host or IP Address
        </label>
        <input
          type="text"
          value={host}
          onChange={(e) => setHost(e.target.value)}
          placeholder="google.com or 8.8.8.8"
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
        />
      </div>
      
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50"
      >
        {loading ? "Checking..." : "Check Network"}
      </button>
    </form>
  );
}
