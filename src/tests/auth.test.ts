import { signUp, signIn, signOut } from '../api/auth';
import { supabase } from '../lib/supabase';

jest.mock('../lib/supabase', () => ({
  supabase: {
    auth: {
      signUp: jest.fn(),
      signInWithPassword: jest.fn(),
      signOut: jest.fn(),
    },
  },
}));

describe('Auth API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('signUp', () => {
    it('should successfully sign up a user', async () => {
      const mockData = { user: { id: '123' }, session: null };
      (supabase.auth.signUp as jest.Mock).mockResolvedValue({ data: mockData, error: null });

      const result = await signUp('test@example.com', 'password123');
      expect(result).toEqual(mockData);
      expect(supabase.auth.signUp).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });

    it('should throw error on signup failure', async () => {
      const mockError = new Error('Signup failed');
      (supabase.auth.signUp as jest.Mock).mockResolvedValue({ data: null, error: mockError });

      await expect(signUp('test@example.com', 'password123')).rejects.toThrow();
    });
  });

  describe('signIn', () => {
    it('should successfully sign in a user', async () => {
      const mockData = { user: { id: '123' }, session: { access_token: 'token' } };
      (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({ data: mockData, error: null });

      const result = await signIn('test@example.com', 'password123');
      expect(result).toEqual(mockData);
      expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });

    it('should throw error on signin failure', async () => {
      const mockError = new Error('Invalid credentials');
      (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({ data: null, error: mockError });

      await expect(signIn('test@example.com', 'password123')).rejects.toThrow();
    });
  });

  describe('signOut', () => {
    it('should successfully sign out a user', async () => {
      (supabase.auth.signOut as jest.Mock).mockResolvedValue({ error: null });

      await expect(signOut()).resolves.not.toThrow();
      expect(supabase.auth.signOut).toHaveBeenCalled();
    });

    it('should throw error on signout failure', async () => {
      const mockError = new Error('Signout failed');
      (supabase.auth.signOut as jest.Mock).mockResolvedValue({ error: mockError });

      await expect(signOut()).rejects.toThrow();
    });
  });
});