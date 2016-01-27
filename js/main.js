Loader.loadData('data/fr.json',function(data){
	data = JSON.parse(data);
	var home = MyApp.templates.home(data);

	$(document).ready(function(){

		$('body').append(home);
	});


});

