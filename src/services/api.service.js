import settings from "../settings";

const apiService = {
    getHistoday: (startDate, endDate, symbol) => {
        return fetch(`${settings.apiURL}/histoday?startDate=${startDate}&endDate=${endDate}&symbol=${symbol}`);
    }
}

export default apiService;
