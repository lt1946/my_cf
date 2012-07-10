var xml2js = require('xml2js'),
request = require('request'),
url = 'http://www.google.com/ig/api?weather=beijing?hl=zh-CN';		
//TODO get More city name and create html view nodjs and sns to my phone

request(url, function(error, res, body) {
	 new xml2js.Parser().parseString(body, function (err, result) {
	 	 	if(result==undefined){
			   console.log(url+'\ncan not read!');return;
			}
			console.log(result);
			var currentConditions=result.weather.current_conditions;
//			console.log(currentConditions.length)
			var condition =currentConditions.condition['@']['data'];
			var temp_f =currentConditions.temp_f['@']['data'];
			var temp_c =currentConditions.temp_c['@']['data'];
			var humidity =currentConditions.humidity['@']['data'];
			var icon  =currentConditions.icon['@']['data'];
			var wind_condition   =currentConditions.wind_condition['@']['data'];
			console.log('今天天气');
			console.log('即时最高温度:'+Math.round((temp_f-32)/1.8));
			console.log('即时最低温度:'+Math.round((temp_c-32)/1.8));
			console.log(humidity.replace('Humidity','湿度'));
			console.log('图标:'+icon);
			console.log('天气状况:'+condition);
			console.log(wind_condition.replace('Wind','风向'));
			var forecastConditions=result.weather.forecast_conditions;
			console.log('明天天气');
//			for(var i=0;i<forecastConditions.length;i++){
				console.log(forecastConditions[0].day_of_week['@']['data'] );
				console.log('明天最低温度:'+Math.round((forecastConditions[0].low['@']['data']-32)/1.8));
				console.log('明天最高温度:'+Math.round((forecastConditions[0].high ['@']['data']-32)/1.8));
				console.log(forecastConditions[0].icon ['@']['data'] );
				console.log('天气状况:'+ forecastConditions[0].condition ['@']['data'] );
//			}
	});
});
