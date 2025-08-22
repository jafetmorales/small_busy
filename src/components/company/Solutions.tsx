import { BarChart3, Users, Star, GitBranch, Rocket, Presentation, Repeat, LineChart, Layers, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function Solutions() {
	const [visible, setVisible] = useState(false);
	const ref = useRef<HTMLElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) setVisible(true);
		}, { threshold: 0.2 });
		if (ref.current) observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

		const modules = [
			{
				slug: 'executive-kpi-hub',
				icon: <BarChart3 className="w-6 h-6" />, title: "Executive KPI Hub",
			desc: "Unified revenue, lead, retention, and review metrics with real-time variance alerts.",
			tags: ["KPI", "Variance", "Drilldowns"],
		},
		{
				slug: 'lead-intelligence',
				icon: <Users className="w-6 h-6" />, title: "Lead Intelligence",
			desc: "Channel attribution, projected lead velocity, conversion funnel friction scoring.",
			tags: ["Attribution", "Funnel", "Forecast"],
		},
		{
				slug: 'reputation-engine',
				icon: <Star className="w-6 h-6" />, title: "Reputation Engine",
			desc: "Review harvesting, sentiment clustering, response templates, competitor benchmarks.",
			tags: ["Reviews", "Sentiment", "Benchmark"],
		},
		{
				slug: 'opportunity-graph',
				icon: <GitBranch className="w-6 h-6" />, title: "Opportunity Graph",
			desc: "AI ranks highest ROI actions weekly across acquisition, retention, and pricing levers.",
			tags: ["Prioritization", "AI", "ROI"],
		},
		{
				slug: 'lifecycle-automations',
				icon: <Repeat className="w-6 h-6" />, title: "Lifecycle Automations",
			desc: "Referral triggers, review sequences, churn risk outreach, seasonal promo scheduler.",
			tags: ["Automation", "Referrals", "Retention"],
		},
		{
				slug: 'benchmark-lens',
				icon: <Presentation className="w-6 h-6" />, title: "Benchmark Lens",
			desc: "Compare performance vs local / industry cohorts & track gap closure over time.",
			tags: ["Peers", "Ranking", "Gaps"],
		},
		{
				slug: 'predictive-forecasting',
				icon: <LineChart className="w-6 h-6" />, title: "Predictive Forecasting",
			desc: "Pipeline & revenue simulations incorporating seasonality + campaign impact.",
			tags: ["Forecast", "Scenario", "Seasonality"],
		},
		{
				slug: 'data-fabric',
				icon: <Layers className="w-6 h-6" />, title: "Data Fabric",
			desc: "Secure connectors normalize POS, CRM, Ads, Reviews, Finance into one schema you own.",
			tags: ["ETL", "Security", "Portability"],
		},
		{
				slug: 'playbook-library',
				icon: <Rocket className="w-6 h-6" />, title: "Playbook Library",
			desc: "Proven field-tested growth plays linked to metrics & auto-tracked execution.",
			tags: ["Execution", "Templates", "Tracking"],
		}
	];

	return (
		<section id="solutions" ref={ref} className="py-24 bg-white dark:bg-gray-900 transition-colors">
			<div className="container mx-auto px-6">
				<div className="max-w-5xl mx-auto text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Platform Modules</h2>
					<div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"></div>
					<p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
						Everything you need to move from reactive reporting to proactive revenue execution.
					</p>
				</div>
				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
								{modules.map((m, i) => (
									<Link to={`/solutions/${m.slug}`} key={m.title}
										className={`group bg-gray-50 dark:bg-gray-800/70 border border-gray-200/60 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-blue-600 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
										style={{ transitionDelay: `${i * 40}ms` }}
									>
										<div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center mb-5 shadow">
											{m.icon}
										</div>
										<h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 flex items-center gap-2">{m.title} <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" /></h3>
										<p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{m.desc}</p>
										<div className="flex flex-wrap gap-2">
											{m.tags.map(t => (
												<span key={t} className="text-xs px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 tracking-wide">{t}</span>
											))}
										</div>
									</Link>
								))}
				</div>
			</div>
		</section>
	);
}

