import { Dimensions, Platform, StyleSheet } from "react-native";
import { Color } from "../../../util/enum";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:Color.white
    },
    largeContainer: {
        width: Dimensions.get('window').width * 95 / 100,
        height: Dimensions.get("window").height * 93 / 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Color.white,
        borderRadius: 20,
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 1,
            height:1
        },
        elevation: Platform.OS==='android' ? 5 :0,
    },
    smallContainer: {
        width: Dimensions.get('window').width * 95 / 100,
        height: Dimensions.get("window").height * 70 / 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Color.white,
        borderRadius: 20,
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 1,
            height:1
        },
        elevation: Platform.OS==='android' ? 5 :0,
    },
    title: {
        fontSize: Platform.OS==='android' ? Dimensions.get('window').height *5 /100 : Dimensions.get('window').height*3/100,
        //Maybe 26
        fontWeight: 'bold',
        color: Color.black,
        marginVertical:20,
    },
})

export default styles