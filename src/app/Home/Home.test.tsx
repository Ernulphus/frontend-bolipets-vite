import { screen, render } from '@testing-library/react';
import { describe, it, expect, beforeAll } from 'vitest';
import '@testing-library/jest-dom/vitest';

import Home from './Home';

describe('Home', () => {
	beforeAll(() => {
		render(<Home />);
	});
	it('renders something', () => {
		const title = screen.getByRole('heading', { name: /bolipets/i });
		expect(title).toBeInTheDocument();
	});
	it('displays a login button', () => {
		const login = screen.getByRole('button', { name: /log in/i });
		expect(login).toBeInTheDocument();
	});
});
