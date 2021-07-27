import { Dimensions, StyleSheet } from "react-native";
import { Color } from "../../../util/enum";

const styles = StyleSheet.create({
    largeText: {
        fontSize: Dimensions.get('window').width * 6 / 100 - 4,
        fontWeight: 'bold',
        color: Color["light-blue"],
        alignSelf:'center'
    },
    smallText: {
        fontSize: Dimensions.get('window').width * 6 / 100 - 6,
        fontWeight: 'bold',
        color: Color["light-blue"],
        alignSelf:'center'
    }
    
})

export default styles