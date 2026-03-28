import { ChevronDown, ChevronUp } from "lucide-react";
import { useSearchParams } from "react-router-dom";

const CategorySidebar = ({ category }) => {

    const [searchParams, setSearchParams] = useSearchParams();

    const activeCategory = searchParams.get("category");
    const activeSub = searchParams.get("sub");


    return (

        // Only show icons in category mobile view 
        <aside className="bg-white border-r border-gray-100 shadow-sm flex flex-col  w-22 md:w-64 lg:w-72 min-h-screen sticky top-0">

            {/* Header */}
            <div className="hidden md:flex px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-600 to-blue-500">
                <h2 className="text-white font-bold text-base uppercase">
                    Browse Categories
                </h2>
                <p className="text-blue-100 text-xs">
                    Find what you're looking for
                </p>
            </div>


            {/* Active filter */}
            {(activeCategory || activeSub) && (
                <div className="mx-4 mt-3 px-3 py-2 bg-blue-50 border border-blue-100 rounded-lg flex justify-between">

                    <div className="flex flex-col">

                        {activeCategory && (
                            <span className="text-xs font-semibold text-blue-700">
                                {activeCategory}
                            </span>
                        )}

                        {activeSub && (
                            <span className="text-xs text-blue-500">
                                → {activeSub}
                            </span>
                        )}

                    </div>

                    <button
                        onClick={() => setSearchParams({})}
                        className="hidden md:flex text-xs  text-blue-500"
                    >
                        Clear ✕
                    </button>

                </div>
            )}



            {/* Categories */}
            <nav className="flex flex-col gap-1 p-3 overflow-y-auto flex-1">

                {category.map((cat) => {

                    const isOpen = activeCategory === cat.name;

                    const isActive = activeCategory === cat.name;

                    return (

                        <div key={cat.id} className="rounded-xl overflow-hidden">

                            {/* Category button */}
                            <div
                                className="block md:flex"
                                onClick={() =>
                                    setSearchParams({
                                        category: cat.name
                                    })
                                }>
                                <img src={cat.icon} alt="" className="w-20 h-12" />
                                <button

                                    className={`flex justify-between items-center w-full p-2 md:p-3 rounded-xl text-sm font-semibold transition ${isActive ? "text-blue-500  " : "hover:bg-gray-50 text-gray-700"}

                                `}
                                >
                                    <span>{cat.name}</span>
                                    {isOpen
                                        ? <ChevronUp size={16} />
                                        : <ChevronDown size={16} />
                                    }

                                </button>
                            </div>

                            {/* Subcategories */}

                            <div
                                className={`overflow-hidden transition-all duration-300 hidden md:flex ${isOpen ? "max-h-96" : "max-h-0"}`}
                            >

                                <div className="pl-3 pb-2">
                                    {cat.subCategories.map((sub) => {

                                        const isSubActive =
                                            activeSub === sub.name;

                                        return (

                                            <button
                                                key={sub.name}
                                                onClick={() =>
                                                    setSearchParams({
                                                        category: cat.name,
                                                        sub: sub.name
                                                    })
                                                }
                                                className={`block w-full text-left px-3 py-2 rounded-lg text-sm

                                                ${isSubActive
                                                        ? "bg-blue-50 text-blue-600 font-semibold"
                                                        : "text-gray-600 hover:bg-gray-50"
                                                    }

                                                `}
                                            >
                                                {sub.name}
                                            </button>

                                        );

                                    })}

                                </div>

                            </div>

                        </div>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="hidden md:flexpx-4 py-3 border-t border-gray-100 bg-gray-50">
                <p className="text-xs text-gray-400 text-center">
                    {category.length} categories available
                </p>
            </div>

        </aside>
    );
};

export default CategorySidebar;