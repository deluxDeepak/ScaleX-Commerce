import { Loader, Zap, Orbit } from 'lucide-react'

// --- Spinner Variants ---

const RingSpinner = () => (
    <div className="relative flex items-center justify-center w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-slate-800" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-cyan-400 animate-spin" />
        <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-fuchsia-500 animate-spin [animation-duration:0.8s] [animation-direction:reverse]" />
        <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_2px_rgba(255,255,255,0.6)]" />
    </div>
)

const PulseOrb = () => (
    <div className="relative flex items-center justify-center w-16 h-16">
        <div className="absolute w-16 h-16 rounded-full bg-violet-500 opacity-20 animate-ping [animation-duration:1.2s]" />
        <div className="absolute w-12 h-12 rounded-full bg-violet-400 opacity-30 animate-ping [animation-duration:1.2s] [animation-delay:0.2s]" />
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-500 shadow-[0_0_20px_4px_rgba(167,139,250,0.5)]" />
    </div>
)

const DotsSpinner = () => (
    <div className="flex items-end gap-1.5 h-10">
        {[0, 1, 2, 3, 4].map((i) => (
            <div
                key={i}
                className="w-2 rounded-full bg-emerald-400 animate-bounce shadow-[0_0_6px_rgba(52,211,153,0.7)]"
                style={{
                    animationDelay: `${i * 0.1}s`,
                    height: `${12 + i * 4}px`,
                    animationDuration: '0.7s',
                }}
            />
        ))}
    </div>
)

const MorphSquare = () => (
    <div
        className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 shadow-[0_0_24px_rgba(251,191,36,0.5)] animate-spin"
        style={{
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
            animation: 'morph 2s ease-in-out infinite, spin 3s linear infinite',
        }}
    >
        <style>{`
      @keyframes morph {
        0%,100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
        25% { border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%; }
        50% { border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%; }
        75% { border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%; }
      }
    `}</style>
    </div>
)

const IconSpinner = () => (
    <div className="relative flex items-center justify-center w-16 h-16">
        <div className="absolute inset-0 rounded-xl border border-slate-700 bg-slate-900" />
        <Loader
            className="text-sky-400 animate-spin"
            style={{ animationDuration: '1.2s' }}
            size={28}
        />
        <div className="absolute inset-0 rounded-xl ring-1 ring-sky-500/30 animate-pulse" />
    </div>
)

// --- Spinner Card ---

const SpinnerCard = ({ label, children, active, onClick }) => (
    <button
        onClick={onClick}
        className={`
      group flex flex-col items-center gap-5 p-6 rounded-2xl border cursor-pointer transition-all duration-300
      ${active
                ? 'border-white/20 bg-white/5 shadow-[0_0_30px_rgba(255,255,255,0.04)]'
                : 'border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]'
            }
    `}
    >
        <div className="flex items-center justify-center h-20">{children}</div>
        <span className={`text-xs font-mono tracking-widest uppercase transition-colors ${active ? 'text-white' : 'text-slate-500 group-hover:text-slate-400'}`}>
            {label}
        </span>
    </button>
)

// --- Main Component ---

const LoadingSpinner = ({ label }) => {
    const spinners = [
        { label: 'Orbit', component: <RingSpinner /> },
        { label: 'Pulse', component: <PulseOrb /> },
        { label: 'Wave', component: <DotsSpinner /> },
        { label: 'Morph', component: <MorphSquare /> },
        { label: 'System', component: <IconSpinner /> },
    ]

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 font-mono">

            {label ? spinners.find((p) => p.label === label) : <RingSpinner />}
        </div>
    )
}

export default LoadingSpinner