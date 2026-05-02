const DEG = Math.PI / 180
const RAD = 180 / Math.PI

export type SunTimes = {
  sunrise: string
  sunset: string
  daylightHours: number
}

export function getSunTimes(lat: number, lon: number, date: Date): SunTimes {
  const jd = toJulianDay(date)
  const n = jd - 2451545.0

  const meanLon = (280.46 + 0.9856474 * n) % 360
  const meanAnom = ((357.528 + 0.9856003 * n) % 360) * DEG

  const eclipLon = (meanLon + 1.915 * Math.sin(meanAnom) + 0.02 * Math.sin(2 * meanAnom)) * DEG
  const sinDec = Math.sin(23.439 * DEG) * Math.sin(eclipLon)
  const dec = Math.asin(sinDec)

  const eqTime = 4 * (meanLon - (Math.atan2(Math.cos(23.439 * DEG) * Math.sin(eclipLon), Math.cos(eclipLon))) * RAD)

  const latRad = lat * DEG
  const cosHa = (Math.cos(90.833 * DEG) - Math.sin(latRad) * Math.sin(dec)) / (Math.cos(latRad) * Math.cos(dec))

  if (cosHa < -1) {
    // Midnight sun
    return { sunrise: "00:00", sunset: "24:00", daylightHours: 24 }
  }
  if (cosHa > 1) {
    // Polar night
    return { sunrise: "--:--", sunset: "--:--", daylightHours: 0 }
  }

  const ha = Math.acos(cosHa) * RAD
  const utcSunrise = 720 - 4 * (lon + ha) - eqTime
  const utcSunset = 720 - 4 * (lon - ha) - eqTime

  const tzOffset = getTimezoneOffsetMinutes(date)

  return {
    sunrise: minutesToTime(utcSunrise + tzOffset),
    sunset: minutesToTime(utcSunset + tzOffset),
    daylightHours: Math.round(((utcSunset - utcSunrise) / 60) * 10) / 10,
  }
}

function toJulianDay(date: Date): number {
  const y = date.getUTCFullYear()
  const m = date.getUTCMonth() + 1
  const d = date.getUTCDate()
  const a = Math.floor((14 - m) / 12)
  const yr = y + 4800 - a
  const mo = m + 12 * a - 3
  return d + Math.floor((153 * mo + 2) / 5) + 365 * yr + Math.floor(yr / 4) - Math.floor(yr / 100) + Math.floor(yr / 400) - 32045
}

function getTimezoneOffsetMinutes(date: Date): number {
  // Norway: UTC+1 (CET) or UTC+2 (CEST, last Sunday March - last Sunday October)
  const month = date.getUTCMonth() + 1
  if (month > 3 && month < 10) return 120
  if (month === 3) return 120 // approximate
  if (month === 10) return 60 // approximate
  return 60
}

function minutesToTime(minutes: number): string {
  const total = ((Math.round(minutes) % 1440) + 1440) % 1440
  const h = Math.floor(total / 60).toString().padStart(2, "0")
  const m = (total % 60).toString().padStart(2, "0")
  return `${h}:${m}`
}
