#!/bin/bash

for ds in data/*; do 
    [ -d $ds ] || continue
    d=`basename $ds`
    f=${ds}/${d}_latest.json
    [ -f $f ] || continue
    [ -d filters/$d ] && fext="--filters filters/${d}/filters.py" || fext=""
    ./adjust_fields.py $fext $f ${f%_latest*}_adjusted.json
done

