export const getPieChartData = (themes) => ({
  labels: ['Laying', 'Sitting', 'Standing'],
  datasets: [{
    label: 'Population (millions)',
    backgroundColor: [themes.primary, themes.warning, themes.danger],
    data: [2480, 5555, 734],
  }],
})
