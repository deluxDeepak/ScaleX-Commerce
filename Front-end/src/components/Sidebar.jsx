import { ChevronDown, ChevronUp } from "lucide-react";
// import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const Sidebar = ({ category }) => {


    const [openCategory, setOpenCategory] = useState(null);

    // setSubCategory here(set by params) 
    // Params set karo 
    const [searchParams, setSearchParams] = useSearchParams();
    console.log("Search params", searchParams);
    // Kaun sa category selected hai ye pata chal jayega 
    const activeCategory = searchParams.get("category");
    const activeSub = searchParams.get("sub");

    const toggleCategory = (id) => {
        setOpenCategory((prev) => (prev === id ? null : id));

    };
    // const navigate=useNavigate();



    return (
        <aside className="bg-white border-r border-gray-100 shadow-sm flex flex-col w-64 md:w-72 min-h-screen sticky top-0">

            {/* Sidebar Header */}
            <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-600 to-blue-500">
                <h2 className="text-white font-bold text-base tracking-wide uppercase">Browse Categories</h2>
                <p className="text-blue-100 text-xs mt-0.5">Find what you're looking for</p>
            </div>

            {/* Active filter indicator */}
            {(activeCategory || activeSub) && (
                <div className="mx-4 mt-3 px-3 py-2 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-between">
                    <div className="flex flex-col gap-0.5">
                        {activeCategory && (
                            <span className="text-xs text-blue-700 font-semibold">{activeCategory}</span>
                        )}
                        {activeSub && (
                            <span className="text-xs text-blue-500">→ {activeSub}</span>
                        )}
                    </div>
                    <button
                        onClick={() => setSearchParams({})}
                        className="text-blue-400 hover:text-blue-600 text-xs font-medium transition-colors ml-2 shrink-0"
                    >
                        Clear ✕
                    </button>
                </div>
            )}

            <nav className="flex flex-col gap-0.5 p-3 overflow-y-auto flex-1">

                {category.map((cat) => {

                    const isOpen = openCategory === cat.id;
                    const isCatActive = activeCategory === cat.name;

                    return (
                        <div key={cat.id} className="rounded-xl overflow-hidden">

                            {/* Category header */}
                            <button
                                onClick={() => {
                                    toggleCategory(cat.id)
                                    setSearchParams({
                                        category: cat.name
                                    })
                                }}

                                className={`flex p-3 justify-between items-center w-full text-left font-semibold text-sm rounded-xl transition-all duration-200 gap-2
                                    ${isCatActive
                                        ? "bg-blue-600 text-white shadow-md shadow-blue-100"
                                        : "hover:bg-gray-50 text-gray-700 hover:text-gray-900"
                                    }`}
                            >
                                <div className="flex items-center gap-2.5 min-w-0">
                                    {/* Category icon dot */}
                                    <span className={`w-2 h-2 rounded-full shrink-0 ${isCatActive ? "bg-white" : "bg-blue-400"}`}></span>
                                    <span className="truncate">{cat.name}</span>
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                    {/* Subcategory count badge */}
                                    {cat.subCategories?.length > 0 && (
                                        <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium
                                            ${isCatActive ? "bg-blue-500 text-blue-100" : "bg-gray-100 text-gray-500"}`}>
                                            {cat.subCategories.length}
                                        </span>
                                    )}
                                    {isOpen ? (
                                        <ChevronUp size={15} />
                                    ) : (
                                        <ChevronDown size={15} />
                                    )}
                                </div>
                            </button>


                            {/* Subcategories */}
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 mt-1" : "max-h-0"
                                    }`}
                            >
                                <div className="flex flex-col gap-0.5 pl-3 pr-1 pb-2">

                                    {cat.subCategories.map((sub) => (
                                        <button
                                            key={sub.name}
                                            onClick={() => {
                                                // setSubCategory(sub.name)
                                                // navigate(sub.link)
                                                setSearchParams({
                                                    category: cat.name,
                                                    sub: sub.name
                                                })
                                            }}
                                            className={`text-sm text-start px-3 py-2.5 rounded-lg transition-all duration-150 flex items-center gap-2.5 group
                                                ${activeSub === sub.name
                                                    ? "bg-blue-50 text-blue-600 font-semibold border border-blue-100"
                                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                                }`}
                                        >
                                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors
                                                ${activeSub === sub.name ? "bg-blue-500" : "bg-gray-300 group-hover:bg-gray-400"}`}>
                                            </span>
                                            {sub.name}
                                            {activeSub === sub.name && (
                                                <span className="ml-auto text-blue-400 text-xs">✓</span>
                                            )}
                                        </button>
                                    ))}

                                </div>
                            </div>

                        </div>
                    );
                })}

            </nav>

            {/* Sidebar Footer */}
            <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
                <p className="text-xs text-gray-400 text-center">
                    {category.length} categories available
                </p>
            </div>

        </aside>
    );
};

export default Sidebar;