import { makeStyles } from "@material-ui/core/styles";
import "../../font.css";

export default makeStyles(() => ({
cardContainer:{
  backgroundColor:"#fff",
  padding:"13px",
  borderRadius:"20px"
},
cardImage:{
  borderRadius:"15px"
  

},
  buttonGroup :{ display:"flex", justifyContent:"space-between"},
  chip: {
    margin: "5px 5px 5px 0",
    padding:"15px 7px" ,
    fontFamily: "Merriweather Sans",
    backgroundColor:"#f5f4f2",
  },
  subtitle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "10px",
    fontFamily: "Merriweather Sans",
  },
  spacing: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontFamily: "Merriweather Sans",
  },
  headerText: {
    fontFamily: "headings ,sans-serif",
  },
  normalText: {
    fontFamily: "Merriweather Sans",
    // color: "#d1835a",

  },
  reviewText: {
    fontFamily: "Merriweather Sans",
    color: "#d1835a",

  },
  titleText: {
    fontFamily: "Merriweather Sans",
    // color: "#d1835a",
    fontWeight:"600",
  },
  buttonText: {
    fontFamily: "Merriweather Sans",
    color: "#d1835a",

  },
  buttonGoTo: {
    fontFamily: "headings ,sans-serif",
    color: "#353535",
    backgroundColor:"#f1bc68",
    borderRadius:"30px",
    padding:"10px 25px",
    

  },
  iconRating: {
    color: "#f1bc68",
  },
  iconImg : {
fontSize:"30px",
color:"#d1835a"  ,
marginRight:"10px",

  }
}));
