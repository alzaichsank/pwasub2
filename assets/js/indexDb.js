const indexDb = idb.open('footballms', 1, database => {    
    if (!database.objectStoreNames.contains('favorite')) {
        const favorite = database.createObjectStore('favorite', {
            keyPath: 'team_id',
            autoIncrement: !1
        })

        favorite.createIndex('team_id', 'id_team')
        favorite.createIndex('team_name', 'team_name')

    }

})

const setFavorite = (id, data) => {
    indexDb.then(async database => {
        const transactionData = database.transaction('favorite', 'readwrite')
        const storeData = transactionData.objectStore('favorite')

        let team = {
            team_id: id,
            team_name: data.name,
            team_path_icon: data.path_img,
            team_played: data.played,
            team_won: data.won,
            team_draw: data.draw,
            team_lost: data.lost,
            team_goal: data.goal,
            team_gagainst: data.gagainst,
            team_difference: data.difference,
            team_points: data.points
        }

        const isExist = await storeData.get(id)

        if (isExist == undefined) {
            storeData.put(team)
            return data.name + " ditambah ke favorite"
        } else {
            storeData.delete(id)
            return data.name + " dihapus dari favorite"
        }

    }).then(res => {
        console.log(res)
    })
}

const getFavorite = () => {
    return new Promise(resolve => {
        indexDb.then(database => {
            const transactionData = database.transaction('favorite', 'readonly')
            const storeData = transactionData.objectStore('favorite')

            return storeData.getAll()
        }).then(res => {
            resolve(res)
        })
    })
}