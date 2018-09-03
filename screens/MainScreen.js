import React, {Component} from 'react'
import { View, Platform, Text, Image} from 'react-native'
import {STATUS_BAR_HEIGHT} from '../constants'
import Expo from 'expo'
import icon from '../icons/pure-icon.png'
import KeysButtons from './components/KeysButtons'

const cacheImage = images => images.map(image => {
    if(typeof image === 'string') return Image.prefetch(image);
    return Expo.Asset.fromModule(image).downloadAsync();
})

class MainScreen extends Component {

    static navigationOptions = () => ({ 
        title: 'Capung Keys',
        headerStyle: {
            height: Platform.OS === 'android' ? 54 + STATUS_BAR_HEIGHT:54,
            backgroundColor: '#2196F3'
        },
        headerTitleStyle: {
            marginTop: Platform.OS === 'android' ? STATUS_BAR_HEIGHT:0,
            color: 'white'
        },

        headerLeft: <Image source={icon} style={styles.image} />
    })

    state = {
        appIsReady: false
    }

    componentWillMount(){
        this._loadAssetsAsync()
    }

    async _loadAssetsAsync(){
        const ImageAssets = cacheImage([icon])
        await Promise.all([...ImageAssets])
        this.setState({ appIsReady:true })
    }

    render(){
        return(
            <View style={{flex:1, backgroundColor:'#ddd'}}>
                {/* Chord Modal */}

                {/* Content */}
                <KeysButtons/>
            </View>
        )
    }
}

const styles = {
    image:{
        marginTop: 20,
        marginLeft: 10,
        width: 40,
        height: 40
    }
}

export default MainScreen;