import { alpha, makeStyles } from "@material-ui/core/styles";
import "../../font.css";

export default makeStyles((theme) => ({
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    // borderRadius: theme.shape.borderRadius,

    marginRight: theme.spacing(2),
    borderRadius:'50%',

    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    top: 0,
    left: 140,
    color: "#353535",
    zIndex: 100,
    // backgroundColor:'#000',
    // borderRadius:"50%"
  },
  inputRoot: {
    "& .MuiInputBase-input": {
      fontFamily: "headings",
      border: "none",

      backgroundColor: "#f5f4f2",
      '&::placeholder': {
        color: '#000', // Set the color for the placeholder text here
      },
    },
  },
  
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: { width: "20ch" },
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
}));
