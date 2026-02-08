import axios from 'axios'
import { data } from 'react-router-dom'

// load envs
export const Unsplash_key = import.meta.env.VITE_UNSPLASH_KEY
const Pexels_key = import.meta.env.VITE_PEXELS_KEY

// Normalizer helper
function normalizePhotos(items) {
// console.log("Normalizing photos")
  // console.log(items)
  
    return items.map(item => ({
    id: item.id,
    type: 'photo',
    title:  item.user.name,
    url: item.urls.small,
    ogUrl:item.links.html,        // small image
    fullUrl: item.urls.full,       // full image
    width: item.width,
    height: item.height,
    photographer: item.user.name,
    source: 'unsplash'
  }))
  
  
}

function normalizeVideos(items) {
  // console.log("Normalizing videos")
  // console.log(items)
 
  return items.map(item => ({
    id: item.id,
    type: 'video',
    title: item.user.name || `Video ${item.id}`,   // using photographer name or fallback
    thumbnail: item.image,                        // Pexels provides a preview image
    url: item.video_files[0]?.link,  
    ogUrl: item.url,
    // first available video file
    width: item.video_files[0]?.width,
    height: item.video_files[0]?.height,
    photographer: item.user.name,
    source: 'pexels'
  }))
}


// Fetch photos
export async function fetchPhotos(query, page=1, per_page=20) {
  const res = await axios.get('https://api.unsplash.com/search/photos', {
    params: { query, page, per_page },
    headers: { Authorization: `Client-ID ${Unsplash_key}` }
  })
  
  return normalizePhotos(res.data.results)
}

// Fetch videos
export async function fetchVideos(query, per_page=20) {
  const res = await axios.get('https://api.pexels.com/videos/search', {
    params: { query, per_page },
    headers: { Authorization: Pexels_key }
  })
  return normalizeVideos(res.data.videos)
}
