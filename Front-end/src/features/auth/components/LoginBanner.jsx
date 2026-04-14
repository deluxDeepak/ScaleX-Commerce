import React from "react";

const LoginBanner = () => {
  return (
    <div className="min-h-screen flex">

      {/* LEFT: Promo Banner */}
      <div className="hidden md:flex w-full bg-gradient-to-br from-black via-gray-900 to-black text-white p-10 flex-col justify-between">

        {/* Top Branding */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-green-400">
            ShopEase
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Smart shopping, simplified.
          </p>
        </div>

        {/* Middle Content */}
        <div className="space-y-6">
          <h2 className="text-4xl font-bold leading-tight">
            Shop with confidence.
          </h2>

          <p className="text-gray-400 text-sm max-w-md leading-relaxed">
            Experience a faster, smarter way to shop online. Discover products 
            tailored to you, enjoy secure payments, and get everything delivered 
            with ease.
          </p>

          {/* Features */}
          <div className="space-y-3 text-sm">
            <div className="text-green-400">✔ Smart recommendations powered by AI</div>
            <div className="text-green-400">✔ Fast & reliable delivery</div>
            <div className="text-green-400">✔ Secure and seamless checkout</div>
            <div className="text-green-400">✔ Easy returns & dedicated support</div>
          </div>
        </div>

        {/* Bottom */}
        <div className="text-xs text-gray-500">
          © {new Date().getFullYear()} ShopEase. Built for modern shopping.
        </div>
      </div>

    </div>
  );
};

export default LoginBanner;