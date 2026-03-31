import { Link } from 'react-router';
import Logout from '../../../lib/Logout';

interface Page {
	label: string;
	destination: string;
}

interface NavLinkProps {
	page: Page;
}

const PAGES = [
	{ label: 'Pets', destination: '/' },
	{ label: 'New Pet', destination: '/CreatePet' },
	{ label: 'Shelter', destination: '/Shelter' },
];

function NavLink(props: NavLinkProps) {
	const { page } = props;
	const { label, destination } = page;
	return (
		<li>
			<Link to={destination}>{label}</Link>
		</li>
	);
}

function Navbar() {
	return (
		<nav>
			<ul className="wrapper">
				{PAGES.map((page) => (
					<NavLink key={page.destination} page={page} />
				))}
				<Logout />
			</ul>
		</nav>
	);
}

export default Navbar;
