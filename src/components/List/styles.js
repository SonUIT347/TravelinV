import { makeStyles } from '@material-ui/core/styles';
import "../../font.css"

export default makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1), minWidth: 120, marginBottom: '30px',
    fontFamily: "Merriweather Sans",
  },
  inputText : {
    fontFamily: "Merriweather Sans",
  },
  selectText : {
    fontFamily: "Merriweather Sans",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  loading: {
    height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center',
  },
  headerText: {
    fontFamily:'headings ,sans-serif',
  },

  container: {
    padding: '25px',
    fontFamily:'headings ,sans-serif',
  },
  marginBottom: {
    marginBottom: '30px',
  },
  list: {
    height: '75vh', overflow: 'auto',
  },
}));