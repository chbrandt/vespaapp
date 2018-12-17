#!/usr/bin/env python

import json

import pyvo
from pyvo import tap

# File base containing the list of VESPA services
#
services_list_filename = 'virtualRegistry.json'
with open(services_list_filename, 'r') as fp:
    services_list = json.load(fp)

# Schema we want to work with now
#
option_schema = 'crism'

option_accessurl = None
for service in services_list['services']:
    if service['schema'] == option_schema:
        option_accessurl = service['accessurl']
        break

assert option_accessurl is not None, \
        "Schema '{}' not found in '{}'".format(option_schema, services_list_filename)

# (Pre)set the columns we want to download
#
services_columns_filename='service_columns.json'
with open(services_columns_filename, 'r') as fp:
    services_columns = json.load(fp)

assert option_schema in services_columns, \
        "Service '{}' not in '{}'".format(option_schema, services_columns_filename)

option_columns = []
for k,v in services_columns[option_schema].items():
    if isinstance(v, list):
        option_columns.extend(v)
    else:
        assert isinstance(v, str), "Was expecting a string, got '{}'".format(type(v))
        option_columns.append(v)

assert len(option_columns), \
        "No columns select. Check '{}' for '{}'".format(services_columns_filename, option_schema)

# Set the (TAP) service
#
vo_service = tap.TAPService(option_accessurl)

# Get the data
#
query_expr = 'SELECT {} FROM {}.epn_core'.format(','.join(option_columns), option_schema)
vo_result = vo_service.search(query_expr)

result_table = vo_result.to_table()
result_df = result_table.to_pandas()

output_filename = '{}.json'.format(option_schema)
result_df.to_json(output_filename, orient='records')
