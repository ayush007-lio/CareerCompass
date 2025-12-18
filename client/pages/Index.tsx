import { useState } from "react";
import { Zap, Search } from "lucide-react";
import { RoadmapResponse } from "@shared/api";
import RoadmapDisplay from "../components/RoadmapDisplay";

export default function Index() {
  const [jobRole, setJobRole] = useState("");
  const [roadmap, setRoadmap] = useState<RoadmapResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const suggestedRoles = [
    "Software Engineer",
    "Data Scientist",
    "Product Manager",
    "UX Designer",
    "DevOps Engineer",
    "Machine Learning Engineer",
  ];

  const handleGenerateRoadmap = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!jobRole.trim()) {
      setError("Please enter a job role");
      return;
    }

    setLoading(true);
    setError("");
    setRoadmap(null);

    try {
      const response = await fetch("/api/roadmap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobRole: jobRole.trim() }),
      });

      const data = (await response.json()) as RoadmapResponse;

      if (data.success && data.data) {
        setRoadmap(data);
        setJobRole("");
      } else {
        setError(data.error || "Failed to generate roadmap");
        setRoadmap(null);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      setRoadmap(null);
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestedRole = (role: string) => {
    setJobRole(role);
    setRoadmap(null);
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Career Path Roadmap
              </h1>
              <p className="text-sm text-gray-600">
                Discover your journey to becoming a professional
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!roadmap ? (
          <div className="space-y-12">
            {/* Hero Section */}
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
                Build Your Career
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                  Step by Step
                </span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Enter your desired job role and get a personalized roadmap with
                learning stages, essential skills, tools, and practical steps to
                guide your career journey.
              </p>
            </div>

            {/* Search Form */}
            <div className="flex flex-col items-center gap-6">
              <form
                onSubmit={handleGenerateRoadmap}
                className="w-full max-w-2xl"
              >
                <div className="relative flex gap-2">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    <input
                      type="text"
                      value={jobRole}
                      onChange={(e) => {
                        setJobRole(e.target.value);
                        if (error) setError("");
                      }}
                      placeholder="Enter any job role (e.g., Data Scientist, UX Designer, etc.)"
                      className={`w-full pl-12 pr-4 py-4 border-2 rounded-lg focus:outline-none transition-colors text-base ${
                        error
                          ? "border-red-400 bg-red-50 focus:border-red-500"
                          : "border-gray-300 bg-white focus:border-blue-500"
                      }`}
                      disabled={loading}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5" />
                        <span>Generate Roadmap</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Error Message */}
              {error && (
                <div className="w-full max-w-2xl p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 font-medium">{error}</p>
                </div>
              )}

              {/* Suggested Roles */}
              <div className="w-full max-w-2xl">
                <p className="text-sm font-semibold text-gray-600 mb-3 block text-center">
                  Try one of these roles:
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  {suggestedRoles.map((role) => (
                    <button
                      key={role}
                      onClick={() => handleSuggestedRole(role)}
                      className="px-4 py-2 bg-white border border-gray-300 hover:border-blue-500 hover:bg-blue-50 rounded-lg text-sm font-medium text-gray-700 transition-colors"
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Personalized Paths
                </h3>
                <p className="text-gray-600 text-sm">
                  Get custom learning roadmaps tailored to your career goals
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Search className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Structured Learning
                </h3>
                <p className="text-gray-600 text-sm">
                  Follow clear stages with skills, tools, and practical steps
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Time Estimates
                </h3>
                <p className="text-gray-600 text-sm">
                  Know how long each stage takes to master the role
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Back Button */}
            <button
              onClick={() => {
                setRoadmap(null);
                setJobRole("");
                setError("");
              }}
              className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-2 hover:bg-blue-50 rounded-lg transition-colors"
            >
              ← Back to Search
            </button>

            {/* Roadmap Display */}
            {roadmap.data && <RoadmapDisplay roadmap={roadmap.data} />}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-600 text-sm">
          <p>
            Career Path Roadmap • Empowering professionals to grow and succeed
          </p>
        </div>
      </footer>
    </div>
  );
}
