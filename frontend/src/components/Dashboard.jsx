import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import "/src/dashboard.css";

function Dashboard() {
  const [cryptoData, setCryptoData] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [graphData, setGraphData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [yAxisRange, setYAxisRange] = useState({ min: 0, max: 0 });
  const [portfolioBalance, setPortfolioBalance] = useState(0); // State for portfolio balance
  const [isBalanceVisible, setIsBalanceVisible] = useState(true); // State to toggle balance visibility

  useEffect(() => {
    fetchCryptoData();
    fetchPortfolioBalance(); // Fetch balance data on component mount
  }, []);

  useEffect(() => {
    if (selectedCoin) {
      updateGraphData(selectedCoin);
    }
  }, [selectedCoin]);

  const fetchCryptoData = async () => {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&sparkline=true"
    );
    const data = await response.json();
    setCryptoData(data.slice(0, 15)); // First 15 coins
    const defaultCoin = data[0];
    setSelectedCoin(defaultCoin); // Set the default selected coin
    const sparkline = defaultCoin?.sparkline_in_7d?.price || generateMockData();
    const last48Hours = sparkline.slice(-48); // Last 48 hours
    setGraphData(last48Hours);
    setLabels(last48Hours.map((_, i) => `${46 - i}h ago`).reverse()); // Reverse labels for x-axis
    setYAxisRange({
      min: Math.min(...last48Hours),
      max: Math.max(...last48Hours),
    }); // Update y-axis range
  };

  const fetchPortfolioBalance = async () => {
    try {
      // Replace with your API endpoint
      const response = await fetch("https://api.example.com/portfolio-balance");
      const data = await response.json();
      setPortfolioBalance(data.balance); // Assuming the API response has a `balance` field
    } catch (error) {
      console.error("Error fetching portfolio balance:", error);
    }
  };

  const generateMockData = () => {
    return Array.from({ length: 168 }, () => Math.random() * 100); // Generate random fallback data
  };

  const updateGraphData = (coin) => {
    const sparkline = coin.sparkline_in_7d?.price || generateMockData();
    const last48Hours = sparkline.slice(-48); // Last 48 hours
    setGraphData(last48Hours);

    // Generate labels with an interval of 6 hours
    const allLabels = last48Hours.map((_, i) => `${48 - i}h`);
    const intervalLabels = allLabels.map((label, index) =>
      index % 5 === 0 ? label : ""
    );

    setLabels(intervalLabels);
    setYAxisRange({
      min: Math.min(...last48Hours),
      max: Math.max(...last48Hours),
    }); // Update y-axis range
  };

  const getChartOptions = () => ({
    tooltip: {
      trigger: "axis",
      formatter: "{b0}: {c0}", // Just display the value without currency
    },
    xAxis: {
      type: "category",
      data: labels,
      axisLabel: {
        rotate: 45,
        formatter: (value) => value,
      },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
    },
    yAxis: {
      type: "value",
      min: yAxisRange.min, // Dynamic minimum value
      max: yAxisRange.max, // Dynamic maximum value
      axisLabel: {
        show: false, // Hide the y-axis labels
      },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
    },
    series: [
      {
        name: selectedCoin?.name || "Crypto Price",
        type: "line",
        data: graphData,
        smooth: true,
        animationEasing: "cubicInOut", // Smooth transition effect
        lineStyle: {
          color: "#16C784",
          width: 2,
        },
        itemStyle: {
          color: "#16C784",
        },
        areaStyle: {
          color: "rgba(22, 199, 132, 0.2)",
        },
      },
    ],
    title: {
      text: `${selectedCoin?.name || "Crypto"} Price Chart`,
      left: "center",
    },
    animationDuration: 700,
    animationDurationUpdate: 700,
  });

  const handleCoinChange = (event) => {
    const coinId = event.target.value;
    const coin = cryptoData.find((c) => c.id === coinId);
    setSelectedCoin(coin);
  };

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  return (
    <div className="app">
        <div className="plane">
          <div className="grid"></div>
          <div className="glow"></div>
        </div>
        <div className="plane">
          <div className="grid"></div>
          <div className="glow"></div>
        </div>
      <div className="portfolio">
        <div className="portfolio-word">
            <h2>Balance total</h2>
            <button className="toggle-button" onClick={toggleBalanceVisibility}>
            {isBalanceVisible ? "▼" : "▲"}
            </button>
        </div>
        <div className="portfolio-balance">
          {isBalanceVisible && (
            <h3>${portfolioBalance.toLocaleString()}</h3>
          )} {/* Dynamic balance */}
        </div>
      </div>

      <div className="graph-container">
        <div className="dropdown">
          <label htmlFor="coin-select">Select Coin: </label>
          <select id="coin-select" onChange={handleCoinChange}>
            {cryptoData.map((coin) => (
              <option key={coin.id} value={coin.id}>
                {coin.name}
              </option>
            ))}
          </select>
        </div>
        <ReactECharts
          option={getChartOptions()}
          style={{ height: "300px", width: "100%" }}
        />
      </div>

      <div className="watchlist">
        {cryptoData.map((coin) => (
          <div key={coin.id} className="coin">
            <div className="coin-details">
              <img src={coin.image} alt={coin.name} />
              <p className="coin-name">{coin.name}</p>
            </div>
            <div className="info">
              <div className="coin-prices">
                <h1 className="coin-nameUSD">
                  ${coin.current_price.toLocaleString()}
                </h1>
                <p className="coin-nameKES">
                  KES {(coin.current_price * 113).toLocaleString()}
                </p>
              </div>

              <div
                className={`status ${
                  coin.price_change_percentage_24h > 0 ? "pump" : "dump"
                }`}
              >
                {coin.price_change_percentage_24h > 0
                  ? `+${coin.price_change_percentage_24h.toFixed(2)}%`
                  : `${coin.price_change_percentage_24h.toFixed(2)}%`}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;

