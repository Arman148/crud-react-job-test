class Functional {
    constructor() {
        console.log('at functional consturctor');
    }

    getUrl() {
        return this.url;
    }

    getEndpoint() {
        return this.endpoint;
    }

    setUrl(newUrl) {
        return this.url = newUrl;
    }

    setEndpoint(newEndpoint) {
        return this.endpoint = newEndpoint;
    }

    getFetch(url) {
        return fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                return data;
            })
            .catch(error => {
                console.log('error: ', error);
                return [];
            })
    }

    postFetch(url, data) {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .catch(error => {
                console.log('error: ', error);
                return null;
            })
    }

    putFetch(url, data) {
        return fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .catch(error => {
                console.log('error: ', error);
                return null
            })
    }

    deleteFetch(url) {
        return fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => console.log('deleted'))
            .catch(error => {
                console.log('error: ', error);
                return false;
            })
    }
}

class AnnouncementsApi extends Functional {
    constructor(params) {
        super();
        const { url, endpoint } = params;
        this.url = url;
        this.endpoint = endpoint;
        this.fullUrl = `${this.url}${this.endpoint}`;
    }

    getList(callback) {
        return this.getFetch(this.fullUrl);
    }

    getByID(id) {
        return this.getFetch(`${this.fullUrl}/${id}`);
    }

    create(title, publicationDate, lastUpdate, categories) {
        const data = {
            title,
            publicationDate,
            lastUpdate,
            categories
        };

        return this.postFetch(this.fullUrl, data);
        this.getList();
    }

    update(id, title, publicationDate, lastUpdate, categories) {
        const data = {
            title,
            publicationDate,
            lastUpdate,
            categories
        };

        return this.putFetch(`${this.fullUrl}/${id}`, data);
        this.getList();
    }

    delete(id) {
        return this.deleteFetch(`${this.fullUrl}/${id}`);
        this.getList();
    }


}

console.log("test for api");

class API {
    constructor({ url }) {
        console.log('at API constructor')
        this.announcements = new AnnouncementsApi({
            url,
            endpoint: 'announcements'
        });
    }
}

const api = new API({
    url: 'https://68c6f26d442c663bd02864f8.mockapi.io/'
})

console.log("created api");

export default api;