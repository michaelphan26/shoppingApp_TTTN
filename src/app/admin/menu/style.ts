import { Dimensions, Platform, StyleSheet } from "react-native";
import { Color } from "../../../common/util/enum";

const styles = StyleSheet.create({
    detailContainer: {
        width:Platform.OS==='android' ? Dimensions.get('window').width * 35/100 : Dimensions.get('window').width*38/100,
        height: Platform.OS === 'android' ? Dimensions.get('window').height * 20 / 100 : Dimensions.get('window').width * 39 / 100,
        backgroundColor: Color.white,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 1,
            height:1
        },
        elevation: Platform.OS==='android' ? 5 :0,
    },
    title: {
        fontSize:Platform.OS==='android' ? Dimensions.get('window').height *2.5 /100 : Dimensions.get('window').height*1.7/100,
        fontWeight: 'bold',
        marginBottom: 10,
        color:Color.black
    },
    countBlue: {
        fontSize: Platform.OS==='android' ? Dimensions.get('window').height *5 /100 : Dimensions.get('window').height*3/100,
        fontWeight: 'bold',
        color:Color["light-blue"]
    },
    countPink: {
        fontSize: Platform.OS==='android' ? Dimensions.get('window').height *5 /100 : Dimensions.get('window').height*3/100,
        fontWeight: 'bold',
        color:Color.pink
    }
})

export default styles