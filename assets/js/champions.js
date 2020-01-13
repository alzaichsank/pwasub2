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
           <table class="info-club striped"">
           <tr>
           <td class="text-center">${item.stage}</td>
           </tr>
           <tr>
           <tr>
           <td class="text-center"><span class="status-team text-versus">${item.score.winner}</span> </td>
           </tr>
           <tr>
           <td>
           <p class="split-para text-center">
           <span class="home-team color  text-versus">HOME</span>
           <span class="progress-team text-versus">${item.status}</span> 
           <span class="away-team color text-versus">AWAY</span>
           </p>
           </td>
           </tr>
           <tr>
           <tr>
           <td>
           <p class="split-para text-center">
           <span class="home-team  text-versus">${item.homeTeam.name}</span>
           <span class="vs-team text-versus"> VS </span> 
           <span class="away-team text-versus">${item.awayTeam.name}</span>
           </p>
           <p class="split-para text-center">
           <span class="home-team  text-versus">${item.score.fullTime.homeTeam}</span>
           <span class="away-team text-versus">${item.score.fullTime.awayTeam}</span>
           </p>
           </td>
           </tr>
           <tr>
           <td class="text-center">${getDate(item.utcDate)+ ' '+getHours(item.utcDate)}</td>
           </tr>
           </div>`
        })

        $('.root').html(championsHTML)
    }catch{
        RouterNetwork(champions, '')
    }
    
}

champions()