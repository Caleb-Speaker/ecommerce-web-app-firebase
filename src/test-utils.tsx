import React, { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthContext } from './context/AuthContext';
import type { User } from 'firebase/auth';

const queryClient = new QueryClient();

export const mockUser = {
  uid: '123',
  email: 'test@example.com',
  emailVerified: true,
  isAnonymous: false,
  providerData: [],
  refreshToken: 'dummy-token',
  displayName: 'Test User',
  phoneNumber: null,
  photoURL: null,
  tenantId: null,
  metadata: {} as any,
  providerId: 'firebase',
  toJSON: () => ({}),
  delete: async () => {},
  getIdToken: async () => 'dummy-token',
  getIdTokenResult: async () => ({ token: 'dummy-token' } as any),
  reload: async () => {},
  // @ts-ignore: internal Firebase property
  auth: {},
} as User;

type CustomRenderOptions = {
  children: ReactNode;
  currentUser?: User | null;
};

export function customRender({ children, currentUser = mockUser }: CustomRenderOptions) {
  return render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={{ currentUser, loading: false }}>
          {children}
        </AuthContext.Provider>
      </QueryClientProvider>
    </Provider>
  );
}