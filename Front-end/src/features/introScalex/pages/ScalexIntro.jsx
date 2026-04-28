import { motion } from "framer-motion";
import {
  ShoppingCart,
  Users,
  ShieldCheck,
  Database,
  Zap,
  Layers,
  Server,
  Rocket,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const Section = ({ title, children }) => (
  <motion.section
    variants={fadeUp}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
    className="mb-16"
  >
    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-green-400 tracking-tight">
      {title}
    </h2>
    {children}
  </motion.section>
);

const Card = ({ icon: Icon, title, items }) => (
  <motion.div
    variants={fadeUp}
    className="bg-green-900/10 border border-green-500/20 backdrop-blur-xl p-5 rounded-2xl hover:scale-[1.03] transition duration-300"
  >
    <div className="flex items-center gap-3 mb-4">
      <Icon className="text-green-400" />
      <h3 className="text-lg font-semibold text-white">{title}</h3>
    </div>
    <ul className="space-y-2 text-gray-300 text-sm">
      {items.map((item, i) => (
        <li key={i}>• {item}</li>
      ))}
    </ul>
  </motion.div>
);

export default function ScalexIntro() {
  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-8 py-12">

      {/* 🔥 HERO */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto text-center mb-20"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
          Scalex ⚡
        </h1>

        <p className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto">
          A high-performance backend system designed for scalable e-commerce —
          solving real-world problems like inventory consistency, multi-seller
          order flow, and secure transaction handling.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <span className="px-4 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-xs">
            Scalable
          </span>
          <span className="px-4 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-xs">
            Transaction Safe
          </span>
          <span className="px-4 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-xs">
            Clean Architecture
          </span>
        </div>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-5xl mx-auto"
      >

        {/* 🧩 PROBLEM */}
        <Section title="Problem We Solved">
          <p className="text-gray-400 leading-relaxed text-sm md:text-base">
            Modern e-commerce systems often fail in maintaining accurate
            inventory and structured seller workflows. Scalex addresses:
          </p>

          <ul className="mt-4 space-y-2 text-gray-300 text-sm md:text-base">
            <li>⚠️ Stock inconsistency during high traffic</li>
            <li>⚠️ Confusion in multi-seller order ownership</li>
            <li>⚠️ Lack of atomic operations → data corruption</li>
          </ul>
        </Section>

        {/* ⚙️ FEATURES */}
        <Section title="Core Features">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            <Card
              icon={ShoppingCart}
              title="User Flow"
              items={[
                "Browse & order products",
                "Track order lifecycle",
                "Secure checkout flow",
              ]}
            />
            <Card
              icon={Users}
              title="Seller Control"
              items={[
                "Accept / Reject orders",
                "Inventory sync",
                "Delivery status updates",
              ]}
            />
            <Card
              icon={ShieldCheck}
              title="System Integrity"
              items={[
                "MongoDB transactions",
                "Role-based access",
                "Validation layer (Joi)",
              ]}
            />
          </div>
        </Section>

        {/* 🏗️ ARCHITECTURE */}
        <Section title="Architecture">
          <div className="bg-green-950/40 border border-green-500/20 rounded-xl p-5 text-green-400 font-mono text-xs md:text-sm overflow-x-auto">
{`Controller → Service → Repository → Database

✔ Decoupled layers
✔ Transaction-safe operations
✔ Scalable modular design`}
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            <span className="flex items-center gap-2 text-sm text-green-300">
              <Layers size={16}/> Layered Design
            </span>
            <span className="flex items-center gap-2 text-sm text-green-300">
              <Database size={16}/> MongoDB
            </span>
            <span className="flex items-center gap-2 text-sm text-green-300">
              <Server size={16}/> REST APIs
            </span>
          </div>
        </Section>

        {/* 🧠 LEARNING */}
        <Section title="What I Learned">
          <div className="grid sm:grid-cols-2 gap-4 text-sm md:text-base">
            <div className="flex gap-3 items-start">
              <Zap className="text-green-400" size={18}/>
              <p>Handling atomic DB operations with transactions</p>
            </div>
            <div className="flex gap-3 items-start">
              <ShieldCheck className="text-green-400" size={18}/>
              <p>Designing secure auth & RBAC systems</p>
            </div>
            <div className="flex gap-3 items-start">
              <Layers className="text-green-400" size={18}/>
              <p>Clean architecture & separation of concerns</p>
            </div>
            <div className="flex gap-3 items-start">
              <Database className="text-green-400" size={18}/>
              <p>Schema design & data consistency</p>
            </div>
          </div>
        </Section>

        {/* 🔧 STACK */}
        <Section title="Tech Stack">
          <div className="flex flex-wrap gap-3">
            {["React", "Node.js", "Express", "MongoDB"].map((tech) => (
              <span
                key={tech}
                className="px-4 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-xs md:text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </Section>

        {/* 🚀 FUTURE */}
        <Section title="Future Scope">
          <ul className="space-y-2 text-gray-300 text-sm md:text-base">
            <li className="flex items-center gap-2">
              <Rocket size={16}/> Redis caching for performance
            </li>
            <li className="flex items-center gap-2">
              <Rocket size={16}/> WebSockets for real-time updates
            </li>
            <li className="flex items-center gap-2">
              <Rocket size={16}/> Microservices architecture
            </li>
            <li className="flex items-center gap-2">
              <Rocket size={16}/> Payment gateway integration
            </li>
          </ul>
        </Section>

      </motion.div>
    </div>
  );
}