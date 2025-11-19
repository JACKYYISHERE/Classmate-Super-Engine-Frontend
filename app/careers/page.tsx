"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { api } from "@/utils/api";
import Sidebar from "@/components/Sidebar";

interface Career {
  career_id: string;
  career_name: string;
  description?: string;
  match_score?: number;
  required_skills?: string[];
  optional_skills?: string[];
  missing_required?: string[];
  missing_optional?: string[];
}

export default function CareersPage() {
  const { data: session, status } = useSession();
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

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

  const mockCareers: Career[] = [
    {
      career_id: "career_data_analyst",
      career_name: "Data Analyst",
      description: "Analyze data to provide insights and support business decisions",
      match_score: 0.92,
      required_skills: ["SQL", "Excel", "Python", "Data Visualization", "Statistics"],
      optional_skills: ["Tableau", "Power BI"],
      missing_required: ["Advanced Tableau", "R Programming"],
    },
    {
      career_id: "career_product_manager",
      career_name: "Product Manager",
      description: "Lead product strategy and development",
      match_score: 0.88,
      required_skills: ["Roadmapping", "User Research", "SQL", "Data Analysis", "Communication"],
      optional_skills: ["Agile", "Product Strategy"],
      missing_required: ["Agile Certification", "Product Strategy"],
    },
    {
      career_id: "career_business_analyst",
      career_name: "Business Analyst",
      description: "Analyze business processes and requirements",
      match_score: 0.90,
      required_skills: ["Excel", "SQL", "Business Intelligence", "Reporting", "Stakeholder Management"],
      optional_skills: ["PowerBI"],
      missing_required: ["PowerBI Advanced Features"],
    },
    {
      career_id: "career_data_scientist",
      career_name: "Data Scientist",
      description: "Build machine learning models and advanced analytics",
      match_score: 0.78,
      required_skills: ["Python", "Machine Learning", "Statistics", "Deep Learning", "Feature Engineering"],
      optional_skills: ["NLP"],
      missing_required: ["Advanced ML", "Neural Networks", "NLP"],
    },
    {
      career_id: "career_software_engineer",
      career_name: "Software Engineer",
      description: "Design, develop, and maintain software applications",
      match_score: 0.75,
      required_skills: ["Programming", "Data Structures", "Algorithms", "System Design", "Git"],
      optional_skills: ["Backend Frameworks"],
      missing_required: ["Advanced Algorithms", "Backend Frameworks", "Testing"],
    },
  ];

  const filteredCareers = mockCareers.filter((career) =>
    career.career_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-3">
            Roles You're Fit
          </h1>
          <p className="text-gray-600 text-lg">
            Each role is evaluated based on your skill graph, experience, and
            market requirements.
          </p>
        </div>

        {/* Career Cards - Horizontal Scroll */}
        <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide max-w-7xl">
          {filteredCareers.map((career, index) => {
            // Determine ramp-up time and level based on match score
            const getRampUp = (score: number) => {
              if (score >= 0.85) return { level: "Beginner", months: "4-7" };
              if (score >= 0.75) return { level: "Intermediate", months: "10-14" };
              return { level: "Advanced", months: "14-20" };
            };
            const rampUp = career.match_score ? getRampUp(career.match_score) : { level: "Beginner", months: "6-9" };

            // Icons for each career
            const icons = ["📊", "🎯", "💼", "🧪", "💻"];
            const icon = icons[index % icons.length];

            return (
              <div
                key={career.career_id}
                className="min-w-[380px] bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 border border-purple-100 hover:shadow-xl transition cursor-pointer flex-shrink-0"
                onClick={() => setSelectedCareer(career)}
              >
                {/* Icon and Title */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl">{icon}</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                      {career.career_name}
                    </h3>
                    {/* Fit Score */}
                    {career.match_score && (
                      <div className="text-right">
                        <div className="text-4xl font-bold text-pink-600">
                          {Math.round(career.match_score * 100)}%
                        </div>
                        <p className="text-xs text-gray-500">Fit Score</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Required Skills */}
                {career.required_skills && career.required_skills.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-700 mb-2 uppercase">
                      Required Skills
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {career.required_skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Missing Skills */}
                {career.missing_required && career.missing_required.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-700 mb-2 uppercase">
                      Missing Skills
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {career.missing_required.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Ramp-Up */}
                <div className="mb-4 flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      rampUp.level === "Beginner"
                        ? "bg-green-100 text-green-800"
                        : rampUp.level === "Intermediate"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    {rampUp.level}
                  </span>
                  <span className="text-sm text-gray-600">
                    Ramp-Up: {rampUp.months} months
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-2 gradient-purple-pink text-white rounded-lg font-semibold hover:opacity-90 transition text-sm">
                    View Career Path → →
                  </button>
                  <button className="flex-1 px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition text-sm">
                    Close Skill Gaps →
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Career Detail Modal */}
        {selectedCareer && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedCareer(null)}
          >
            <div
              className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                {/* Modal Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">
                      {selectedCareer.career_name}
                    </h2>
                    <p className="text-gray-600 mt-2">
                      {selectedCareer.description}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedCareer(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Match Score */}
                {selectedCareer.match_score && (
                  <div className="bg-green-50 rounded-lg p-4 mb-6">
                    <p className="text-sm text-green-800 font-medium mb-2">
                      Your Match Score
                    </p>
                    <div className="flex items-end gap-2">
                      <p className="text-4xl font-bold text-green-600">
                        {Math.round(selectedCareer.match_score * 100)}%
                      </p>
                      <p className="text-green-600 mb-1">
                        {selectedCareer.match_score >= 0.8
                          ? "Excellent Match!"
                          : selectedCareer.match_score >= 0.6
                          ? "Good Match"
                          : "Potential Match"}
                      </p>
                    </div>
                  </div>
                )}

                {/* Required Skills */}
                {selectedCareer.required_skills && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Required Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCareer.required_skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Optional Skills */}
                {selectedCareer.optional_skills && selectedCareer.optional_skills.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Optional Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCareer.optional_skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skills to Learn */}
                {selectedCareer.missing_required && selectedCareer.missing_required.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-red-700 mb-3">
                      Skills You Need to Learn
                    </h3>
                    <div className="space-y-2">
                      {selectedCareer.missing_required.map((skill, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 p-3 bg-red-50 rounded-lg"
                        >
                          <div className="w-2 h-2 bg-red-600 rounded-full" />
                          <p className="text-gray-900">{skill}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Link
                    href="/learning-path"
                    className="flex-1 py-3 bg-black text-white text-center rounded-lg font-semibold hover:bg-gray-800 transition"
                  >
                    View Learning Path
                  </Link>
                  <button className="flex-1 py-3 bg-gray-200 text-gray-900 rounded-lg font-semibold hover:bg-gray-300 transition">
                    Save to Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

