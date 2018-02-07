window.onload = function() {
	console.log('DOM loaded');
	
	fetch("/status").then(function(res){
		res.json().then(function(data) {
			console.log(data);
			document.getElementById('my-name').innerHTML = data['name'];
			document.getElementById('my-status').innerHTML = data['status'];
		})
	})
}
