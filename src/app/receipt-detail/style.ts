import { Dimensions, Platform, StyleSheet } from "react-native";
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
        paddingHorizontal: 10,
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
        fontSize: Platform.OS==='android' ? Dimensions.get('window').height *5 /100 : Dimensions.get('window').height*3/100,
        fontWeight: 'bold',
        color: Color.black,
        paddingBottom:20,
    },
    detailText: {
        fontSize:Platform.OS==='android' ? Dimensions.get('window').height *2.5 /100 : Dimensions.get('window').height*1.8/100,
        fontWeight: 'bold',
        color: Color.black,
        paddingTop:5
    },
    totalText: {
        fontSize:Platform.OS==='android' ? Dimensions.get('window').height *3.2 /100 : Dimensions.get('window').height*2.2/100,
        fontWeight: 'bold',
        color: Color["light-blue"],
        position: 'absolute',
        left: 10,
        
    }
})

export default styles