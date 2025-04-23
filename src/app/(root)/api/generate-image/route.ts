import { NextResponse } from 'next/server'
import { HfInference } from '@huggingface/inference'

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export async function POST(req: Request) {
    
    try {
        const { prompt } = await req.json();
        const response = await hf.textToImage({
            model: 'black-forest-labs/FLUX.1-dev',
            inputs: prompt,
            parameters: {
                guidance_scale: 0.0,
                num_inference_steps: 15,
            },
        });
        console.log('Hugging Face API response received')

        // Convert blob to base64
        const buffer = await response.arrayBuffer();
        const base64 = Buffer.from(buffer).toString('base64');
        const dataUrl = `data:image/png;base64,${base64}`;

        return NextResponse.json({ image: dataUrl });
    } catch (error) {
        console.error('Error generating image:', error);
    }
}