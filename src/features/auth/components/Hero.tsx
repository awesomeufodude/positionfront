import { FC } from 'react'

interface HeroProps {
  type: 'register' | 'login'
}

const Hero: FC<HeroProps> = ({ type }) => {
  return (
    <div>
      <h2 className="lg:text-5xl text-3xl font-extrabold lg:leading-[55px] text-gray-800">Welcome Back 👋</h2>
      <p className="text-sm mt-6 text-gray-800">
        Immerse yourself in a hassle-free login journey with our intuitively designed login form. Effortlessly access
        your account.
      </p>
      <p className="text-sm mt-12 text-gray-800">
        {type === 'register' ? 'Already have an account?' : "Don't have an account?"}
        <a
          href={type === 'register' ? '/login' : '/register'}
          className="text-blue-600 font-semibold hover:underline ml-1"
        >
          {type === 'register' ? 'Login here' : 'Register here'}
        </a>
      </p>
    </div>
  )
}

export default Hero
