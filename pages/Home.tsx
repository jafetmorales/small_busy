import Hero from "../components/portfolio/Hero";
import Coverage from "../components/company/Coverage";
import Solutions from "../components/company/Solutions";
import CaseStudy from "../components/company/CaseStudy";
import ActionPlan from "../components/company/ActionPlan";
import ROICalculator from "../components/company/ROICalculator";
import DataMethodology from "../components/company/DataMethodology";
import Contact from "../components/portfolio/Contact";

export default function Home() {
	return (
		<>
			<Hero />
			<Coverage />
			<Solutions />
			<CaseStudy />
			<ActionPlan />
			<ROICalculator />
			<DataMethodology />
			<Contact />
		</>
	);
}
