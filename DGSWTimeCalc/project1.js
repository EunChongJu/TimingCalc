/*
 * 현재시간 기준 대구소프트웨어고등학교 정문에서 걸어서 갈 경우, 최소 몇 시에는 나가야
 * 버스정류장에서 다음 급행8번을 탈 수 있는지 계산해주는 프로그램을 개발한다.
 * 프로그램은 각자 개발하기 편한 언어를 사용한다. (웹, 안드로이드, iOS, 윈도우응용프로그램 등)
 * 화면캡처 또는 사진촬영한 이미지와 라이브러리등은 제외하고 개발한 코드만 압축해서 제출한다.
 */

// 1) 급행8번의 첫차는 06:00시.
// 2) 막차는 21:56시
// 3) 배차간격은 21분
// 4) 걷기 속도는 4km/h
// 5) 정문에서 버스정류장까지는 470m

// start: 첫차(H:시,M:분), end: 막차(H:시,M:분), interval: 배차간격(분), speed: 걸어가는 속도(km/h), distance: 걷는거리(미터)
var project1 = function(start, end, interval, speed, distance) {
	this.startTime = start;			// HH:MM
	this.endTime = end;				// HH:MM
	this.intervalTime = interval;	// mm
	this.speed = speed;				// km/h
	this.distance = distance;		// meter
	this.walkTime = 0;				// mm
	
	// 모든 계산을 완료한 결과를 반환
	this.result = function() {
		var arr = this.calc();
		/*
		for (var i = 0; i < arr.length; i++) {
			var time = arr[i];
			console.log(time.h + '시 ' + time.m + '분에 출발하면 좋음');
		}
		*/
		return arr;
	}
	
	// intervalCalc()의 계산결과를 walkCalc()와 계산하여 새로운 배열로 반환.
	this.calc = function() {
		var walk = this.walkCalc();
		var intervalArr = this.intervalCalc();
		var arr = [];
		
		this.walkTime = walk;
		
		for (var i = 0; i < intervalArr.length; i++) {
			var time = intervalArr[i] - walk;
			arr[i] = convertToTime(time);
		}
		
		return arr;
	};
	
	// 걷는 속도를 통해 걷는데 걸리는 시간을 계산하고 반환한다.
	this.walkCalc = function() {
		var walkSpeed = this.speed / 60;	// (km/h -> km/m)
		var walkDistance = this.distance / 1000;	// (m->km)
		return Math.round(walkDistance / walkSpeed);	// 거시속 공식에 따라 (거리/속도) = 시간임.
	};
	
	// 배차간격을 통해 버스가 오는 시간을 계산하여 전체를 배열로 전부 반환한다.
	this.intervalCalc = function() {
		var arr = [];
		// 타임, 분 단위로 되어 있는 수를 분 단위로 계산.
		var time = convertToMinutes(this.startTime.h, this.startTime.m);
		var endTime = convertToMinutes(this.endTime.h, this.endTime.m);
		
		while (time <= endTime) {
			arr.push(time);
			time += this.intervalTime;
		}
		
		return arr;	// 계산이 완료되면 각자 시분단위로 나누어 저장된다.
	};
	
}

// 분 단위를 시,분 단위로 변환
function convertToTime(time) {
	var hours = Math.floor(time / 60);
	var minutes = Math.floor(time % 60);

	return {h: hours, m: minutes};
}

// 시, 분 단위를 분 단위로 변환
function convertToMinutes(h,m) {
	var time = (h * 60) + m;
	return time;
}

/*
/// Test Zone

var proj1 = new project1({h:6,m:0}, {h:21,m:56}, 21, 4, 470);	// (HH:MM, HH:MM, MM, km/h, m)
//console.log(proj1.convertToTime(proj1.convertToMinutes(16,38)));
//console.log(proj1.intervalCalc());
//console.log(proj1.calc());
console.dir(proj1.result());

var walk = proj1.walkCalc();
*/

