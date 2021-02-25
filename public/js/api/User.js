/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
    static URL = '/user';
    /**
     * Устанавливает текущего пользователя в
     * локальном хранилище.
     * */
    static setCurrent(user) {
        localStorage.user = JSON.stringify(user);
    }

    /**
     * Удаляет информацию об авторизованном
     * пользователе из локального хранилища.
     * */
    static unsetCurrent() {
        localStorage.removeItem("user");
    }

    /**
     * Возвращает текущего авторизованного пользователя
     * из локального хранилища
     * */
    static current() {
        if (localStorage.user) {
            return JSON.parse(localStorage.user);
        } else {
            return undefined;
        }
    }


    /**
     * Получает информацию о текущем
     * авторизованном пользователе.
     * */
    static fetch(data, callback = f => f) {

        createRequest({
            url: 'user/current',
            method: 'GET',
            data,
            callback: (err, response) => {
                if (response && response.user) {
                    User.setCurrent(response.user);
                } else {
                    User.unsetCurrent();
                    console.log(err);
                }
                callback(err, response);
            }
        });
    }

    /**
     * Производит попытку авторизации.
     * После успешной авторизации необходимо
     * сохранить пользователя через метод
     * User.setCurrent.
     * */
    static login(data, callback = f => f) {

        createRequest({
            url: 'user/login',
            method: 'POST',
            data,
            callback: (err, response) => {
                if (response.success) {
                    User.setCurrent(response.user);
                    callback(null, response);
                } else {
                    callback(response.error, null)
                }
            }
        })
    }

    /**
     * Производит попытку регистрации пользователя.
     * После успешной авторизации необходимо
     * сохранить пользователя через методw
     * User.setCurrent.
     * */
    static register(data, callback = f => f) {

        createRequest({
            url: 'user/register',
            method: 'POST',
            data,
            callback: (err, response) => {
                if (response.success === true) {
                    User.setCurrent(response.user);
                    callback(null, response);
                } else {
                    callback(response.error, null)
                }
            }
        })
    }


    /**
     * Производит выход из приложения. После успешного
     * выхода необходимо вызвать метод User.unsetCurrent
     * */
    static logout(data, callback = f => f) {

        createRequest({
            url: 'user/logout',
            method: 'POST',
            data,
            callback: (err, response) => {
                if (response.success === true) {
                    User.unsetCurrent();
                    callback(null, response);
                } else {
                    callback(response.error, null);
                    console.log(err, null);
                }
            }
        })
    }
}