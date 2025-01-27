import { FC } from 'react'
import Spinner from './ui/Spinner'

interface LoadingScreenProps {
  
}

const LoadingScreen: FC<LoadingScreenProps> = ({}) => {
  return (
      <div className="flex flex-col items-center justify-center h-dvh">
            <Spinner/>
      </div>
  )
}

export default LoadingScreen