import { Dimensions, Platform, StyleSheet } from "react-native";
import { Color } from "../../../util/enum";

const styles = StyleSheet.create({
    blueButton: {
        width: Platform.OS==='android' ? Dimensions.get('window').width *32 /100 : Dimensions.get('window').width*35/100,
        height: Dimensions.get("window").height * 6 / 100,
        backgroundColor: Color["light-blue"],
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Platform.OS==='android' ? 20 : 25,
        marginVertical: 20,
        alignSelf:'center'
    },
    pinkButton: {
        width: Platform.OS==='android' ? Dimensions.get('window').width *32 /100 : Dimensions.get('window').width*35/100,
        height: Dimensions.get("window").height * 6 / 100,
        backgroundColor: Color["pink"],
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Platform.OS==='android' ? 20 : 25,
        marginVertical: 20,
        alignSelf:'center'
    },
    title: {
        fontSize:Platform.OS==='android' ? Dimensions.get('window').height *2.5 /100 : Dimensions.get('window').height*1.8/100,
        // fontSize: Dimensions.get("window").height * 6 / 100 - 3,
        fontWeight: 'bold',
        color:Color.white
    },
    circlePink: {
        width: '14%',
        height: '70%',
        backgroundColor: Color.pink,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        elevation: Platform.OS === 'android' ? 5 : 0,
    },
    circleBlue: {
        width: '14%',
        height: '70%',
        backgroundColor: Color["light-blue"],
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        elevation: Platform.OS === 'android' ? 5 : 0,
    }
}
)

export default styles