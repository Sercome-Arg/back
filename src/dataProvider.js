import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';
import auth from './authProvider';

const httpClient = (url, options = {}) => {

  options.headers = new Headers()

  options.headers.set('Content-Type', 'application/json');
  options.headers.set('Authorization', localStorage.getItem('session_token'));
  options.headers.set('session', localStorage.getItem('session_id'));
  return fetchUtils.fetchJson(url, options);
}

const apiUrl = process.env.REACT_APP_BASE_URL

export default {

  getList: (resource, params) => {

    let project = {}
    
    let match = {
      operationType : { $ne: "D" },
    }

    let sort = { name: 1, creationDate: -1, }
    let group = {}
    let limit = params.pagination.perPage
    let skip = 0

    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
        sort: JSON.stringify([field, order]),
        range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
        filter: JSON.stringify(params.filter),
    };
    const url = apiUrl + '/' + resource + `?project=${JSON.stringify(project)}&match=${JSON.stringify(match)}&sort=${JSON.stringify(sort)}&group=${JSON.stringify(group)}&limit=${limit}&skip=${skip}`;

    return httpClient(url).then(response => {

      let result = response.json.result

      result.map(item => {
        if(item.id === undefined) {
          item.id = item._id
        } else {
          item.idMeli = item.id
          item.id = item._id
        }
        if(resource === 'subscription') {
          item.start = new Date(item.start)
          item.end = new Date(item.end)
        }
      })

      return {
        data: result,
        total: response.json.result.length
      }
    })
  },

  getOne: (resource, params) => {
    return httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => {

      let data = json.result
      data.id = json.result._id

      return {
        data: data,
      }
    })
  },

    getMany: (resource, params) => {

      let project = {}

      let match = {
        _id: {
          $oid: params.ids[0]
        }
      }

      let sort = {}
      let group = {}
      let limit = 0
      let skip = 0

      const query = {
        filter: JSON.stringify({ id: params.ids }),
      };
      const url = `${apiUrl}/${resource}`;
      return httpClient(url).then((response) => {

        let result = []

        response.json.result.map(item => {
          item.id = item._id
          result.push(item)
        })

        return {
          data: result
        }
      });
    },

    getManyReference: (resource, params) => {

      const { page, perPage } = params.pagination;
      const { field, order } = params.sort;
      const query = {
        sort: JSON.stringify([field, order]),
        range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
        filter: JSON.stringify({
          ...params.filter,
          [params.target]: params.id,
        }),
      };
      const url = `${apiUrl}/${resource}?${stringify(query)}`;

      return httpClient(url).then(({ headers, json }) => ({
        data: json,
        total: parseInt(headers.get('content-range').split('/').pop(), 10),
      }));
    },

    update: (resource, params) => {
      return httpClient(`${apiUrl}/${resource}/${params.id}`, {
        method: 'PUT',
        body: JSON.stringify(params.data),
      }).then(({ json }) => {
        let data = json.result
        data.id = json.result._id
        return {
          data: data
        }
      })
    }
        ,

    updateMany: (resource, params) => {
      const query = {
        filter: JSON.stringify({ id: params.ids}),
      };
      return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
        method: 'PUT',
        body: JSON.stringify(params.data),
      }).then(({ json }) => ({ data: json }));
    },

    create: (resource, params) =>
      httpClient(`${apiUrl}/${resource}`, {
        method: 'POST',
        body: JSON.stringify(params.data),
      }).then(({ json }) => ({
        data: { ...params.data, id: json.id },
      })),

  delete: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: 'DELETE',
    }).then(({ json }) => ({ data: json })),

  deleteMany: async (resource, params) => {

    let permissions = await auth.getPermissions();

    const query = {
      filter: JSON.stringify({ id: params.ids}),
    };

    params.ids.map(id => {

      httpClient(`${apiUrl}/${resource}/${id}`, {
        method: 'DELETE',
      }) 

    })

    return httpClient(`${apiUrl}/${resource}/${params.ids[0]}`, {
      method: 'DELETE',
    }).then(({ json }) => ({ data: json }));

  },
};