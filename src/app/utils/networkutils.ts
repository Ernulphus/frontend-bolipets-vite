import { SessionData } from "@auth0/nextjs-auth0/types";
import axios from "axios";

const methods: { [key: string]: string } = {
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',

  FORM: 'form',

  GET: 'get',
  POST: 'post',
  PUT: 'put',

};

const epGroups: { [key: string]: string } = {
  PETS: 'Pets',
  USERS: 'Users',
};

const BACKEND_URL = (process.env.NEXT_PUBLIC_URL_PRE || 'http://127.0.0.1:8000');

function getURL(group:string, method:string, queryObj?:object | null) {
  if (!BACKEND_URL) throw new Error('No base URL');
  if (!Object.values(epGroups).includes(group)) throw new Error('Endpoint group not found');
  if (!Object.values(methods).includes(method)) throw new Error('Invalid method');
  const queryString = queryObj ? queryObjToString(queryObj) : ''

  const url = `${BACKEND_URL}/${group}/${method}${queryString}`
  return url;

};

function queryObjToString(queryObj:object | null) {
  if (!queryObj) return '';
  let queryString = '?'
  Object.entries(queryObj).forEach((key, value) => {
    queryString += key + '=' + value.toString() + '&'
  });
  return queryString;
}


const petsCreateURL = getURL(epGroups.PETS, methods.CREATE);
const petsCreate = (formData: FormData) => {
  return new Promise((resolve, reject) => {
    axios.post(petsCreateURL, formData, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(resolve)
    .catch(reject);
  });
};

const petsRead = (session: SessionData | null) => {
  return new Promise((resolve, reject) => {
    axios.get(getURL(epGroups.PETS, methods.READ, session))
    .then(({ data }) => resolve(data))
    .catch(reject);
  });
};

const petsForm = () => {
  return new Promise((resolve, reject) => {
    axios.get(getURL(epGroups.PETS, methods.FORM))
    .then(({ data }) => resolve(data))
    .catch(reject);
  })
};

const petsDelete = (_id: string) => {
  return new Promise((resolve, reject) => {
    axios.delete(`${epGroups.PETS}/${_id}`)
      .then(resolve)
      .catch(reject);
  })
}


export {
  epGroups,
  getURL,
  methods,

  petsCreate,
  petsRead,
  petsForm,
  petsDelete,
}