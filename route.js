export async function POST(req) {
  try {
    const { imageBase64, imageMime } = await req.json();
    if (!imageBase64 || !imageMime) {
      return Response.json({ error: "Missing image data" }, { status: 400 });
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1000,
        messages: [{
          role: "user",
          content: [
            { type: "image", source: { type: "base64", media_type: imageMime, data: imageBase64 } },
            { type: "text", text: `Analyze this food image as a professional nutritionist. Return ONLY raw JSON (no markdown, no backticks): {"meal_name":"name","total_calories":500,"total_protein":30,"total_carbs":40,"total_fat":20,"health_score":7,"items":[{"name":"food","emoji":"🍽️","calories":200,"protein":15,"carbs":20,"fat":10}],"tip":"short tip"}` }
          ]
        }]
      })
    });

    const data = await response.json();
    if (data.error) return Response.json({ error: data.error.message }, { status: 500 });

    const rawText = data.content?.find(b => b.type === "text")?.text || "";
    const start = rawText.indexOf("{");
    const end = rawText.lastIndexOf("}");
    if (start === -1) return Response.json({ error: "No food detected" }, { status: 422 });

    return Response.json(JSON.parse(rawText.slice(start, end + 1)));
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
