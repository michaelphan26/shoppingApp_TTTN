import { Dimensions, StyleSheet } from "react-native";
import { Color } from "../../common/util/enum";

const styles = StyleSheet.create({
    boxContainer: {
        flexDirection:'row',
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    scrollView: {
        flex: 1,
        paddingTop:5
    },
    rowContainer: {
        width: Dimensions.get('window').width * 98 / 100,
        height: Dimensions.get('window').height * 25 / 100,
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: Color.white,
        borderRadius: 10,
        shadowRadius: 20,
        shadowOpacity: 5,
        elevation: 5,
        marginTop: 5,
        marginBottom:10,
    },
    titleContainer: {
        height: '20%',
        width: '95%',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: Color["medium-gray"]
    },
    titleSmall: {
        fontSize: Dimensions.get('window').width *6/100-6,
        fontWeight: 'bold',
        color:Color.black
    },
    bodyContainer: {
        height: '80%',
        width:'100%',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    itemContainer: {
        height: '90%',
        width:Dimensions.get('window').width * 32/100,
        borderRadius: 20,
        backgroundColor: Color.white,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        shadowRadius: 20,
        shadowOpacity: 1,
        marginHorizontal: 5,
        marginVertical:7,
    },
    image: {
        width: '50%',
        height: '50%',
        marginVertical: 2,
    },
    titleTiny: {
        fontSize: Dimensions.get('window').width *6/100-8,
        fontWeight: 'bold',
        color:Color.black
    },
    productContainer: {
        flexDirection:'row',
        width: Dimensions.get('window').width * 98 / 100,
        height: Dimensions.get('window').height * 10 / 100,
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: Color.white,
        borderRadius: 10,
        shadowRadius: 20,
        shadowOpacity: 5,
        elevation: 5,
        paddingHorizontal: 5,
        marginTop: 5,
        marginBottom:10
    },
    imageRound: {
        width: '20%',
        height: '90%',
        borderRadius:Dimensions.get('window').height * 10 / 100,
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
    badge: {
        position: 'absolute',
        right: -6,
        top: -3,
        height: 13,
        width: 13,
        borderRadius: 10,
        backgroundColor: Color.pink,
        alignItems: 'center',
        justifyContent:'center'
    },
    badgeText: {
        fontSize: 10,
        fontWeight: 'bold',
        color:Color.white
    }
})
 
export default styles;