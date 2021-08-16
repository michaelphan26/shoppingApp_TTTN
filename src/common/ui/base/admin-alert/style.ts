import { Dimensions, Platform, StyleSheet } from "react-native";
import { Color } from "../../../util/enum";

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        width: Dimensions.get('window').width,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor:'#00000099'
    },
    modal: {
        width: '80%',
        maxHeight:Dimensions.get('window').height * 90 /100,
        margin: 10,
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
        elevation: Platform.OS==='android' ? 5 :0,
    },
    modalTitle: {
        fontSize:Platform.OS==='android' ? Dimensions.get('window').height *3.2 /100 : Dimensions.get('window').height*2.2/100,
        fontWeight: 'bold',
        color: Color.black,
    },
    bodyContainer: {
        width: Dimensions.get('window').width*80/100,
        marginVertical: 20,
    },
    text: {
        fontSize:Platform.OS==='android' ? Dimensions.get('window').height *3.2 /100 : Dimensions.get('window').height*2.2/100,
        fontWeight: 'bold',
        color: Color.black,
        alignSelf:'flex-start'
    },
    deleteText: {
        fontSize:Platform.OS==='android' ? Dimensions.get('window').height *2.5 /100 : Dimensions.get('window').height*1.7/100,
        fontWeight: 'bold',
        color: Color.black,
        alignSelf: 'flex-start',
        marginVertical:20,
    },
    bottomContainer: {
        width: '100%',
        height:'10%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 20,
    }
})

export default styles