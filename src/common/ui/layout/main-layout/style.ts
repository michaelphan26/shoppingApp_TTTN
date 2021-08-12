
import { Dimensions, Platform, StyleSheet, StatusBar } from "react-native";
import { Color } from "../../../util/enum";

const styles = StyleSheet.create({
    tabBar: {
        height: 50,
        width: '100%',
        borderTopWidth: 0.5,
        color: Color["light-gray"]
    },
    tabBarLabel: {
        fontSize: 13,
        fontWeight: 'bold',
        color: Color.black
    },
    container: {
        flex: 1,
        backgroundColor: Color.white,
        paddingTop:Platform.OS==='android' ? StatusBar.currentHeight : 0
    },
    title: {
        fontSize: Platform.OS==='android' ? Dimensions.get('window').height *5 /100 : Dimensions.get('window').height*3/100,
        fontWeight: 'bold',
        alignSelf: 'center',
        paddingVertical: 10
    },
    body: {
        flex: 1,
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
        elevation: Platform.OS === 'android' ? 5 : 0,
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
        fontSize:Platform.OS==='android' ? Dimensions.get('window').height *2.5 /100 : Dimensions.get('window').height*1.7/100,        // fontSize: Dimensions.get('window').width *6/100-6,
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
        width:Platform.OS==='android' ? Dimensions.get('window').width * 32/100 : Dimensions.get('window').width*38/100,
        borderRadius: 20,
        backgroundColor: Color.white,
        alignItems: 'center',
        justifyContent: 'center',
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 1,
            height:1
        },
        elevation: Platform.OS==='android' ? 5 :0,
        marginHorizontal: 5,
        marginVertical:7,
    },
    image: {
        width: '50%',
        height: '50%',
        marginVertical: 2,
    },
    titleTiny: {
        fontSize:Platform.OS==='android' ? Dimensions.get('window').height *2.2 /100 : Dimensions.get('window').height*1.5/100,
        // fontSize: Dimensions.get('window').width *6/100-8,
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
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 1,
            height:1
        },
        elevation: Platform.OS==='android' ? 5 :0,
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
    }

})

export default styles