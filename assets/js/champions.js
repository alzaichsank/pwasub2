// var api = 'https://api.football-data.org/v2/competitions/[id_liga]/matches?status=SCHEDULED&limit=10'
var api = 'https://api.football-data.org/v2/competitions/CL/matches'
var token = '153f20017fe647ed8532923d2e3f3929'
var options = {
    method: 'get',
    headers: {
        'X-Auth-Token': token
    }
}

// let id_liga = 2014

var getDate = (date) => {
   let d = new Date(date);
   let tgl = d.getFullYear()+'/'+(d.getMonth()+1)+'/'+d.getDate()

   return tgl
}

var getHours = (date) => {
    let d = new Date(date);
    let minutes = d.getMinutes() < 10 ? '0'+d.getMinutes() : d.getMinutes()
    return d.getHours()+':'+minutes

}

var scheduleChampions = async() => {
    // let schedule_api = api.replace('[id_liga]', id_liga)
    // console.log(schedule_api);
    try{
        let fetch_api = await fetch(api, options)
        let data = await fetch_api.json()

        console.log(data);

        let scheduleChampionsHTML = `<div class="center">
        <h4>${data.competition.name}<i class="material-icons prefix small">schedule</i></h4>
        </div>`

        data.matches.forEach(item => {
            scheduleChampionsHTML += `
            <div class="col l6 s12 mb7 center">
            <div class="club-match-header blue darken-1">
            <span style="color: white;">${item.competition.name}</span>
            </div>
            <div class="club-match blue darken-1">
            <div class="home">
            <h5>${item.homeTeam.name}</h5>
            </div>
            <span class="versus">vs</span>
            <div class="away">
            <h5>${item.awayTeam.name}</h5>
            </div>
            </div>
            <div class="club-match-info blue darken-1">
            <span>${getDate(item.utcDate)+ ' '+getHours(item.utcDate)}</span>
            </div>
            </div>
            `
        })

        $('.root').html(scheduleChampionsHTML)
        getTheme()
    }catch{
        RouterError(schedule, '')
    }
    
}

scheduleChampions()