import { Dimensions, StyleSheet } from "react-native";
import { Color } from "../../../util/enum";

const styles = StyleSheet.create({
    largeContainer: {
        width: Dimensions.get('window').width * 95 / 100,
        height: Dimensions.get("window").height * 99 / 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Color.white,
        borderRadius: 20,
        shadowOpacity: 1,
        shadowRadius:5,
        elevation:5
    },
    smallContainer: {
        width: Dimensions.get('window').width * 95 / 100,
        height: Dimensions.get("window").height * 70 / 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Color.white,
        borderRadius: 20,
        shadowOpacity: 1,
        shadowRadius:5,
        elevation:5
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: Color.black,
        marginVertical:20,
    },
})

export default styles