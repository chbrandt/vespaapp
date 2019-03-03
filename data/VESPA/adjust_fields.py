#!/usr/bin/env python

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


def _compute_centroid(c1min, c1max, c2min, c2max):
    c1 = (float(c1max) - float(c1min))/2 + float(c1min)
    c2 = (float(c2max) - float(c2min))/2 + float(c2min)
    return [c1,c2]


def point_geometry(granule):
    if granule['spatial_frame_type'] != 'body':
        return None
    geometry = {'type': 'Point'}
    c1min = granule['c1min']
    c1max = granule['c1max']
    c2min = granule['c2min']
    c2max = granule['c2max']
    coords = _compute_centroid(c1min, c1max, c2min, c2max)
    geometry['coordinates'] = coords
    return geometry


def _parse_doc(granule, filters=None, remove_outborders=True):
    # geometry = None
    # if granule['spatial_frame_type'] == 'body':
    #     geometry = point_geometry(granule)

    # geometry = _adjust_geometry(granule['s_region'])
    # if geometry and remove_outborders:
    #     cref = granule['c1min']
    #     if cref and (float(cref) < 5 or float(cref) > 355):
    #         return None

    out = {k: granule.get(k, None) for k in FIELDS}

    for k in filters.keys():
        out[k] = filters[k](granule)

    # _lower_names(out, ['target_name', 'target_class'])
    # out['geometry'] = geometry
    return out


def set_filters(ext_filters):
    filters = {}
    filters['target_name'] = lambda d: d['target_name'].lower()
    filters['target_class'] = lambda d: d['target_name'].lower()

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
        except:
            continue
        outDocs.append(outDoc)
    return outDocs


def main(filename, output_filename, filters_filename=None):
    import json

    filters = None
    if filters_filename:
        """
        Let's agree that 'filters' is dictionary-like structure
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
