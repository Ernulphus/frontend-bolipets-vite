import { render, screen } from '@testing-library/react';
import { beforeAll, describe, expect, it } from 'vitest';
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
	it('matches snapshot', async () => {
		const main = screen.getByRole('main');
		await expect(main).toMatchSnapshot();
	});
});
