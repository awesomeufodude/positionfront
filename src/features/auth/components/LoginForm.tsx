import React, { useState } from 'react'
import { useLogin } from '../hooks/useAuth'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Hero from './Hero'

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('') // State for email input.
  const [password, setPassword] = useState('') // State for password input.
  const { mutate: login, isLoading } = useLogin() // Custom hook for login mutation.

  // Handle form submission.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login({ email, password }) // Trigger login with entered credentials.
  }

  return (
    <div className="font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl max-md:max-w-md w-full">
          {/* Hero section */}
          <Hero type="login" />

          {/* Login form */}
          <form onSubmit={handleSubmit} className="max-w-md md:ml-auto w-full space-y-4">
            <h3 className="text-gray-800 text-3xl font-extrabold mb-8">Log in</h3>

            <div className="space-y-4">
              <Input
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? 'Logging in...' : 'Log in'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
