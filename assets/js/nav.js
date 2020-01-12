document.addEventListener("DOMContentLoaded", () => {
    var page = window.location.hash.substr(1);
    let path = page.split('/')
    if (path.length > 1 && path[1] != '') {
        let first = path[0]
        switch (first) {
            case 'table':
            RouterTable(path[1])
            break
            default:
            RouterError()
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
    colorPlateListener()
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
        getTheme()
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
                    let d = new Date(date);
                    let tgl = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate()

                    return tgl
                }
                var getHours = (date) => {
                    let d = new Date(date);
                    let minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
                    return d.getHours() + ':' + minutes
                }
                var home = async() => {
                            try {
                                let fetch_api = await fetch(api, options)
                                let data = await fetch_api.json()

                                console.log(data);
                                if(data.matches.length > 0){
                                    let homeBody = ''

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
                                    getTheme()
                                }else{
                                    routeEmptyHome()
                                }
                            } catch {
                                RouterError(home, '')
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
                    let d = new Date(date);
                    let tgl = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate()

                    return tgl
                }
                var getHours = (date) => {
                    let d = new Date(date);
                    let minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
                    return d.getHours() + ':' + minutes
                }
                var champions = async() => {
                            try {
                                let fetch_api = await fetch(api, options)
                                let data = await fetch_api.json()

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
                                    getTheme()
                                }else{
                                    routeEmptySchedule()
                                }
                            } catch {
                                RouterError(champions, '')
                            }
                        }
                champions()
            break
            case 'table':
                $('.table > div > div > a').each((index, item) => {
                        let uri = $(item).attr('href').substr(7)
                        $(item).click(() => {
                            RouterTable(uri)
                        })
                    })
            break
            case 'feedback':
                $('.feedback-send').click(() => {

                    let email = $('#email').val()
                    let message = $('#message').val()
                    let container = $('#body-content')
                    let loading = `<div class="progress">
                    <div class="indeterminate"></div>
                    </div>`
                    let thanks = `<div class="s12 l12 center notif">
                    <div><img class="responsive-img signal" src="./assets/img/ui/thankyou.png"></div>
                    <div><span>we hope can be better</span></div><br><br>
                    <div class="center">
                    <button class="btn waves-effect waves-light round" onclick="route('feedback')"><i class="material-icons">arrow_back</i></button>
                    </div>
                    </div>`
                    let errMessage = `<div class="s12 l12 center notif">
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
                            let body = `<div><center><h5>My Favorite Teams</h5></center></div>`
                            res.forEach(item => {
                                body += `
                                <div data-id="${item.team_id}">
                                <div class="col s12 mt-3">
                                <div class="card horizontal savedTeam">
                                <a href="#!" data-id="${item.team_id}" data-name="${item.team_name}" class="favorite checked"><i class="small material-icons circle">grade</i></a>
                                <div class="card-image icon-club">
                                <a href="#" data-id="${item.team_id}" class="team-info">
                                <img alt="club ${item.team_path_icon}" onerror="this.src='./assets/img/icon/Icon-144.png'" src="./assets/img/icon/Icon-144.png" class="icon-club lazyload" data-src="${item.team_path_icon.replace(/^http:\/\//i, 'https://')}">
                                </a>
                                </div>
                                <div class="card-stacked" data-id="${item.team_id}">
                                <div class="card-content center">
                                <h4>${item.team_name}</h4>
                                </div>
                                </div>
                                </div>
                                </div>
                                </div>
                                `
                        })

                            $('.root').html(body)

                            $('.team-info').each(function() {
                                let team_id = $(this).data('id')
                                $(this).click(function(e) {
                                    window.location.hash = '#teams?id=' + team_id;
                                    e.preventDefault()
                                    route('teams')
                                })
                            })

                            $('.card-stacked').each(function() {
                                let team_id = $(this).data('id')
                                $(this).click(function(e) {
                                    window.location.hash = '#teams?id=' + team_id;
                                    e.preventDefault()
                                    route('teams')
                                })
                            })

                            $('.favorite').each(function() {
                                let elem = $(this)
                                let id = elem.data('id')
                                let name = elem.data('name')
                                let path_img = elem.data('url')

                                let data = {
                                    id,
                                    name,
                                    path_img
                                }

                                elem.click(function(e) {
                                    e.preventDefault()
                                    let isFavorite = elem.hasClass('checked')

                                    if (!isFavorite) {
                                        elem.addClass('checked')
                                    } else {
                                        var toastHTML = '<span>Deleted</span><button class="btn-flat toast-action">Undo</button>';
                                        M.toast({
                                            html: toastHTML,
                                            displayLength: '3000'
                                        });

                                        let card = elem.closest('div.savedTeam')
                                        card.hide("slow")

                                        let doRemove = setTimeout(() => {
                                            setFavorite(id, data)
                                            card.remove()
                                            if ($('div.savedTeam').length == 0) {
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
            case 'teams':
                    var getTeamById = async() => {
                        const root = $('.root')
                        const url_params = window.location.href

                        const url = new URL(url_params)
                        const getval = url.hash.indexOf('?')
                        const params = new URLSearchParams(url.hash.substr(getval))

                        const team_id = params.get('id')
                        console.log(team_id)
                        if (team_id == null) {
                            //show home of team page
                            root.html(`Gaada parameter`)
                        } else {
                            //show detail team
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
                                let getAPi = await fetch(api_team, options)
                                let data = await getAPi.json()

                                let table_row = ''

                                data.squad.reverse().forEach(item => {
                                    table_row += `
                                    <tr>
                                    <td>${item.name}</td>
                                    <td>${item.position}</td>
                                    <td>${item.nationality}</td>
                                    </tr>
                                    `
                                })

                                let card = `
                                <div class="row">
                                <div class="col s12 m6">
                                <div class="card">
                                <div class="card-image">
                                <img class="team-icon" src="${data.crestUrl.replace(/^http:\/\//i, 'https://')}">
                                <span class="team-icon-title card-title">${data.name}</span>
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
                                <a class="btn-floating waves-effect waves-light btn-large red btn-back"><i class="material-icons circle">arrow_back</i></a>
                                <div class="floating-bottom"> 
                                <a class="btn-floating btn-large waves-effect waves-light red scroll-to-top"><i class="material-icons">expand_less</i></a>
                                </div>
                                `
                                root.html(card)

                                $('#show-squad').click((e) => {
                                    e.preventDefault()
                                    let elem = $('.team-squad')
                                    let btn = $('#show-squad')

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

                                //event when btn back clicked
                                $('.btn-back').click(() => {
                                    window.location.hash = '#favorite';
                                    route("favorite")
                                })

                                // event when scroll to top clicked
                                $('.floating-bottom').click(event => {
                                    event.preventDefault()
                                    $("html, body").animate({
                                        scrollTop: 0
                                    }, "slow");
                                    return false;
                                })

                                //hide button scroll when first loaded
                                $('.scroll-to-top').hide()

                                //event hide/show when scroll
                                window.onscroll = function() {
                                    if (window.scrollY >= 500) {
                                        $('.scroll-to-top').fadeIn('500')
                                    } else {
                                        $('.scroll-to-top').fadeOut('500')
                                    }
                                }

                                //set theme now 
                                getTheme()
                                console.log(data)
                            } catch (e) {
                                RouterError(getTeamById, '')
                            }
                        }
                    }

                getTeamById()
            break
            default:
                console.log("diluar case")      
            }
        })
}

const colorPlateListener = () => {
    getTheme()
    $('#color_plate > li > a').each(function() {
        let datacolor = $(this).attr('data-color')
        let color = ''
        switch (datacolor) {
            case 'red':
            color = 'red'
            break
            case 'black':
            color = 'grey darken-4'
            break
            case 'green':
            color = 'green'
            break
            default:
            color = 'blue darken-1'
        }

        $(this).click(e => {
            e.preventDefault()
            $('#nav').attr('class', color)
            $('#card-nav').attr('class', `card-panel ${color} rem-mt`)
                $('.red, .green, .grey.darken-4, .blue.darken-1').not('i.red, i.green, i.grey.darken-4, i.blue.darken-1').each(function() {
                    $(this).removeClass('red green grey blue darken-1 darken-4')
                    $(this).addClass(color)
                })
                setTheme(datacolor)
            })
    })
}

const navListener = () => {
    loadSidebar() //load name on index db
    var elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    $('.sidenav > li > a, .topnav > li > a').each(function() {
        let loaded = $(this).attr('href').substr(1)

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
    let loading = `<div class="col s3 l3 progress">
    <div class="indeterminate blue darken-1"></div>
    </div>
    `
    $('#body-content').html(loading)
    getTheme()

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

    let newapi = api.replace('[team]', url[params])

    try {
        let data = await fetch(newapi, options)

        let json = await data.json()
        let result = await json.standings[0]
        let table = await result.table
        console.log(result)
        let content = ``
        let favorite = await getFavorite()
        table.forEach(item => {
            let checked = ''

            for (let i in favorite) {
                if (favorite[i].team_id == item.team.id) {
                    checked = 'checked'
                    break
                }
            }

            content += `<div class="col s12 m7">
                            <p class="header">${item.position+". "+item.team.name}</p>
                            <div class="card horizontal">
                                <a href="#!" data-id="${item.team.id}" data-url="${item.team.crestUrl.replace(/^http:\/\//i, 'https://')}" data-name="${item.team.name}" class="favorite ${checked}"><i class="small material-icons circle">grade</i></a>
                                <div class="card-image icon-table">
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
                                                        <td>${item.playedGames}</td>
                                                        <td>${item.won}</td>
                                                        <td>${item.draw}</td>
                                                        <td>${item.lost}</td>
                                                        <td>${item.goalsFor}</td>
                                                        <td>${item.goalsAgainst}</td>
                                                        <td>${item.goalDifference}</td>
                                                        <td>${item.points}</td>                                
                                                    </tr>
                                                </tbody>
                                            </table>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>`
        })

        let defaultTheme = getDefaultTheme().then(color => {
            content += `          
            <a class="btn-floating waves-effect waves-light btn-large ${color} btn-back"><i class="material-icons circle">arrow_back</i></a>
            <div class="floating-bottom"> 
            <a class="btn-floating btn-large waves-effect waves-light ${color} scroll-to-top"><i class="material-icons">expand_less</i></a>
            </div>
            `
            document.querySelector('#body-content').innerHTML = content
        }).then(() => {
            //event when Favorite
            $('.favorite').each(function() {
                let elem = $(this)
                let id = elem.data('id')
                let name = elem.data('name')
                let path_img = elem.data('url')

                let data = {
                    id,
                    name,
                    path_img
                }

                elem.click(function(e) {
                    e.preventDefault()
                    setFavorite(id, data)
                    let isFavorite = elem.hasClass('checked')

                    let message = ''
                    if (!isFavorite) {
                        message = data.name + " has been favorite"
                        elem.addClass('checked')
                    } else {
                        message = data.name + " has been unfavorite"
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
            $('.scroll-to-top').hide()
            window.onscroll = function() {
                if (window.scrollY >= 500) {
                    $('.scroll-to-top').fadeIn('500')
                } else {
                    $('.scroll-to-top').fadeOut('500')
                }
            }
        })
    } catch (err) {
        RouterError(RouterTable, params)
    }
}

const RouterError = (callback, params) => {
    let errMessage = `<div class="s12 l12 center notif">
    <div><img class="responsive-img signal" src="./assets/img/ui/img-no-network.svg"></div>
    <div><h3>no network</h3></div>
    <div><span>Please check your network connectivity</span></div>
    <div><a href="" class="waves-effect reload"><i class="material-icons font-red right-align">refresh</i></a></di>
    </div>`
    $('#body-content').html(errMessage)
    $('.reload').click((event) => {
        event.preventDefault()
        callback(params)
    })
    console.log("Tidak ada koneksi internet")
}

const routeEmptyFavorite = () => {
    let emptyMess = `
    <div class="s12 l12 center notif">
    <div><img class="responsive-img signal" src="./assets/img/ui/favorite.png"></div>
    <div><h4>Nothing favorite teams</h4></div>
    <div>Ayo tambahkan list team favorite mu</div>
    </div>
    `
    $('#body-content').html(emptyMess)
}

const routeEmptyHome = () => {
    var emptyHome = `
    <div class="s12 l12 center notif">
    <div><img class="responsive-img signal" src="./assets/img/ui/favorite.png"></div>
    <div><h4>Jadwal kosong...</h4></div>
    <div>Tidak ada jadwal pertandingan hari ini</div>
    </div>
    `
    $('#body-content').html(emptyHome)
}