import { render, screen } from '@testing-library/react';
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter } from 'react-router';
import Pets from './Pets';

const { mockGetAccessTokenSilently, mockPetsRead } = vi.hoisted(() => ({
	mockGetAccessTokenSilently: vi.fn(),
	mockPetsRead: vi.fn(),
}));

vi.mock('@auth0/auth0-react', () => ({
	useAuth0: () => ({
		getAccessTokenSilently: mockGetAccessTokenSilently,
	}),
}));

vi.mock('../utils/networkutils', () => ({
	AUTH0_AUDIENCE: 'test-audience',
	petsRead: mockPetsRead,
}));

describe('Pets dashboard page with data', () => {
	const TEST_PET_ID = 'abc';
	const TEST_PET_NAME = 'Cubie';
	const TEST_PET_COLOR = '#aaaaaa';
	const TEST_PET_MOOD = 50;
	const TEST_PET_SPECIES = 'esquardo';

	beforeAll(() => {
		mockGetAccessTokenSilently.mockResolvedValue('fake-token');

		mockPetsRead.mockResolvedValue({
			[TEST_PET_ID]: {
				_id: TEST_PET_ID,
				Name: TEST_PET_NAME,
				color: TEST_PET_COLOR,
				mood: TEST_PET_MOOD,
				species: TEST_PET_SPECIES,
			},
		});

		render(
			<MemoryRouter>
				<Pets />
			</MemoryRouter>,
		);
	});
	beforeEach(() => {});

	it('renders a title', () => {
		const title = screen.getByRole('heading', { name: /view all pets/i });
		expect(title).toBeInTheDocument();
	});

	it('Displays a list of pet cards', async () => {
		const card = await screen.findByText(RegExp(TEST_PET_NAME, 'i'));
		expect(card).toBeInTheDocument();
	});
});
