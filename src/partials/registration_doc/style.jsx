import { StyleSheet } from "@react-pdf/renderer";


export const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    color: "#262626",
    fontFamily: "Helvetica",
    fontSize: "10px",
    padding: "30px 40px",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 10,
    borderBottom: "1px solid #000",

    // borderBottomWidth: "double"
  
  },
  title: {
    // display: "flex",
    fontSize: 24,
    justifyContent: "center",
    alignItems: "center"
  },
  textBold: {
    fontFamily: "Helvetica-Bold",
  },
  FontFace: {
    fontFamily: "Calligrapher",
    // src: url(calln.ttf)
  },
  brandName: {
    fontFamily: "Calligrapher",
  },
  spaceY: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    marginTop: "5px"
  },
  flex: {
    display: "flex",
    direction: "row",
    // gap: "2px",
    // justifyContent: "center",
    alignItems: "center"
  },
  flex1: {
    display: "flex",
    flex: 1,
    width: '50%'
    // alignItems: "center"
    // gap: "2px",
  },
  flexNone: {
    // display: "flex",
    flex: "none",
    alignItems: "center"
    // gap: "2px",
  },
  number: {
    display: 'flex',
  },
  heading: {
    // marginBottom: 10,
  },
  table: {
    width: "100%",
    tableLayout: 'auto',
    border: "0",
    // borderColor: "1px solid #f3f4f6",
    margin: "0 0",
  },
  tableHeader: {
    backgroundColor: "#e5e5e5",
  },
  td: {
    padding: '3px 0',
    // fontSize: '10px'
  },
  totals: {
    display: "flex",
    alignItems: "flex-end",
  },
  address: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
  },
  textCenter: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
  },
  footer: {
    margin: "20px 0"
  },
  separator: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    margin: "20px 0 20px 0",
    content: '',
    // flex: 1,
    borderBottom: '1px solid #000',
    opacity: '0.5'
  },
  borderT: {
    display: "flex",
    flexGrow: "1",
    alignItems: "center",
    textAlign: "center",
    margin: "20px 0 20px 0",
    borderTop: '1px solid #000',
    opacity: '1'
  }
//   separator::after: {
//     content: '',
//     flex: 1,
//     borderBottom: '1px solid #076d0c',
//     opacity: '0.5'
//   },
//   separator:not(:empty)::after: {
//     marginLeft: .3em
//     }

});