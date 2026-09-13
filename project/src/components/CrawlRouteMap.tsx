import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

type Stop = {
  time: string;
  status: string;
  venue: {
    id: string;
    name: string;
    type: string;
    address: string;
    lat: number;
    lng: number;
  };
};

function numberIcon(n: number, status: string) {
  const bg =
    status === 'completed' ? '#3f6b4a' : status === 'current' ? '#c45c26' : '#6b6560';
  return L.divIcon({
    className: 'crawl-stop-icon',
    html: `<div style="width:28px;height:28px;border-radius:9999px;background:${bg};color:white;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,.35)">${n}</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14],
  });
}

function FitRoute({ stops }: { stops: Stop[] }) {
  const map = useMap();
  useEffect(() => {
    const points = stops.map((s) => [s.venue.lat, s.venue.lng] as [number, number]);
    if (points.length === 0) return;
    map.fitBounds(L.latLngBounds(points), { padding: [40, 40], maxZoom: 15 });
  }, [map, stops]);
  return null;
}

export default function CrawlRouteMap({ stops }: { stops: Stop[] }) {
  const path = stops.map((s) => [s.venue.lat, s.venue.lng] as [number, number]);
  const center = path[0] ?? [40.72, -74.04];

  return (
    <div className="h-[420px] rounded-2xl overflow-hidden border border-stone-800">
      <MapContainer center={center} zoom={14} className="h-full w-full" scrollWheelZoom>
        <TileLayer
          attribution='&copy; OpenStreetMap &copy; CARTO'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <FitRoute stops={stops} />
        {path.length > 1 && (
          <Polyline positions={path} pathOptions={{ color: '#c45c26', weight: 4, opacity: 0.9 }} />
        )}
        {stops.map((stop, index) => (
          <Marker
            key={stop.venue.id}
            position={[stop.venue.lat, stop.venue.lng]}
            icon={numberIcon(index + 1, stop.status)}
          >
            <Popup>
              <div className="text-sm">
                <p className="font-semibold">
                  {index + 1}. {stop.venue.name}
                </p>
                <p className="text-gray-600">{stop.time}</p>
                <p className="text-gray-500 capitalize">{stop.status.replace('-', ' ')}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
