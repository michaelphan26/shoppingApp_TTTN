import { StyleSheet, Dimensions } from "react-native"
import { Color } from "../../../util/enum"

const styles = StyleSheet.create({
    productContainer: {
        flexDirection: 'column',
        width: Dimensions.get('window').width * 98 / 100,
        height: Dimensions.get('window').height * 15 / 100,
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: Color.white,
        borderRadius: 10,
        shadowRadius: 20,
        shadowOpacity: 5,
        elevation: 5,
        paddingHorizontal: 5,
        marginTop: 5,
        marginBottom: 10
    },
    imageRound: {
        width: '20%',
        height: '90%',
        borderRadius:Dimensions.get('window').height * 10 / 100,
    },
    titleTiny: {
        fontSize: Dimensions.get('window').width *6/100-8,
        fontWeight: 'bold',
        color:Color.black
    },
    detailContainer: {
        height: '95%',
        width: '60%',
        paddingHorizontal: 5,
        justifyContent:'center'
    },
    buttonContainer: {
        flexDirection:'row',
        width: '20%',
        height: '90%',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    detailWrapper: {
        flexDirection: 'row',
        width: Dimensions.get('window').width * 98 / 100,
        height: Dimensions.get('window').height * 10 / 100,
        alignItems: 'center',
    },
    quantityWrapper: {
        flexDirection: 'row',
        width: Dimensions.get('window').width * 96 / 100,
        height: Dimensions.get('window').height * 5 / 100,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderColor:Color["light-gray"]
    },
    increaseButton: {
        width: 20,
        height: 20,
        backgroundColor: Color["light-blue"],
        borderRadius: 5,
        elevation: 2,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems:'center'
    },
    decreaseButton: {
        width: 20,
        height: 20,
        backgroundColor: Color["pink"],
        borderRadius: 5,
        elevation: 2,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems:'center'
    },
    quantityText: {
        fontSize: 16,
        fontWeight: 'bold',
        color:Color.black
    }
})

export default styles