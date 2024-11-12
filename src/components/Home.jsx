import { useState, useEffect, useCallback } from 'react'
import { Search, Camera, Download, X } from 'lucide-react'
import o1 from "../assets/images/bg.jpg"
import Chatbot from './Chatbot'

const apiKey = "bq4kksk6Gulp4iSAy1NSmSSsuHTVCKS19gCHQKFaIz0WISxcp1egtPur"
const perPage = 15

export default function Home() {
  const [images, setImages] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState(null)
  const [lightboxImage, setLightboxImage] = useState(null)
  const [loading, setLoading] = useState(false)

  const getImages = useCallback(async (apiURL) => {
    setLoading(true)
    try {
      const response = await fetch(apiURL, {
        headers: { Authorization: apiKey }
      })
      const data = await response.json()
      setImages(prevImages => [...prevImages, ...data.photos])
    } catch (error) {
      console.error("Failed to load images!", error)
      alert("Failed to load images!")
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    getImages(`https://api.pexels.com/v1/curated?page=1&per_page=${perPage}`)
  }, [getImages])

  const loadMoreImages = () => {
    const nextPage = currentPage + 1
    setCurrentPage(nextPage)
    const apiUrl = searchTerm
      ? `https://api.pexels.com/v1/search?query=${searchTerm}&page=${nextPage}&per_page=${perPage}`
      : `https://api.pexels.com/v1/curated?page=${nextPage}&per_page=${perPage}`
    getImages(apiUrl)
  }

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setImages([])
      setCurrentPage(1)
      setSearchTerm(e.target.value)
      getImages(`https://api.pexels.com/v1/search?query=${e.target.value}&page=1&per_page=${perPage}`)
    }
  }

  const downloadImg = (imgUrl) => {
    fetch(imgUrl)
      .then(res => res.blob())
      .then(blob => {
        const a = document.createElement("a")
        a.href = URL.createObjectURL(blob)
        a.download = new Date().getTime()
        a.click()
      })
      .catch(() => alert("Failed to download image!"))
  }

  return (
    <>
    <main className="min-h-screen bg-black">
      {lightboxImage && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4">
          <div className="bg-black rounded-lg w-full max-w-4xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3 text-white">
                <Camera className="w-6 h-6" />
                <span className="text-lg">{lightboxImage.photographer}</span>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => downloadImg(lightboxImage.src.large2x)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <Download className="w-6 h-6 text-white" />
                </button>
                <button 
                  onClick={() => setLightboxImage(null)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>
            <div className="flex justify-center">
              <img 
                src={lightboxImage.src.large2x} 
                alt="preview" 
                className="max-h-[65vh] w-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}

      <section className="relative h-[60vh] pt-16 flex items-center justify-center">
        <img 
          src={o1} 
          alt="background" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 text-center px-4 max-w-4xl  mx-auto">
          <h1 className="text-4xl md:text-5xl font-semibold text-white mb-2">
          AI Image Generator Tool JavaScript
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8">
          Convert your text into an image within a second using this
        JavaScript-powered AI Image Generator tool.
          </p>
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search Images"
              onKeyUp={handleSearch}
              className="w-full h-14 pl-12 pr-4 rounded-lg text-lg focus:outline-none"
            />
          </div>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 max-w-[2000px] mx-auto">
          {images.map((img, index) => (
            <div 
              key={index} 
              className="break-inside-avoid mb-4 relative group rounded-lg overflow-hidden"
            >
              <img
                src={img.src.large2x}
                alt={img.photographer}
                className="w-full rounded-lg cursor-pointer"
                onClick={() => setLightboxImage(img)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white">
                    <Camera className="w-5 h-5" />
                    <span className="text-sm font-medium">{img.photographer}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      downloadImg(img.src.large2x)
                    }}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <Download className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <button
            onClick={loadMoreImages}
            disabled={loading}
            className="px-8 py-3 bg-[#8a6cff] text-white rounded-lg text-lg font-medium hover:bg-[#7559ff] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      </section>
    </main>
    <Chatbot/>
    </>
    
  )
}