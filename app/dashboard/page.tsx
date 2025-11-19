"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Your Career Blueprint Is Ready
            </h1>
          </div>

          {/* Summary Cards */}
          <div className="space-y-6 mb-8">
            {/* Skill Graph Overview */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Skill Graph Overview
                  </h3>
                  <p className="text-gray-600 mb-4">
                    A comprehensive map of your technical proficiencies, soft
                    skills, and domain expertise.
                  </p>
                  <Link
                    href="/learning-path"
                    className="text-purple-600 font-medium hover:text-purple-700"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>

            {/* Skill Gaps & Growth Priorities */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-pink-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Skill Gaps & Growth Priorities
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Strategic areas for development, ranked by impact and
                    aligned with your career trajectory.
                  </p>
                  <Link
                    href="/careers"
                    className="text-purple-600 font-medium hover:text-purple-700"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>

            {/* Your Personalized Learning Journey */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-yellow-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Your Personalized Learning Journey
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Curated courses and resources designed to bridge your skill
                    gaps and accelerate your progress.
                  </p>
                  <Link
                    href="/learning-path"
                    className="text-purple-600 font-medium hover:text-purple-700"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Link
              href="/careers"
              className="inline-block px-8 py-4 gradient-purple-pink text-white rounded-lg font-semibold hover:opacity-90 transition shadow-lg"
            >
              See Your Career Paths →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
