import { StyleSheet } from "react-native";
import { Color } from "../../../common/util/enum";

const styles = StyleSheet.create({
    successIcon: {
        alignSelf: 'center',
        marginTop:20,
    },
    successText: {
        alignSelf: 'center',
        marginVertical: 20,
        fontSize: 20,
        fontWeight: 'bold',
        color:Color.black
    }
})

export default styles