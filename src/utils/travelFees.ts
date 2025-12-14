const ANDERNOS_COORDS = {
  lat: 44.7422,
  lon: -1.0983
};

function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const earthRadiusKm = 6371;

  const dLat = degreesToRadians(lat2 - lat1);
  const dLon = degreesToRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degreesToRadians(lat1)) *
    Math.cos(degreesToRadians(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadiusKm * c;

  return distance;
}

export function calculateTravelFees(distance: number): number | string {
  if (distance <= 10) return 0;
  if (distance <= 20) return 15;
  if (distance <= 30) return 25;
  if (distance <= 50) return 45;
  if (distance <= 75) return 70;
  if (distance <= 100) return 95;
  if (distance <= 125) return 120;
  if (distance <= 150) return 145;
  if (distance <= 175) return 170;
  if (distance <= 200) return 195;
  if (distance <= 225) return 220;
  if (distance <= 250) return 245;
  return 'sur validation';
}

export async function geocodeAddress(address: string, postalCode: string, city: string): Promise<{ lat: number; lon: number } | null> {
  try {
    const fullAddress = `${address}, ${postalCode} ${city}, France`;
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAddress)}&limit=1`;

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Baeza Marine Website'
      }
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon)
      };
    }

    return null;
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
}

export async function calculateTravelFeesFromAddress(
  address: string,
  postalCode: string,
  city: string
): Promise<{ distance: number; fees: number | string } | null> {
  if (!address || !postalCode || !city) {
    return null;
  }

  const coords = await geocodeAddress(address, postalCode, city);

  if (!coords) {
    return null;
  }

  const distance = calculateDistance(
    ANDERNOS_COORDS.lat,
    ANDERNOS_COORDS.lon,
    coords.lat,
    coords.lon
  );

  const fees = calculateTravelFees(distance);

  return {
    distance: Math.round(distance),
    fees
  };
}

export function formatTravelFees(fees: number | string): string {
  if (fees === 'sur validation') {
    return 'Déplacement sur validation';
  }
  if (fees === 0) {
    return 'Gratuit';
  }
  return `${fees} €`;
}
