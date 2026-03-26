import { Star } from 'lucide-react'
import React from 'react'

// Ratign ko baad me design kar sakta hai (only star here )
const Rating = ({ rating }) => {
    return (
        < div className="flex items-center align-baseline gap-1" >
            {
                Array.from({ length: Math.floor(rating) }).map((_, i) => (
                    <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                ))
            }
            < p className="text-md text-gray-900 ml-2" >
                {rating}
            </p >
        </div >
    )
}

export default Rating