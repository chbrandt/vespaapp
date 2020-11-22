
def _fix_coords(lon, lat, frame):
    # For the time being, only shift Longitude to stay [-180:180]
    lon = float(lon)
    lon = lon if lon < 180 else lon - 360
    lat = float(lat)
    return (lon, lat)


def _adjust_geometry(granule):
    """
    If a valid 's_region' field, destringify and recenter [-180:180] longitudes

    A "valid" 's_region' is one following the EPN-TAP standard: https://voparis-confluence.obspm.fr/display/VES/EPN-TAP+v2+parameter+description#EPN-TAPv2parameterdescription-s_region.
    Which basically states (as of v2) that 's_region' is a string like:
    ' Polygon UNKNOWNFrame lon1 lat1 lon2 lat2 ... lonN latN ' for polygons over
    a body's surface and 'ICRS' instead of 'UNKNOWNFrame' for celestrial coordinates.
    """

    s_region = granule['s_region']
    if not s_region:
        return None

    if not isinstance(s_region, str):
        return None

    sreg = s_region.split()

    # By now, 'sreg' should be something like:
    # [Polygon, UNKNOWNFrame, lon1, lat1, lon2, lat2, ... lonN, latN]

    if not len(sreg) >= 4:
        return None

    sr_type, sr_frame = sreg[:2]

    # Sanity check -- although we know 's_region' should only get 'Polygon'..
    if sr_type not in ("Point",
                       "LineString",
                       "Polygon",
                       "MultiPoint",
                       "MultiLineString",
                       "MultiPolygon"):
        return None

    # Although many types are formally accepted by Mongo/GeoJSON,
    # https://docs.mongodb.com/manual/reference/geojson/,
    # following EPN-TAP standard, we only take 'Polygon'..
    if sr_type != "Polygon":
        return None

    lon = list(map(float, sreg[2::2]))
    lat = list(map(float, sreg[3::2]))
    if len(lon) != len(lat):
        return None

    if any(filter(lambda x: not -90 < x < 90, lat)):
        return None

    coords = [_fix_coords(lon[i], lat[i], sr_frame) for i in range(len(lon))]

    # Mongo/GeoJSON ask for the first pair of coordinates to close the polygon
    if coords[0] != coords[-1]:
        coords.append(coords[0])
    return {'coordinates': [coords], 'type': sr_type, 'frame': sr_frame}


filters = {'geometry': _adjust_geometry}
