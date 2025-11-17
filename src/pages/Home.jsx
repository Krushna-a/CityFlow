import React from "react";

export default function Home() {
  return (
    <div className="w-full">
      {/* ================= HERO SECTION ================= */}
      <section
        className="relative min-h-[90vh] flex items-center px-6 md:px-20"
        style={{
          backgroundImage:
            "url('https://wittering-azure-1crvi8jms3.edgeone.app/flooded%20city%20street.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Light blur overlay */}
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px]"></div>

        {/* Text content */}
        <div className="relative z-10 max-w-4xl">
          {/* Badge */}
          <span className="inline-block bg-white/80 text-black px-4 py-1 rounded-full text-sm font-semibold shadow-md">
            Powered by AI • Community-Driven
          </span>

          {/* Title */}
          <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-tight text-black">
            AI for Waterlogging <br />
            Solutions: From Floods to Fixes
          </h1>

          {/* Subtext */}
          <p className="mt-6 text-lg text-gray-700 max-w-2xl">
            Join thousands of citizens using AI to predict, report, and solve
            urban waterlogging. Together, we're building flood-resilient cities
            through intelligent community action.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium shadow hover:bg-blue-700 transition">
              Report Incident
            </button>

            <button className="bg-white border px-6 py-3 rounded-lg font-medium shadow hover:bg-gray-100 transition">
              Explore Map
            </button>
          </div>
        </div>
      </section>

      {/* ================= COMMUNITY HUB SECTION ================= */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
        <img
          src="https://cdn.prod.website-files.com/6917f3728783929dd9dcee78/6917f3cc12879e889756de10_f860bcb5-bec2-4ceb-83e6-f54659490b00.avif"
          className="rounded-xl shadow-lg"
        />

        <div>
          <p className="text-xs font-semibold text-gray-500 mb-2">
            COMMUNITY HUB
          </p>
          <h3 className="text-3xl font-semibold mb-4">
            Collaborate, discuss, and report
          </h3>
          <p className="text-gray-600 mb-6">
            Join discussions, upvote solutions, and earn rewards for accurate,
            helpful flood reports.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded">
            Join
          </button>
        </div>
      </section>

      {/* ================= EXPERT REVIEW SECTION ================= */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
        <img
          src="https://cdn.prod.website-files.com/6917f3728783929dd9dcee78/6917f3cb2a27717efc346565_e695da43-2389-4827-ae32-45c025906aaa.avif"
          className="rounded-xl shadow-lg"
        />

        <div>
          <p className="text-xs font-semibold text-gray-500 mb-2">
            EXPERT REVIEW
          </p>
          <h3 className="text-3xl font-semibold mb-4">
            Specialist validation and approval
          </h3>
          <p className="text-gray-600 mb-6">
            Engineers review AI insights to ensure solutions are practical and
            effective.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded">
            More
          </button>
        </div>
      </section>

      {/* ================= INSIGHTS SECTION ================= */}
      <section className="bg-blue-50 py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <img
            src="https://cdn.prod.website-files.com/6917f3728783929dd9dcee78/6917f3cbef0cfc8821fa6e46_e6c041e2-f919-465b-a65d-9d75ef4b3cee.avif"
            className="rounded-xl shadow-lg"
          />
          <div>
            <h2 className="text-4xl font-semibold mb-4">
              Real-time waterlogging risk insights
            </h2>
            <p className="text-gray-700">
              Instantly detect, analyze, and map urban flood risks using AI.
              Combine citizen reports with environmental data for accurate,
              actionable solutions.
            </p>
          </div>
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <p className="text-xs font-semibold text-gray-500 tracking-wide mb-3">
          SUPPORT & INFORMATION
        </p>

        <h2 className="text-4xl font-semibold mb-4">
          Your questions, answered clearly
        </h2>

        <p className="text-gray-600 max-w-2xl mb-10">
          Find quick answers to common questions about our AI-powered
          waterlogging solutions, reporting process, and platform features.
        </p>

        {/* FAQ Items */}
        <div className="border-t py-6 flex justify-between">
          <h3 className="text-lg font-medium">
            How does the reporting system work?
          </h3>
          <p className="text-gray-600 max-w-xl">
            Users submit photos or videos of flooded areas. Our AI analyzes the
            media, extracts location and time, and assesses severity.
          </p>
        </div>

        <div className="border-t py-6 flex justify-between">
          <h3 className="text-lg font-medium">
            What data sources power predictions?
          </h3>
          <p className="text-gray-600 max-w-xl">
            We combine rainfall, elevation, drainage, soil, and land-use data
            with citizen reports to generate accurate hotspot detection.
          </p>
        </div>

        <div className="border-t py-6 flex justify-between">
          <h3 className="text-lg font-medium">
            How are clusters and severity calculated?
          </h3>
          <p className="text-gray-600 max-w-xl">
            Reports are merged into clusters. Severity is scored using report
            frequency, water depth, environmental vulnerability, and density.
          </p>
        </div>

        <div className="border-t border-b py-6 flex justify-between">
          <h3 className="text-lg font-medium">
            Who reviews and approves solutions?
          </h3>
          <p className="text-gray-600 max-w-xl">
            Engineers and planners validate AI insights and approve or modify
            solutions before implementation.
          </p>
        </div>
      </section>

      {/* ================= CONTACT SECTION ================= */}
      <section className="bg-blue-100 py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-4xl font-semibold mb-6">
              Get in touch with experts
            </h2>
            <p className="text-gray-700 max-w-md">
              Complete the form and our team will respond with the information
              or support you need.
            </p>
          </div>

          <form className="space-y-4">
            <div>
              <label className="text-xs font-semibold">FULL NAME</label>
              <input
                className="w-full border p-3 rounded"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="text-xs font-semibold">EMAIL ADDRESS</label>
              <input
                className="w-full border p-3 rounded"
                placeholder="email@website.com"
              />
            </div>

            <div>
              <label className="text-xs font-semibold">YOUR MESSAGE</label>
              <textarea
                className="w-full border p-3 rounded h-32"
                placeholder="Type your message..."
              />
            </div>

            <button className="bg-blue-600 text-white px-6 py-3 rounded">
              Submit
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
