import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    color: "#262626",
    fontFamily: "Helvetica",
    fontSize: "12px",
    padding: "30px 40px",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
  },
  textBold: {
    fontFamily: "Helvetica-Bold",
  },
  brandName: {
    fontFamily: "Calligrapher"
  },
  spaceY: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  flex: {
    display: "flex",
    direction: "row",
    gap: "2px",
    justifyContent: "center",
    alignItems: "center"
  },
  flex1: {
    display: "flex",
    flex: 1,
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
    border: "0",
    // borderColor: "1px solid #f3f4f6",
    margin: "0 0",
  },
  tableHeader: {
    backgroundColor: "#e5e5e5",
  },
  td: {
    padding: 6,
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