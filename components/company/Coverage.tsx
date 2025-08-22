import { MapPin, Database, Globe2 } from "lucide-react";

export default function Coverage() {
	return (
		<section id="coverage" className="py-20 bg-gray-50 dark:bg-gray-800/60">
			<div className="container mx-auto px-6">
				<div className="max-w-5xl mx-auto text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Current Coverage</h2>
					<p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
						We're starting deep—then expanding wide. Our intelligence fabric currently maps thousands of local business entities with weekly enrichment.
					</p>
				</div>
				<div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
					<div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow border border-gray-200 dark:border-gray-700">
						<div className="flex items-center gap-3 mb-3 text-blue-600 dark:text-blue-400"><MapPin className="w-5 h-5" /><span className="font-semibold">Primary Market</span></div>
						<div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">San Antonio, TX</div>
						<p className="text-sm text-gray-600 dark:text-gray-400">Hyper-local depth: reputation velocity, lead funnels, category benchmarks.</p>
					</div>
					<div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow border border-gray-200 dark:border-gray-700">
						<div className="flex items-center gap-3 mb-3 text-purple-600 dark:text-purple-400"><Database className="w-5 h-5" /><span className="font-semibold">Indexed Businesses</span></div>
						<div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">~4,000+</div>
						<p className="text-sm text-gray-600 dark:text-gray-400">Continuously enriched entity graph across service categories.</p>
					</div>
						<div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow border border-gray-200 dark:border-gray-700">
						<div className="flex items-center gap-3 mb-3 text-green-600 dark:text-green-400"><Globe2 className="w-5 h-5" /><span className="font-semibold">Expansion Wave</span></div>
						<div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Additional TX MSAs</div>
						<p className="text-sm text-gray-600 dark:text-gray-400">Houston, Austin & DFW targeting Q1 rollout (priority waitlist open).</p>
					</div>
				</div>
			</div>
		</section>
	);
}

