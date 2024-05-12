import { makeStyles } from '@material-ui/core/styles';
import "../../font.css"
export default makeStyles(() => ({
  typography:{
    fontFamily:'headings ,sans-serif',
    margin:"5px "
    
  },
  rating:{
    display:"flex",
    alignItems:"center",
    justifyContent:"space-between",
    marginTop:"5px",
  },
  paper: {
    padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '120px',
  },
  mapContainer: {
    height: '85vh', width: '100%',
  },
  markerContainer: {
    position: 'absolute', transform: 'translate(-50%, -50%)', zIndex: 1, '&:hover': { zIndex: 2 },
  },
  pointer: {
    cursor: 'pointer',
    borderRadius:"5px"
  },
}));