document.addEventListener("DOMContentLoaded", function() {
  // Activate sidebar nav
  var elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);
  loadNav();
  loadSideNav();

  function loadNav() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status != 200) return;
        // Muat daftar tautan menu
        document.querySelectorAll(".topnav").forEach(function(elm) {
          elm.innerHTML = xhttp.responseText;
        });

        // Daftarkan event listener untuk setiap tautan menu
        document
        .querySelectorAll(".topnav a")
        .forEach(function(elm) {
          elm.addEventListener("click", function(event) {
              // Muat konten halaman yang dipanggil
              page = event.target.getAttribute("href").substr(1);
              loadPage(page);
            });
        });
      }
    };
    xhttp.open("GET", "./navigation/topnav.html", true);
    xhttp.send();
  }

  function loadSideNav() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status != 200) return;

        // Muat daftar tautan menu
        document.querySelectorAll(".sidenav").forEach(function(elm) {
          elm.innerHTML = xhttp.responseText;
        });

        // Daftarkan event listener untuk setiap tautan menu
        document
        .querySelectorAll(".sidenav a")
        .forEach(function(elm) {
          elm.addEventListener("click", function(event) {
              // Muat konten halaman yang dipanggil
              var sidenav = document.querySelector(".sidenav");
              M.Sidenav.getInstance(sidenav).close();
              page = event.target.getAttribute("href").substr(1);
              loadPage(page);
            });
        });
      }
    };
    xhttp.open("GET", "./navigation/sidenav.html", true);
    xhttp.send();
  }

  // Load page content
  var page = window.location.hash.substr(1);
  var path = page.split('/')
  
  if (path.length > 1 && path[1] != '') {
    var first = path[0]
    switch (first) {
      case 'table':
      TableTeam(path[1])
      break
      default:
      RouteErrorNetwork()
    }
  } else {
    if (page == "") page = "home";
    page = page.split('?')[0]
    console.log(page)
    loadPage(page);
  }

});
const loadPage = (page) => {
    // fetch('pages/' + page + '.html')
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        var content = document.querySelector("#body-content")
        if (page === "home") {
          getSchedule();
        }else if (page === "champions"){
          getChampions();
        }else if (page === "table"){
          $('#body-content').on('click', '[data-url]', function() {
            console.log($(this).data('url'))
            TableTeam($(this).data('url'));
          });
        }else if ( page==="favorite"){
          getFavoriteData();
        }else if ( page==="sugestion"){
          $('#body-content').on('click','.sugestion-send', function(){
            console.log("ke klik")
            var from = $('#email').val();
            var feedback = $('#message').val();
            var content = $('#body-content');
            console.log("cek data email=" + from )
            console.log("cek data message=" + feedback )
            if(from === null && feedback === null){
              var toastHTML = 'Mohon lengkapi data terlebih dahulu';
             M.toast({
              html: toastHTML,
              displayLength: '3000'
            });
           }else{
            var loading = `<div class="progress">
           <div class="indeterminate"></div>
           </div>`
           var success = `<div class="s12 l12 center notif">
           <div><img class="responsive-img signal" src="./assets/img/ui/thankyou.png"></div>
           <div><span>we hope can be better</span></div><br><br>
           <div class="center">
           <button class="btn waves-effect waves-light blue darken-1 round" onclick="loadPage('sugestion')"><i class="material-icons">arrow_back</i></button>
           </div>
           </div>`
           var error = `<div class="s12 l12 center notif">
           <div><img class="responsive-img signal" src="./assets/img/ui/img-no-network.svg"></div>
           <div><h3>Tidak ada koneksi internet</h3></div>
           <div><span>Mohon cek koneksi anda</span></div>
           </div>`

           content.html(loading)
           $.ajax({
            method: 'post',
            url: 'http://sendfeedback.codehopedevloper.com/',
            data: {
              sender: from,
              subject: "sugestion",
              message: feedback
            },
            success: res => {
              content.html(success)
            },
            error: function(xhr) {
              content.html(error)
            }
          });
           console.log("lolos")
         }
       });
        }

        if (this.status == 200) {
          content.innerHTML = xhttp.responseText;
        } else if (this.status == 404) {
          content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
        } else {
          content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
        }
      }
    };
    xhttp.open("GET", "pages/" + page + ".html", true);
    xhttp.send();
  }

  const TableTeam = async(params) => {
    var loading = `<div class="col s3 l3 progress">
    <div class="indeterminate blue darken-1"></div>
    </div>
    `
    $('#body-content').html(loading)
    const url = {
      bundesliga: 2002,
      laliga: 2014,
      premier: 2021,
      seriea: 2019
    }
    var apiteam = base_url + "v2/competitions/[team]/standings";
    var replaceapi = apiteam.replace('[team]', url[params]);
    try {
      var data = await fetch(replaceapi, options);
      var json = await data.json();
      var result = await json.standings[0];
      var table = await result.table;
      console.log(result)
      var content = ``
      table.forEach(item => {
        var checked = ''
        content += `<div class="col s12 m7">
        <p class="header">${item.position+". "+item.team.name}</p>
        <div class="card horizontal">
        <div class="card-image smallheight" data-id="${item.team.id}">
        <img alt="club ${item.team.name}" onerror="this.src='./assets/img/icon/Icon-144.png'" src="./assets/img/icon/Icon-144.png" class="team-logo lazyload" data-src="${item.team.crestUrl.replace(/^http:\/\//i, 'https://')}">
        </div>
        <div class="row" data-id="${item.team.id}">
        <div class="col-lg-12">
        <div class="table-responsive">
        <table class="table-striped table-responsive table-hover result-point">
        <thead class="point-table-head">
        <tr>
        <th class="text-center">P</th>
        <th class="text-center">W</th>
        <th class="text-center">D</th>
        <th class="text-center">L</th>
        <th class="text-center">GS</th>
        <th class="text-center">GA</th>
        <th class="text-center">+/-</th>
        <th class="text-center">PTS</th>
        </tr>
        </thead>
        <tbody class="text-center">
        <tr>
        <td class="text-center">${item.playedGames}</td>
        <td class="text-center">${item.won}</td>
        <td class="text-center">${item.draw}</td>
        <td class="text-center" class="text-center">${item.lost}</td>
        <td class="text-center">${item.goalsFor}</td>
        <td class="text-center">${item.goalsAgainst}</td>
        <td class="text-center">${item.goalDifference}</td>
        <td class="text-center">${item.points}</td>                                
        </tr>
        </tbody>
        </table>
        </div>
        </div>
        </div>
        </div>
        </div>`
      })
      content += `          
      <a class="btn-floating waves-effect waves-light btn-large blue darken-1 btn-back"><i class="material-icons circle">arrow_back</i></a>
      <div class="floating-bottom"> 
      <a class="btn-floating btn-large waves-effect waves-light blue darken-1 go-top"><i class="material-icons">expand_less</i></a>
      </div>
      `

      $('#body-content').html(content)
      $('.btn-back').click(() => {
        loadPage("table");
      })
      $('.floating-bottom').click(event => {
        event.preventDefault()
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
      })
      $('.go-top').hide()
      window.onscroll = function() {
        if (window.scrollY >= 500) {
          $('.go-top').fadeIn('500')
        } else {
          $('.go-top').fadeOut('500')
        }
      }

    } catch (err) {
      console.log(err)
      RouteErrorNetwork()
    }
  }

  const RouteErrorNetwork = () => {
    var message = `<div class="s12 l12 center notif">
    <div><img class="responsive-img network" src="./assets/img/ui/img-no-network.svg"></div>
    <div><h3>Tidak ada koneksi internet</h3></div>
    <div><span>Mohon cek kembali koneksi anda</span></div>
    </div>`
    $('#body-content').html(message)
    console.log("Tidak ada koneksi internet")
  }
