import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react'


const SHORT = "short_term"
const MEDIUM = "medium_term"
const LONG = "long_term"


type DashboardProps = {
  accessToken: string;
};

type ArtistObject = {
  name: string,
  picture: Object,
  genres: string,
  popularity: number,
  link: URL,
  followers: number
}

type SongObject = {
  name: string,
  album_name: string,
  artist_names: string[],
  picture: Object,
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



export default function Dashboard({accessToken}: DashboardProps) {

  axios.defaults.baseURL = "https://api.spotify.com/v1/me/top"
  axios.defaults.headers.common['Authorization'] = "Bearer " + accessToken

  const [timeRange, setTimeRange] = useState(SHORT)
  const [artists, setArtists] = useState<ArtistObject[]>([])


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
          picture: artistRaw["images"][0],
          genres: artistRaw["genres"],
          popularity: artistRaw['popularity'],
          link: artistRaw['external_urls']['spotify'],
          followers: artistRaw['followers']['total']
        }
        artistsArray.push(artistFormatted)
      })
      


    }).catch((err) => {
      console.log(err)
    })
    debugger
    setArtists(artistsArray)
    
  }

  useEffect(() => {
    topArtists()
  }, [])

  useEffect(() => {}, [artists])

  const itemToRow = artists.map((artist) => {
    <tr>
      <td>{artist["name"]}</td>
      <td>{artist.picture}</td>
      <td>{artist.genres}</td>
      <td>{artist.name}</td>
      <td>{artist.name}</td>
    </tr>
  })
  

  


  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {itemToRow}
      </tbody>
    </table>
  )
}
