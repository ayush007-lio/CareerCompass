import { RoadmapData } from "@shared/api";

// In-memory cache for roadmaps
const roadmapCache = new Map<string, RoadmapData>();

function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "OPENAI_API_KEY environment variable is not set. Please set your OpenAI API key."
    );
  }
  // Using fetch API directly instead of OpenAI SDK for better compatibility
  return apiKey;
}

export async function generateRoadmapWithAI(
  jobRole: string
): Promise<RoadmapData> {
  // Check cache first
  const cacheKey = jobRole.toLowerCase().trim();
  if (roadmapCache.has(cacheKey)) {
    return roadmapCache.get(cacheKey)!;
  }

  const apiKey = getOpenAIClient();

  const prompt = `Generate a detailed career roadmap for a ${jobRole}.

Please respond with ONLY valid JSON (no markdown, no code blocks, no explanations) that matches this exact structure:
{
  "title": "Job Role Title",
  "description": "Brief description of the role and what they do",
  "estimatedDuration": "X-Y months",
  "stages": [
    {
      "stage": 1,
      "title": "Stage Title",
      "duration": "X-Y months",
      "description": "Description of what you'll learn in this stage",
      "skills": ["skill1", "skill2", "skill3", "skill4"],
      "tools": ["tool1", "tool2", "tool3"],
      "learningSteps": ["step1", "step2", "step3", "step4"]
    },
    {
      "stage": 2,
      "title": "Stage Title",
      "duration": "X-Y months",
      "description": "Description of what you'll learn in this stage",
      "skills": ["skill1", "skill2", "skill3", "skill4"],
      "tools": ["tool1", "tool2", "tool3"],
      "learningSteps": ["step1", "step2", "step3", "step4"]
    },
    {
      "stage": 3,
      "title": "Stage Title",
      "duration": "X-Y months",
      "description": "Description of what you'll learn in this stage",
      "skills": ["skill1", "skill2", "skill3", "skill4"],
      "tools": ["tool1", "tool2", "tool3"],
      "learningSteps": ["step1", "step2", "step3", "step4"]
    },
    {
      "stage": 4,
      "title": "Stage Title",
      "duration": "X-Y months",
      "description": "Description of what you'll learn in this stage",
      "skills": ["skill1", "skill2", "skill3", "skill4"],
      "tools": ["tool1", "tool2", "tool3"],
      "learningSteps": ["step1", "step2", "step3", "step4"]
    }
  ]
}

Important:
- The roadmap MUST have exactly 4 stages
- Each stage MUST have exactly 4 skills, 3 tools, and 4 learning steps
- Skills should be specific and actionable
- Tools should be actual software/frameworks/technologies people use in this field
- Learning steps should be concrete and sequential
- Estimated duration should be realistic for this career
- Return ONLY the JSON, no other text`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenAI API error:", errorData);
      throw new Error(`OpenAI API error: ${errorData.error?.message || "Unknown error"}`);
    }

    const data = (await response.json()) as {
      choices: Array<{ message: { content: string } }>;
    };
    const responseText = data.choices[0]?.message?.content || "";

    if (!responseText) {
      throw new Error("Empty response from OpenAI API");
    }

    // Parse the JSON response - try to extract JSON even if wrapped
    let jsonStr = responseText.trim();

    // Remove markdown code blocks if present
    if (jsonStr.startsWith("```json")) {
      jsonStr = jsonStr.replace(/^```json\s*/, "").replace(/\s*```$/, "");
    } else if (jsonStr.startsWith("```")) {
      jsonStr = jsonStr.replace(/^```\s*/, "").replace(/\s*```$/, "");
    }

    const roadmapData = JSON.parse(jsonStr) as RoadmapData;

    // Validate the response structure
    if (
      !roadmapData.title ||
      !roadmapData.description ||
      !roadmapData.estimatedDuration ||
      !Array.isArray(roadmapData.stages)
    ) {
      throw new Error(
        "Invalid roadmap structure: missing required fields (title, description, estimatedDuration, stages)"
      );
    }

    if (roadmapData.stages.length !== 4) {
      throw new Error(
        `Expected 4 stages, got ${roadmapData.stages.length}. Each stage must have: stage number, title, duration, description, skills array, tools array, and learningSteps array.`
      );
    }

    // Validate each stage
    for (const stage of roadmapData.stages) {
      if (
        !stage.stage ||
        !stage.title ||
        !stage.duration ||
        !stage.description ||
        !Array.isArray(stage.skills) ||
        !Array.isArray(stage.tools) ||
        !Array.isArray(stage.learningSteps)
      ) {
        throw new Error(
          `Invalid stage structure: all stages must have stage, title, duration, description, skills, tools, and learningSteps`
        );
      }
    }

    // Cache the result
    roadmapCache.set(cacheKey, roadmapData);

    return roadmapData;
  } catch (error) {
    const errorMsg =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error generating roadmap with AI:", errorMsg);
    throw new Error(
      `Failed to generate roadmap for "${jobRole}": ${errorMsg}`
    );
  }
}

export function clearCache() {
  roadmapCache.clear();
}

export function getCacheStats() {
  return {
    cachedRoadmaps: roadmapCache.size,
    cachedRoles: Array.from(roadmapCache.keys()),
  };
}
