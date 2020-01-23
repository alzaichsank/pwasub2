var indexDb = idb.open('fms', 1, upgradeDb => {    
    if (!upgradeDb.objectStoreNames.contains('favorite')) {
        var favorite = upgradeDb.createObjectStore('favorite', {
            keyPath: 'schedule_id',
            autoIncrement: false
        })
        favorite.createIndex('schedule_id', 'schedule_id')
    }

})

const setFavorite = (id, data) => {
    indexDb.then(async upgradeDb => {
        const transactionData = upgradeDb.transaction('favorite', 'readwrite')
        const storeData = transactionData.objectStore('favorite')

        let team = {
            schedule_id: data.id,
            schedule_competition: data.stage,
            schedule_winner: data.winner,
            schedule_status: data.status,
            schedule_hometeam: data.hometeam,
            schedule_awayteam: data.awayteam,
            schedule_homescore: data.homescore,
            schedule_awayscore: data.awayscore,
            schedule_date: data.date
        }

        const isExist = await storeData.get(id)

        if (isExist == undefined) {
            storeData.put(team)
            return data.hometeam + " vs "+data.awayteam + " ditambah ke favorite"
        } else {
            storeData.delete(id)
            return data.hometeam + " vs "+data.awayteam + " dihapus dari favorite"
        }

    }).then(res => {
        console.log(res)
    })
}

const getFavorite = () => {
    return new Promise(resolve => {
        indexDb.then(upgradeDb => {
            const transactionData = upgradeDb.transaction('favorite', 'readonly')
            const storeData = transactionData.objectStore('favorite')

            return storeData.getAll()
        }).then(res => {
            resolve(res)
        })
    })
}