import { useState } from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router'

import { Categories } from '@/components/categories'
import { Input } from '@/components/input'
import { Button } from '@/components/button'

import { linkStorage } from '@/storage/link-storage'
import { colors } from '@/styles/colors'

import { styles } from './styles'

export default function Add() {
    const [name, setName] = useState("")
    const [url, setUrl] = useState("")
    const [category, setCategory] = useState("")

    const isNameValid = name.trim().length > 0;
    const isUrlValid = url.trim().length > 0;
    const isCategoryValid = category.trim().length > 0;

    const isDisabled = !(isNameValid && isUrlValid && isCategoryValid);

    async function handleAdd() {
        try {
            await linkStorage.saveLink({
                id: new Date().getTime().toString(),
                name,
                url,
                category,
            })

            router.back()
        } catch (error) {
            console.log(error)
            return Alert.alert("Erro", "Nao foi possível adicionar o link")
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <MaterialIcons name='arrow-back' size={32} color={colors.gray[200]} />
                </TouchableOpacity>

                <Text style={styles.title}>Novo</Text>
            </View>

            <Text style={styles.label}>Selecione uma categoria</Text>
            <Categories selected={category} onChangeSelected={setCategory} />

            <View style={styles.form}>
                <Input placeholder='Name' autoCorrect={false} onChangeText={setName} />
                <Input placeholder='URL' autoCorrect={false} autoCapitalize="none" onChangeText={setUrl} />
                <Button title="Adicionar" onPress={handleAdd} disabled={isDisabled} />
            </View>
        </View>
    )
}