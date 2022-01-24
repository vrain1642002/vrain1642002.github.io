var app = angular.module('myApp',[]);
app.controller('myController', function($scope) {
	$scope.abm = "About Me";
	$scope.updateInfo = "Updated 7 minuted ago";
	$scope.verify = "Verify";
	$scope.des = "Description about me !";
	$scope.cv="Biệt hiệu:Rain"
	$scope.contact="Sinh ngày 16/4/2002"
	
	
	$scope.contactmi = "Hello user";
	$scope.ifyou = "Controlled";
	$scope.modal1 = "Reload";
	$scope.modal2 = "F5";
	$scope.modal3 = "Repeat";
	$scope.modal4 = "Email";
	$scope.modal5 = "Sms";
	$scope.linkfb = "https://myfistwebsiterain07.000webhostapp.com/?fbclid=IwAR1P9DxauBjE58TCBYjJctoeQCuZO9A2zL7Tzgw7EOwsK9N2QwZpUezqajo";
	$scope.linkzl = "https://myfistwebsiterain07.000webhostapp.com/?fbclid=IwAR1P9DxauBjE58TCBYjJctoeQCuZO9A2zL7Tzgw7EOwsK9N2QwZpUezqajo";
	$scope.linksc = "https://myfistwebsiterain07.000webhostapp.com/?fbclid=IwAR1P9DxauBjE58TCBYjJctoeQCuZO9A2zL7Tzgw7EOwsK9N2QwZpUezqajo";
	
	$scope.phonenumber = "????????";
	$scope.email = "nhqviet.dth.tuyan@gmail.com";
	$scope.title2 = "My Story";
	$scope.contentStory1 = "Tôi được tiếp cận máy tính từ khá sớm.Trong khoảng thời gian 6 năm từ lớp đến lớp 9 tôi đã tự khám phá dần về thế giới ảo này và tình cờ khi vì một mục đích đầy 'chính nghĩa' là hack IOE để đỡ tốn thời gian,tốn sức suy nghĩ thì tôi đã biết đến những dòng code và thật bất ngờ khi nó chính là thứ tạo ra toàn bộ thế giới nhị thứ nguyên này nhưng rồi một số lí do phải đến tận năm lớp 10 tôi mới gõ ra chương trình hello world đầu tiên của mình.Đầy là website đầu tiên tôi viết ra cũng là dấu mốc kết thúc cho thanh xuân này.Tôi dành hết tâm huyết code tận 7 ngày,dành từ 7-8h mỗi ngày(bỏ bê mọi thứ) để tạo ra nó.Và đây là những dòng code cuối cùng tôi gõ để rồi tạm gác lại đam mê ấy rồi cố gắng học tập để có thể đặt chân vào trường đại học tôi thích để hiện thức hóa dần các ước mơ của tôi.";
	
	$scope.storytitle1 = "Đời lập trình của tôi bắt đầu bằng một mục đích đầy chính nghĩa ...";
	$scope.storytitle2 = "Thanh xuân tựa cơn mưa rào mà tôi muốn được đắm chìm lần nữa!";
	$scope.nothinglikeus = "Thank for watching";
	$scope.au = "Rain";
	$scope.phone = false;
	$scope.reverse = function () {
		$scope.phone= !$scope.phone;
	}
	$scope.gmail = false;
	$scope.reverse2 = function () {
		$scope.gmail= !$scope.gmail;
	};
});