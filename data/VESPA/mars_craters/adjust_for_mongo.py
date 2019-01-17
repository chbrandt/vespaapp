#!/usr/bin/env python

import json

def run(filename, output_filename):
    with open(filename,'r') as fp:
        craters = json.load(fp)

    outCraters = []
    for crater in craters:
        s_region = crater['s_region'].split()
        if not (s_region[0] == 'Polygon' and s_region[1] == "UNKNOWNFrame"):
            continue
        _type = 'Polygon'
        _coords = [[float(s_region[i]),float(s_region[i+1])] for i in range(2,len(s_region),2)]
        _coords.append(_coords[0])
        geometry = {'coordinates':[_coords], 'type':_type}
        outCrater = crater.copy()
        outCrater['s_region'] = geometry
        outCraters.append(outCrater)

    with open(output_filename, 'w') as fp:
        json.dump(outCraters, fp)


if __name__ == '__main__':
    import sys

    if len(sys.argv) < 3:
        print("\nUsage: {} <mars_craters.json> <output-filename.json>\n".format(sys.argv[0], sys.stderr))
        sys.exit(1)

    input_filename = sys.argv[1]
    output_filename = sys.argv[2]
    run(input_filename, output_filename)
    sys.exit(0)
