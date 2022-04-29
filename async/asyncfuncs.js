import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (e) {
        console.log(error)
    }
}

const getData = async (key) => {

    try {
        const value = await AsyncStorage.getItem(key)
        if (value !== null) {
            value = JSON.parse(value)
            console.log('Promise', value)
            return value
        }
    } catch (e) {
        // error reading value
    }
}

export { storeData, getData };