import React from "react";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

const StoreFooter = () => {
  return (
    <footer className="bg-slate-900 text-gray-300 mt-10">

      {/* ===== Newsletter Strip ===== */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-white font-bold text-lg">Stay in the loop 📬</h3>
            <p className="text-blue-100 text-sm">Get exclusive deals & new arrivals straight to your inbox.</p>
          </div>
          <div className="flex w-full sm:w-auto gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 sm:w-64 px-4 py-2.5 rounded-xl text-sm bg-white/10 border border-white/20 text-white placeholder-blue-200 outline-none focus:border-white transition"
            />
            <button className="bg-white text-blue-600 font-bold px-5 py-2.5 rounded-xl hover:bg-blue-50 transition text-sm shrink-0">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* ===== Main Footer Grid ===== */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

        {/* Logo / About */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center shadow">
              <span className="text-white font-extrabold text-sm">S</span>
            </div>
            <h2 className="text-xl font-extrabold text-white">MyStore</h2>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Your one-stop destination for electronics, fashion and more.
            Discover trending products at the best prices.
          </p>
          {/* Contact info */}
          <div className="flex flex-col gap-2 mt-1">
            <a href="mailto:support@mystore.com" className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition">
              <Mail size={13} className="text-blue-400 shrink-0" />
              support@mystore.com
            </a>
            <a href="tel:+911800123456" className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition">
              <Phone size={13} className="text-blue-400 shrink-0" />
              1800-123-456 (Toll Free)
            </a>
            <span className="flex items-center gap-2 text-xs text-gray-400">
              <MapPin size={13} className="text-blue-400 shrink-0" />
              Mumbai, India
            </span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">Quick Links</h3>
          <ul className="flex flex-col gap-2.5 text-sm">
            {["Home", "Products", "About Us", "Contact", "Blog", "Careers"].map((link) => (
              <li key={link}>
                <a href="#" className="flex items-center gap-1.5 text-gray-400 hover:text-white transition group">
                  <ArrowRight size={13} className="text-blue-500 opacity-0 group-hover:opacity-100 transition -translate-x-1 group-hover:translate-x-0 duration-200" />
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">Categories</h3>
          <ul className="flex flex-col gap-2.5 text-sm">
            {["Electronics", "Fashion", "Shoes", "Mobiles", "Accessories", "Home & Kitchen"].map((cat) => (
              <li key={cat}>
                <a href="#" className="flex items-center gap-1.5 text-gray-400 hover:text-white transition group">
                  <ArrowRight size={13} className="text-blue-500 opacity-0 group-hover:opacity-100 transition -translate-x-1 group-hover:translate-x-0 duration-200" />
                  {cat}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social + App */}
        <div className="flex flex-col gap-6">
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">Follow Us</h3>
            <div className="flex gap-3">
              {[
                { icon: Facebook, color: "hover:bg-blue-600", label: "Facebook" },
                { icon: Instagram, color: "hover:bg-pink-600", label: "Instagram" },
                { icon: Twitter, color: "hover:bg-sky-500", label: "Twitter" },
              ].map(({ icon: Icon, color, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className={`w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center ${color} transition-colors duration-200`}
                >
                  <Icon size={16} className="text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Trust badges */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-widest">We Accept</h3>
            <div className="flex flex-wrap gap-2">
              {["UPI", "Visa", "Mastercard", "PayTM", "COD"].map((pay) => (
                <span key={pay} className="text-xs bg-white/10 border border-white/10 text-gray-300 px-2.5 py-1 rounded-lg font-medium">
                  {pay}
                </span>
              ))}
            </div>
          </div>

          {/* Safe shopping */}
          <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3">
            <span className="text-2xl">🔒</span>
            <div>
              <p className="text-white text-xs font-semibold">100% Secure Shopping</p>
              <p className="text-gray-500 text-xs">SSL encrypted checkout</p>
            </div>
          </div>
        </div>

      </div>

      {/* ===== Bottom Bar ===== */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <span>© {new Date().getFullYear()} MyStore. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-gray-300 transition">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition">Terms of Service</a>
            <a href="#" className="hover:text-gray-300 transition">Refund Policy</a>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default StoreFooter;