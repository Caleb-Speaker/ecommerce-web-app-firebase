import React from 'react';
import { render, screen } from '@testing-library/react';
import App, { AppContent } from './App';
import { AuthContext } from './context/AuthContext';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Full mock user matching Firebase User interface
const mockUser = {
  uid: 'mock-user-id',
  email: 'mock@example.com',
  displayName: 'Mock User',
  emailVerified: true,
  isAnonymous: false,
  providerData: [],
  phoneNumber: null,
  photoURL: null,
  metadata: {
    creationTime: '2023-01-01T00:00:00.000Z',
    lastSignInTime: '2023-01-02T00:00:00.000Z',
  },
  refreshToken: 'mock-refresh-token',
  tenantId: null,
  providerId: 'firebase',
  getIdToken: jest.fn(),
  getIdTokenResult: jest.fn(),
  reload: jest.fn(),
  delete: jest.fn(),
  toJSON: () => ({}),
};

const queryClient = new QueryClient();

describe('App Integration', () => {
  test('renders App and shows navigation brand', async () => {
    render(
      <AuthContext.Provider value={{ currentUser: mockUser as any, loading: false }}>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            {}
            <AppContent />
          </QueryClientProvider>
        </Provider>
      </AuthContext.Provider>
    );

    const brandLink = await screen.findByTestId('brand-link');
    expect(brandLink).toBeInTheDocument();
    expect(brandLink).toHaveTextContent(/E-Commerce/i);
  });
});