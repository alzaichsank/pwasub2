document.addEventListener("DOMContentLoaded", () => {
    var page = window.location.hash.substr(1);
    var path = page.split('/')
    if (path.length > 1 && path[1] != '') {
        var first = path[0]
        switch (first) {
            case 'table':
            RouterTable(path[1])
            break
            default:
            RouterNetwork()
        }
    } else {
        if (page == '') {
            page = 'home'
        }
        page = page.split('?')[0]
        console.log(page)
        route(page);
    }
    setMaterialize()
    navListener()
});


const route = (page) => {

    urlPage = "pages/" + page + ".html";

    fetch(urlPage)
    .then((res) => res.text())
    .then((res) => {
            document.querySelector('#body-content').innerHTML = res
        })
    .catch(res => {
        $('#body-content').html(res.status)
    })
    .then(() => {
        M.Sidenav.getInstance($('.sidenav')).close();
        switch (page) {
            case 'home':
                var api = 'https://api.football-data.org/v2/matches'
                var token = '153f20017fe647ed8532923d2e3f3929'
                var options = {
                    method: 'get',
                    headers: {
                        'X-Auth-Token': token
                    }
                }
                var getDate = (date) => {
                    var d = new Date(date);
                    var tgl = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate()

                    return tgl
                }
                var getHours = (date) => {
                    var d = new Date(date);
                    var minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
                    return d.getHours() + ':' + minutes
                }
                var home = async() => {
                            try {
                                var fetch_api = await fetch(api, options)
                                var data = await fetch_api.json()

                                console.log(data);
                                if(data.matches.length > 0){
                                    var homeBody = ''

                                    data.matches.forEach(item => {
                                        homeBody += `
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
                                }else{
                                    routeEmptyHome()
                                }
                            } catch {
                                RouterNetwork(home, '')
                            }
                        }
                        home()
            break
            case 'champions':
                var api = 'https://api.football-data.org/v2/competitions/CL/matches'
                var token = '153f20017fe647ed8532923d2e3f3929'
                var options = {
                    method: 'get',
                    headers: {
                        'X-Auth-Token': token
                    }
                }
                var getDate = (date) => {
                    var d = new Date(date);
                    var tgl = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate()

                    return tgl
                }
                var getHours = (date) => {
                    var d = new Date(date);
                    var minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
                    return d.getHours() + ':' + minutes
                }
                var champions = async() => {
                            try {
                                var fetch_api = await fetch(api, options)
                                var data = await fetch_api.json()

                                console.log(data);
                                if(data.matches.length > 0){
                                    console.log("masuk gan");
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
                                    console.log("masuk gan 2");
                                    $('.root').html(championsHTML)
                                }else{
                                    routeEmptyHome()
                                }
                            } catch {
                                RouterNetwork(champions, '')
                            }
                        }
                champions()
            break
            case 'table':
                $('.table > div > div > a').each((index, item) => {
                        var uri = $(item).attr('href').substr(7)
                        $(item).click(() => {
                            RouterTable(uri)
                        })
                    })
            break
            case 'feedback':
                $('.feedback-send').click(() => {
                    var email = $('#email').val()
                    var message = $('#message').val()
                    var container = $('#body-content')
                    var loading = `<div class="progress">
                    <div class="indeterminate"></div>
                    </div>`
                    var thanks = `<div class="s12 l12 center notif">
                    <div><img class="responsive-img signal" src="./assets/img/ui/thankyou.png"></div>
                    <div><span>we hope can be better</span></div><br><br>
                    <div class="center">
                    <button class="btn waves-effect waves-light round" onclick="route('feedback')"><i class="material-icons">arrow_back</i></button>
                    </div>
                    </div>`
                    var errMessage = `<div class="s12 l12 center notif">
                    <div><img class="responsive-img signal" src="./assets/img/ui/img-no-network.svg"></div>
                    <div><h3>no network</h3></div>
                    <div><span>Please check your network connectivity</span></div>
                    </div>`

                    container.html(loading)
                    $.ajax({
                        method: 'post',
                        url: 'http://sendfeedback.codehopedevloper.com/',
                        data: {
                            sender: email,
                            subject: "feedback",
                            message: message
                        },
                        success: res => {
                            container.html(thanks)
                        },
                        error: function(xhr) {
                            container.html(errMessage)
                        }
                    })
                })
            break
            case 'favorite':
                getFavorite().then(res => {
                        if (res.length == 0) {
                            routeEmptyFavorite()
                        } else {
                            var body = `<div><center><h4>Tim Favorite</h4></center></div>`
                            res.forEach(item => {
                                body += `
                        <div class="col s12 m12">
                        <div class="card horizontal favteam">
                            <a href="#!" 
                            data-id="${item.team_id}" 
                            data-url="${item.team_path_icon}" 
                            data-name="${item.team_name}"
                            data-played="${item.team_played}" 
                            data-won="${item.team_won}" 
                            data-draw="${item.team_draw}"
                            data-lost="${item.team_lost}" 
                            data-goal="${item.team_goal}" 
                            data-gagainst="${item.team_gagainst}" 
                            data-difference="${item.team_difference}" 
                            data-points="${item.team_points}"  
                            class="favorite checked"><i class="small material-icons circle">grade</i></a>
                            <div class="card-image smallheight">
                                <a href="#" data-id="${item.team_id}" class="team-info">
                                    <img alt="club ${item.team_path_icon}" onerror="this.src='./assets/img/icon/Icon-144.png'" src="./assets/img/icon/Icon-144.png" class="team-icon lazyload" data-src="${item.team_path_icon.replace(/^http:\/\//i, 'https://')}">
                                </a>
                            </div>
                            <div class="card-stacked" data-id="${item.team_id}">
                                <div class="card-content center">
                                    <h4>${item.team_name}</h4>
                                </div>

                                <div class="row">
                                    <div class="col s12 m12" style="padding-right: 2em;">
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
                                                        <td class="text-center">${item.team_played}</td>
                                                        <td class="text-center">${item.team_won}</td>
                                                        <td class="text-center">${item.team_draw}</td>
                                                        <td class="text-center">${item.team_lost}</td>
                                                        <td class="text-center">${item.team_goal}</td>
                                                        <td class="text-center">${item.team_gagainst}</td>
                                                        <td class="text-center">${item.team_difference}</td>
                                                        <td class="text-center">${item.team_points}</td>                                
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                                `
                        })
                            $('.root').html(body)

                            $('.team-info').each(function() {
                                var team_id = $(this).data('id')
                                $(this).click(function(e) {
                                    window.location.hash = '#teamsdetail?id=' + team_id;
                                    e.preventDefault()
                                    route('teamsdetail')
                                })
                            })

                            $('.card-stacked').each(function() {
                                var team_id = $(this).data('id')
                                $(this).click(function(e) {
                                    window.location.hash = '#teamsdetail?id=' + team_id;
                                    e.preventDefault()
                                    route('teamsdetail')
                                })
                            })

                            $('.favorite').each(function() {
                                var elem = $(this)
                                var id = elem.data('id')
                                var name = elem.data('name')
                                var path_img = elem.data('url')
                                var played = elem.data('played')
                                var won = elem.data('won')
                                var draw = elem.data('draw')
                                var lost = elem.data('lost')
                                var goal = elem.data('goal')
                                var gagainst = elem.data('gagainst')
                                var difference = elem.data('difference')
                                var points = elem.data('points')

                                var data = {
                                    id,
                                    name,
                                    path_img,
                                    played,
                                    won,
                                    draw,
                                    lost,
                                    goal,
                                    gagainst,
                                    difference,
                                    points
                                }

                                elem.click(function(e) {
                                    e.preventDefault()
                                    var isFavorite = elem.hasClass('checked')

                                    if (!isFavorite) {
                                        elem.addClass('checked')
                                    } else {
                                        var toastHTML = '<span>dihapus dari favorite</span><button class="btn-flat toast-action">Undo</button>';
                                        M.toast({
                                            html: toastHTML,
                                            displayLength: '3000'
                                        });

                                        var card = elem.closest('div.favteam')
                                        card.hide("slow")

                                        var doRemove = setTimeout(() => {
                                            setFavorite(id, data)
                                            card.remove()
                                            if ($('div.favteam').length == 0) {
                                                routeEmptyFavorite()
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
            break
            case 'teamsdetail':
                    var getTeamByIdTeam = async() => {
                        const root = $('.root')
                        const url_params = window.location.href

                        const url = new URL(url_params)
                        const getval = url.hash.indexOf('?')
                        const params = new URLSearchParams(url.hash.substr(getval))

                        const team_id = params.get('id')
                        console.log(team_id)
                        if (team_id == null) {
                            root.html(`Kosong`)
                        } else {
                            const api = 'https://api.football-data.org/v2/teams/[team_id]'
                            const token = '153f20017fe647ed8532923d2e3f3929'
                            const options = {
                                method: 'get',
                                headers: {
                                    'X-Auth-Token': token
                                }
                            }
                            api_team = api.replace('[team_id]', team_id)
                            try {
                                var getAPi = await fetch(api_team, options)
                                var data = await getAPi.json()

                                var table_row = ''

                                data.squad.reverse().forEach(item => {
                                    table_row += `
                                    <tr>
                                    <td>${item.name}</td>
                                    <td>${item.position}</td>
                                    <td>${item.nationality}</td>
                                    </tr>
                                    `
                                })
                                var card = `
                                <div class="row">
                                <div class="col s12 m12">
                                <div class="card">
                                <div>
                                    <div class="card-image height">
                                        <img class="icon-table" src="${data.crestUrl.replace(/^http:\/\//i, 'https://')}">
                                    </div>
                                    <div class="card-image">
                                        <span class="team-icon-title card-title">${data.name}</span>
                                    </div>
                                </div>
                                <div class="card-content">
                                <table class="info-club">
                                <tr>
                                <td>Nationality</td>
                                <td>${data.area.name}</td>
                                </tr>
                                <tr>
                                <td>Founded</td>
                                <td>${data.founded}</td>
                                </tr>
                                <tr>
                                <td>Address</td>
                                <td>${data.address}</td>
                                </tr>
                                <tr>
                                <td>Club Color</td>
                                <td>${data.clubColors}</td>
                                </tr>
                                <tr>
                                <td>Website</td>
                                <td>${data.website}</td>
                                </tr>
                                <tr>
                                <td>Email</td>
                                <td>${data.email}</td>
                                </tr>
                                </table>
                                </div>
                                <div class="card-content team-squad hide" style="display: none">
                                <table class="striped">
                                <thead>
                                <tr>
                                <td>Name</td>
                                <td>Position</td>
                                <td>Nationaility</td>
                                </tr>
                                </thead>
                                <tbody>
                                ${table_row}
                                </tbody>
                                </table>
                                </div>
                                <div class="card-action">
                                <a href="#" id="show-squad">show all squad</a>
                                </div>
                                </div>
                                </div>
                                </div>
                                `
                                card += `
                                <a class="btn-floating waves-effect waves-light btn-large blue darken-1 btn-back"><i class="material-icons circle">arrow_back</i></a>
                                <div class="floating-bottom"> 
                                <a class="btn-floating btn-large waves-effect waves-light blue darken-1 to-top"><i class="material-icons">expand_less</i></a>
                                </div>
                                `
                                root.html(card)

                                $('#show-squad').click((e) => {
                                    e.preventDefault()
                                    var elem = $('.team-squad')
                                    var btn = $('#show-squad')

                                    if (elem.hasClass('hide')) {
                                        elem.show('slow')
                                        elem.removeClass('hide')
                                        btn.text('less all squad')
                                    } else {
                                        elem.hide('slow')
                                        elem.addClass('hide')
                                        btn.text('show all squad')
                                    }
                                })
                                $('.btn-back').click(() => {
                                    window.location.hash = '#favorite';
                                    route("favorite")
                                })
                                $('.floating-bottom').click(event => {
                                    event.preventDefault()
                                    $("html, body").animate({
                                        scrollTop: 0
                                    }, "slow");
                                    return false;
                                })
                                $('.to-top').hide()
                                window.onscroll = function() {
                                    if (window.scrollY >= 500) {
                                        $('.to-top').fadeIn('500')
                                    } else {
                                        $('.to-top').fadeOut('500')
                                    }
                                }
                                console.log(data)
                            } catch (err) {
                                console.log(err)
                                RouterNetwork(getTeamByIdTeam, '')
                            }
                        }
                    }

                getTeamByIdTeam()
            break
            default:
                console.log("diluar case")      
            }
        })
}

const navListener = () => {
    var elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    $('.sidenav > li > a, .topnav > li > a').each(function() {
        var loaded = $(this).attr('href').substr(1)

        $(this).click(function() {
            M.Sidenav.getInstance($('.sidenav')).close();
            route(loaded)
        })
    });
}

const setMaterialize = () => {
    $('.modal').modal()
    $('.dropdown-trigger').dropdown()
    $('.tooltipped').tooltip()
}

const RouterTable = async(params) => {
    console.log("ambil data nih")
    var loading = `<div class="col s3 l3 progress">
    <div class="indeterminate blue darken-1"></div>
    </div>
    `
    $('#body-content').html(loading)

    const api = 'https://api.football-data.org/v2/competitions/[team]/standings'
    const token = '153f20017fe647ed8532923d2e3f3929'
    const options = {
        method: 'get',
        headers: {
            'X-Auth-Token': token
        }
    }
    const url = {
        bundesliga: 2002,
        laliga: 2014,
        premier: 2021,
        seriea: 2019
    }
    var newapi = api.replace('[team]', url[params])
    try {
        var data = await fetch(newapi, options)
        var json = await data.json()
        var result = await json.standings[0]
        var table = await result.table
        console.log(result)
        var content = ``
        var favorite = await getFavorite()
        table.forEach(item => {
            var checked = ''
            for (var i in favorite) {
                if (favorite[i].team_id == item.team.id) {
                    checked = 'checked'
                    break
                }
            }
            content += `<div class="col s12 m7">
                            <p class="header">${item.position+". "+item.team.name}</p>
                            <div class="card horizontal">
                                <a href="#!" 
                                data-id="${item.team.id}" 
                                data-url="${item.team.crestUrl.replace(/^http:\/\//i, 'https://')}" 
                                data-name="${item.team.name}"
                                data-played="${item.playedGames}" 
                                data-won="${item.won}" 
                                data-draw="${item.draw}"
                                data-lost="${item.lost}" 
                                data-goal="${item.goalsFor}" 
                                data-gagainst="${item.goalsAgainst}" 
                                data-difference="${item.goalDifference}" 
                                data-points="${item.points}"  
                                class="favorite ${checked}"><i class="small material-icons circle">grade</i></a>
                                <div class="card-image smallheight">
                                    <img alt="club ${item.team.name}" onerror="this.src='./assets/img/icon/Icon-144.png'" src="./assets/img/icon/Icon-144.png" class="team-icon lazyload" data-src="${item.team.crestUrl.replace(/^http:\/\//i, 'https://')}">
                                </div>
                                    <div class="row">
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
            <a class="btn-floating btn-large waves-effect waves-light blue darken-1 to-top"><i class="material-icons">expand_less</i></a>
            </div>
            `
            document.querySelector('#body-content').innerHTML = content
            $('.favorite').each(function() {
                var elem = $(this)
                var id = elem.data('id')
                var name = elem.data('name')
                var path_img = elem.data('url')
                var played = elem.data('played')
                var won = elem.data('won')
                var draw = elem.data('draw')
                var lost = elem.data('lost')
                var goal = elem.data('goal')
                var gagainst = elem.data('gagainst')
                var difference = elem.data('difference')
                var points = elem.data('points')

                var data = {
                    id,
                    name,
                    path_img,
                    played,
                    won,
                    draw,
                    lost,
                    goal,
                    gagainst,
                    difference,
                    points
                }

                elem.click(function(e) {
                    e.preventDefault()
                    setFavorite(id, data)
                    var isFavorite = elem.hasClass('checked')

                    var message = ''
                    if (!isFavorite) {
                        message = data.name + " ditambah ke favorite"
                        elem.addClass('checked')
                    } else {
                        message = data.name + " dihapus dari favorite"
                        elem.removeClass('checked')
                    }

                    M.toast({ html: message, classes: 'rounded', displayLength: 1000 });

                })
            })
            $('.btn-back').click(() => {
                route("table")
            })
            $('.floating-bottom').click(event => {
                event.preventDefault()
                $("html, body").animate({ scrollTop: 0 }, "slow");
                return false;
            })
            $('.to-top').hide()
            window.onscroll = function() {
                if (window.scrollY >= 500) {
                    $('.to-top').fadeIn('500')
                } else {
                    $('.to-top').fadeOut('500')
                }
            }
    } catch (err) {
        console.log(err)
        RouterNetwork(RouterTable, params)
    }
}

const RouterNetwork = (callback, params) => {
    var routeMessage = `<div class="s12 l12 center notif">
    <div><img class="responsive-img network" src="./assets/img/ui/img-no-network.svg"></div>
    <div><h3>Tidak ada koneksi internet</h3></div>
    <div><span>Mohon cek kembali koneksi anda</span></div>
    <div><a href="" class="waves-effect reload"><i class="material-icons font-red right-align">refresh</i></a></di>
    </div>`
    $('#body-content').html(routeMessage)
    $('.reload').click((event) => {
        event.preventDefault()
        callback(params)
    })
    console.log("Tidak ada koneksi internet")
}

const routeEmptyFavorite = () => {
    var routeEmpty = `
    <div class="s12 l12 center notif">
    <div><img class="responsive-img empty" src="./assets/img/ui/favorite.png"></div>
    <div><h4>Belum ada tim favorite</h4></div>
    <div>Ayo tambahkan list team favorite mu</div>
    </div>
    `
    $('#body-content').html(routeEmpty)
}

const routeEmptyHome = () => {
    var routeEmpty = `
    <div class="s12 l12 center notif">
    <div><img class="responsive-img empty" src="./assets/img/ui/favorite.png"></div>
    <div><h4>Jadwal kosong...</h4></div>
    <div>Tidak ada jadwal pertandingan hari ini</div>
    </div>
    `
    $('#body-content').html(routeEmpty)
}