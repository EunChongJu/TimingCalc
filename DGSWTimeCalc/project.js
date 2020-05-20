

// project1와 project2를 여기서 생성자로 사용하여 통합할 것임.

// 첫차시간, 막차시간, 배차간격, 걸아가는 속도, 학교에서 정류장까지 거리, 대곡역까지 거리, 주행속도
function project(startTime, endTime, interval, walkSpeed, schoolDistance, dotDistance, busSpeed) {
	var nowTime = getNowTime();
	
	var a = new project1(startTime, endTime, interval, walkSpeed, schoolDistance);
	var aResult = a.result();
	
	var walkTime = a.walkTime;
	
//	var departureTime = aResult[0];
	var departureTime = selectMinTime(nowTime,aResult,walkTime);
	
	var time = calcTime(departureTime, walkTime);
	
	var b = new project2(dotDistance, busSpeed, time);
	var bResult = b.result();
	
	var s1 = '지금 시간: ' + nowTime.h + '시 ' + nowTime.m + '분입니다.';
	var s2 = '당신이 계획적인 사람처럼 보이게 하려면 ';
	var s3 = departureTime.h + '시 ' + departureTime.m + '분에 학교에서 나오시면 됩니다.';
	var s4 = time.h + '시 ' + time.m + '분에 버스정류장에 도착하게 됩니다.';
	var s5 = '그리고 이 버스에 탑승하시면 ' + bResult.h + '시 ' + bResult.m + '분에 도착할 예정입니다.';
	var sArr = [s1, s2, s3, s4, s5];
	return sArr;
}

// 현재시간을 시,분 형태로 반환.
function getNowTime() {
	var now = new Date();
	var hours = now.getHours();
	var minutes = now.getMinutes();
	
	return {h: hours, m: minutes};
}

// 현재시각을 가지고 가능시간 배열을 파악하여 선택한 다음, 선택값을 반환한다. 만약 노답이라면 false를 반환한다.
function selectMinTime(now, arr, walk) {
	var endTime = calcTime(arr[arr.length-1], walk);
	
	if ((now.h > endTime.h) || ((now.h == endTime.h) && (now.m >= endTime.h))) {
		return false;
	}
	
	var minTime = calcTime(arr[0], walk);
	
	for (var i = 0; i < arr.length; i++) {
		var time = calcTime(arr[i], walk);
		
		// 버스 출발시간이 10시 45분이고, 현재시간이 10시 45분이면 이 값으로 나오고,
		// 현재시간이 10시 46분이면 바로 그다음 시간으로 나온다.
		// 그리고 현재시간이 10시 44분이면 10시 45분이 되는 것이다.
		if ((time.h == now.h) && (time.m >= now.m)) {
			minTime = time;
		}
		else continue;
	}
	
	return minTime;
}

// 학교에서 출발하고 버스정류장까지 걸어간 시간을 합하여 실제 버스정류장 도착시간을 구한다.
function calcTime(departure, walkTime) {
	return convertToTime(convertToMinutes(departure.h, departure.m) + walkTime);
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

// project() 함수에서 처리된 결과를 디스플레이에 표시하는 함수로, 결과값을 지정한 곳에 표시한다.
function displayShow(sArr) {
	console.dir(sArr);
	document.getElementById('NOWTime').innerHTML = sArr[0];
	document.getElementById('TMITime').innerHTML = sArr[1];
	document.getElementById('DASTime').innerHTML = sArr[2];
	document.getElementById('ANDTime').innerHTML = sArr[3];
	document.getElementById('AIDTime').innerHTML = sArr[4];
}

/*
var proj1 = new project1({h:6,m:0}, {h:21,m:56}, 21, 4, 470);
var proj1Result = proj1.result();

console.log(proj1Result);

var proj2 = new project2(22, 70, proj1Result);	// km, km/h, HH:MM
var proj2Result = proj2.result();
console.log(proj2Result + "에 도착할 예정 입니다.");
*/


/// Test Zone
