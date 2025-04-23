'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, DownloadIcon } from "lucide-react"

export default function Component() {
  const [prompt, setPrompt] = useState('')
  const [generatedImage, setGeneratedImage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [previousImages, setPreviousImages] = useState<string[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setGeneratedImage('')

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })

      if (response.status === 429) {
        setError('Rate limit exceeded. Please try again later.')
        return
      }

      const data = await response.json()

      if (data.image) {
        setGeneratedImage(data.image)
        setPreviousImages(prev => [data.image, ...prev.slice(0, 3)])
      } else {
        setError(`Failed to generate image: ${data.error}. ${data.details || ''}`)
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError('Failed to generate image: ' + err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a')
      link.href = generatedImage
      link.download = `ai-generated-image-${Date.now()}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className="bg-gradient-to-b from-[#0f172a] to-[#1e293b] min-h-screen py-10 px-4">
      <h1 className="text-6xl font-heading text-center mb-2 text-white -rotate-2">AI Photo Generator</h1>
      <p className="text-center text-2xl mb-10 text-white rotate-1">Transform your ideas into stunning images with AI</p>

      <div className="max-w-2xl mx-auto">
        <Card className="mb-8 border-4 border-slate-700 shadow-xl">
          <CardContent className="p-6 bg-[#1e293b]">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                placeholder="Describe the image you want to generate..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full text-xl p-4 bg-slate-800 placeholder-slate-400 text-white"
              />
              <Button 
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-4 px-6 text-xl"
                disabled={isLoading || !prompt.trim()}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate Image'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {error && (
          <div className="text-red-500 text-center mb-4 text-xl">{error}</div>
        )}

        {generatedImage && (
          <Card className="mb-8 border-4 border-slate-700 shadow-xl">
            <CardContent className="p-6 bg-[#1e293b]">
              <h2 className="text-3xl font-heading mb-4 text-white -rotate-1">Generated Image</h2>
              <div className="aspect-square relative mb-4 border-4 border-slate-700">
                <img
                  src={generatedImage}
                  alt="AI Generated"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex justify-end">
                <Button 
                  onClick={handleDownload}
                  className="px-6 py-3 text-xl bg-indigo-600 hover:bg-indigo-500 text-white"
                >
                  <DownloadIcon className="mr-2 h-6 w-6" />
                  Download Image
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {previousImages.length > 0 && (
          <div className="border-4 border-slate-700 p-6 bg-[#1e293b] shadow-xl rounded-lg">
            <h2 className="text-3xl font-heading mb-4 text-white rotate-1">Previous Generations</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {previousImages.map((img, index) => (
                <div key={index} className="aspect-square border-4 border-slate-700">
                  <img
                    src={img}
                    alt={`Previous generation ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}