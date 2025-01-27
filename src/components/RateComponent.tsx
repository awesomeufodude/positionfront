import { Star } from 'lucide-react'
import { FC } from 'react'

interface RateComponentProps {
  rating: number // Current rating value.
  articleId: string // Associated article ID for the rating.
  setRating?: React.Dispatch<React.SetStateAction<number>> // Optional function to update the rating.
}

const RateComponent: FC<RateComponentProps> = ({ rating, articleId, setRating }) => {
  // Handle updating the rating.
  const handleRate = async (newRating: number) => {
    setRating?.(newRating) // Update the rating state if setRating function is provided.
    // Additional logic for saving rating to a server can be added here if needed.
  }

  return (
    <div className="flex">
      {/* Render 5 stars for the rating component */}
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex justify-center">
          <Star
            size={16} // Set the size of the star icon.
            strokeWidth={0} // Remove stroke for filled effect.
            fill={index + 1 <= rating ? 'gold' : '#D6DBDF'} // Fill star based on rating.
            className="star cursor-pointer"
            onClick={() => handleRate(index + 1)} // Handle click for updating the rating.
            data-testid="rate-component"
            data-rating={index + 1} // Add data attributes for testing or tracking.
          />
        </div>
      ))}
    </div>
  )
}

export default RateComponent
