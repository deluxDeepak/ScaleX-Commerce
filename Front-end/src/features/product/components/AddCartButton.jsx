import { ShoppingBag } from 'lucide-react'
import { useCart } from '../../../context/CartContext';

// Add+Remove button 
const AddCartButton = ({
    product,
    className,
    children,
    setAdded,
    ...props
}) => {

    // Yehan laga sakte hai add to cart 
    const { addToCart } = useCart();

    const handleCart = () => {


        addToCart(product._id, {
            quantity: 1,
            price: product.price,
        });
        setAdded(true);
    };


    return (
        <button
            type="button"
            onClick={handleCart}

            className={`px-4 py-2 rounded-lg hover:cursor-pointer font-medium shadow transition-all duration-200 w-full sm:w-auto text-base sm:text-lg ${className}`}
            //  ✅ removed: bg-linear-to-r from-blue-100 to-blue-300 text-black
            {...props}
        >
            {children}
        </button>
    );
}

export default AddCartButton