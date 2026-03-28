import { ChevronRight } from 'lucide-react'
import { NavLink } from 'react-router-dom'


const SidebarUi = ({ sidebar }) => {

    return (
        <>
            <aside
                className={`hidden lg:flex flex-col min-h-screen top-0 bg-white border-r border-gray-100 shadow-sm overflow-hidden transition-all duration-300 ease-in-out h-full w-full opacity-100`}
            >

                {/* Nav Links */}
                <nav className="flex flex-col gap-1 p-4 flex-1 min-w-[256px]">
                    {sidebar.map((s) => {
                        const Icon = s.icon;
                        return (
                            <NavLink
                                key={s.link}
                                to={s.link}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all group border
                                ${isActive
                                        ? "bg-blue-50 text-blue-600 border-blue-100 shadow-sm"
                                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-800 border-transparent"
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <Icon size={18} className={isActive ? "text-blue-500" : "text-gray-400 group-hover:text-gray-600"} />
                                        <span className="flex-row lg:flex-1">{s.name}</span>


                                        <ChevronRight size={14} className={`transition-opacity ${isActive ? "opacity-40" : "opacity-0 group-hover:opacity-30"}`} />
                                    </>
                                )}
                            </NavLink>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-gray-100 min-w-[256px] md:min-w-[288px]">
                    <p className="text-xs text-gray-300 text-center">Seller Dashboard v1.0</p>
                </div>

            </aside>

            {/* Mobile bottom nav */}
            <nav className="lg:hidden fixed  h-screen  bg-white/95 backdrop-blur border-t border-gray-200 shadow-lg">
                <div className="">
                    {sidebar.map((s) => {
                        const Icon = s.icon;
                        return (
                            <NavLink
                                key={s.link}
                                to={s.link}
                                className={({ isActive }) =>
                                    `flex flex-col items-center justify-center  gap-1 py-3 text-[11px] font-semibold transition-colors ${isActive
                                        ? "text-blue-600"
                                        : "text-gray-500 hover:text-gray-700"
                                    }`
                                }
                                aria-label={s.name}
                            >
                                {({ isActive }) => (
                                    <>
                                        <span className={`w-10 h-10 rounded-2xl flex items-center justify-center border text-sm ${isActive
                                                ? "bg-blue-50 border-blue-200 text-blue-600"
                                                : "bg-gray-50 border-gray-100 text-gray-500"
                                            }`}>
                                            <Icon size={18} />
                                        </span>
                                        <span className="text-xs font-medium">{s.name}</span>
                                    </>
                                )}
                            </NavLink>
                        );
                    })}
                </div>
            </nav>
        </>
    );
}

export default SidebarUi