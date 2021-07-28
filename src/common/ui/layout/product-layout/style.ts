import { StyleSheet } from "react-native";
import { Color } from "../../../util/enum";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor:Color.white
    },
    header: {
        flexDirection:'row',
        width: '100%',
        height: '8%',
        justifyContent: 'center',
        alignItems:'center'
    },
    headerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    body: {
        width: '100%',
        height: '82%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottom: {
        flexDirection:'row',
        width: '100%',
        height: '10%',
      justifyContent:'space-around'
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: Color.black,
    },
    backButton: {
        position: 'absolute',
        alignSelf: 'flex-start',
        left:10
    },
    bottomContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent:'space-evenly'
    },
    
})

export default styles