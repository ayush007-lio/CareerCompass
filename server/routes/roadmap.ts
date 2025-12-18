import { RequestHandler } from "express";
import { RoadmapResponse } from "@shared/api";
import { generateRoadmapWithAI } from "../services/aiRoadmapGenerator";

export const handleRoadmap: RequestHandler<
  unknown,
  RoadmapResponse,
  { jobRole: string }
> = async (req, res) => {
  const { jobRole } = req.body;

  if (!jobRole || typeof jobRole !== "string") {
    return res.status(400).json({
      success: false,
      error: "Please provide a valid job role",
    });
  }

  try {
    const roadmap = await generateRoadmapWithAI(jobRole);
    res.json({
      success: true,
      data: roadmap,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to generate roadmap";
    res.status(500).json({
      success: false,
      error: errorMessage,
    });
  }
};
