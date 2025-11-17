import React from "react";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16 px-8 mt-20">
      <div className="max-w-6xl mx-auto text-center md:text-left">

        <div className="flex flex-col items-center md:items-start gap-4 mb-10">
            <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
              {/* small logo square */}
              <svg width="28" height="28" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="gf1" x1="0" x2="1">
                    <stop offset="0%" stopColor="#22c1c3" />
                    <stop offset="100%" stopColor="#2a9df4" />
                  </linearGradient>
                </defs>
                <rect width="64" height="64" rx="12" fill="#ffffff" />
                <path d="M10 38c6-8 12-10 18-6s12 2 20-6" stroke="url(#gf1)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold">CityFlow</h3>
          </div>

        <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-10 text-gray-300">
          <a href="#">About</a>
          <a href="#">Features</a>
          <a href="#">Reports</a>
          <a href="#">Experts</a>
          <a href="#">Community</a>
          <a href="#">Dashboard</a>
          <a href="#">Support</a>
        </div>

        <div className="flex gap-6 justify-center md:justify-start text-gray-400 text-xl">
          <i className="fa-brands fa-facebook"></i>
          <i className="fa-brands fa-instagram"></i>
          <i className="fa-brands fa-x-twitter"></i>
          <i className="fa-brands fa-linkedin"></i>
          <i className="fa-brands fa-youtube"></i>
        </div>

      </div>
    </footer>
  );
}
