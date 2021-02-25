/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {
    static url = '';

    /**
     * Запрашивает с сервера список данных.
     * Это могут быть счета или доходы/расходы
     * (в зависимости от того, что наследуется от Entity)
     * */
    static list(data, callback = f => f) {
        if (data) {
            createRequest({
                url: this.url,
                method: 'GET',
                data,
                callback
            });
        }
    }

    /**
     * Создаёт счёт или доход/расход с помощью запроса
     * на сервер. (в зависимости от того,
     * что наследуется от Entity)
     * */
    static create(data, callback = f => f) {
        createRequest({
            url: this.url,
            method: 'POST',
            data: Object.assign({ _method: "PUT" }, data),
            callback
        });
    }


    /**
     * Получает информацию о счёте или доходе/расходе
     * (в зависимости от того, что наследуется от Entity)
     * */
    static get(id = '', data, callback = f => f) {
        createRequest({
            url: `${this.url}/${id}`,
            method: 'GET',
            data,
            id,
            callback
        });
    }

    /**
     * Удаляет информацию о счёте или доходе/расходе
     * (в зависимости от того, что наследуется от Entity)
     * */
    static remove(id = '', data, callback = f => f) {
        createRequest({
            url: this.url,
            method: 'POST',
            data: Object.assign({ _method: "DELETE", id }, data),
            callback
        });
    }
}