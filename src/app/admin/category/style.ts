import { Dimensions, Platform, StyleSheet } from "react-native";
import { Color } from "../../../common/util/enum";

const styles = StyleSheet.create({
    searchContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent:'space-around',
        flexDirection: 'row',
    },
    listContainer: {
        flex: 1,
        width: '100%'
    },
    text: {
        fontSize:Platform.OS==='android' ? Dimensions.get('window').height *3.2 /100 : Dimensions.get('window').height*2.2/100,
        fontWeight: 'bold',
        color: Color.black,
        alignSelf:'flex-start'
    },
    pickerContainer: {
        width: Dimensions.get('window').width * 75 /100,
        height: Dimensions.get('window').width * 10 /100,
        borderRadius: 20,
        backgroundColor: Color.white,
        paddingHorizontal: 10,
        alignItems: 'center',
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 1,
            height:1
        },
        elevation: Platform.OS==='android' ? 5 :0,
        marginVertical: 20,
    },
    picker: {
        width: '100%',
        height: '100%',
        color: '#000000',
    },
    inputAndroid: {
        fontSize: Platform.OS === 'android' ? Dimensions.get('window').height * 2.5 / 100 : Dimensions.get('window').height * 1.8 / 100,
        width: '100%',
        height:'100%',
        color: '#000000',
        fontWeight: 'bold',
        paddingHorizontal:50,
    },
    inputIOS: {
        width: '100%',
        height:'100%',
        color: '#000000',
        paddingHorizontal: 10,
        fontWeight:'bold'
    },
    image: {
        width: Dimensions.get('window').height * 40 / 100,
        height:Dimensions.get('window').height * 40 / 100,
        alignSelf:'center'
    }
})

export default styles