import { Text, Image, View } from 'react-native'

import { styles } from './styles'

export default function Index(){
    return (
        <View  style={styles.container}>
            <View style={styles.header}>
                <Image source={require("../../assets/logo.png")} style={styles.logo}/>
            </View>
        </View>
    )
    
}