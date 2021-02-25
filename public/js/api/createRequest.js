/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.withCredentials = true;

    if (options.method == 'GET') {
        url = options.url + "?";
        for (let key in options.data)
            url += key + "=" + options.data[key] + "&";
        url = url.slice(0, -1);
        xhr.open(options.method, url);
        xhr.send();

    } else {
        formData = new FormData;
        url = options.url;
        for (let key in options.data)
            formData.append(key, options.data[key]);
        xhr.open(options.method, url);
        xhr.send(formData);

    }


    xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            options.callback(null, xhr.response);
        } else if (xhr.readyState == 4 && xhr.status != 200) {
            let err = xhr.status;
            options.callback(err, null);
        }
        return xhr;
    });
};