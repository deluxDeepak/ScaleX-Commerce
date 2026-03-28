import { Search } from 'lucide-react'


const Searchbar = ({
    placeholder = "Search...",
    value = "",
    name = "product",
    onChange = () => { },
    onSearch = () => { },
    className = "",
    ...props
}) => {

    const handleKeydown = (e) => {
        if (e.key === "Enter") {
            onSearch(e);
        }
    }
    return (
        <div className={`flex items-center border border-pink-300 focus-within:border-pink-500 rounded-lg px-2 lg:px-3 py-1 lg:py-2 bg-white shadow gap-2 w-full max-w-md ${className}`}>
            <input
                type="text"
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onKeyDown={handleKeydown}
                aria-label="Search"
                className="flex-1 outline-none px-2 py-1 bg-transparent text-gray-700 placeholder-gray-400 focus:text-gray-900"
                {...props}
            />
            <button
                type="button"
                aria-label="Search"
                onClick={onSearch}
                className="p-2 rounded-lg bg-blue-500 hover:bg-blue-800 focus:bg-pink-700 text-white transition-colors shadow-sm"
            >
                <Search size={20} />
            </button>
        </div>
    );
};

export default Searchbar