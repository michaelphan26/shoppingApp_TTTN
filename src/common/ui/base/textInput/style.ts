import { Dimensions, StyleSheet } from "react-native";
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
        shadowOpacity: 1,
        elevation: 5,
        marginVertical:20,
    },
    normalInput: {
        width: '85%',
        height: '100%',
        paddingHorizontal: 5,
        fontSize: 16,
        fontWeight:'bold'
    },
    passwordInput: {
        width: '80%',
        height: '100%',
        paddingHorizontal: 5,
        fontSize: 16,
        fontWeight: 'bold',
    },
    eyeContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
    }
})

export default styles