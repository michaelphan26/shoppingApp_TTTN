import { Dimensions, Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    detailContainer: {
        width:Platform.OS==='android' ? Dimensions.get('window').width * 35/100 : Dimensions.get('window').width*38/100,
        height: Platform.OS === 'android' ? Dimensions.get('window').height * 20 / 100 : Dimensions.get('window').width * 39 / 100,
        backgroundColor: 'blue',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default styles