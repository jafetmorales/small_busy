import { CalendarCheck, PlugZap, Workflow, ListChecks, BarChart3, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function ActionPlan() {
	const ref = useRef<HTMLElement>(null);
	const [show, setShow] = useState(false);
	useEffect(() => {
		const o = new IntersectionObserver(([e]) => e.isIntersecting && setShow(true), { threshold: 0.2 });
		if (ref.current) o.observe(ref.current);
		return () => o.disconnect();
	}, []);

	const steps = [
		{
			icon: <PlugZap className="w-6 h-6" />, title: "Connect Data", time: "Day 0–2",
			desc: "Secure connectors unify POS, CRM, ads, reviews, finance; model normalizes entities & historical baselines.",
		},
		{
			icon: <BarChart3 className="w-6 h-6" />, title: "Baseline & Gaps", time: "Day 3–5",
			desc: "Platform auto-generates KPI map, peer benchmarks, variance anomalies, and opportunity backlog.",
		},
		{
			icon: <ListChecks className="w-6 h-6" />, title: "Prioritized Playbook", time: "Week 2",
			desc: "AI scoring ranks review velocity, referral amplification, retention reactivation, offer cadence.",
		},
		{
			icon: <Workflow className="w-6 h-6" />, title: "Automation Layer", time: "Week 3–4",
			desc: "Activate sequences: review requests, referral triggers, churn-risk outreach, seasonal promos.",
		},
		{
			icon: <CalendarCheck className="w-6 h-6" />, title: "Rhythm & Optimization", time: "Ongoing",
			desc: "Weekly focus list updates from live metrics; quarterly strategic recalibration with forecast deltas.",
		},
		{
			icon: <ArrowUpRight className="w-6 h-6" />, title: "Scale & Deepen", time: "Phase 2",
			desc: "Advanced capacity smoothing, cohort LTV modeling, pricing elasticity testing, predictive staffing.",
		},
	];

	return (
		<section id="action-plan" ref={ref} className="py-24 bg-white dark:bg-gray-900 transition-colors">
			<div className="container mx-auto px-6">
				<div className="max-w-4xl mx-auto text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Execution Blueprint</h2>
					<div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6" />
					<p className="text-lg text-gray-600 dark:text-gray-300">From zero visibility to compounding growth—mapped to clear milestones.</p>
				</div>
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{steps.map((s, i) => (
						<div key={s.title}
							className={`relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/70 p-6 flex flex-col shadow-sm hover:shadow-xl transition-all duration-500 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
							style={{ transitionDelay: `${i * 60}ms` }}
						>
							<div className="flex items-center justify-between mb-4">
								<div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center shadow">
									{s.icon}
								</div>
								<span className="text-xs font-medium px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 tracking-wide">{s.time}</span>
							</div>
							<h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">{i + 1}. {s.title}</h3>
							<p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed flex-grow">{s.desc}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

