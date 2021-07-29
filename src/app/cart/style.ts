import { StyleSheet } from "react-native";
import { Color } from "../../common/util/enum";

const styles = StyleSheet.create({
    productContainer: {
        width: '100%',
        height: '55%',
    },
    scrollView: {
        flex: 1,
      paddingTop:5  
    },
    detailContainer: {
        width: '100%',
        height: '35%',
        justifyContent: 'center',
        paddingHorizontal: 5,
        borderTopWidth: 1,
        borderColor:Color["light-gray"]
    },
    buttonContainer: {
        flexDirection:'row',
        width: '98%',
        height: '10%',
        justifyContent: 'flex-end',
        paddingHorizontal:20,
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor:Color["light-gray"]
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: Color.black,
        paddingBottom:20,
    },
    detailText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Color.black,
        paddingTop:5
    },
    totalText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Color["light-blue"],
        position: 'absolute',
        left: 10,
        
    }
})

export default styles