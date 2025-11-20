import React from 'react';
import Link from "next/link";

interface Page {
  label: string;
  destination: string;
}

interface NavLinkProps {
  page: Page;
}

const PAGES = [
  { label: 'Home', destination: '/' },
  { label: 'Pets', destination: '/Pets' },
  { label: 'New Pet', destination: '/CreatePet' },
];

function NavLink(props: NavLinkProps) {
  const { page } = props;
  const { label, destination } = page;
  return (
    <li>
      <Link href={destination}>{label}</Link>
    </li>
  );
}

function Navbar() {
  return (
    <nav>
      <ul className="wrapper">
        {
          PAGES.map(( page ) => <NavLink key={page.destination} page={page} />)
        }
      </ul>
    </nav>
  );
}

export default Navbar;
