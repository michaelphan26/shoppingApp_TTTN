import { StyleSheet } from "react-native";
import { Color } from "../../common/util/enum";

const styles = StyleSheet.create({
    scrollView: {
        width: '100%',
        height:'100%',
        paddingHorizontal:10
    },
    image: {
        width: 200,
        height: 200,
        marginTop: 10,
        marginBottom: 20,
        alignSelf:'center'
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Color.black,
        paddingVertical:2,
    },
    detailContainer: {
        justifyContent:'center'
    },
    textName: {
        fontSize: 30,
        fontWeight: 'bold',
        color: Color.black,
        marginBottom: 20,
        alignSelf:'center'
    }
})
export default styles