# CoordGeom.js

A JavaScript framework developed for coordinate geometry calculation with vectors.

## CAUTION

-   **WARNING**: This library **DOES NOT** handle float point error.  Please bare this in mind.
-   when constructing new polygon, please check whether the points really form one before setting up the new object.
-   all points passed to new _polygon_, new _line segment_ and new _circle_ will be cloned, therefore de-referenced.  So any changes made to the point forming the algebraic object will not affect the already created object.

## Documentation

[https://ChloeLo27.github.io/CoordGeom.js](https://ChloeLo27.github.io/CoordGeom.js)

## Installation

Simply include the `main.js` file then you're done.

Alternatively, you may directly link to the framework through the following urls for different releases:

### First Public Release `v1.0` (Recommended)
[https://cdn.jsdelivr.net/gh/ChloeLo27/CoordGeom.js@v1.0/main.js](https://cdn.jsdelivr.net/gh/ChloeLo27/CoordGeom.js@v1.0/main.js)

### Edge (Use at your own risk)
[https://cdn.jsdelivr.net/gh/ChloeLo27/CoordGeom.js@latest/main.js](https://cdn.jsdelivr.net/gh/ChloeLo27/CoordGeom.js@latest/main.js)

## Capabilities

This framework currently covers the following objects:

-   point
-   line
-   vector
-   line segment
-   polygon
-   circle

Also the following cross object functions:

-   intercept of two lines
-   line from point and slope
-   line from line segment
-   new point translated by vector
-   vector from two points
-   new point reflected in line
-   dot product of two vectors
-   angle between two vectors
-   intersection of a circle and a line
-   intersection of two circles
-   point is on line
-   point is on line segment
-   point is strictly in circle
-   point is on circle circumference
-   point is strictly out of circle
-   point is strictly in polygon
-   point is on polygon edge
-   point is strictly out of polygon
