import settings from "../settings";

const getHistoday = (startDate, endDate, symbol) => {
    return fetch(`${settings}/histoday?startDate=${startDate}&endDate=${endDate}&symbol=${symbol}`);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getHistoday: getHistoday
}
