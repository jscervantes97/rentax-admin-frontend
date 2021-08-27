import axios from "axios";

const vuexLocal = window.localStorage.getItem("housesin");
const headers = {
  Authorization: ""
};
if (vuexLocal) {
  const data = JSON.parse(vuexLocal);
  if (data.token) {
    headers.Authorization = `Bearer ${data.token}`;
  }
}

// let url = "http://127.0.0.1:5000/api"
let url = "http://rentaxadmin.esoft.com.mx:45201/api"

const client = axios.create({
    baseURL: url,
    headers
  });

client.interceptors.response.use(response => {
return response;
});

export default client;
