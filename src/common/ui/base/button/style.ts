import { Dimensions, StyleSheet } from "react-native";
import { Color } from "../../../util/enum";

const styles = StyleSheet.create({
    blueButton: {
        width: Dimensions.get("window").width * 32 / 100,
        height: Dimensions.get("window").height * 6 / 100,
        backgroundColor: Color["light-blue"],
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginVertical: 20,
        alignSelf:'center'
    },
    pinkButton: {
        width: Dimensions.get("window").width * 32 / 100,
        height: Dimensions.get("window").height * 6 / 100,
        backgroundColor: Color["pink"],
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginVertical: 20,
        alignSelf:'center'
    },
    title: {
        fontSize: Dimensions.get("window").width * 6 / 100 - 3,
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
        elevation:5
    },
    circleBlue: {
        width: '14%',
        height: '70%',
        backgroundColor: Color["light-blue"],
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        elevation:5
    }
}
)

export default styles