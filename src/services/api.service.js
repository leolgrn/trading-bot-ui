import settings from "../settings";

const handleRequest = async res => {
    if(res.status === 200){
        return res.json();
    } else {
        throw await res.json();
    }
}

const apiService = {
    histoData: (startDate, endDate, symbol, unit) => {
        return fetch(`${settings.apiURL}/histo-data/${unit}?startDate=${startDate}&endDate=${endDate}&symbol=${symbol}`)
            .then(handleRequest);
    },
    calcul: (startDate, endDate, symbol, type, unit, periods) => {
        return fetch(`${settings.apiURL}/calcul/moving-average`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                startDate: startDate,
                endDate: endDate,
                symbol: symbol,
                type: type,
                unit: unit,
                periods: periods
            })
        }).then(handleRequest);
    },
    backtest: (startDate, endDate, symbol, type, unit, periods) => {
        return fetch(`${settings.apiURL}/backtest/moving-average`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                startDate: startDate,
                endDate: endDate,
                symbol: symbol,
                type: type,
                unit: unit,
                periods: periods
            })
        }).then(handleRequest)
    }
}

export default apiService;
