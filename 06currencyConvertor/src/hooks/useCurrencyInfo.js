import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`);
                const currencyData = await response.json();
                setData(currencyData[currency]);
            } catch (error) {
                console.error("Error fetching currency data:", error);
            }
        };

        fetchData();
    }, [currency]);

    // This console.log will not display the updated data immediately after setData
    // since setState is asynchronous. It will log the previous state.
    console.log(data);

    return data;
}

export default useCurrencyInfo;
