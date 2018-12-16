import json

def get_keyvals(features):
    _keys = ['id','geometry','name','properties']
    return {k:v for k,v in features.items() if k in _keys}

def read_features(filename):
    with open(filename,'r') as fp:
        import json
        d = json.load(fp)
    features = d['features']
    polys = [get_keyvals(f) for f in features]
    return polys

points = read_features('shin/mars_features_point.geojson')
linestrings = read_features('shin/mars_features_linestring.geojson')
polygons = read_features('shin/mars_features_polygon.geojson')
# multilinestrings = read_features('shin/mars_features_multilinestring.geojson')
# multipoints = read_features('shin/mars_features_multipoint.geojson')
# multipolygons = read_features('shin/mars_features_multipolygon.geojson')

def fix_geom_point(geometry):
    coord = geometry['coordinates'][:]
    coord[0] -= 180
    geometry['coordinates'] = coord
    return geometry
for point in points:
    point['geometry'] = fix_geom_point(point['geometry'])

def fix_geom_linestring(geometry):
    coords = geometry['coordinates'][:]
    for coord in coords:
        coord[0] -= 180
    geometry['coordinates'] = coords
    return geometry
for linestr in linestrings:
    linestr['geometry'] = fix_geom_linestring(linestr['geometry'])

def fix_geom_polygon(geometry):
    pcoords = geometry['coordinates'][:]
    for coords in pcoords:
        for coord in coords:
            coord[0] -= 180
    geometry['coordinates'] = pcoords
    return geometry
for polygon in polygons:
    polygon['geometry'] = fix_geom_polygon(polygon['geometry'])

with open('mdb/mars_points.json','w') as fp:
    json.dump(points, fp)
with open('mdb/mars_linestrings.json','w') as fp:
    json.dump(linestrings, fp)
with open('mdb/mars_polygons.json', 'w') as fp:
    json.dump(polygons, fp)
# for point in points:
#     point['location'] = point['geometry']['coordinates'][:]
#     point['type'] = point['geometry']['type']
#     del point['geometry']
# for point in linestrings:
#     point['location'] = point['geometry']['coordinates'][:]
#     point['type'] = point['geometry']['type']
#     del point['geometry']
# for point in polygons:
#     point['location'] = point['geometry']['coordinates'][:]
#     point['type'] = point['geometry']['type']
#     del point['geometry']
# with open('polygons.json', 'w') as fp:
#     json.dump(polygons, fp)
# with open('linestrings.json','w') as fp:
#     json.dump(linestrings, fp)
# with open('points.json','w') as fp:
#     json.dump(points, fp)
