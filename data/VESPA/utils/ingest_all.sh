find * -type d | xargs -I{} bash -c "mongoimport -d test -c data_all --jsonArray {}/{}_latest.json"
