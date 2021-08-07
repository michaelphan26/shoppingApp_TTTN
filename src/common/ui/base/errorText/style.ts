import { Dimensions, Platform, StyleSheet } from "react-native";
import { Color } from "../../../util/enum";

const styles = StyleSheet.create({
    largeText: {
        fontSize:Platform.OS==='android' ? Dimensions.get('window').height *3.2 /100 : Dimensions.get('window').height*2.2/100,
        // fontSize: Dimensions.get('window').width * 6 / 100 - 4,
        fontWeight: 'bold',
        color: Color.pink,
        alignSelf:'center'
    },
    smallText: {
        fontSize: Platform.OS === 'android' ? Dimensions.get('window').height * 2.5 / 100 : Dimensions.get('window').height * 1.8 / 100,
        // fontSize: Dimensions.get('window').width * 6 / 100 - 6,
        fontWeight: 'bold',
        color: Color.pink,
        alignSelf:'center'
    }
    
})

export default styles