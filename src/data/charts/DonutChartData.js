let generatedData

export const getDonutChartData = (themes) => {
  if (generatedData) {
    generatedData.datasets[0].backgroundColor = [themes.danger, themes.info, themes.primary]
  } else {
    generatedData = {
      labels: ['North America', 'Saudi HI', 'Australia'],
      datasets: [{
        label: 'Population (millions)',
        backgroundColor: [themes.danger, themes.info, themes.primary],
        data: [234, 3333, 1233],
      }],
    }
  }
  return generatedData
}
