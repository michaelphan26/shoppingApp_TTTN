import { Dimensions, Platform, StyleSheet } from "react-native";
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
        fontSize:Platform.OS==='android' ? Dimensions.get('window').height *3.2 /100 : Dimensions.get('window').height*2.2/100,
        fontWeight: 'bold',
        color: Color.black,
        paddingVertical:2,
    },
    detailContainer: {
        justifyContent:'center'
    },
    textName: {
        fontSize:Platform.OS==='android' ? Dimensions.get('window').height *4.5 /100 : Dimensions.get('window').height*3.5/100,
        //Maybe 24-25
        fontWeight: 'bold',
        color: Color.black,
        marginBottom: 20,
        alignSelf:'center'
    },
    body: {
        width: '100%',
        height: '89%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottom: {
        flexDirection:'row',
        width: '100%',
        height: '11%',
      justifyContent:'space-around'
    },
})
export default styles