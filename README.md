# CoordGeom.js
A JavaScript framework developed for coordinate geometry calculation with vectors.

## Note
Please note that this framework is still under construction.

## CAUTION
- when constructing new polygon, please check whether the points really form one before setting up the new object.
- all points passed to new *polygon*, new *line segment* and new *circle* will be cloned, therefore de-referenced.  So any changes made to the point forming the algebraic object will not affect the already created object.

## Capabilities
This framework currently covers the following objects:
- point
- line
- vector
- line segment
- polygon
- circle

Also the following cross object functions:
- intercept of two lines
- line from point and slope
- line from two points
- translate point by vector
- vector from two points
- reflect point in line
