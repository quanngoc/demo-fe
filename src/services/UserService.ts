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
        headers: console.log(authHeader());
        return axios.put(API_URL + 'user/reset-password/' + id,{}, {headers: authHeader()});
    }

    updateRole(data: any) {
        return axios.put(API_URL + 'user/update-role/' + data.id, {headers: authHeader(), data});
    }

    changePassword(data: any) {
        return axios.put(API_URL + 'user/change-password/' + data.id, data, {
            headers: authHeader()
        });
    }

    search(params: any) {
        return axios.get(API_URL + 'user',  {params, headers: authHeader()});
    }

    downloadFilePDF(id: any) {
        return axios.get(API_URL + 'user/export-pdf/' + id, {
            responseType: 'arraybuffer',
            headers: authHeader()
        })
            .then(response => {
                let blob = new Blob([response.data], {type: 'application/pdf'})
                let link = document.createElement('a')
                link.href = window.URL.createObjectURL(blob)
                link.download = 'user.pdf'
                link.click()
            })
    }

    downloadFileExcel() {
        return axios.get(API_URL + 'user/export-excel', {
            responseType: 'arraybuffer',
            headers: authHeader()
        })
            .then(response => {
                console.log(response);
                let blob = new Blob([response.data], {type: 'application/vnd.ms-excel'})
                let link = document.createElement('a')
                link.href = window.URL.createObjectURL(blob)
                link.download = 'user.xlsx'
                link.click()
            })
    }


}

export default new UserService();
