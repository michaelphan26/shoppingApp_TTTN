import { Dimensions, Platform, StyleSheet } from "react-native";
import { Color } from "../../../common/util/enum";

const styles = StyleSheet.create({
    successIcon: {
        alignSelf: 'center',
        marginTop:20,
    },
    successText: {
        alignSelf: 'center',
        marginVertical: 20,
        fontSize:Platform.OS==='android' ? Dimensions.get('window').height *2.5 /100 : Dimensions.get('window').height*1.8/100,
        // fontSize: 20,
        fontWeight: 'bold',
        color:Color.black
    }
})

export default styles