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
                        setFavoriteTeam(id, data)
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