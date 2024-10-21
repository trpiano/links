import { FlatList } from 'react-native'

import { Category } from '@/components/category'

import { categories } from '@/utils/categories'

import { styles } from './styles'

export function Categories() {
    return (
        <FlatList
            style={styles.container}
            data={categories}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Category name={item.name} icon={item.icon} />}
            horizontal
            contentContainerStyle={styles.content}
            showsHorizontalScrollIndicator={false}
        />
    )
}