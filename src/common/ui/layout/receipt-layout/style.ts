import { Dimensions, Platform, StyleSheet } from "react-native";
import { Color } from "../../../util/enum";

const styles = StyleSheet.create({
    titleTiny: {
        fontSize:Platform.OS==='android' ? Dimensions.get('window').height *2.2 /100 : Dimensions.get('window').height*1.5/100,
        // fontSize: Dimensions.get('window').width *6/100-8,
        fontWeight: 'bold',
        color:Color.black
    },
    receiptContainer: {
        flexDirection:'row',
        width: Dimensions.get('window').width * 98 / 100,
        height: Dimensions.get('window').height * 13 / 100,
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: Color.white,
        borderRadius: 10,
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 1,
            height:1
        },
        elevation: Platform.OS==='android' ? 5 :0,
        paddingHorizontal: 5,
        marginTop: 5,
        marginBottom:10
    },
    detailContainer: {
        height: '95%',
        width: '90%',
        paddingHorizontal: 5,
        justifyContent: 'center',
    },
    iconContainer: {
        height: '95%',
        width: '10%',
        alignItems:'center',
        justifyContent: 'center',
    }
})

export default styles