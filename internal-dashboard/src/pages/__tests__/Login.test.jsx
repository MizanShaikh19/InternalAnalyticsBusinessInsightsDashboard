import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Login from '../Login'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'

function MockAuthProvider({ children, overrides = {} }) {
  const defaultCtx = {
    user: null,
    loading: false,
    signIn: vi.fn().mockResolvedValue({}),
    signInWithMagicLink: vi.fn().mockResolvedValue({}),
    resetPassword: vi.fn().mockResolvedValue({}),
  }
  const ctx = { ...defaultCtx, ...overrides }
  // simple context shim used by Login via useAuth()
  const Context = require('../../auth/AuthProvider').AuthContext
  return <Context.Provider value={ctx}>{children}</Context.Provider>
}

describe('Login page', () => {
  test('disables submit when invalid', async () => {
    render(
      <MemoryRouter>
        <MockAuthProvider>
          <Login />
        </MockAuthProvider>
      </MemoryRouter>
    )

    const submit = screen.getByRole('button', { name: /sign in/i })
    expect(submit).toBeDisabled()

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } })
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'short' } })
    expect(submit).toBeDisabled()

    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'longenough' } })
    expect(submit).toBeEnabled()
  })

  test('sends magic link and shows confirmation', async () => {
    const magicMock = vi.fn().mockResolvedValue({})
    render(
      <MemoryRouter>
        <MockAuthProvider overrides={{ signInWithMagicLink: magicMock }}>
          <Login />
        </MockAuthProvider>
      </MemoryRouter>
    )

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } })
    fireEvent.click(screen.getByRole('button', { name: /send magic link/i }))

    await waitFor(() => expect(magicMock).toHaveBeenCalledWith('user@example.com'))
    expect(screen.getByRole('status')).toHaveTextContent(/magic link sent/i)
  })
})