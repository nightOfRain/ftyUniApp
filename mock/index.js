const apiMock = require('./api');

//const attendanceMock = require('./attendance');
//const attendanceListMock = require('./attendance-list');

function Mock(app) {
	apiMock(app);
	// loginMock(app);
	// attendanceMock(app)
	//attendanceListMock(app)
  
}

module.exports = Mock;