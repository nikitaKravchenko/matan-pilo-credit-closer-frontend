export const loanListStylesMobile = (isTrash) => (record) => {
  if (isTrash) {
    return {
      borderLeftColor: 'rgb(0 148 239)',
      borderLeftWidth: 5,
      borderLeftStyle: 'solid',
    }
  }

  if (record.status === 'Active') {
    return {
      borderLeftColor: '#4caf50',
      borderLeftWidth: 5,
      borderLeftStyle: 'solid',
    };
  }
  if (record.status === 'Closed') {
    return {
      borderLeftColor: '#f44336',
      borderLeftWidth: 5,
      borderLeftStyle: 'solid',
    };
  }
}