export const styleCard = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 327,
  bgcolor: '#fff',
  boxShadow: 24,
  borderRadius: 2,
  display: 'flex',
  flexDirection: 'column',
  '&:focus-visible': {
    outline: 'none'
  }
}

export const createCard = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start'
}

export const editHeaderStyle = {
  justifyContent: 'flex-end',
  background: '#0074ce',
  padding: '0 13px',
  alignItems: 'center',
  height: '44px',
}

export const viewPaymentWrapper = {
  display: 'flex',
  height: '100%',
  padding: '21px',
  flexDirection: 'column',
  justifyContent: 'space-between',
}