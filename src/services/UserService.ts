import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/';

class UserService {

    getUser(id: any) {
        return axios.get(API_URL + 'user/' + id, {headers: authHeader()});
    }

    getAdminBoard() {
        return axios.get(API_URL + 'user', {headers: authHeader()});
    }

    resetPassword(id: any) {
        return axios.put(API_URL + 'user/reset-password/' + id,{}, {headers: authHeader()});
    }

    updateRole(data: any) {
        console.log(data);
        return axios.put(API_URL + 'user/update-role/' + data.id, data, {headers: authHeader()});
    }

    changePassword(data: any) {
        return axios.put(API_URL + 'user/change-password/' + data.id, data, {
            headers: authHeader()
        });
    }

    search(params: any) {
        return axios.get(API_URL + 'user',  {params, headers: authHeader()});
    }

    downloadFilePDF(id: any, username: any) {
        return axios.get(API_URL + 'user/export-pdf/' + id, {
            responseType: 'arraybuffer',
            headers: authHeader()
        })
            .then(response => {
                let blob = new Blob([response.data], {type: 'application/pdf'})
                let link = document.createElement('a')
                link.href = window.URL.createObjectURL(blob)
                link.download = username + '.pdf'
                link.click()
            })
    }

    downloadFileExcel() {
        return axios.get(API_URL + 'user/export-excel', {
            responseType: 'arraybuffer',
            headers: authHeader()
        })
            .then(response => {
                var formatted_date = new Date().toJSON().slice(0,10).replace(/-/g,'-');
                let blob = new Blob([response.data], {type: 'application/vnd.ms-excel'})
                let link = document.createElement('a')
                link.href = window.URL.createObjectURL(blob)
                link.download = "all-user-" + formatted_date + '.xlsx'
                link.click()
            })
    }


}

export default new UserService();
