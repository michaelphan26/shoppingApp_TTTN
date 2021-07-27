import { StyleSheet } from "react-native";
import { Color } from "../../../util/enum";

const styles = StyleSheet.create({
    tabBar: {
        height: 50,
        width: '100%',
        borderTopWidth: 0.5,
        color:Color["light-gray"]
    },
    tabBarLabel: {
        fontSize:13,
        fontWeight: 'bold',
      color:Color.black
    },
    container: {
        flex: 1,
        backgroundColor:Color.white
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'center',
        paddingVertical: 10
    },
    body: {
        flex:1
    }
})

export default styles