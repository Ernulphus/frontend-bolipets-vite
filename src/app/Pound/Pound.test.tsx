import { cleanup, render, screen } from '@testing-library/react';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter } from 'react-router';
import Pound from './Pound';

const { mockGetAccessTokenSilently, mockPetsRead: mockPetAdopteeRead } =
	vi.hoisted(() => ({
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
	petAdopteeRead: mockPetAdopteeRead,
}));

describe('Pets dashboard page with data', () => {
	const TEST_PET_ID = 'abc';
	const TEST_PET_NAME = 'Cubie';
	const TEST_PET_COLOR = '#aaaaaa';
	const TEST_PET_MOOD = 50;
	const TEST_PET_SPECIES = 'esquardo';

	beforeAll(() => {
		mockGetAccessTokenSilently.mockResolvedValue('fake-token');

		mockPetAdopteeRead.mockResolvedValue({
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
				<Pound />
			</MemoryRouter>,
		);
	});

	afterAll(cleanup);

	it('renders a title', () => {
		const title = screen.getByRole('heading', {
			name: /the bolipet shelter/i,
		});
		expect(title).toBeInTheDocument();
	});

	it('displays a list of pet cards', async () => {
		const card = await screen.findByText(RegExp(TEST_PET_NAME, 'i'));
		expect(card).toBeInTheDocument();
	});
});

describe('Pets dashboard with no data', () => {
	beforeAll(() => {
		mockGetAccessTokenSilently.mockResolvedValue('fake-token');
		mockPetAdopteeRead.mockResolvedValue({});

		render(
			<MemoryRouter>
				<Pound />
			</MemoryRouter>,
		);
	});
	afterAll(cleanup);

	it('says it is loading before data is loaded', () => {
		const notif = screen.getByText(/loading/i);
		expect(notif).toBeInTheDocument();
	});

	it('states that there were no pets found', async () => {
		const notif = await screen.findByRole('heading', {
			name: /no pets found/i,
		});
		expect(notif).toBeInTheDocument();
	});

	it('gives a link to the add pets page', async () => {
		const notif = await screen.findByRole('link', {
			name: /adopt one/i,
		});
		expect(notif).toBeInTheDocument();
	});
});

describe('Pets dashboard with errors', () => {
	it('displays a backend read error', async () => {
		mockGetAccessTokenSilently.mockResolvedValue('fake-token');
		mockPetAdopteeRead.mockRejectedValue(new Error('Something went wrong'));
		render(
			<MemoryRouter>
				<Pound />
			</MemoryRouter>,
		);
		const err = await screen.findByText(/there was a problem/i);
		expect(err).toBeInTheDocument();
		cleanup();
	});
	it('displays an auth0 error', async () => {
		mockGetAccessTokenSilently.mockRejectedValue(
			new Error('SomethingWentWrong)'),
		);
		mockPetAdopteeRead.mockResolvedValue({});
		render(
			<MemoryRouter>
				<Pound />
			</MemoryRouter>,
		);
		const err = await screen.findByText(/there was a problem/i);
		expect(err).toBeInTheDocument();
		cleanup();
	});
});
