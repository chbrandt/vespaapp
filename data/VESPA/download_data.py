#!/usr/bin/env python

import logging as log
log.basicConfig(level=log.DEBUG)

import json
import pandas as pd
from pyvo import tap

_DEFAULT_SERVICES_LIST_ = 'virtualRegistry.json'
_TIMEOUT_ = 3
_NULL_INT_ = -999

def _init_query_struct():
    """
    Setup a query object to simplify my life
    """
    from collections import namedtuple
    Query = namedtuple('Query', ['SELECT','FROM','COUNT','TOP','WHERE'])
    Query.SELECT = 'SELECT'
    Query.FROM_schema = 'FROM {schema!s}.epn_core'
    Query.COUNT = 'COUNT(*)'
    Query.TOP_limit = 'TOP {limit:d}'
    Query.WHERE_fraction = 'WHERE rand() <= {fraction:f}'
    return Query

def _query_serv(schema, accessurl):
    import timeout_decorator
    @timeout_decorator.timeout(_TIMEOUT_)
    def query_timeout(query):
        return serv.search(query)
    q = _init_query_struct()
    query = ' '.join([q.SELECT,q.COUNT,q.FROM_schema]).format(schema=schema)
    serv = tap.TAPService(accessurl)
    try:
        t = query_timeout(query)
        count = int(t.to_table()[0][0])
    except:
        count = _NULL_INT_
    return count

def run(schema, limit=None, percent=None, columns=None,
        registry_file=_DEFAULT_SERVICES_LIST_):
    """
    Download data from EPN-TAP service.
    Mandatory 'option_schema' is one of the schema (i.e, service) defined in '{}'.
    Use 'limit' to limit the number of results (TOP) to download.

    Input:
     - schema : <str>
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
    option_schema = schema

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

    # # (Pre)set the columns we want to download.
    # # So far, we have only "tap" defined since all services publish the same columns
    # #
    # services_columns_filename = 'service_columns.json'
    # with open(services_columns_filename, 'r') as fp:
    #     services_columns = json.load(fp)
    #
    # columns_schema = 'tap'  # this is the default columns-schema
    # if option_schema in services_columns:
    #     columns_schema = option_schema
    #
    # option_columns = []
    # for k,v in services_columns[columns_schema].items():
    #     if isinstance(v, list):
    #         option_columns.extend(v)
    #     else:
    #         assert isinstance(v, str), "Was expecting a string, got '{}'".format(type(v))
    #         option_columns.append(v)
    #
    # assert len(option_columns), \
    #     "No columns selected! Check '{}'".format(services_columns_filename)
    # option_columns = ','.join(option_columns)

    if not columns:
        option_columns = '*'

    log.debug("Columns: {}".format(option_columns))

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
    query_expr = query_expr.format(cols=option_columns,
                                   schema=option_schema)

    log.debug("Query: {}".format(query_expr))
    print("QUERY:", query_expr)

    vo_result = vo_service.search(query_expr)

    log.debug("Results: {:d}".format(len(vo_result)))

    result_table = vo_result.to_table()
    result_df = result_table.to_pandas()
    result_df['schema_epn_core'] = option_schema
    return result_df


def list_services(query_count=False, schema_only=False,
                    registry_file=_DEFAULT_SERVICES_LIST_):
    """
    List available services
    """
    # File base containing the list of VESPA services
    #
    with open(registry_file, 'r') as fp:
        registry_list = json.load(fp)

    df = pd.read_json(json.dumps(registry_list['services']), orient='records')

    output_fields = ['schema']
    if schema_only:
        return df[output_fields]

    if query_count:
        output_fields.append('count')
        def query_serv(row):
            return _query_serv(row['schema'], row['accessurl'],)
        df['count'] = df.apply(query_serv, axis=1)
        # assert any(df['count'].isnull()), "We should not be seeing this!"
        df['count'].astype(int, inplace=True)

    output_fields.append('title')

    return df[output_fields]


def _fetch(args):
    epn_schema = args.schema
    number_records = args.limit
    fraction = args.percent

    result_df = run(epn_schema, limit=number_records, percent=fraction)

    number_records = len(result_df)
    if not os.path.isdir(epn_schema):
        os.mkdir(epn_schema)
    output_filename = '{0}/{0}_{1}.json'.format(epn_schema, number_records)

    result_df.to_json(output_filename, orient='records')

    print("-----")
    print("Results written to: {}".format(output_filename))
    print("-----")


def _list(args):
    df = list_services(query_count=args.count, schema_only=args.schema_only)
    if args.schema_only:
        print('\n'.join(df.to_string(index=False,header=False).split()))
    else:
        print(df.to_string(index=False))


if __name__ == '__main__':
    import sys
    import os
    import argparse

    parser = argparse.ArgumentParser(description='Download EPN-TAP data')
    subparsers = parser.add_subparsers(title='Subcommands')

    fetching = subparsers.add_parser('fetch', help='Fetch data')
    fetching.add_argument('schema', help="Name of EPN-Core schema ('schema.epn_core')")
    fetching.add_argument('--limit', dest='limit', type=int,
                        help='Limit the number of returned records',
                        default=None)
    fetching.add_argument('--percent', dest='percent', type=float,
                        help='Fraction (in percentile) of table size records to return',
                        default=None)
    fetching.set_defaults(func=_fetch)

    listing = subparsers.add_parser('list', help='List schemas')
    listing.add_argument('--length', dest='count', action='store_true',
                        help="List services' number of records")
    listing.add_argument('--minimal', dest='schema_only', action='store_true',
                        help="List the names of the schema only")
    listing.set_defaults(func=_list)

    args = parser.parse_args()
    args.func(args)
