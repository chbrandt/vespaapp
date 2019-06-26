#!/usr/bin/env python
import sys

FIELDS = ['s_region',
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
          'service_schema',
          'service_identifier',
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


def _fix_coords(lon, lat, frame=None):
    # For the time being, only shift Longitude to stay [-180:180]
    lon = float(lon)
    lon = lon if lon < 180 else lon - 360
    lat = float(lat)
    return (lon, lat)


def _compute_centroid(c1min, c1max, c2min, c2max):
    lon = (float(c1max) - float(c1min))/2 + float(c1min)
    lat = (float(c2max) - float(c2min))/2 + float(c2min)
    lon, lat = _fix_coords(lon, lat)
    return (lon, lat)


def point_geometry(granule):
    if granule['spatial_frame_type'] != 'body':
        return None

    c1min = granule['c1min']
    c1max = granule['c1max']
    c2min = granule['c2min']
    c2max = granule['c2max']
    try:
        lon, lat = _compute_centroid(c1min, c1max, c2min, c2max)
    except:
        return None

    if not -90 < lat < 90:
        return None

    geometry = {'type': 'Point'}
    geometry['coordinates'] = [lon, lat]
    return geometry


def _parse_doc(granule, filters=None):
    out = {k: granule.get(k, None) for k in FIELDS}
    if filters:
        for k in filters.keys():
            out[k] = filters[k](granule)
    return out


def set_filters(ext_filters):
    filters = {}
    filters['target_name'] = lambda d: d['target_name'].lower()
    filters['target_class'] = lambda d: d['target_class'].lower()
    filters['geometry'] = point_geometry
    if ext_filters:
        filters.update(ext_filters)
    return filters


def parse_documents(json_array, filters=None):
    """
    Process/filter each document of our json file/array

    If 'filters' are set, they have precedence over default ones
    """
    filters = set_filters(filters)
    outDocs = []
    for doc in json_array:
        try:
            outDoc = _parse_doc(doc, filters)
            if not outDoc:
                continue
        except Exception as e:
            print(e, sys.stderr)
            continue
        outDocs.append(outDoc)
    return outDocs


def main(filename, output_filename, filters_filename=None):
    import json

    filters = None
    if filters_filename:
        """
        Let's agree that 'filters' is a dictionary-like structure
        where I can access the functions by the name of the field:
        ```
        a_function = filters['s_region']
        ```
        """
        from importlib.util import spec_from_file_location, module_from_spec
        spec = spec_from_file_location('a_module_name', filters_filename)
        mod = module_from_spec(spec)
        spec.loader.exec_module(mod)
        filters = mod.filters

    with open(filename, 'r') as fp:
        docs = json.load(fp)

    out = parse_documents(docs, filters)

    with open(output_filename, 'w') as fp:
        json.dump(out, fp)


if __name__ == '__main__':
    from sys import exit
    from os import EX_OK

    from argparse import ArgumentParser

    parser = ArgumentParser('Process EPN-TAP fields for VESPA-App.')
    parser.add_argument('file_in', type=str,
                        help="Input JSON filename (content in JSON-Array format)")
    parser.add_argument('file_out', type=str,
                        help="Output JSON filename (content in JSON-Array format)")
    parser.add_argument('--filters', type=str, default=None,
                        help="Python module with field-specific processing rules")

    args = parser.parse_args()

    input_filename = args.file_in
    output_filename = args.file_out
    mod_filters = args.filters

    main(input_filename, output_filename, mod_filters)
    exit(EX_OK)
