import { Dimensions, StyleSheet } from "react-native";
import { Color } from "../../../util/enum";

const styles = StyleSheet.create({
    button: {
        width: Dimensions.get("window").width * 32 / 100,
        height: Dimensions.get("window").height * 6 / 100,
        backgroundColor: Color["light-blue"],
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
    }
}
)

export default styles