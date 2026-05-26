(() => {
  if (typeof Chart === "undefined") return;

  const defaultGrid = "rgba(148, 163, 184, 0.18)";
  const defaultText = "#cbd5e1";

  const sharedOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: defaultText,
          font: { family: "'Inter', sans-serif", size: 12, weight: "500" },
          padding: 20,
          usePointStyle: true,
          pointStyle: "circle"
        }
      },
      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.95)",
        borderColor: "rgba(59, 130, 246, 0.45)",
        borderWidth: 1.5,
        titleColor: "#f1f5f9",
        titleFont: { family: "'Inter', sans-serif", size: 13, weight: "600" },
        bodyColor: "#cbd5e1",
        bodyFont: { family: "'Inter', sans-serif", size: 12 },
        padding: 12,
        cornerRadius: 8,
        usePointStyle: true,
        boxWidth: 8,
        boxHeight: 8,
        boxPadding: 4,
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y + ' (Indexed)';
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: defaultText,
          font: { family: "'Inter', sans-serif", size: 11 }
        },
        grid: { color: defaultGrid }
      },
      y: {
        ticks: {
          color: defaultText,
          font: { family: "'Inter', sans-serif", size: 11 }
        },
        grid: { color: defaultGrid }
      }
    },
    interaction: {
      mode: "index",
      intersect: false
    }
  };

  const aiGrowthCtx = document.getElementById("aiGrowthChart");
  if (aiGrowthCtx) {
    const ctx = aiGrowthCtx.getContext("2d");
    
    // Create stunning linear gradients for glowing area fills beneath the curves
    const gradientAI = ctx.createLinearGradient(0, 0, 0, 300);
    gradientAI.addColorStop(0, "rgba(59, 130, 246, 0.45)");
    gradientAI.addColorStop(0.5, "rgba(59, 130, 246, 0.15)");
    gradientAI.addColorStop(1, "rgba(59, 130, 246, 0.00)");

    const gradientSP = ctx.createLinearGradient(0, 0, 0, 300);
    gradientSP.addColorStop(0, "rgba(6, 182, 212, 0.35)");
    gradientSP.addColorStop(0.5, "rgba(6, 182, 212, 0.10)");
    gradientSP.addColorStop(1, "rgba(6, 182, 212, 0.00)");

    new Chart(aiGrowthCtx, {
      type: "line",
      data: {
        labels: ["2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025"],
        datasets: [
          {
            label: "AI Megacap Basket (NVIDIA, MSFT, GOOGL, META, AMZN)",
            data: [100, 138, 215, 298, 185, 342, 564, 752],
            borderColor: "#3b82f6",
            borderWidth: 3.5,
            backgroundColor: gradientAI,
            tension: 0.32,
            fill: true,
            pointRadius: 4,
            pointHoverRadius: 7,
            pointBackgroundColor: "#3b82f6",
            pointHoverBackgroundColor: "#f1f5f9",
            pointHoverBorderColor: "#3b82f6",
            pointHoverBorderWidth: 3
          },
          {
            label: "S&P 500 (Indexed)",
            data: [100, 129, 150, 190, 154, 191, 237, 275],
            borderColor: "#06b6d4",
            borderWidth: 2.5,
            backgroundColor: gradientSP,
            tension: 0.32,
            fill: true,
            pointRadius: 4,
            pointHoverRadius: 6,
            pointBackgroundColor: "#06b6d4",
            pointHoverBackgroundColor: "#f1f5f9",
            pointHoverBorderColor: "#06b6d4",
            pointHoverBorderWidth: 3
          }
        ]
      },
      options: sharedOptions
    });
  }

  const volatilityCtx = document.getElementById("volatilityChart");
  if (volatilityCtx) {
    new Chart(volatilityCtx, {
      type: "bar",
      data: {
        labels: ["Low Volatility", "Moderate", "High", "Shock Event"],
        datasets: [
          {
            label: "Human-Dominant Trading",
            data: [22, 34, 18, 9],
            backgroundColor: "rgba(148, 163, 184, 0.6)",
            borderColor: "#94a3b8",
            borderWidth: 1
          },
          {
            label: "AI-Dominant Trading",
            data: [15, 31, 33, 21],
            backgroundColor: "rgba(59, 130, 246, 0.65)",
            borderColor: "#3b82f6",
            borderWidth: 1
          }
        ]
      },
      options: sharedOptions
    });
  }
})();
