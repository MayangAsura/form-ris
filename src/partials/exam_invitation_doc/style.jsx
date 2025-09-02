import { StyleSheet } from "@react-pdf/renderer";


export const styles = StyleSheet.create({
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
      image: {
        display: 'flex',
        flexDirection: 'row',
        gap: '2px',
        width: '20%', // Example: image takes full width of its parent View
        height: 'auto', // Maintain aspect ratio
        marginBottom: 10, // Add some spacing below the image
        alignItems: 'start',
      },
      brand: {
        display: 'flex',
        flex: '1',
        justifyContent: 'start',
        alignItems: 'start',
        // flexDirection: 'wrap',
        width: '80%', // Example: image takes full width of its parent View
        height: '80%', // Maintain aspect ratio
        marginBottom: 10, // Add some spacing below the image
      },
      brandName: {
        // fontFamily: "Calligrapher",
      },
      profile: {
        width: '30%'
      },
      heading: {
        display: 'flex',
        flex: 'none',
        fontColor: '#00008B',
        // fontFamily: "Calligrapher",
        // flexDirection: 'wrap',
        width: '80%', // Example: image takes full width of its parent View
        height: 'auto', // Maintain aspect ratio
        marginBottom: 10, // Add some spacing below the image
      },
      headingTitle: {
        display: 'flex',
        flex: 'none',
        fontColor: '#00008B',
        // fontFamily: "Calligrapher",
        // flexDirection: 'wrap',
        width: '80%', // Example: image takes full width of its parent View
        height: 'auto', // Maintain aspect ratio
        marginBottom: 10, // Add some spacing below the image
      },
      title: {
        display: 'flex',
        fontColor: '00008B',
        fontSize: '300px',
        fontFamily: 'Helvetica-Bold'
      },
      subheading: {
        display: 'flex',
        flex: 'none',
        fontColor: '#00008B',
        // fontFamily: "Calligrapher",
        // justifyContent
        alignItems: 'center',
        // flexDirection: 'wrap',
        width: '80%', // Example: image takes full width of its parent View
        height: 'auto', // Maintain aspect ratio
        marginBottom: 10, // Add some spacing below the image
      },
      subheading: {
        display: 'flex',
        flex: 'none',
        fontColor: '#00008B',
        // fontFamily: "Calligrapher",
        // justifyContent
        alignItems: 'center',
        // flexDirection: 'wrap',
        width: '80%', // Example: image takes full width of its parent View
        height: 'auto', // Maintain aspect ratio
        marginBottom: 10, // Add some spacing below the image
      },

      heading2: {
        display: 'flex',
        flex: '1',                                                                                                                                                                                                                                                                                                                                                                                                                                     
        flexDirection: 'row',
        marginRight: '10px',
        fontColor: '#5f83f6',
        width: '80%', // Example: image takes full width of its parent View
        height: 'auto', // Maintain aspect ratio
        marginBottom: 10, // Add some spacing below the image
      },
      th: {
        margin: '3px 0 0 3px',
      },
      td: {
        padding: '3px 0',
        // fontSize: '10px'
      },
      spaceX: {
        display: "flex",
        flexDirection: "row",
        gap: "1px",
        marginTop: "2px"
      },
    })