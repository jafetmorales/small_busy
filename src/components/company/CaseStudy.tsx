import { CheckCircle2, Target, ClipboardList, ArrowUpRight, Star, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function CaseStudy() {
	const ref = useRef<HTMLElement>(null);
	const [visible, setVisible] = useState(false);
	useEffect(() => {
		const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.15 });
		if (ref.current) obs.observe(ref.current);
		return () => obs.disconnect();
	}, []);

	const metrics = [
		{ label: "Online Rating", value: "4.9 / 5.0", icon: <Star className="w-4 h-4" /> },
		{ label: "Total Reviews", value: "1,438", icon: <CheckCircle2 className="w-4 h-4" /> },
		{ label: "Projected Monthly Leads", value: "45 – 75", icon: <Target className="w-4 h-4" /> },
		{ label: "Revenue Potential", value: "$134K – $223K", icon: <ArrowUpRight className="w-4 h-4" /> },
	];

	const actions = [
		"Implement review generation system",
		"Launch referral program",
		"Optimize Google Business Profile",
		"Create seasonal campaigns",
		"Set up lead tracking",
		"Schedule quarterly reviews",
	];

	return (
		<section id="case-study" ref={ref} className="py-24 bg-gray-50 dark:bg-gray-800/70 transition-colors">
			<div className="container mx-auto px-6">
				<div className="max-w-5xl mx-auto mb-16 text-center">
					<h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Case Study: Advanced Dental Associates</h2>
					<div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6" />
					<p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
						How a multi-location dental practice uncovered hidden revenue, stabilized lead flow, and built a repeatable growth cadence using Bebedio Intelligence.
					</p>
				</div>

				<div className="grid lg:grid-cols-3 gap-10">
					<div className={`lg:col-span-2 space-y-10 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} transition-all duration-700`}>
						<div className="bg-white dark:bg-gray-900 rounded-xl shadow p-8 border border-gray-200 dark:border-gray-700">
							<h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Initial Snapshot</h3>
							<p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
								With a stellar reputation (4.9★, 1,400+ reviews) but inconsistent marketing execution, Advanced Dental Associates needed clarity on which levers would reliably drive their next growth stage. Data lived across review sites, internal scheduling, ad accounts, and spreadsheets—making trend detection slow and reactive.
							</p>
							<p className="text-gray-600 dark:text-gray-300 leading-relaxed">
								After connecting sources, Bebedio generated a unified performance baseline and surfaced the top six prioritized actions tied to projected revenue ranges and lead velocity targets.
							</p>
						</div>
						<div className="bg-white dark:bg-gray-900 rounded-xl shadow p-8 border border-gray-200 dark:border-gray-700">
							<h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white flex items-center gap-2"><ClipboardList className="w-5 h-5 text-blue-600" /> Action Framework</h3>
							<ul className="space-y-3">
								{actions.map(a => (
									<li key={a} className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
										<CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
										<span>{a}</span>
									</li>
								))}
							</ul>
						</div>
						<div className="bg-white dark:bg-gray-900 rounded-xl shadow p-8 border border-gray-200 dark:border-gray-700">
							<h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Projected Impact</h3>
							<p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
								Executing the prioritized playbook stack positions the practice for a 35% conversion lift and $134K–$223K in monthly revenue potential, anchored by improved review velocity, referral amplification, and seasonal offer sequencing.
							</p>
							<p className="text-gray-600 dark:text-gray-300 leading-relaxed">
								The intelligence layer continuously re-scores opportunity impact as actions are completed, ensuring the team always works the next highest leverage initiative.
							</p>
						</div>
					</div>
					<div className={`space-y-8 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} transition-all duration-700 delay-150`}>
						<div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-xl p-8 shadow-lg">
							<div className="flex items-center gap-2 mb-4 text-sm opacity-90"><MapPin className="w-4 h-4" /> San Antonio, TX</div>
							<h4 className="text-xl font-semibold mb-6">Key Metrics Extract</h4>
							<div className="space-y-4">
								{metrics.map(m => (
									<div key={m.label} className="flex items-center justify-between text-sm">
										<div className="flex items-center gap-2 opacity-90">{m.icon}<span>{m.label}</span></div>
										<div className="font-semibold">{m.value}</div>
									</div>
								))}
							</div>
						</div>
						<div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
							<h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Why It Worked</h4>
							<ul className="text-sm space-y-2 text-gray-600 dark:text-gray-300 list-disc pl-4">
								<li>Clear weekly execution rhythm tied to forecast deltas</li>
								<li>Automated review & referral pipeline instrumentation</li>
								<li>Action scoring algorithm kept focus on compounding levers</li>
								<li>Unified revenue + reputation + lifecycle lens</li>
							</ul>
						</div>
						<div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
							<h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Next Evolution</h4>
							<p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
								Expansion into predictive rescheduling, dynamic capacity smoothing, and LTV cohort reactivation layering.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

