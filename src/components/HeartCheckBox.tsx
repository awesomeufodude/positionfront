import { toggleFavorite } from '@/features/articles/services/articleService'
import { FC, useState } from 'react'

interface HeartCheckBoxProps {
  disabled?: boolean // Optionally disable the checkbox.
  defaultChecked?: boolean // Initial state of the checkbox.
  id: string // Unique identifier for the checkbox.
}

const HeartCheckBox: FC<HeartCheckBoxProps> = ({ id, defaultChecked = false, disabled }) => {
  const [isFavorite, setIsFavorite] = useState(defaultChecked) // Tracks favorite state.
  const [isLoading, setIsLoading] = useState(false) // Tracks loading state.

  // Handles toggling of the favorite state.
  const handleToggleFavorite = async () => {
    const previousState = isFavorite
    setIsLoading(true)
    setIsFavorite(!isFavorite)

    try {
      await toggleFavorite(id) // API call to toggle favorite state.
    } catch (error) {
      console.error('Failed to toggle favorite:', error)
      setIsFavorite(previousState) // Revert to previous state on failure.
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative">
      <label className="container">
        <input
          disabled={disabled || isLoading} // Disable input if loading or explicitly disabled.
          id={id}
          type="checkbox"
          checked={isFavorite}
          onChange={handleToggleFavorite}
          className="disabled:cursor-not-allowed"
        />
        <div className={`checkmark ${isFavorite ? 'filled' : ''}`}>
          <svg viewBox="0 0 256 256">
            <rect fill="none" height="256" width="256"></rect>
            <path
              d="M224.6,51.9a59.5,59.5,0,0,0-43-19.9,60.5,60.5,0,0,0-44,17.6L128,59.1l-7.5-7.4C97.2,28.3,59.2,26.3,35.9,47.4a59.9,59.9,0,0,0-2.3,87l83.1,83.1a15.9,15.9,0,0,0,22.6,0l81-81C243.7,113.2,245.6,75.2,224.6,51.9Z"
              strokeWidth="20px"
              stroke="#000"
              fill={isFavorite ? 'red' : 'none'} // Fill the heart if favorite.
            ></path>
          </svg>
        </div>
      </label>
    </div>
  )
}

export default HeartCheckBox
