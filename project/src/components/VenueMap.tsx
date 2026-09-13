import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: string })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

type VenuePin = {
  id: string;
  name: string;
  type: string;
  address: string;
  lat: number;
  lng: number;
};

function FitPins({ venues }: { venues: VenuePin[] }) {
  const map = useMap();
  useEffect(() => {
    if (venues.length === 0) return;
    const bounds = L.latLngBounds(venues.map((v) => [v.lat, v.lng]));
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 });
  }, [map, venues]);
  return null;
}

export default function VenueMap({ venues }: { venues: VenuePin[] }) {
  const center: [number, number] = venues[0]
    ? [venues[0].lat, venues[0].lng]
    : [40.72, -74.04];

  return (
    <div className="h-[500px] rounded-2xl overflow-hidden border border-stone-800">
      <MapContainer
        center={center}
        zoom={14}
        className="h-full w-full"
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; OpenStreetMap &copy; CARTO'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <FitPins venues={venues} />
        {venues.map((venue) => (
          <Marker key={venue.id} position={[venue.lat, venue.lng]}>
            <Popup>
              <div className="text-sm">
                <p className="font-semibold">{venue.name}</p>
                <p className="text-gray-600">{venue.type}</p>
                <p className="text-gray-500">{venue.address}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
