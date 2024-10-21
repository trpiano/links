import { Image, View, TouchableOpacity, FlatList, Modal, Text, Alert, Linking } from 'react-native'
import { useState, useCallback } from 'react'
import { router, useFocusEffect } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'

import { Categories } from '@/components/categories'
import { Link } from '@/components/link'
import { Option } from '@/components/option'

import { LinkStorageProps, linkStorage } from '@/storage/link-storage'
import { colors } from '@/styles/colors'

import { styles } from './styles'

export default function Index() {
    const [showModal, setShowModal] = useState(false)
    const [link, setLink] = useState<LinkStorageProps>({} as LinkStorageProps)
    const [links, setLinks] = useState<LinkStorageProps[]>([])
    const [category, setCategory] = useState("")

    async function getLinks() {
        try {
            const response = await linkStorage.getLinks()

            if (category.trim().length > 0) {
                const filtered = response.filter((link) => link.category === category)

                setLinks(filtered)
            } else {
                setLinks(response)
            }

        } catch (error) {
            Alert.alert("Erro", "Nao foi possível listar os links")
        }
    }

    function handleDetails(selected: LinkStorageProps) {
        setShowModal(true)
        setLink(selected)
    }

    async function linkToRemove() {
        try {
            await linkStorage.removeLink(link.id)
            await getLinks()
            setShowModal(false)
        } catch (error) {
            console.log(error)
            Alert.alert("Erro", "Nao foi possível excluir o link")
        }
    }

    async function handleRemove() {
        try {
            Alert.alert("Excluir", "Deseja realmente excluir?", [
                { text: "Nao", style: "cancel"},
                { text: "Sim", onPress: linkToRemove}
            ])
        } catch (error) {
            console.log(error)
            Alert.alert("Erro", "Nao foi possível excluir o link")
        }
    }

    async function handleOpen(){
        try{
            await Linking.openURL(link.url)
            setShowModal(false)
        } catch (error) {
            console.log(error)
            Alert.alert("Erro", "Nao foi possível abrir o link")
        }
    }

    useFocusEffect(
        useCallback(() => {
            getLinks()
        }, [category])
    )

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={{
                    uri: 'https://firebasestorage.googleapis.com/v0/b/test-9bf97.appspot.com/o/links-project%2Flogo.png?alt=media&token=6fd78ed6-22c8-4295-980f-582fbe30bfa0',
                }} style={styles.logo} />

                <TouchableOpacity activeOpacity={0.7} onPress={() => router.navigate("/add")}>
                    <MaterialIcons name="add" size={32} color={colors.green[300]} />
                </TouchableOpacity>
            </View>

            <Categories selected={category} onChangeSelected={setCategory} />

            <FlatList
                data={links}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Link
                        name={item.name}
                        url={item.url}
                        onDetails={() => handleDetails(item)}
                    />
                )}
                style={styles.links}
                contentContainerStyle={styles.linksContent}
                showsVerticalScrollIndicator={false}
            />

            <Modal transparent animationType='slide' visible={showModal}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalCategory}>{link.category}</Text>
                            <TouchableOpacity activeOpacity={0.7} onPress={() => setShowModal(false)}>
                                <MaterialIcons name='close' size={20} color={colors.gray[400]} />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.modalLinkName}>{link.name}</Text>
                        <Text style={styles.modalUrl}>{link.url}</Text>

                        <View style={styles.modalFooter}>
                            <Option name='Excluir' icon='delete' variant='secondary' onPress={handleRemove}/>
                            <Option name='Abrir' icon='language' onPress={handleOpen} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )

}