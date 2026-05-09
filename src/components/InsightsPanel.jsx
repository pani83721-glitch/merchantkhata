import React from 'react';
import { Lightbulb } from 'lucide-react';
import { businessInsights } from '../data';

export default function InsightsPanel() {
  return (
    <div className="bg-gradient-to-br from-[#24388C] to-[#4056bc] p-6 rounded-3xl shadow-xl shadow-blue-900/20 text-white mb-6 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
      
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-md shadow-inner">
          <Lightbulb size={20} className="text-[#58D5F7]" />
        </div>
        <h2 className="text-xl font-bold">Smart Insights</h2>
      </div>
      
      <ul className="space-y-4 relative z-10">
        {businessInsights.map((insight, index) => (
          <li key={index} className="flex items-start gap-3 bg-white/5 p-3 rounded-xl hover:bg-white/10 transition-colors">
            <span className="w-2 h-2 rounded-full bg-[#58D5F7] mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(88,213,247,0.8)]"></span>
            <p className="text-sm text-blue-50 font-medium leading-relaxed">
              {insight}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
