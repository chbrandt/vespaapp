#!/usr/bin/env python

import json


_FIELDS_ = ['s_region',
            'c1min',
            'c1max',
            'c2min',
            'c2max',
            'spatial_frame_type',
            'time_min',
            'time_max',
            'time_scale',
            'granule_uid',
            'granule_gid',
            'schema_epn_core',
            'thumbnail_url',
            'access_url',
            'access_format',
            'external_url',
            'datalink_url',
            'dataproduct_type',
            'measurement_type',
            'instrument_name',
            'instrument_host_name',
            'publisher',
            'service_title',
            'target_name',
            'target_class']


def _ok_geojson(_type):
    # https://docs.mongodb.com/manual/reference/geojson/
    return _type in ("Point",
                     "LineString",
                     "Polygon",
                     "MultiPoint",
                     "MultiLineString",
                     "MultiPolygon")


def _fix_coords(lon, lat, frame):
    # For the time being, only shift Longitude to stay [-180:180]
    lon = float(lon)
    lat = float(lat)
    def flon(c):
        return c-180
    return (flon(lon), lat)


def _adjust_geometry(s_region):
    if not s_region:
        return None

    try:
        sreg = s_region.split()
    except:
        if not isinstance(s_region, list):
            # Don't know what to do
            return None
        sreg = s_region[:]
        assert len(sreg) % 2 == 0, "Was expecting a list of (lon,lat) pairs in 's_region', got {!r}".format(sreg)

    if not len(sreg) >= 4:
        return None
    sr_type, sr_frame = sreg[:2]
    if not _ok_geojson(sr_type):
        return None

    # Although many types are formally accepted by Mongo/GeoJSON,
    # we only take 'Polygon' (for the time being)..
    if sr_type != "Polygon":
        return None

    lon = sreg[2::2]
    lat = sreg[3::2]
    assert len(lon) == len(lat)
    coords = [_fix_coords(lon[i], lat[i], sr_frame) for i in range(len(lon))]
    # Mongo/GeoJSON ask for the first pair of coordinates to close the polygon
    if coords[0] != coords[-1]:
        coords.append(coords[0])
    return {'coordinates': [coords], 'type': sr_type, 'frame': sr_frame}


def _lower_names(granule, fields):
    for field in fields:
        val = granule[field]
        assert isinstance(val, str)
        granule[field] = val.lower()


def _parse_document(granule, remove_outborders=True):
    geometry = _adjust_geometry(granule['s_region'])
    if geometry and remove_outborders:
        cref = granule['c1min']
        if cref and (float(cref) < 5 or float(cref) > 355):
            return None

    out = {k: granule.get(k, None) for k in _FIELDS_}
    _lower_names(out, ['target_name', 'target_class'])
    out['s_region'] = geometry
    return out


def run(filename, output_filename):

    with open(filename, 'r') as fp:
        docs = json.load(fp)

    outDocs = []
    for doc in docs:
        try:
            outDoc = _parse_document(doc)
            if not outDoc:
                continue
        except:
            continue
        outDocs.append(outDoc)

    with open(output_filename, 'w') as fp:
        json.dump(outDocs, fp)


if __name__ == '__main__':
    import sys

    if len(sys.argv) < 3:
        print("\nUsage: {} <input.json> <output.json>\n".format(sys.argv[0], sys.stderr))
        sys.exit(1)

    input_filename = sys.argv[1]
    output_filename = sys.argv[2]
    run(input_filename, output_filename)
    sys.exit(0)
