import { RoadmapData } from "@shared/api";
import { CheckCircle, BookOpen, Wrench, Clock } from "lucide-react";

interface RoadmapDisplayProps {
  roadmap: RoadmapData;
}

export default function RoadmapDisplay({ roadmap }: RoadmapDisplayProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">
          {roadmap.title}
        </h2>
        <p className="text-lg text-gray-600 mb-4">{roadmap.description}</p>
        <div className="flex items-center justify-center gap-2 text-base text-blue-600 font-semibold">
          <Clock className="w-5 h-5" />
          <span>Estimated Duration: {roadmap.estimatedDuration}</span>
        </div>
      </div>

      {/* Stages Timeline */}
      <div className="space-y-8">
        {roadmap.stages.map((stage, index) => (
          <div key={stage.stage} className="relative">
            {/* Timeline connector */}
            {index < roadmap.stages.length - 1 && (
              <div className="absolute left-8 top-24 w-0.5 h-12 bg-blue-200"></div>
            )}

            {/* Stage card */}
            <div className="flex gap-6">
              {/* Timeline dot */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg z-10">
                  {stage.stage}
                </div>
              </div>

              {/* Card content */}
              <div className="flex-1 pb-8">
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                      {stage.title}
                    </h3>
                    <p className="text-gray-600 mb-2">{stage.description}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{stage.duration}</span>
                    </div>
                  </div>

                  {/* Skills section */}
                  <div className="mb-5">
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                      <h4 className="font-semibold text-gray-900">
                        Key Skills
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {stage.skills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tools section */}
                  <div className="mb-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Wrench className="w-5 h-5 text-green-600" />
                      <h4 className="font-semibold text-gray-900">
                        Tools & Technologies
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {stage.tools.map((tool) => (
                        <span
                          key={tool}
                          className="inline-block px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium border border-green-200"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Learning steps section */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="w-5 h-5 text-purple-600" />
                      <h4 className="font-semibold text-gray-900">
                        Learning Steps
                      </h4>
                    </div>
                    <ol className="space-y-2">
                      {stage.learningSteps.map((step, idx) => (
                        <li
                          key={idx}
                          className="flex gap-3 text-gray-700 text-sm"
                        >
                          <span className="font-semibold text-purple-600 flex-shrink-0">
                            {idx + 1}.
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
