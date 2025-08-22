import { useState } from "react";
import { Calculator, ArrowUpRight } from "lucide-react";

interface Inputs {
	monthlyLeads: string;
	closeRate: string; // %
	avgTicket: string; // $ per sale
	leadLiftPct: string; // % expected improvement
	retentionLiftPct: string; // % improvement in repeat value
}

export default function ROICalculator() {
	const [inputs, setInputs] = useState<Inputs>({
		monthlyLeads: "120",
		closeRate: "30",
		avgTicket: "850",
		leadLiftPct: "18",
		retentionLiftPct: "7",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setInputs(prev => ({ ...prev, [name]: value.replace(/[^0-9.]/g, '') }));
	};

	const num = (v: string) => parseFloat(v || '0');

	const baseDeals = num(inputs.monthlyLeads) * (num(inputs.closeRate) / 100);
	const baseRevenue = baseDeals * num(inputs.avgTicket);
	const leadLiftDeals = num(inputs.monthlyLeads) * (1 + num(inputs.leadLiftPct) / 100) * (num(inputs.closeRate) / 100);
	const leadLiftRevenue = leadLiftDeals * num(inputs.avgTicket);
	const retentionLiftRevenue = leadLiftRevenue * (1 + num(inputs.retentionLiftPct) / 100);
	const revenueDelta = retentionLiftRevenue - baseRevenue;

	return (
		<section id="roi" className="py-24 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-white">
			<div className="container mx-auto px-6 max-w-5xl">
				<div className="max-w-3xl mb-12">
					<h2 className="text-4xl font-bold mb-4 flex items-center gap-3"><Calculator className="w-8 h-8 text-blue-400" /> ROI Projection</h2>
					<p className="text-gray-300">Estimate monthly revenue impact from improved lead velocity & retention tuning. Adjust assumptions to model scenarios. (Illustrative only.)</p>
				</div>
				<div className="grid md:grid-cols-2 gap-10 items-start">
					<form className="space-y-6 bg-gray-800/60 rounded-xl p-6 border border-gray-700">
						<Field label="Monthly Qualified Leads" name="monthlyLeads" value={inputs.monthlyLeads} onChange={handleChange} suffix="leads" />
						<Field label="Close Rate" name="closeRate" value={inputs.closeRate} onChange={handleChange} suffix="%" />
						<Field label="Average Ticket" name="avgTicket" value={inputs.avgTicket} onChange={handleChange} prefix="$" />
						<Field label="Expected Lead Lift" name="leadLiftPct" value={inputs.leadLiftPct} onChange={handleChange} suffix="%" />
						<Field label="Retention / Repeat Value Lift" name="retentionLiftPct" value={inputs.retentionLiftPct} onChange={handleChange} suffix="%" />
					</form>
					<div className="space-y-6">
						<div className="bg-white dark:bg-white text-gray-900 rounded-xl p-6 shadow-lg">
							<h3 className="text-lg font-semibold mb-4">Projection Summary</h3>
							<Stat label="Baseline Monthly Revenue" value={`$${formatNumber(baseRevenue)}`} />
							<Stat label="Revenue After Lead Lift" value={`$${formatNumber(leadLiftRevenue)}`} />
							<Stat label="Revenue After Retention Lift" value={`$${formatNumber(retentionLiftRevenue)}`} highlight />
							<div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm flex items-start gap-3">
								<ArrowUpRight className="w-5 h-5 text-blue-600" />
								<div>
									<div className="font-medium text-blue-700">Estimated Monthly Upside</div>
									<div className="text-2xl font-bold text-blue-700">${formatNumber(revenueDelta)}</div>
								</div>
							</div>
							<p className="text-xs text-gray-500 mt-4">Assumes compounding effect of improved lead capture & repeat economics. Not a guarantee; refine with your actual blended metrics.</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

interface FieldProps {
	label: string; name: keyof Inputs; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; prefix?: string; suffix?: string;
}
function Field({ label, name, value, onChange, prefix, suffix }: FieldProps) {
	return (
		<div>
			<label htmlFor={name} className="block text-sm font-medium mb-2 text-gray-200">{label}</label>
			<div className="flex items-center rounded-lg overflow-hidden border border-gray-700 bg-gray-900 focus-within:ring-2 focus-within:ring-blue-500">
				{prefix && <span className="px-3 text-gray-400 text-sm">{prefix}</span>}
				<input id={name} name={name} value={value} onChange={onChange} className="flex-1 bg-transparent px-3 py-2 outline-none text-white text-sm" />
				{suffix && <span className="px-3 text-gray-400 text-sm">{suffix}</span>}
			</div>
		</div>
	);
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
	return (
		<div className="text-sm flex justify-between items-center py-2 border-b last:border-none border-gray-200">
			<span className="text-gray-600">{label}</span>
			<span className={`font-semibold ${highlight ? 'text-green-600' : 'text-gray-900'}`}>{value}</span>
		</div>
	);
}

function formatNumber(n: number) {
	return n.toLocaleString(undefined, { maximumFractionDigits: 0 });
}

