import About from "../components/portfolio/About";
import Solutions from "../components/company/Solutions";
import DataMethodology from "../components/company/DataMethodology";
import ROICalculator from "../components/company/ROICalculator";
import Coverage from "../components/company/Coverage";

export default function Platform() {
	return (
		<>
			<About />
			<Coverage />
			<Solutions />
			<DataMethodology />
			<ROICalculator />
		</>
	);
}
