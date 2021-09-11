import { Dimensions, Platform, StyleSheet } from "react-native";
import { Color } from "../../../common/util/enum";

const styles = StyleSheet.create({
    pickerContainer: {
        width: '100%',
        height:'11%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    titleTiny: {
        fontSize:Platform.OS==='android' ? Dimensions.get('window').height *2.2 /100 : Dimensions.get('window').height*1.5/100,
        // fontSize: Dimensions.get('window').width *6/100-8,
        fontWeight: 'bold',
        color:Color.black
    },
    chartContainer: {
        width: '100%',
        height: '67%',
        alignItems: 'center',
        justifyContent:'center'
    }
})

export default styles