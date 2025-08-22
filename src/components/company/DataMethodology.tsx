import { ShieldCheck, Database, RefreshCw, Lock, Layers } from "lucide-react";

export default function DataMethodology() {
	const items = [
		{ icon: <Database className="w-5 h-5" />, title: "Source Fusion", text: "Aggregates public listings, platform APIs (where authorized), first-party operational exports, and normalized enrichment feeds." },
		{ icon: <RefreshCw className="w-5 h-5" />, title: "Update Cadence", text: "Critical KPIs refresh daily; deep enrichment weekly; cohort & seasonal re-index monthly." },
		{ icon: <Layers className="w-5 h-5" />, title: "Entity Graph", text: "Deduplication + reconciliation resolves brand, location, practitioner, and channel identities." },
		{ icon: <ShieldCheck className="w-5 h-5" />, title: "Quality Scoring", text: "Multi-stage anomaly detection flags outliers, stale metrics, and structural breaks before surfacing." },
		{ icon: <Lock className="w-5 h-5" />, title: "Data Ownership", text: "You retain full ownership; extraction & portability endpoints available anytime." },
	];
	return (
		<section id="methodology" className="py-24 bg-gray-50 dark:bg-gray-800/60">
			<div className="container mx-auto px-6 max-w-6xl">
				<div className="text-center mb-14 max-w-3xl mx-auto">
					<h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Data Methodology</h2>
					<p className="text-gray-600 dark:text-gray-300">Confidence first. Our intelligence layer is only as strong as the rigor behind sourcing, normalization & validation.</p>
				</div>
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{items.map(i => (
						<div key={i.title} className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow border border-gray-200 dark:border-gray-700 hover:shadow-lg transition">
							<div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center mb-5">
								{i.icon}
							</div>
							<h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">{i.title}</h3>
							<p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">{i.text}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

