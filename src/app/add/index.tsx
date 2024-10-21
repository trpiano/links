import { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router'

import { Categories } from '@/components/categories'
import { Input } from '@/components/input'
import { Button } from '@/components/button'

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

    function handleAdd() {

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
                <Input placeholder='URL' autoCorrect={false} onChangeText={setUrl} />
                <Button title="Adicionar" onPress={handleAdd} disabled={isDisabled} />
            </View>
        </View>
    )
}