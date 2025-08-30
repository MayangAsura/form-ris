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
        // flexDirection: 'wrap',
        width: '80%', // Example: image takes full width of its parent View
        height: 'auto', // Maintain aspect ratio
        marginBottom: 10, // Add some spacing below the image
      },
      heading: {
        display: 'flex',
        flex: 'none',
        // flexDirection: 'wrap',
        width: '80%', // Example: image takes full width of its parent View
        height: 'auto', // Maintain aspect ratio
        marginBottom: 10, // Add some spacing below the image
      },
      spaceY: {
        display: "flex",
        flexDirection: "column",
        gap: "2px",
        marginTop: "8px"
      },
    })