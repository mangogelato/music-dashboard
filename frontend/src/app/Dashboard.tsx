import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react'

type DashboardProps = {
  accessToken: string;
};

enum timeRanges {
  SHORT = "short_term",
  MEDIUM = "medium_term",
  LONG = "long_term"
}

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


type ArtistObjectHolder = {
  short_term: ArtistObject[],
  medium_term: ArtistObject[],
  long_term: ArtistObject[]
}

type SongObjectHolder = {
  short_term: SongObject[],
  medium_term: SongObject[],
  long_term: SongObject[]
}

export default function Dashboard({accessToken}: DashboardProps) {

  axios.defaults.baseURL = "https://api.spotify.com/v1/me/top"
  axios.defaults.headers.common['Authorization'] = "Bearer " + accessToken

  const [timeRange, setTimeRange] = useState(timeRanges.SHORT)
  const [artists, setArtists] = useState<ArtistObjectHolder>({
    short_term: [],
    medium_term: [],
    long_term: []
  })
  const [songs, setSongs] = useState<SongObjectHolder>({
    short_term: [],
    medium_term: [],
    long_term: []
  })
  const [isLoading, setIsLoading] = useState(true)

  // Load songs and artists then show page
  useEffect(() => {
    const topArtists = () => {
      
      const artistsArray: ArtistObject[] = []

      if (artists[timeRange].length > 0){
        return;
      }
      axios({
        url: "/artists",
        params: {
          limit: 50,
          time_range: timeRange
        }
      }).then((res) => {
        const result = res.data.items
        // eslint-disable-next-line @typescript-eslint/no-explicit-any 
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
        switch (timeRange){
          case timeRanges.SHORT:
            setArtists(artists => ({...artists, short_term: artistsArray}))
            break;
          case timeRanges.MEDIUM:
            setArtists(artists => ({...artists, medium_term: artistsArray}))
            break;
          case timeRanges.LONG:
            setArtists(artists => ({...artists, long_term: artistsArray}))
            break;
        }
      }).catch((err) => {
        console.log(err)
      })
    }

    const topSongs = () => {
      const songsArray: SongObject[] = []
      if (songs[timeRange].length > 0){
        return;
      }
      axios({
        url: "/tracks",
        params: {
          limit: 50,
          time_range: timeRange
        }
      }).then((res) => {
        const result = res.data.items

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        result.forEach((songRaw: any) => {
          const songFormatted = {
            name: songRaw["name"],
            id: songRaw["id"],
            album_name: songRaw["album"]["name"],
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        switch (timeRange){
          case timeRanges.SHORT:
            setSongs(songs => ({...songs, short_term: songsArray}))
            break;
          case timeRanges.MEDIUM:
            setSongs(songs => ({...songs, medium_term: songsArray}))
            break;
          case timeRanges.LONG:
            setSongs(songs => ({...songs, long_term: songsArray}))
            break;
        }
      }).catch((err) => {
        console.log(err)
      })
    }
    
    setIsLoading(true)
    topArtists()
    topSongs()
    setIsLoading(false)
    return(setArtists(artists), setSongs(songs))
  }, [timeRange])

  // Get rid of code in url
  useEffect(() => {
    window.history.replaceState({}, '', "/")
  }, [])


  // Handles choosing time period for top artists/tracks
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const choice = e.target.value
    switch (choice) {
      case timeRanges.SHORT:
        setTimeRange(timeRanges.SHORT)
        break;
      case timeRanges.MEDIUM:
        setTimeRange(timeRanges.MEDIUM)
        break;
      case timeRanges.LONG:
        setTimeRange(timeRanges.LONG)
        break;
    }
  }

  // Formatting of top artists
  const artistToRow = artists[timeRange].map((artist, index) => {
    return(

      <li key={artist.id}>
        <div className="flex items-center p-3 gap-3 bg-gradient-to-r hover:from-blue-400 hover:to-transparent to:80%" >
          {index + 1}
          <img className="h-25 rounded-xl" alt={"Profile image of artist " + artist.name} src={artist.picture.url.toString()} />
          {artist.name}
        </div>
      </li>
    )
  })

  // Formatting of top tracks
  const songToRow = songs[timeRange].map((song, index) => {
    return(
      <li key={song.id}>
        <div className="flex items-center p-3 gap-3 bg-gradient-to-r hover:from-blue-400 hover:to-transparent to:80%">
          {index + 1}
          <img className="h-25 rounded-xl" alt={"Album image of song " + song.name} src={song.picture.url.toString()} />
          {song["name"] + " - " + song.artists.map((artist) => artist.name).join(", ")}
        </div>
      </li>
    )
  })

  // Buttons to choose time period for top artists/tracks
  const timePeriodSelector = (
    <fieldset className='text-center pb-20'>
      <h1 className='p4'>Time Period</h1>
      <div onChange={handleChange} className='flex flex-row justify-evenly justify-center items-center '>
        <label htmlFor="short" className="checked flex justify-center items-center rounded rounded-xl ring-1 ring-gray-500 dark:has-checked:bg-blue-950 has-checked:bg-blue-200 hover:bg-gray-500 w-2/10 h-20">
          <input type="radio" id="short" name="time-period" value={timeRanges.SHORT} defaultChecked className="sr-only" />
          <span>Short (last 4 weeks)</span>
        </label>
        <label htmlFor="medium" className="flex justify-center items-center rounded rounded-xl ring-1 ring-gray-500 dark:has-checked:bg-blue-950 has-checked:bg-blue-200 hover:bg-gray-500 w-2/10 h-20">
          <input type="radio" id="medium" name="time-period" value={timeRanges.MEDIUM} className="sr-only" />
          <span>Medium (last 6 months)</span>
        </label>
        <label htmlFor="long" className="flex justify-center items-center rounded rounded-xl ring-1 ring-gray-500 dark:has-checked:bg-blue-950 has-checked:bg-blue-200 hover:bg-gray-500 w-2/10 h-20">
          <input type="radio" id="long" name="time-period" value={timeRanges.LONG} className="sr-only" />
          <span>Long (last year) </span>
        </label>
      </div>
    </fieldset>
  )

  const loadingScreen = (<div><h3>Loading...</h3></div>) 


  return (
    isLoading ? loadingScreen : (
      <div className='[&_h1]:text-3xl [&_h1]:p-10'>
        {timePeriodSelector}
        <div className='flex flex-row flex-wrap justify-evenly'>
          <div className="w-150">
            <h1 className='justify-self-center'>Top Artists</h1>
            <ol type="A">
              {artistToRow}
            </ol>
          </div>
          <div className="w-150">
            <h1 className='justify-self-center'>Top Tracks</h1>
            <ol type="A">
              {songToRow}
            </ol>
          </div>
        </div>
      </div>)
    )

}
