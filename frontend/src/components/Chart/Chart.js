import React, { useEffect, useState } from "react";
import "./Chart.css";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

// Register required components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const Chart = ({ sentimentApiUrl, apiUrl }) => {
  const [sentimentData, setSentimentData] = useState({
    alertName: "",
    positive: 0,
    negative: 0,
    neutral: 0,
  });

  const [mentionsData, setMentionsData] = useState([]);

  // Fetch sentiment data
  useEffect(() => {
    const fetchSentimentData = async () => {
      try {
        const response = await fetch(sentimentApiUrl);
        if (!response.ok) throw new Error("Failed to fetch sentiment data");
        const data = await response.json();

        const alertName = data.alert_data?.alert_name || "";
        const sentiments = data.alert_data?.insights?.value || {
          positive: 0,
          negative: 0,
          neutral: 0,
        };

        setSentimentData({
          alertName,
          positive: sentiments.positive,
          negative: sentiments.negative,
          neutral: sentiments.neutral,
        });
      } catch (error) {
        console.error("Error fetching sentiment data:", error);
      }
    };

    fetchSentimentData();
  }, [sentimentApiUrl]);

  // Fetch mentions data
  useEffect(() => {
    const fetchMentionsData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch mentions data");
        const data = await response.json();

        // Log the response to verify the structure
        console.log("Mentions API Response:", data);

        // Extract the desired fields from mentions
        const mentions = data.alert_data?.mentions?.map((mention) => ({
          url: mention.url,
          snippet: mention.snippet,
          authorName: mention.author?.name || "Unknown",
          authorAvatar: mention.author?.avatar || "",
          reach: mention.reach || ""
        })) || [];

        setMentionsData(mentions);
      } catch (error) {
        console.error("Error fetching mentions data:", error);
      }
    };

    fetchMentionsData();
  }, [apiUrl]);

  const doughnutChartData = {
    labels: ["Positive", "Negative", "Neutral"],
    datasets: [
      {
        label: "Total Posts",
        data: [sentimentData.positive, sentimentData.negative, sentimentData.neutral],
        backgroundColor: ["#0e918c", "#bb2205", "#d2d2d2"],
        borderColor: ["#0e918c", "#bb2205", "#d2d2d2"],
        borderWidth: 1,
      },
    ],
  };

  const doughnutChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        align: "center",
        maxWidth: "300px",
        labels: {
          color: "#333",
          font: "'Inter Tight', sans-serif;",
          useBorderRadius: true,
          boxWidth: 10,
          usePointStyle: true,
        },
      },
    },
    layout: {
      padding: 10,
    }
  };

  return (
    <div className="chart-container">
      <div className="chart-row">
        <div className="chart-box-sentiment">
          <h3 id="chart-title">Sentiment Analysis</h3>
          <div className="chart-content">
            <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
          </div>
        </div>

        <div className="chart-box-country">
          <h3 id="chart-title">Viral Post</h3>
          <div className="chart-content">
            {mentionsData.length > 0 ? (
              mentionsData.map((mention, index) => (
                <div key={index} className="mention-item">
                  <div className="mention-avatar">
                    {mention.authorAvatar && (
                      <img
                        src={mention.authorAvatar}
                        alt={`${mention.authorName}'s avatar`}
                        className="avatar-image"
                      />
                    )}
                  </div>
                  <div className="mention-text">
                    <p>
                      <strong>{mention.authorName}</strong> Reach: {mention.reach}
                    </p>
                    <a href={mention.url} target="_blank" rel="noopener noreferrer" className="viral-link">
                      <p>{mention.snippet}</p>
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;