#!/bin/sh

Entities="../src/Entities"
scripts=$PWD

echo "Entity (minus): "
read nameMinus

echo "Entity (mayus): "
read nameMayus

cd $Entities
cp "./Entity.js" "./${nameMayus}.js"
sed -i "s/entity/${nameMinus}/g" "${nameMayus}.js"
sed -i "s/Entity/${nameMayus}/g" "${nameMayus}.js"

cd $scripts
cd ../src
sed -i "s+// entity+import { ${nameMayus}List, ${nameMayus}Create, ${nameMayus}Edit } from './Entities/${nameMayus}'\n// entity+g" App.js
sed -i "s+// push+resources.push(<Resource name='${nameMinus}' list={(props) => { return resourceF('${nameMayus}', ${nameMayus}List, props, permissionList, base) }} edit={(props) => { return resourceF('${nameMayus}', ${nameMayus}Edit, props, permissionList, base) }} create={(props) => { return resourceF('${nameMayus}', ${nameMayus}Create, props, permissionList, base) }} /> )\n\t\t\t\t// push+g" App.js
