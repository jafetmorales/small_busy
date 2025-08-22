import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Sparkles, Lightbulb, BarChart3, Shield, Activity } from "lucide-react";

interface SolutionData {
	title: string;
	summary: string;
	pain: string[];
	outcomes: string[];
	sampleMetrics: { label: string; before: string; after: string }[];
	insightSample?: string;
}

const SOLUTIONS: Record<string, SolutionData> = {
	"executive-kpi-hub": {
		title: "Executive KPI Hub",
		summary: "Single pane for revenue, reputation, lead velocity, and retention—auto-prioritized anomalies.",
		pain: [
			"Fragmented spreadsheets across teams",
			"Lagging view of marketing ROI",
			"Inconsistent KPI definitions",
		],
		outcomes: [
			"Weekly leadership snapshot in under 5 minutes",
			"Shared operating definitions reduce misalignment",
			"Early detection of negative trend inflections",
		],
		sampleMetrics: [
			{ label: "Lead-to-Appt Conversion", before: "22%", after: "33%" },
			{ label: "Review Velocity", before: "18/mo", after: "41/mo" },
			{ label: "Referral Share", before: "8%", after: "15%" },
		],
		insightSample: "An 11% dip in Wednesday lead confirmations correlates with staffing gaps; adjusting scheduling block adds projected +6 qualified visits / month.",
	},
	"reputation-engine": {
		title: "Reputation Engine",
		summary: "Automated multi-channel review generation, sentiment clustering & competitor benchmarks.",
		pain: ["Slow review pace", "Manual response workflows", "Unclear competitor differentials"],
		outcomes: ["2–3x review velocity", "Structured response templates", "Differentiated positioning map"],
		sampleMetrics: [
			{ label: "Avg Rating", before: "4.2", after: "4.7" },
			{ label: "Response Time", before: "72h", after: "12h" },
			{ label: "New Reviews / 30d", before: "12", after: "34" },
		],
		insightSample: "Service wait-time mentions increased 23% month-over-month—deploy updated pre-visit expectation script.",
	},
	"lead-intelligence": {
		title: "Lead Intelligence",
		summary: "Attribution clarity, velocity forecasting & funnel friction scoring in one stream.",
		pain: ["Unknown true CAC", "Overlapping channel spend", "Leaky mid-funnel"],
		outcomes: ["Consolidated source clarity", "Spend reallocation guidance", "Friction heatmap"],
		sampleMetrics: [
			{ label: "Duplicate Leads", before: "14%", after: "4%" },
			{ label: "Avg Response Lag", before: "2h 15m", after: "24m" },
			{ label: "Lead Velocity", before: "+3%", after: "+18%" },
		],
		insightSample: "43% of unconverted leads lack a follow-up within 48h; implementing staggered automation projected +11 monthly conversions.",
	},
};

export default function SolutionDetail() {
	const { slug } = useParams();
	const data = slug ? SOLUTIONS[slug] : undefined;

	if (!data) {
		return (
			<div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
				<h1 className="text-3xl font-bold mb-4">Solution Not Found</h1>
				<p className="text-gray-600 dark:text-gray-400 mb-8">The requested solution page doesn't exist yet.</p>
				<Link to="/" className="text-blue-600 hover:underline">Return Home</Link>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 pt-24 pb-20">
			<div className="container mx-auto px-6 max-w-5xl">
				<Link to="/" className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline mb-8">
					<ArrowLeft className="w-4 h-4" /> Back
				</Link>
				<h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
					<Sparkles className="w-8 h-8 text-purple-600" /> {data.title}
				</h1>
				<p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mb-10 leading-relaxed">{data.summary}</p>

				<div className="grid md:grid-cols-3 gap-10 mb-16">
					<div className="md:col-span-2 space-y-10">
						<section>
							<h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><Lightbulb className="w-5 h-5 text-yellow-500" /> Common Pain Points</h2>
							<ul className="space-y-2 text-sm">
								{data.pain.map(p => (<li key={p} className="flex gap-2"><span className="text-purple-500">•</span><span>{p}</span></li>))}
							</ul>
						</section>
						<section>
							<h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><Activity className="w-5 h-5 text-green-500" /> Outcomes</h2>
							<ul className="space-y-2 text-sm">
								{data.outcomes.map(o => (<li key={o} className="flex gap-2"><span className="text-blue-500">→</span><span>{o}</span></li>))}
							</ul>
						</section>
						<section>
							<h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-blue-600" /> Sample Lift Metrics</h2>
							<div className="space-y-3">
								{data.sampleMetrics.map(m => (
									<div key={m.label} className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 rounded-lg px-4 py-3 text-sm">
										<span className="font-medium">{m.label}</span>
										<div className="flex items-center gap-2">
											<span className="line-through opacity-60">{m.before}</span>
											<span className="text-green-600 dark:text-green-400 font-semibold">{m.after}</span>
										</div>
									</div>
								))}
							</div>
						</section>
						{data.insightSample && (
							<section>
								<h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><Shield className="w-5 h-5 text-purple-600" /> Sample Insight</h2>
								<blockquote className="border-l-4 border-purple-500 pl-4 text-sm italic text-gray-700 dark:text-gray-300 leading-relaxed">
									“{data.insightSample}”
								</blockquote>
							</section>
						)}
					</div>
					<aside className="space-y-6 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-xl p-6 self-start">
						<h3 className="text-lg font-semibold mb-2">What You Get</h3>
						<ul className="space-y-2 text-sm">
							<li>• Real-time anomaly detection</li>
							<li>• Weekly prioritized action list</li>
							<li>• Peer benchmark deltas</li>
							<li>• Exportable KPI layer</li>
							<li>• Secure data ownership</li>
						</ul>
						<Link to="/" className="inline-block mt-4 bg-white/20 hover:bg-white/30 text-sm font-medium px-4 py-2 rounded transition">Explore More Solutions</Link>
					</aside>
				</div>
			</div>
		</div>
	);
}

