    //Cek indexDb apakah ada ? jika ada lakukan fetch dan isi data ke DOM
    const indexDb = idb.open('footballms', 1, db => {
        //db creation
        if (!db.objectStoreNames.contains('account')) {
            //db account
            const account = db.createObjectStore('account', {
                keyPath: 'id',
                autoIncrement: !0
            })

            account.createIndex('nickname', 'nickname')
            account.createIndex('name', 'name')
            account.createIndex('gender', 'gender')
            account.createIndex('theme', 'theme')
        }

        if (!db.objectStoreNames.contains('favorite')) {
            //db Favorite account
            const favorite = db.createObjectStore('favorite', {
                keyPath: 'team_id',
                autoIncrement: !1
            })

            favorite.createIndex('team_id', 'id_team')
            favorite.createIndex('team_name', 'team_name')
        }

    })

    indexDb.then(async db => {
        //add null values
        const txAccount = db.transaction('account', 'readwrite')
        const stAccount = txAccount.objectStore('account')

        let isOwn = await stAccount.get(1)

        if (isOwn == undefined) {
            let params = {
                id: 1,
                nickname: '',
                name: '',
                gender: '',
                theme: 'default'
            }

            stAccount.put(params)
        }
    })

    const loadAccount = () => {
        indexDb.then(db => {
            const tx = db.transaction('account', 'readonly')
            const st = tx.objectStore('account')

            let isOwn = st.get(1)
            return isOwn

        }).then(res => {
            console.log(res)
            if (res.gender != '') {
                const form = $('#form-settings')

                let nickname = form.find('#nickname')
                let name = form.find('#name')
                let gender = form.find(`input[value=${res.gender}]`).prop('checked', true)

                nickname.val(res.nickname)
                name.val(res.name)

                M.updateTextFields();
            }
        })
    }

    const loadSidebar = () => {
        indexDb.then(db => {
            const tx = db.transaction('account', 'readonly')
            const st = tx.objectStore('account')

            let isOwn = st.get(1)
            return isOwn
        }).then(res => {
            console.log(res)
            if (res !== undefined) {
                $('#account-user-name').text(res.nickname)
            } else {
                $('#account-user-name').text("Default account")
            }
        })
    }

    const updateAccount = (nickname, name, gender) => {
        indexDb.then(async db => {
            const tx = db.transaction('account', 'readwrite')
            const st = tx.objectStore('account')

            let data = await st.get(1)
            let theme = await data.theme

            let params = {
                id: 1,
                nickname,
                name,
                gender,
                theme
            }

            let isOwn = st.put(params)
            return tx.complete

        }).then(res => {
            loadSidebar()
            console.log("added to indexDb");
            M.toast({ html: 'Success data saved', classes: 'rounded' });
        })
    }

    const setTheme = color => {
        indexDb.then(async db => {
            const tx = db.transaction('account', 'readwrite')
            const st = tx.objectStore('account')

            let old = await st.get(1)
            let params = {
                id: 1,
                nickname: old.nickname,
                name: old.name,
                gender: old.gender,
                theme: color
            }

            let isOwn = st.put(params)
            return tx.complete

        }).then(res => {
            loadSidebar()
            console.log("theme set to " + color);
        })
    }

    const getTheme = () => {
        indexDb.then(db => {
            const tx = db.transaction('account', 'readonly')
            const st = tx.objectStore('account')

            let theme = st.get(1)
            return theme
        }).then(data => {
            if (data.theme != '') {
                //set theme

                switch (data.theme) {
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

                $('#nav').attr('class', color)
                $('#card-nav').attr('class', `card-panel ${color} rem-mt`)
                $('.scroll-to-top').removeClass('red green grey blue darken-1 darken-4')
                $('.scroll-to-top').addClass(color)
                $('.red, .green, .grey.darken-4, .blue.darken-1').each(function() {
                    $(this).removeClass('red green grey blue darken-1 darken-4')
                    $(this).addClass(color)
                })
            }
        })
    }

    const getDefaultTheme = () => {
        return new Promise((res, rej) => {
            indexDb.then(db => {
                const tx = db.transaction('account', 'readonly')
                const st = tx.objectStore('account')

                let theme = st.get(1)
                return theme
            }).then(data => {
                if (data.theme != '') {
                    switch (data.theme) {
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
                    res(color)
                }
            })
        })
    }

    const setFavorite = (id, data) => {
        indexDb.then(async db => {
            const tx = db.transaction('favorite', 'readwrite')
            const st = tx.objectStore('favorite')

            let team = {
                team_id: id,
                team_name: data.name,
                team_path_icon: data.path_img
            }

            const isExist = await st.get(id)

            if (isExist == undefined) {
                st.put(team)
                return data.name + " has been favorite"
            } else {
                st.delete(id)
                return data.name + " has been unfavorite"
            }

        }).then(res => {
            console.log(res)
        })
    }

    const getFavorite = () => {
        return new Promise(resolve => {
            indexDb.then(db => {
                const tx = db.transaction('favorite', 'readonly')
                const st = tx.objectStore('favorite')

                return st.getAll()
            }).then(res => {
                resolve(res)
            })
        })
    }