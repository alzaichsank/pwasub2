/*declaration*/
var base_url = 'https://api.football-data.org/'
var token = '153f20017fe647ed8532923d2e3f3929'
var options = {
  method: 'get',
  headers: {
    'X-Auth-Token': token
  }
}

var findCal = (date) => {
  var newDate = new Date(date);
  var dateNow = newDate.getFullYear() + '/' + (newDate.getMonth() + 1) + '/' + newDate.getDate()
  return dateNow
}
var findTime = (time) => {
  var newData = new Date(time);
  var minutes = newData.getMinutes() < 10 ? '0' + newData.getMinutes() : newData.getMinutes()
  return newData.getHours() + ':' + minutes
}
function error(error) {
  console.log("Error : " + error);
}
function generalLog(message) {
  console.log("Log : " + message);
}

function getSchedule() {
  var home = async() => {
    try {
      var fetchjson = await fetch(base_url+"v2/matches", options)
      var data = await fetchjson.json()
      console.log(data);
      var winner = "";
      var favorite = await getFavorite();
      if(data.matches.length > 0){
        var homeBody =`
        <div class="center">
        <h5>Jadwal hari ini</i></h5>
        <p>Jangan lupa saksikan tim favorite mu</p>
        </div>`
        data.matches.forEach(item => {
          var statusfav = "";
          if (item.score.winner !== null) {
            winner = item.score.winner;
          } else {
            winner = "belum tersedia";
          }
          for (var i in favorite) {
            if (favorite[i].schedule_id == item.id) {
              statusfav = 'yes';
              break
            }
          }
          homeBody +=`
          <div class="center">
          <div class="col l12 s12 mb12 center" style="padding-bottom: 2px;">      
          <table class="striped"">
          <tr>
          <td class="text-center">${item.competition.name}
          <a href="#!"
          data-id="${item.id}" 
          data-stage="${item.competition.name}" 
          data-winner="${winner}"
          data-status="${item.status}" 
          data-hometeam="${item.homeTeam.name}" 
          data-awayteam="${item.awayTeam.name}"
          data-homescore="${item.score.fullTime.homeTeam}" 
          data-awayscore="${item.score.fullTime.awayTeam}" 
          data-date="${item.utcDate}"
          class="favorite ${statusfav}"
          ><i class="small material-icons circle">grade</i></a></td>
          </tr>
          <tr>
          <tr>
          <td class="text-center"><span class="status-team text-versus">${winner}</span> </td>
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
          <td class="text-center">${findCal(item.utcDate)+ ' '+findTime(item.utcDate)}</td>
          </tr>
          </table>
          </div>`
        })
        $('#body-content').html(homeBody)
        $('.favorite').each(function() {
          var elem = $(this)
          var id = elem.data('id')
          var stage = elem.data('stage')
          var winner = elem.data('winner')
          var status = elem.data('status')
          var hometeam = elem.data('hometeam')
          var awayteam = elem.data('awayteam')
          var homescore = elem.data('homescore')
          var awayscore = elem.data('awayscore')
          var date = elem.data('date')

          var data = {
            id,
            stage,
            winner,
            status,
            hometeam,
            awayteam,
            homescore,
            awayscore,
            date
          }

          elem.click(function(e) {
            e.preventDefault()
            setFavorite(id, data)
            var isFavorite = elem.hasClass('yes')

            var message = ''
            if (!isFavorite) {
              message = data.hometeam + " vs "+data.awayteam + " ditambah ke favorite"
              elem.addClass('yes')
            } else {
              message = data.hometeam + " vs "+data.awayteam + " dihapus dari favorite"
              elem.removeClass('yes')
            }

            M.toast({ html: message, classes: 'rounded', displayLength: 1000 });

          })
        })

      }else{
        generalLog("kosong");
        EmptyHome()
      }
    } catch(err) {
      error(err);
      ErrorNetwork()
    }
  }
  home()
}

function getChampions() {
 var champions = async() => {
  try {
   var fetchjson = await fetch(base_url+"v2/competitions/CL/matches", options)
   var data = await fetchjson.json()
   console.log(data);
   if(data.matches.length > 0){
    var championsHTML = `<div class="center">
    <h5 style="padding: 20px 20px 20px 20px;">${data.competition.name}</h5>
    </div>`
    var winner = ""
    var favorite = await getFavorite();
    data.matches.forEach(item => {
      var statusfav = "";
      if (item.score.winner !== null) {
        winner = item.score.winner;
      } else {
        winner = "belum tersedia";
      }
      for (var i in favorite) {
        if (favorite[i].schedule_id == item.id) {
          statusfav = 'yes';
          break
        }
      }
      championsHTML +=
      `
      <div class="col l12 s12 mb12 center" style="padding-bottom: 2px;">
      <table class="striped"">
      <tr>
      <td class="text-center">${item.stage}
      <a href="#!"
      data-id="${item.id}" 
      data-stage="${item.stage}" 
      data-winner="${winner}"
      data-status="${item.status}" 
      data-hometeam="${item.homeTeam.name}" 
      data-awayteam="${item.awayTeam.name}"
      data-homescore="${item.score.fullTime.homeTeam}" 
      data-awayscore="${item.score.fullTime.awayTeam}" 
      data-date="${item.utcDate}"
      class="favorite ${statusfav}"
      ><i class="small material-icons circle">grade</i></a></td>
      </tr>
      <tr>
      <tr>
      <td class="text-center"><span class="status-team text-versus">${winner}</span> </td>
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
      <td class="text-center">${findCal(item.utcDate)+ ' '+findTime(item.utcDate)}</td>
      </tr>
      </table>
      </div>`
    })
    $('#body-content').html(championsHTML)
    $('.favorite').each(function() {
      var elem = $(this)
      var id = elem.data('id')
      var stage = elem.data('stage')
      var winner = elem.data('winner')
      var status = elem.data('status')
      var hometeam = elem.data('hometeam')
      var awayteam = elem.data('awayteam')
      var homescore = elem.data('homescore')
      var awayscore = elem.data('awayscore')
      var date = elem.data('date')

      var data = {
        id,
        stage,
        winner,
        status,
        hometeam,
        awayteam,
        homescore,
        awayscore,
        date
      }

      elem.click(function(e) {
        e.preventDefault()
        setFavorite(id, data)
        var isFavorite = elem.hasClass('yes')

        var message = ''
        if (!isFavorite) {
          message = data.hometeam + " vs "+data.awayteam + " ditambah ke favorite"
          elem.addClass('yes')
        } else {
          message = data.hometeam + " vs "+data.awayteam + " dihapus dari favorite"
          elem.removeClass('yes')
        }

        M.toast({ html: message, classes: 'rounded', displayLength: 1000 });

      })
    })
  }else{
    generalLog("kosong");
    EmptyHome()
  }
  } catch(err) {
    error(err);
    ErrorNetwork()
  }
  }
  champions()
}

function getFavoriteData() {
  getFavorite().then(res => {
    if (res.length == 0) {
      EmptyFavorite();
    }else{
      console.log(res);
      var favoriteHTML = `<div><center><h4>Jadwal Anda</h4></center></div>`
      res.forEach(item => {
        favoriteHTML += `
        <div class="col l12 s12 mb12 center savedschedule" style="padding-bottom: 2px;">
        <table class="striped"">
        <tr>
        <td class="text-center">${item.schedule_competition}
        <a href="#!"
        data-id="${item.schedule_id}" 
        data-stage="${item.schedule_competition}" 
        data-winner="${item.schedule_winner}"
        data-status="${item.schedule_status}" 
        data-hometeam="${item.schedule_hometeam}" 
        data-awayteam="${item.schedule_awayteam}"
        data-homescore="${item.schedule_homescore}" 
        data-awayscore="${item.schedule_awayscore}" 
        data-date="${item.schedule_date}"
        class="favorite yes"
        ><i class="small material-icons circle">grade</i></a></td>
        </tr>
        <tr>
        <tr>
        <td class="text-center"><span class="status-team text-versus">${item.schedule_winner}</span> </td>
        </tr>
        <tr>
        <td>
        <p class="split-para text-center">
        <span class="home-team color  text-versus">HOME</span>
        <span class="progress-team text-versus">${item.schedule_status}</span> 
        <span class="away-team color text-versus">AWAY</span>
        </p>
        </td>
        </tr>
        <tr>
        <tr>
        <td>
        <p class="split-para text-center">
        <span class="home-team  text-versus">${item.schedule_hometeam}</span>
        <span class="vs-team text-versus"> VS </span> 
        <span class="away-team text-versus">${item.schedule_awayteam}</span>
        </p>
        <p class="split-para text-center">
        <span class="home-team  text-versus">${item.schedule_homescore}</span>
        <span class="away-team text-versus">${item.schedule_awayscore}</span>
        </p>
        </td>
        </tr>
        <tr>
        <td class="text-center">${findCal(item.schedule_date)+ ' '+findTime(item.schedule_date)}</td>
        </tr>
        </table>
        </div>`
      })
      $('#body-content').html(favoriteHTML)
      $('.favorite').each(function() {
        var elem = $(this)
        var id = elem.data('id')
        var stage = elem.data('stage')
        var winner = elem.data('winner')
        var status = elem.data('status')
        var hometeam = elem.data('hometeam')
        var awayteam = elem.data('awayteam')
        var homescore = elem.data('homescore')
        var awayscore = elem.data('awayscore')
        var date = elem.data('date')

        var data = {
          id,
          stage,
          winner,
          status,
          hometeam,
          awayteam,
          homescore,
          awayscore,
          date
        }

        elem.click(function(e) {
          e.preventDefault()
          var isSaved = elem.hasClass('yes')
          if (!isSaved) {
            elem.addClass('yes')
          } else {
            var toastHTML = '<span>dihapus dari favorite</span><button class="btn-flat toast-action">Undo</button>';
            M.toast({
              html: toastHTML,
              displayLength: '3000'
            });
            var card = elem.closest('div.savedschedule')
            card.hide("slow")
            var doRemove = setTimeout(() => {
              setFavorite(id, data)
              card.remove()
              if ($('div.savedschedule').length == 0) {
                EmptyFavorite()
              }
            }, 3000)
            $('.toast-action').click(() => {
              card.show('slow')
              clearTimeout(doRemove)
              M.Toast.dismissAll();
            })
          }
        })
      })
    }
  })
}

const ErrorNetwork = () => {
  var message = `<div class="s12 l12 center notif">
  <div><img class="responsive-img network" src="./assets/img/ui/img-no-network.svg"></div>
  <div><h3>Tidak ada koneksi internet</h3></div>
  <div><span>Mohon cek kembali koneksi anda</span></div>
  </div>`
  $('#body-content').html(message)
  console.log("Tidak ada koneksi internet")
}

const EmptyHome = () => {
  var message = `
  <div class="s12 l12 center notif">
  <div><img class="responsive-img empty" src="./assets/img/ui/favorite.png"></div>
  <div><h4>Jadwal kosong...</h4></div>
  <div>Tidak ada jadwal pertandingan hari ini</div>
  </div>
  `
  $('#body-content').html(message)
}

const EmptyFavorite = () => {
  var message = `
  <div class="s12 l12 center notif">
  <div><img class="responsive-img empty" src="./assets/img/ui/favorite.png"></div>
  <div><h4>Belum ada tim favorite</h4></div>
  <div>Ayo tambahkan list team favorite mu</div>
  </div>
  `
  $('#body-content').html(message)
}