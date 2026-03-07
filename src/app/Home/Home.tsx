import LoginSignup from "../../lib/LoginSignup";
import "./Home.css";

export default function Home() {
	return (
		<main className="loggedout-home">
			<h1>Bolipets!</h1>
			<h3>Art by Ali Maza</h3>
			<h3>Programming and website by Bo Kaufman</h3>
			<LoginSignup />
		</main>
	);
}
