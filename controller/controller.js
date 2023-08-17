const http = require('http');


const getCities = async (req,res) => {
    const data = {
        cities: req.body.cities
    }
    try{
        var string = data.cities.replace(/\s/g, '');
        var city = string.split(",");
        var weather = [];
        console.log(string)
        for(var i=0;i<city.length;i++){
            const options = {
                hostname: 'api.weatherapi.com',
                path: `/v1/current.json?key=${process.env.API_KEY}&q=${city[i]}&aqi=no`,
                method: 'GET'
            };
            await fetchData(options).then(async (chunks)=>{
                raw = JSON.parse(chunks)
                info = {
                    city: raw.location.name,
                    temp_c: raw.current.temp_c,
                    temp_f: raw.current.temp_f,
                    condition: raw.current.condition.text
                }
                weather.push(info)
            }).catch(err=>console.log(err));
            
            
        }
        console.log(weather)
        res.render('GetWeather',{arrayVariable: weather});
        
    }
    catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
}

function fetchData(options) {
    return new Promise((resolve, reject) => {
      const req = http.request(options, (res) => {
        let chunk = '';
  
        res.on('data', (data) => {
          chunk += data;
        });
  
        res.on('end', () => {
          resolve(chunk);
        });
      });
  
      req.on('error', (error) => {
        reject(error);
      });
  
      req.end();
    });
  }

module.exports = getCities;