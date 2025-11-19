"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";

interface Skill {
  id: string;
  name: string;
  description: string;
  status: "completed" | "in-progress" | "locked";
  prerequisites?: string[];
}

interface Course {
  id: string;
  name: string;
  provider: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  url?: string;
}

export default function LearningPathPage() {
  const { data: session, status } = useSession();
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

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

  // Mock learning path data
  const learningPath: Skill[] = [
    {
      id: "1",
      name: "Python Basics",
      description: "Learn Python fundamentals, syntax, and basic programming concepts",
      status: "completed",
    },
    {
      id: "2",
      name: "Data Structures",
      description: "Understand arrays, lists, dictionaries, and common data structures",
      status: "completed",
      prerequisites: ["1"],
    },
    {
      id: "3",
      name: "SQL & Databases",
      description: "Master database querying and SQL fundamentals",
      status: "in-progress",
      prerequisites: ["1"],
    },
    {
      id: "4",
      name: "Data Analysis with Pandas",
      description: "Learn data manipulation and analysis using Pandas library",
      status: "locked",
      prerequisites: ["2", "3"],
    },
    {
      id: "5",
      name: "Data Visualization",
      description: "Create insightful visualizations with Matplotlib and Seaborn",
      status: "locked",
      prerequisites: ["4"],
    },
    {
      id: "6",
      name: "Machine Learning Basics",
      description: "Introduction to ML algorithms and scikit-learn",
      status: "locked",
      prerequisites: ["4"],
    },
  ];

  const courses: Course[] = [
    {
      id: "c1",
      name: "Python for Everybody",
      provider: "Coursera",
      duration: "8 weeks",
      difficulty: "Beginner",
    },
    {
      id: "c2",
      name: "Data Analysis with Python",
      provider: "IBM",
      duration: "6 weeks",
      difficulty: "Intermediate",
    },
    {
      id: "c3",
      name: "SQL for Data Science",
      provider: "UC Davis",
      duration: "4 weeks",
      difficulty: "Beginner",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link href="/dashboard" className="text-xl font-bold text-black">
                Classmate
              </Link>
              <Link
                href="/learning-path"
                className="px-3 py-2 text-black font-semibold"
              >
                Learning Path
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Your Learning Path
          </h1>
          <p className="text-gray-600">
            Follow this personalized path to achieve your career goals
          </p>
        </div>

        {/* Progress Overview */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Overall Progress
              </h2>
              <p className="text-sm text-gray-600">
                2 of 6 skills completed
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-green-600">33%</p>
              <p className="text-sm text-gray-600">Complete</p>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-green-600 h-3 rounded-full transition-all"
              style={{ width: "33%" }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Learning Path Timeline */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Skills to Master</h2>
            
            {learningPath.map((skill, index) => (
              <div
                key={skill.id}
                className={`relative ${
                  index !== learningPath.length - 1 ? "pb-6" : ""
                }`}
              >
                {/* Connecting Line */}
                {index !== learningPath.length - 1 && (
                  <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-200" />
                )}

                {/* Skill Card */}
                <div
                  className={`relative bg-white rounded-lg shadow-md p-6 cursor-pointer transition hover:shadow-lg ${
                    skill.status === "locked"
                      ? "opacity-60"
                      : "hover:border-2 hover:border-black"
                  }`}
                  onClick={() =>
                    skill.status !== "locked" && setSelectedSkill(skill)
                  }
                >
                  <div className="flex items-start gap-4">
                    {/* Status Icon */}
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                        skill.status === "completed"
                          ? "bg-green-600"
                          : skill.status === "in-progress"
                          ? "bg-blue-600"
                          : "bg-gray-300"
                      }`}
                    >
                      {skill.status === "completed" ? (
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : skill.status === "in-progress" ? (
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-6 h-6 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      )}
                    </div>

                    {/* Skill Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {skill.name}
                        </h3>
                        {skill.status === "completed" && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            Completed
                          </span>
                        )}
                        {skill.status === "in-progress" && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            In Progress
                          </span>
                        )}
                        {skill.status === "locked" && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            Locked
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{skill.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recommended Courses Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Recommended Courses
                </h3>
                <div className="space-y-4">
                  {courses.map((course) => (
                    <div
                      key={course.id}
                      className="p-4 border border-gray-200 rounded-lg hover:border-black transition cursor-pointer"
                    >
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {course.name}
                      </h4>
                      <p className="text-xs text-gray-600 mb-2">
                        {course.provider}
                      </p>
                      <div className="flex items-center gap-2 text-xs">
                        <span className={`px-2 py-1 rounded-full ${
                          course.difficulty === "Beginner"
                            ? "bg-green-100 text-green-800"
                            : course.difficulty === "Intermediate"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}>
                          {course.difficulty}
                        </span>
                        <span className="text-gray-600">{course.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Card */}
              <div className="bg-gradient-to-br from-black to-gray-800 text-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold mb-2">Need Help?</h3>
                <p className="text-sm mb-4 opacity-90">
                  Get personalized guidance from our AI career advisor
                </p>
                <button className="w-full py-2 bg-white text-black rounded-lg font-semibold hover:bg-gray-100 transition">
                  Talk to Advisor
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

