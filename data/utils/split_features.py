geotypes = ["Point", "MultiPoint", "LineString", "MultiLineString", "Polygon", "MultiPolygon", "GeometryCollection"]
collections = {k:[] for k in geotypes}

import json
with open('mars_features.json') as fp:
    doc = json.load(fp)

print("Total features: ", len(doc["features"]))
print("---")

def copy_feature(feature_obj):
    _type = feature_obj["geometry"].get("type")
    collections[_type].append(feature_obj)

for feat_obj in doc["features"]:
    copy_feature(feat_obj)

soma = 0
for geotype in geotypes:
    doc_feat = {"type": "FeatureCollection",
                "features": collections[geotype]}
    size_feat = len(doc_feat["features"])
    soma += size_feat
    print(geotype, size_feat)
    with open('mars_features_{}.json'.format(geotype.lower()), 'w') as fp:
        json.dump(doc_feat, fp)

print("---")
print("Total features: ", soma)
