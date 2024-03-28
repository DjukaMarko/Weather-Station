"use client"

import { MapContainer, TileLayer, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import { useEffect } from "react"

export default function Map(props: any) {
    const { position } = props

    return <MapContainer className="w-full h-full rounded-md" center={position} zoom={13}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <RecenterPosition lat={position[0]} lng={position[1]} />
    </MapContainer>
}

const RecenterPosition = ({ lat, lng }: { lat: number, lng: number }) => {
    const map = useMap();

    useEffect(() => {
        map.setView([lat, lng]);
    }, [lat, lng]);

    return null;
}