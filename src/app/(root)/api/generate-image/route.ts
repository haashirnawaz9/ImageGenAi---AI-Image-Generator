// app/api/generate-image/route.ts

import { NextResponse } from 'next/server';
import { HfInference } from '@huggingface/inference';

export const runtime = 'nodejs'; // Ensures Buffer is available

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY!);

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { prompt }: { prompt: string } = await req.json();

    const response = await hf.textToImage({
      model: 'black-forest-labs/FLUX.1-dev',
      inputs: prompt,
      parameters: {
        guidance_scale: 0.0,
        num_inference_steps: 15,
      },
    });

    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    const dataUrl = `data:image/png;base64,${base64}`;

    return NextResponse.json({ image: dataUrl });
  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json(
      { error: 'Image generation failed' },
      { status: 500 }
    );
  }
}
