import { IndianRupee } from 'lucide-react'
import React from 'react'

const ProductPrice = ({ price, size = "md", className = "" }) => {

    const sizeStyles = {
        sm: { icon: 12, text: "text-sm", gap: "gap-0.5" },
        md: { icon: 15, text: "text-base", gap: "gap-0.5" },
        lg: { icon: 20, text: "text-xl", gap: "gap-1" },
    }

    const s = sizeStyles[size] ?? sizeStyles.md

    return (
        <div className={`inline-flex items-center ${s.gap} font-bold text-gray-900 leading-none ${className}`}>
            <IndianRupee size={s.icon} strokeWidth={2.5} className="flex-shrink-0 translate-y-px" />
            <span className={s.text}>{price.toLocaleString("en-IN")}</span>
        </div>
    )
}

export default ProductPrice