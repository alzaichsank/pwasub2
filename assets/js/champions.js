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

var champions = async() => {
    // let schedule_api = api.replace('[id_liga]', id_liga)
    // console.log(schedule_api);
    try{
        let fetch_api = await fetch(api, options)
        let data = await fetch_api.json()

        console.log(data);

        var championsHTML = ``

        championsHTML += `<div class="center">
        <h5 style="padding: 20px 20px 20px 20px;">${data.competition.name}</h5>
        </div>`
        data.matches.reverse().forEach(item => {
            championsHTML +=
            `
            <div class="col l12 s12 mb12 center" style="padding-bottom: 2px;">
            <div class="table-match blue darken-1">
            <p style="color: white;">${getDate(item.utcDate)+ ' '+getHours(item.utcDate)}</p>
            <div class="divider"></div>
            <p style="color: white;">${item.homeTeam.name}&nbsp; VS &nbsp;${item.awayTeam.name}</p>
            </div>
            </div>
            `
        })

        $('.root').html(championsHTML)
    }catch{
        RouterError(champions, '')
    }
    
}

champions()