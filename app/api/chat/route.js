import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request) {
  try {
    const { userInput } = await request.json();

    const response = await axios.post(
      "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium",
      { inputs: userInput },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        },
      }
    );
    const botReply = response.data[0].generated_text;
    return NextResponse.json({ botReply });
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    return NextResponse.json(
      { error: "Failed to fetch response from hugging face API" },
      { status: 500 }
    );
  }
}
