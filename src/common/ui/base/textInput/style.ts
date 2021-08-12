import { Dimensions, Platform, StyleSheet } from "react-native";
import { Color } from "../../../util/enum";

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        width: Dimensions.get('window').width * 75 /100,
        height: Dimensions.get('window').width * 10 /100,
        borderRadius: 20,
        backgroundColor: Color.white,
        paddingHorizontal: 10,
        alignItems: 'center',
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 1,
            height:1
        },
        elevation: Platform.OS==='android' ? 5 :0,
        marginVertical:20,
    },
    normalInput: {
        width: '85%',
        height: '100%',
        paddingHorizontal: 5,
        fontSize: Platform.OS === 'android' ? Dimensions.get('window').height * 2.5 / 100 : Dimensions.get('window').height * 1.8 / 100,
        // fontSize: 16,
        fontWeight: 'bold',
        color:Color.black
    },
    passwordInput: {
        width: '80%',
        height: '100%',
        paddingHorizontal: 5,
        fontSize: Platform.OS === 'android' ? Dimensions.get('window').height * 2.5 / 100 : Dimensions.get('window').height * 1.8 / 100,
        // fontSize: 16,
        fontWeight: 'bold',
    },
    eyeContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
    }
})

export default styles