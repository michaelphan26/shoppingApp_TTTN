import { Dimensions, Platform, StyleSheet } from "react-native";
import { Color } from "../../../common/util/enum";

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width*78/100,
        backgroundColor: Color.white,
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 1,
            height:1
        },
        elevation: Platform.OS === 'android' ? 5 : 0,
        marginVertical: 10,
        marginHorizontal:2,
    }
})

export default styles