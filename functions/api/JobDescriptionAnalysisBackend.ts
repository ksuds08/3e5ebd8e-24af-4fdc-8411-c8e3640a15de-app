export async function JobDescriptionAnalysisBackendHandler(req: Request): Promise<Response> {
  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json" }
      });
    }
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return new Response(JSON.stringify({ error: "Unsupported Media Type" }), {
        status: 415,
        headers: { "Content-Type": "application/json" }
      });
    }
    const body = await req.json();
    const analysisResult = await analyzeJobDescription(body);
    return new Response(JSON.stringify(analysisResult), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error", details: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

async function analyzeJobDescription(body: JobDescriptionAnalysisRequest): Promise<JobDescriptionAnalysisResponse> {
  if (!body || !body.jobDescription) {
    throw new Error("Invalid input: jobDescription is required");
  }
  // Simulate analysis logic
  const keywords = extractKeywords(body.jobDescription);
  return { keywords };
}

function extractKeywords(jobDescription: string): string[] {
  // Simplified example of keyword extraction
  const words = jobDescription.split(/\s+/);
  const keywords = words.filter((word) => word.length > 4); // Example logic: words longer than 4 characters
  return Array.from(new Set(keywords));
}

type JobDescriptionAnalysisRequest = {
  jobDescription: string;
};

type JobDescriptionAnalysisResponse = {
  keywords: string[];
};