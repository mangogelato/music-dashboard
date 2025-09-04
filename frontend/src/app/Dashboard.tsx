import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react'
import Link from 'next/link';


const SHORT = "short_term"
const MEDIUM = "medium_term"
const LONG = "long_term"

const queryClient = new QueryClient()


type DashboardProps = {
  accessToken: string;
};

type ArtistObject = {
  name: string,
  id: string,
  picture: {
    width: number
    height: number
    url: URL
  },
  genres: string[],
  popularity: number,
  link: URL,
  followers: number
}

type SongObject = {
  name: string,
  id: string,
  album_name: string,
  artists: {
    name: string,
    link: URL
  }[],
  picture: {
    width: number
    height: number
    url: URL
  },
  popularity: number,
  release_date: Date,
  link: URL
}

function getTopTracks(time_range: string) {
  const songs: Object[] = []
  axios({
    url: "/tracks",
    params: {
      limit: 50,
      time_range: time_range
    }
  }).then((res) => {
    const songArray = res.data.items
    //console.log(artistsArray)
    songArray.forEach((songRaw: any) => {
      const songFormatted = {
        name: songRaw["name"],
        id: songRaw["id"],
        album_name: songRaw["album"]["name"],
        artist_names: 
          songRaw["artists"].map((artist: any) => {
            artist.name
          }),
        picture: songRaw["album"]["images"][0],
        popularity: songRaw['popularity'],
        release_date: songRaw["album"]["release_date"],
        link: songRaw['external_urls']['spotify']
      }
      songs.push(songFormatted)
    })

  }).catch((err) => {
    console.log(err)
  })
  return ""
}

function getTopArtists(time_range: string){
  const artistsArray: ArtistObject[] = []
  return axios({
    url: "/artists",
    params: {
      limit: 50,
      time_range: time_range
    }
  })
}


export default function Dashboard({accessToken}: DashboardProps) {

  axios.defaults.baseURL = "https://api.spotify.com/v1/me/top"
  axios.defaults.headers.common['Authorization'] = "Bearer " + accessToken

  const [timeRange, setTimeRange] = useState(SHORT)
  const [artists, setArtists] = useState<ArtistObject[]>([])
  const [songs, setSongs] = useState<SongObject[]>([])
  const [isLoading, setIsLoading] = useState(true)


  const topArtists = () => {
    const artistsArray: ArtistObject[] = []
    axios({
      url: "/artists",
      params: {
        limit: 50,
        time_range: timeRange
      }
    }).then((res) => {
      const result = res.data.items
      //console.log(artistsArray)
      result.forEach((artistRaw: any) => {
        const artistFormatted: ArtistObject = {
          name: artistRaw["name"],
          id: artistRaw["id"],
          picture: artistRaw["images"][0],
          genres: artistRaw["genres"],
          popularity: artistRaw['popularity'],
          link: artistRaw['external_urls']['spotify'],
          followers: artistRaw['followers']['total']
        }
        artistsArray.push(artistFormatted)        
      })
      setArtists(artistsArray)
    }).catch((err) => {
      console.log(err)
    })
  }

  const topSongs = () => {
    const songsArray: SongObject[] = []
    axios({
      url: "/tracks",
      params: {
        limit: 50,
        time_range: timeRange
      }
    }).then((res) => {
      const result = res.data.items
      //console.log(artistsArray)
      //console.debug(result)
      
      

      result.forEach((songRaw: any) => {
        const artistsFormatted: {name: string, link: URL}[] = []
        const songFormatted = {
          name: songRaw["name"],
          id: songRaw["id"],
          album_name: songRaw["album"]["name"],
          artists: songRaw["artists"].map((songArtist: any) => new Object({
            name: songArtist["name"],
            link: songArtist["external_urls"]["spotify"]
          })),
          picture: songRaw["album"]["images"][0],
          popularity: songRaw['popularity'],
          release_date: songRaw["album"]["release_date"],
          link: songRaw['external_urls']['spotify']
        }
        
        songsArray.push(songFormatted)
      })
      setSongs(songsArray)
      console.debug(songsArray)
    }).catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    topArtists()
    topSongs()
    setIsLoading(false)
    return(setArtists([]), setSongs([]))
  }, [])

    const artistToRow = artists.map((artist, index) => {
    return(

      <li key={artist.id}>
        <div className="flex flex-row items-center p-3 gap-3 bg-gradient-to-r hover:from-blue-400 hover:to-transparent to:80%" >
          {index + 1}
          <img src={artist.picture.url.toString()} height={'50em'} width={'50em'} />
          {artist.name}
        </div>
      </li>
      // <tr key={artist.id}>
      //   <td>
      //     {artist["name"]}
      //     <img src={artist.picture.url.toString()} height={50} width={50}/>
      //   </td>
      //   <td>{artist.genres.join(", ")}</td>
      //   <td>{artist.popularity}</td>
      // </tr>
    )
  })

  const songToRow = songs.map((song, index) => {
    return(
      <li key={song.id}>
        <div className="flex flex-row items-center p-3 gap-3 bg-gradient-to-r hover:from-blue-400 hover:to-transparent to:80%">
          {index + 1}
          <img src={song.picture.url.toString()} height={'50em'} width={'50em'} />
          {song["name"] + " - " + song.artists.map((artist) => artist.name).join(", ")}
        </div>
      </li>
    )
  })

  const loadingScreen = (<div>Loading</div>)
  

  


  return (
    isLoading ? loadingScreen : (
      <div className='flex flex-row justify-evenly w-9/10 border-8 border-red-100 self-center'>
        <div>
          <ol type="A">
            {artistToRow}
          </ol>
        </div>
        <div>
          <ol type="A">
            {songToRow}
          </ol>
        </div>
      </div>
    )
    
  )
}
