/* 
 * 과제1에서 이어지는 과제로 현지시간 기준 구지중학교로 이동하여 바로 다음 급행8번을 탑승 후,
 * 대곡역 버스정류장에 도착하는 시간이 몇 시인지 구하는 프로그램을 개발한다.
 * 프로그램은 각자 개발하기 편한 언어를 사용한다. (웹, 안드로이드, iOS, 윈도우응용프로그램 등)
 * 화면캡처 또는 사진촬영한 이미지와 라이브러리등은 제외하고 개발한 코드만 압축해서 제출한다.
 */

// 1) 다른 버스정류장은 정차하지 않고 간다고 가정한다.
// 2) 구지중학교에서 대곡역 버스정류장까지의 거리는 22km이다.
// 3) 버스는 70km/h로 주행한다

// km, km/h, HH:MM
var project2 = function(distance, speed, departure) {	// 거리, 속도, 출발시각 (단 시각은 버스 출발 기준이다)
	this.distance = distance;
	this.speed = speed;
	this.departure = departure;	// 버스 출발시각 기준이므로 여기서 요구하는 조건은 proj1에서 받은 값을 계산해 파라미터에 넣으란 것이다.
	
	// 결과를 반환.
	this.result = function() {
		var result = this.calc();
		
		return result;
	}
	
	// 주행시간과 출발시각을 계산하여 도착예정시간을 반환.
	this.calc = function() {
		var departureTime = convertToMinutes(this.departure.h, this.departure.m);
		var moveTime = this.calcMoving();
		var arrivalTime = (departureTime + moveTime);
		
//		console.log(departureTime, moveTime, arrivalTime);
		
		return convertToTime(arrivalTime);
	}
	
	// 버스 이동속도 계산하여 걸리는 시간을 반환.
	this.calcMoving = function() {
		var moveSpeed = this.speed / 60;	// (km/h -> km/m)
		var moveDistance = this.distance;	// (km)
		return Math.round(moveDistance / moveSpeed);	// 거시속 공식에 따라 (거리/속도) = 시간임.
	}
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

// 거리, 속도, 출발시각
var proj2 = new project2(22, 70, {h:6, m:0});	// km, km/h, HH:MM
console.log('6시 0분에 ' + proj2.result());
*/

