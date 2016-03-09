// paper._execute = function(__$__,project,Point,Group,Path,onMouseMove) {
// Ported from original Metaball script by SATO Hiroyuki
// http://park12.wakwak.com/~shp/lc/et/en_aics_script.html
project.currentStyle = {
	fillColor: 'black'
};

var life = 100;

var handle_len_rate = 2.4;
var circlePaths = [];
var radius = 50;

for (var i = 0; i < 12; i++) {
	var positionX = randomIntFromInterval(0, window.innerWidth);
	var positionY = randomIntFromInterval(0, window.innerHeight);
	var circlePath = new Path.Circle({
		center: [positionX, positionY],
		radius: 50
	});
	circlePaths.push(circlePath);
}

function randomIntFromInterval(min,max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

var largeCircle = new Path.Circle({
	center: [676, 433],
	radius: 100
});
circlePaths.push(largeCircle);

function onMouseMove(event) {
	largeCircle.position = event.point;
	generateConnections(circlePaths);
}

var connections = new Group();
function generateConnections(paths) {
	// Remove the last connection paths:
	connections.children = [];

	for (var i = 0, l = paths.length; i < l; i++) {
		for (var j = __$__(i, "-" , 1); j >= 0; j--) {
			var path = metaball(paths[i], paths[j], 0.5, handle_len_rate, 145);
			if (path) {
				connections.appendTop(path);
				path.removeOnMove();
			}
		}
	}
}

generateConnections(circlePaths);

// ---------------------------------------------
function metaball(ball1, ball2, v, handle_len_rate, maxDistance) {
	var center1 = ball1.position;
	var center2 = ball2.position;
	var radius1 = __$__(ball1.bounds.width, "/" , 2);
	var radius2 = __$__(ball2.bounds.width, "/" , 2);
	var pi2 = __$__(Math.PI, "/" , 2);
	var d = center1.getDistance(center2);
	var u1, u2;

	if (__$__(radius1, "==" , 0) || __$__(radius2, "==" , 0))
		return;

	if (d > maxDistance || d <= Math.abs(__$__(radius1, "-" , radius2))) {
		return;
	} else if (d < __$__(radius1, "+" , radius2)) { // case circles are overlapping
		u1 = Math.acos(__$__(__$__(__$__(__$__(radius1, "*" , radius1), "+" , __$__(d, "*" , d)), "-" , __$__(radius2, "*" , radius2)), "/" , __$__(2 * radius1, "*" , d)));
		u2 = Math.acos(__$__(__$__(__$__(__$__(radius2, "*" , radius2), "+" , __$__(d, "*" , d)), "-" , __$__(radius1, "*" , radius1)), "/" , __$__(2 * radius2, "*" , d)));
	} else {
		u1 = 0;
		u2 = 0;
	}

	var angle1 = __$__(center2, "-" , center1).getAngleInRadians();
	var angle2 = Math.acos(__$__(__$__(radius1, "-" , radius2), "/" , d));
	var angle1a = __$__(__$__(angle1, "+" , u1), "+" , __$__(__$__(angle2, "-" , u1), "*" , v));
	var angle1b = __$__(__$__(angle1, "-" , u1), "-" , __$__(__$__(angle2, "-" , u1), "*" , v));
	var angle2a = __$__(__$__(__$__(angle1, "+" , Math.PI), "-" , u2), "-" , __$__(__$__(__$__(Math.PI, "-" , u2), "-" , angle2), "*" , v));
	var angle2b = __$__(__$__(__$__(angle1, "-" , Math.PI), "+" , u2), "+" , __$__(__$__(__$__(Math.PI, "-" , u2), "-" , angle2), "*" , v));
	var p1a = __$__(center1, "+" , getVector(angle1a, radius1));
	var p1b = __$__(center1, "+" , getVector(angle1b, radius1));
	var p2a = __$__(center2, "+" , getVector(angle2a, radius2));
	var p2b = __$__(center2, "+" , getVector(angle2b, radius2));

	// define handle length by the distance between
	// both ends of the curve to draw
	var totalRadius = __$__(radius1, "+" , radius2);
	var d2 = Math.min(__$__(v, "*" , handle_len_rate), __$__(__$__(p1a, "-" , p2a).length, "/" , totalRadius));

	// case circles are overlapping:
	d2 = __$__(d2, "*", Math.min(1, __$__(__$__(d, "*" , 2), "/" , __$__(radius1, "+" , radius2))));

	radius1 = __$__(radius1, "*", d2);
	radius2 = __$__(radius2, "*", d2);

	var path = new Path({
		segments: [p1a, p2a, p2b, p1b],
		style: ball1.style,
		closed: true
	});
	var segments = path.segments;
	segments[0].handleOut = getVector(__$__(angle1a, "-" , pi2), radius1);
	segments[1].handleIn = getVector(__$__(angle2a, "+" , pi2), radius2);
	segments[2].handleOut = getVector(__$__(angle2b, "-" , pi2), radius2);
	segments[3].handleIn = getVector(__$__(angle1b, "+" , pi2), radius1);

    //ball1.selected = true;
    //ball2.selected = true;
    /*
    path.selected = true;
    segments[0].selected = true;
    segments[1].selected = true;
    segments[2].selected = true;
    segments[3].selected = true;
*/


	return path;
}

// ------------------------------------------------
function getVector(radians, length) {
	return new Point({
		// Convert radians to degrees:
		angle: __$__(__$__(radians, "*" , 180), "/" , Math.PI),
		length: length
	});
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cDovL2JpZ3NwbGFzaHN0dWRpb3MuY29tL2NsaWVudHMvZnJpZWRzdGVhay9saWIvanMvbWV0YWJhbGxzLmpzIiwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImh0dHA6Ly9iaWdzcGxhc2hzdHVkaW9zLmNvbS9jbGllbnRzL2ZyaWVkc3RlYWsvbGliL2pzL21ldGFiYWxscy5qcyJdfQ==
// return { onMouseMove: onMouseMove };
// }
