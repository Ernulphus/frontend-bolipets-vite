import { useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter, Route, Routes } from 'react-router';

import './App.css';
import './global.css';
import CreatePet from './app/CreatePet/CreatePet';
import Navbar from './app/components/Navbar/Navbar';
import Home from './app/Home/Home';
import Pets from './app/Pets/Pets';
import Pound from './app/Pound/Pound';

function App() {
	const { isAuthenticated, error } = useAuth0();

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	if (isAuthenticated) {
		return (
			<BrowserRouter>
				<Navbar />
				<div className="app-body">
					<Routes>
						<Route path="/" element={<Pets />} />
						<Route path="/CreatePet" element={<CreatePet />} />
						<Route path="/Shelter" element={<Pound />} />
					</Routes>
				</div>
			</BrowserRouter>
		);
	} else {
		return <Home />;
	}
}

export default App;
