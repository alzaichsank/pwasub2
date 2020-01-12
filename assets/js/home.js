// setting api
var api = 'https://api.football-data.org/v2/matches'
var token = '153f20017fe647ed8532923d2e3f3929'
var options = {
    method: 'get',
    headers: {
        'X-Auth-Token': token
    }
}

// get date untuk ambil tanggal sekarang
var getDate = (date) => {
   let d = new Date(date);
   let tgl = d.getFullYear()+'/'+(d.getMonth()+1)+'/'+d.getDate()

   return tgl
}
// get hours untuk ambil waktu sekarang
var getHours = (date) => {
    let d = new Date(date);
    let minutes = d.getMinutes() < 10 ? '0'+d.getMinutes() : d.getMinutes()
    return d.getHours()+':'+minutes
}

var home = async() => {
    try{
        let fetch_api = await fetch(api, options)
        let data = await fetch_api.json()

        console.log(data);

        let homeBody = ''

        data.matches.forEach(item => {
            homeBody +=`
            <div class="col l12 s12 mb12 center" style="padding-bottom: 2px;">
            <div class="table-match blue darken-1">
            <p style="color: white;">${item.competition.name} <br>${getDate(item.utcDate)+ ' '+getHours(item.utcDate)}</p>
            <div class="divider"></div>
            <p style="color: white;">${item.homeTeam.name}&nbsp; VS &nbsp;${item.awayTeam.name}</p>
            </div>
            </div>
            `
        })
        $('.root').html(homeBody)
    }catch{
        RouterError(home, '')
    }
    
}

home()