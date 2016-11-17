import { style } from 'next/css'

const styles = {
  search: style({
    display: 'flex',
    width: '100%',
    height: '40px',
    marginBottom: '10px',
    fontSize: '14px'
  }),
  input: style({
    width: '100%',
    height: '100%',
    border: 'none',
    marginBottom: '10px',
    padding: '0 12px 0 12px',
    borderLeft: '2px solid #CACBCC',
    borderRight: '2px solid #CACBCC',
    backgroundColor: '#F4F5F6',
    ':focus': {
      outline: 0
    },
  }),
}

export default styles
