var getTeamByIdTeam = async() => {
    const root = $('.root')
    const url_params = window.location.href
    const url = new URL(url_params)
    const getval = url.hash.indexOf('?')
    const params = new URLSearchParams(url.hash.substr(getval))
    const team_id = params.get('id')
    console.log(team_id)
    if (team_id == null) {
        root.html(`kosong`)
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
            var getAPi = await fetch(api_team, options)
            var data = await getAPi.json()

            var table_row = ''

            data.squad.reverse().forEach(item => {
                if(item.position == null ){
                    table_row += `
                    <tr>
                    <td>${item.name}</td>
                    <td>-</td>
                    <td>${item.nationality}</td>
                    <td class="text-center">
                    <div class="card-action">
                    <a
                    data-team="${data.name}"
                    data-flag="${data.crestUrl.replace(/^http:\/\//i, 'https://')}"
                    data-name="${item.name}"     
                    data-position="-" 
                    data-nationality="${item.nationality}" 
                    data-birth="${item.dateOfBirth.substr(0,10)}"
                    class="modal-trigger"  href="#playerdata">Detail
                    </a>
                    </div>
                    </td>
                    </tr>
                    `
                }else if(item.name == null ){
                    table_row += `
                    <tr>
                    <td>-</td>
                    <td>${item.position}</td>
                    <td>${item.nationality}</td>
                    <td class="text-center">
                    <div class="card-action">
                    <a
                    data-team="-"
                    data-flag="${data.crestUrl.replace(/^http:\/\//i, 'https://')}"
                    data-name="${item.name}"     
                    data-position="${item.position}" 
                    data-nationality="${item.nationality}" 
                    data-birth="${item.dateOfBirth.substr(0,10)}"
                    class="modal-trigger"  href="#playerdata">Detail
                    </a>
                    </div>
                    </td>
                    </tr>
                    `
                }else if(item.nationality == null ){
                    table_row += `
                    <tr>
                    <td>${item.name}</td>
                    <td>${item.position}</td>
                    <td>-</td>
                    <td class="text-center">
                    <div class="card-action">
                    <a
                    data-team="${data.name}"
                    data-flag="${data.crestUrl.replace(/^http:\/\//i, 'https://')}"
                    data-name="${item.name}"     
                    data-position="${item.position}" 
                    data-nationality="-" 
                    data-birth="${item.dateOfBirth.substr(0,10)}"
                    class="modal-trigger"  href="#playerdata">Detail
                    </a>
                    </div>
                    </td>
                    </tr>
                    `
                }else{
                    table_row += `
                    <tr>
                    <td>${item.name}</td>
                    <td>${item.position}</td>
                    <td>${item.nationality}</td>
                    <td class="text-center">
                    <div class="card-action">
                    <a
                    data-team="${data.name}"
                    data-flag="${data.crestUrl.replace(/^http:\/\//i, 'https://')}"
                    data-name="${item.name}"     
                    data-position="${item.position}" 
                    data-nationality="${item.nationality}" 
                    data-birth="${item.dateOfBirth.substr(0,10)}"
                    class="modal-trigger"  href="#playerdata">Detail
                    </a>
                    </div>
                    </td>
                    </tr>
                    `
                }
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
            <td>Negara</td>
            <td>${data.area.name}</td>
            </tr>
            <tr>
            <td>Berdiri</td>
            <td>${data.founded}</td>
            </tr>
            <tr>
            <td>Alamat</td>
            <td>${data.address}</td>
            </tr>
            <tr>
            <td>Markas</td>
            <td>${data.venue}</td>
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
            <div class="card-content team-squad">
            <span class="team-icon-title card-title" style="color:white;">Data Pemain</span>
            <table class="striped">
            <thead>
            <tr>
            <td class="text-center">Nama</td>
            <td class="text-center">Posisi</td>
            <td class="text-center">Negara</td>
            <td class="text-center">Aksi</td>
            </tr>
            </thead>
            <tbody>
            ${table_row}
            </tbody>
            </table>
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
            card += `
            <div id="playerdata" class="modal modal-round">
            </div>`

            root.html(card)

            $('.modal-trigger').each(function () {
                var $this = $(this);
                $this.on("click", function () {
                    console.log("click playerdata detail")
                                        // alert($(this).data('name'));
                                        var info = `
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
                                        <table class="info-club">
                                        <tr>
                                        <td>Nama</td>
                                        <td>${$(this).data('name')}</td>
                                        </tr>
                                        <tr>
                                        <td>Posisi</td>
                                        <td>${$(this).data('position')}</td>
                                        </tr>
                                        <tr>
                                        <td>Negara</td>
                                        <td>${$(this).data('nationality')}</td>
                                        </tr>
                                        <tr>
                                        <td>Tim</td>
                                        <td>${$(this).data('team')}</td>
                                        </tr>
                                        <tr>
                                        <td>Tanggal Lahir</td>
                                        <td>${$(this).data('birth')}</td>
                                        </tr>
                                        </table>
                                        </div>
                                        </div>
                                        </div>
                                        </div>`
                                        $('#playerdata').html(info);
                                        $('#playerdata').modal()
                                        console.log("click modal detail")
                                    });
                
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