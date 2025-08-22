import { useEffect, useState } from 'react';

interface AlertPayload {
  id: string;
  period_start: string;
  period_end: string;
  summary?: { competitor_changes?: number; metric_improvements?: number; opportunities?: number };
  created_at?: string;
  payload_json?: any;
}

export default function Dashboard() {
  const [latest, setLatest] = useState<AlertPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Placeholder fetch – real endpoint to be implemented
    async function fetchLatest() {
      try {
        setLoading(true);
        const res = await fetch('/api/alerts/latest');
        if (!res.ok) throw new Error('Failed');
        const data = await res.json();
        setLatest(data);
      } catch (e:any) {
        setError(e.message);
      } finally { setLoading(false); }
    }
    fetchLatest();
  }, []);

  return (
    <div className="container mx-auto px-6 py-24">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Dashboard</h1>
      {loading && <div>Loading latest alert…</div>}
      {error && <div className="text-red-600">{error}</div>}
      {latest && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Latest Weekly Alert</h2>
            <span className="text-sm text-gray-500">{latest.period_start} → {latest.period_end}</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MetricCard label="Competitor Changes" value={latest.summary?.competitor_changes ?? 0} />
            <MetricCard label="Metric Improvements" value={latest.summary?.metric_improvements ?? 0} />
            <MetricCard label="Opportunities" value={latest.summary?.opportunities ?? 0} />
            <MetricCard label="Actions" value={latest.payload_json?.actions?.length ?? 0} />
          </div>
          <Section title="Top Competitor Changes" items={latest.payload_json?.competitor_changes?.slice?.(0,3)} empty="No changes detected." render={ (c:any) => (
            <li className="flex justify-between text-sm"><span>{c.name}</span><span className="text-gray-500">{c.type}</span></li>
          ) } />
          <Section title="Opportunities" items={latest.payload_json?.zip_opportunities?.slice?.(0,3)} empty="No opportunities." render={ (o:any) => (
            <li className="flex justify-between text-sm"><span>{o.zip}</span><span className="text-gray-500">score {o.score}</span></li>
          ) } />
          <Section title="Recommended Actions" items={latest.payload_json?.actions?.slice?.(0,3)} empty="No actions." render={ (a:any) => (
            <li className="flex justify-between text-sm"><span>{a.description}</span><span className="text-gray-500">P{a.priority}</span></li>
          ) } />
        </div>
      )}
    </div>
  );
}

function MetricCard({ label, value }: { label:string; value:any }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-900/40 rounded-lg p-4 text-center">
      <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
      <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">{label}</div>
    </div>
  );
}

function Section({ title, items, empty, render }: { title:string; items:any[]; empty:string; render:(i:any)=>any }) {
  return (
    <div>
      <h3 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300 uppercase tracking-wide">{title}</h3>
      <ul className="space-y-1">
        {Array.isArray(items) && items.length > 0 ? items.map((i,idx)=> <div key={idx}>{render(i)}</div>) : <li className="text-xs text-gray-500">{empty}</li>}
      </ul>
    </div>
  );
}
