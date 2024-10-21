import { Image, View, TouchableOpacity, FlatList, Modal, Text } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import { Categories } from '@/components/categories'
import { Link } from '@/components/link'
import { Option } from '@/components/option'

import { colors } from '@/styles/colors'
import { styles } from './styles'

export default function Index() {
    const LogoImage = require("@/assets/logo.png")

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={{
                    uri: 'https://firebasestorage.googleapis.com/v0/b/test-9bf97.appspot.com/o/links-project%2Flogo.png?alt=media&token=6fd78ed6-22c8-4295-980f-582fbe30bfa0',
                }} style={styles.logo} />

                <TouchableOpacity activeOpacity={0.7}>
                    <MaterialIcons name="add" size={32} color={colors.green[300]} />
                </TouchableOpacity>
            </View>

            <Categories />

            <FlatList
                data={["1", "2", "3", "4"]}
                keyExtractor={(item) => item}
                renderItem={() => (
                    <Link
                        name='Rocketseat'
                        url='https://rocketseat.com.br'
                        onDetails={() => console.log("Clicou")}
                    />
                )}
                style={styles.links}
                contentContainerStyle={styles.linksContent}
                showsVerticalScrollIndicator={false}
            />

            <Modal visible={false}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalCategory}>Curso</Text>
                            <TouchableOpacity activeOpacity={0.7}>
                                <MaterialIcons name='close' size={20} color={colors.gray[400]} />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.modalLinkName}>
                            Rocketseat
                        </Text>

                        <Text style={styles.modalUrl}>
                            https://rocketseat.com.br
                        </Text>

                        <View style={styles.modalFooter}>
                            <Option name='Excluir' icon='delete' variant='secondary' />
                            <Option name='Abrir' icon='language' />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )

}