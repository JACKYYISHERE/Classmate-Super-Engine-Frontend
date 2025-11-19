"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { api } from "@/utils/api";
import Sidebar from "@/components/Sidebar";

interface AnalysisResult {
  skills?: string[];
  careers?: Array<{
    career_id: string;
    career_name: string;
    match_score?: number;
  }>;
  gaps?: {
    missing_required?: string[];
    missing_optional?: string[];
  };
  learning_path?: {
    missing_skills_ordered?: string[];
  };
}

export default function AnalyzePage() {
  const { data: session, status } = useSession();
  const [text, setText] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const handleAnalyze = async () => {
    if (!text.trim()) {
      setError("Please enter some text to analyze");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await api.post("/api/analyze", { text });
      setResult(response.data);
    } catch (err: any) {
      console.error("Analysis error:", err);
      setError(err.response?.data?.detail || "Failed to analyze. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Call the appropriate endpoint based on file type
      const endpoint = file.name.toLowerCase().includes("transcript")
        ? "/api/analyze-transcript"
        : "/api/analyze";

      const response = await api.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setResult(response.data);
    } catch (err: any) {
      console.error("File upload error:", err);
      setError(err.response?.data?.detail || "Failed to upload file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
        {/* Welcome Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            👋 Welcome to Classmate.
          </h2>
          <p className="text-gray-600 mb-4">
            Tell me what you want to achieve — or simply upload your résumé,
            transcript, or list of courses. I'll build your skill graph and
            career path.
          </p>
          
          {/* You can also paste */}
          <div className="bg-gray-50 rounded-lg p-4 mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">
              You can also paste:
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• classes you've taken</li>
              <li>• your major/minor</li>
              <li>• projects</li>
              <li>• work experience</li>
              <li>• skills you think you have</li>
            </ul>
            <p className="text-sm text-gray-500 italic mt-2">
              I'll figure out the rest.
            </p>
          </div>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          {/* Input Field with Upload */}
          <div className="relative">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full px-4 py-4 pr-24 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700"
              placeholder="Tell me your goals or paste your background..."
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
              {/* Upload Icon */}
              <label className="cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition">
                <input
                  type="file"
                  accept=".pdf,.docx,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </label>
              {/* Send Button */}
              <button
                onClick={handleAnalyze}
                disabled={loading || !text.trim()}
                className="w-10 h-10 gradient-purple-pink text-white rounded-full flex items-center justify-center hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg"
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800">{error}</p>
            </div>
          )}
        </div>

        {/* Results Section */}
        {result && (
          <div className="space-y-6">
            {/* Extracted Skills */}
            {result.skills && result.skills.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Extracted Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {result.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Career Recommendations */}
            {result.careers && result.careers.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Career Recommendations
                </h2>
                <div className="space-y-4">
                  {result.careers.map((career, index) => (
                    <div
                      key={index}
                      className="p-4 border border-gray-200 rounded-lg hover:border-black transition"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {career.career_name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {career.career_id}
                          </p>
                        </div>
                        {career.match_score && (
                          <div className="text-right">
                            <p className="text-2xl font-bold text-green-600">
                              {Math.round(career.match_score * 100)}%
                            </p>
                            <p className="text-xs text-gray-500">Match</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skill Gaps */}
            {result.gaps && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Skill Gaps
                </h2>
                
                {result.gaps.missing_required && result.gaps.missing_required.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-red-700 mb-2">
                      Required Skills (Missing)
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {result.gaps.missing_required.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {result.gaps.missing_optional && result.gaps.missing_optional.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-700 mb-2">
                      Optional Skills (Missing)
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {result.gaps.missing_optional.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Learning Path */}
            {result.learning_path?.missing_skills_ordered && 
             result.learning_path.missing_skills_ordered.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Recommended Learning Path
                </h2>
                <div className="space-y-2">
                  {result.learning_path.missing_skills_ordered.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-semibold">
                        {index + 1}
                      </div>
                      <p className="text-gray-900">{skill}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        </div>
      </div>
    </div>
  );
}

