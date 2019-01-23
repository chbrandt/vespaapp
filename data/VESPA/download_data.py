#!/usr/bin/env python

import logging as log
log.basicConfig(level=log.DEBUG)

import json
from pyvo import tap


def run(option_schema, limit=None, percent=None,
        registry_file='virtualRegistry.json'):
    """
    Download data from EPN-TAP service.
    Mandatory 'option_schema' is one of the schema (i.e, service) defined in '{}'.
    Use 'limit' to limit the number of results (TOP) to download.

    Input:
     - option_schema : <str>
        Name of EPN-TAP service (without '.epn_core') to query
     - limit: <int> (None)
        Number of records/lines to download to the TOP(limit) records of the table
     - percent: <float> (None)
        Percentage (0:100) of the table RANDOMLY selected
     - registry_file: <str>
        Config (json) filename where "schema" is defined

    Output:
     - Pandas DataFrame with resulting table

    About sampling the results: 'limit' and 'percent' are mutually excludent.
    'limit' has preference over 'percent' (simply because it is cheaper).
    * 'limit': returns the TOP "limit" records of the table;
    * 'percent': eturns a random sample of size ~percent of table.
    """

    # File base containing the list of VESPA services
    #
    services_list_filename = registry_file
    with open(services_list_filename, 'r') as fp:
        services_list = json.load(fp)

    # Schema we want to work with now
    #
    sanity_check_schema = False
    option_accessurl = None
    for service in services_list['services']:
        if service['schema'] == option_schema:
            sanity_check_schema = True
            option_accessurl = service['accessurl']
            break

    assert sanity_check_schema is True, \
        "Schema '{}' not found in '{}'".format(option_schema, services_list_filename)

    log.debug("Schema: {}".format(option_schema))

    # (Pre)set the columns we want to download.
    # So far, we have only "tap" defined since all services publish the same columns
    #
    services_columns_filename = 'service_columns.json'
    with open(services_columns_filename, 'r') as fp:
        services_columns = json.load(fp)

    columns_schema = 'tap'  # this is the default columns-schema
    if option_schema in services_columns:
        columns_schema = option_schema

    option_columns = []
    for k,v in services_columns[columns_schema].items():
        if isinstance(v, list):
            option_columns.extend(v)
        else:
            assert isinstance(v, str), "Was expecting a string, got '{}'".format(type(v))
            option_columns.append(v)

    assert len(option_columns), \
        "No columns selected! Check '{}'".format(services_columns_filename)

    log.debug("Columns: {}".format(','.join(option_columns)))

    # Set the (TAP) service
    #
    vo_service = tap.TAPService(option_accessurl)

    # Get the data
    #
    query_expr = ['SELECT']

    if limit is not None:
        assert limit > 0, "'limit' expected to be greater than 0"
        query_expr.append('TOP {:d}'.format(limit))

    query_expr.append('{cols!s} FROM {schema!s}.epn_core')

    if percent is not None:
        assert 0 < percent < 100, "'percent' expected to between (0,100)"
        query_expr.append('WHERE rand() <= {fx:f}'.format(fx=percent/100.0))

    query_expr = ' '.join(query_expr)
    query_expr = query_expr.format(cols=','.join(option_columns),
                                   schema=option_schema)

    log.debug("Query: {}".format(query_expr))
    print("QUERY:", query_expr)

    vo_result = vo_service.search(query_expr)

    log.debug("Results: {:d}".format(len(vo_result)))

    result_table = vo_result.to_table()
    result_df = result_table.to_pandas()
    result_df['schema_epn_core'] = option_schema
    return result_df


if __name__ == '__main__':
    import sys
    import os

    if len(sys.argv) < 2:
        msg = "\nUsage: \n\t{} <epn-schema> [number-of-output-lines]\n".format(sys.argv[0])
        print(msg)
        sys.exit(1)

    epn_schema = sys.argv[1]

    number_records = None
    if len(sys.argv) == 3:
        number_records = int(sys.argv[2])

    result_df = run(epn_schema, number_records)

    number_records = len(result_df)
    if not os.path.isdir(epn_schema):
        os.mkdir(epn_schema)
    output_filename = '{0}/{0}_{1}.json'.format(epn_schema, number_records)

    result_df.to_json(output_filename, orient='records')

    print("-----")
    print("Results written to: {}".format(output_filename))
    print("-----")
