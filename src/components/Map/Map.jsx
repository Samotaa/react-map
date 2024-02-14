import React from 'react'
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { Marker } from 'react-leaflet/Marker'
import { Polyline, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css"

export default function Map(props) {

    const localStorageData = localStorage.getItem('data')
    const data = JSON.parse(localStorageData)
    const limeOptions = { color: 'lime' }
    return (
        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data?.map((value, index) => {
            return (
                value.type == 'marker' ?                      
                <Marker key={index} position={value.coordinates}>
                    <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker> :                      
                <Polyline key={index} pathOptions={limeOptions} positions={value.coordinates} />
            )
        })}

    </MapContainer>
    )
}