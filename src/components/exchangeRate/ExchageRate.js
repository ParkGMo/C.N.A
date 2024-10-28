import React, { useEffect, useState } from "react";
import styles from "./ExchageRate.scss";

function ExchageRate() {
  const [exchangeRateList, setExchangeRateList] = useState([]);
  const handleLoad = async () => {
    const country = "kr";
    const language = "ko";
    const url = `https://real-time-finance-data.p.rapidapi.com/market-trends?trend_type=CURRENCIES&country=${country}&language=${language}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "23eeafc821msh7be001b9cf669b8p1fea80jsn801714754628",
        "x-rapidapi-host": "real-time-finance-data.p.rapidapi.com",
      },
    };
    // https://rapidapi.com/letscrape-6bRBa3QguO5/api/real-time-finance-data/playground/endpoint_4e2f5fe5-c331-4b47-b1cc-b1da5d5122bc
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setExchangeRateList(result?.data?.trends);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    handleLoad();
  }, []);
  return (
    <div className={styles.ExchangeRate}>
      <div className={styles.ExchangeRateTitle}>환율</div>
      <div className={styles.ExchangeRateBoxes}>
        {exchangeRateList?.map((item) => {
          const formSymbol = item.from_symbol;
          const fromName = item.from_currency_name;
          const toSymbol = item.to_symbol;
          const toName = item.to_currency_name;
          const update = item.last_update_utc;
          const price = item.previous_close;
          return (
            <div className={styles.ExchangeRateBox}>
              <div className={styles.ExchangeRateFromBox}>
                1 {`${formSymbol}`}
                <span className={styles.ExchangeRateName}>
                  ({`${fromName}`})
                </span>
              </div>
              <div className={styles.ExchangeRateToBox}></div>
              {`${price}`}
              {`${toSymbol}`}
              <span className={styles.ExchangeRateName}>({`${toName}`})</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ExchageRate;
