import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"

import { colors } from "@/styles/colors"

import { styles } from './styles'

type LinkProps = {
    name: string,
    url: string,
    onDetails: () => void
}

export function Link({ name, url, onDetails }: LinkProps){
    return(
        <View style={styles.container}>
            <View style={styles.details}>
                <Text style={styles.name} numberOfLines={1}>{name}</Text>
                <Text style={styles.url} numberOfLines={1}>{url}</Text>
            </View>

            <TouchableOpacity onPress={onDetails}>
                <MaterialIcons name="more-horiz" size={20}  color={colors.gray[400]} />
            </TouchableOpacity>
        </View>
    )
}