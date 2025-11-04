import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function LiquidGlass({ children }: Props) {
  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-3xl" />
      <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl">
        {children}
      </div>
    </div>
  );
}
