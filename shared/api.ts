/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * Roadmap stage type
 */
export interface RoadmapStage {
  stage: number;
  title: string;
  duration: string;
  description: string;
  skills: string[];
  tools: string[];
  learningSteps: string[];
}

/**
 * Complete roadmap data type
 */
export interface RoadmapData {
  title: string;
  description: string;
  estimatedDuration: string;
  stages: RoadmapStage[];
}

/**
 * Response type for /api/roadmap
 */
export interface RoadmapResponse {
  success: boolean;
  data?: RoadmapData;
  error?: string;
}
