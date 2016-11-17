import { style, merge, select } from 'next/css'

const styles = {
  product: style({
    display: 'flex',
    width: '850px',
    height: '125px',
    border: '1px solid #F4F5F6',
    borderLeft: '5px solid #00B49D',
    marginBottom: '10px'
  }),
  icon: style({
    flex: 'none',
    width: '150px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  image: style({
    maxWidth: '110px',
    maxHeight: '70px',
  }),
  info: merge({
    flexDirection: 'column',
    flex: 1,
  }, select(' h4', {
    overflow: 'hidden',
    fontWeight: 300,
    marginBottom: 15,
  }), select(' p', {
    fontSize: '12px',
    marginBottom: 5,
  })),
  actions: style({
    flex: 'none',
    flexDirection: 'column',
    width: '150px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  button: style({
    cursor: 'pointer',
    color: 'white',
    width: '120px',
    margin: '0 10px 7px 10px',
    height: '30px',
    marginBottom: '7px',
    backgroundColor: 'transparent',
    color: '#6B8A99',
    border: '1px solid #6B8A99',
    ':hover': {
      backgroundColor: '#6B8A99',
      color: 'white',
    },
    ':hover:active': {
      color: 'rgba(255,255,255,.5)',
      backgroundColor: '6B8A99',
      borderColor: '#6B8A99',
    },
    ':focus': {
      outline: 0
    },
  }),
  primary: style({
    color: 'white',
    backgroundColor: '#00A2DF',
    border: '1px solid #00A2DF',
    ':hover': {
      backgroundColor: '#04B3F5',
      borderColor: '#00A2DF',
    },
    ':hover:active': {
      color: 'rgba(255,255,255,.5)',
      backgroundColor: '#00A2DF',
      borderColor: '#00A2DF',
    },
    ':focus': {
      outline: 0,
    },
  }),
}

export default styles
