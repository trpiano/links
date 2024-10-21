import { FlatList } from 'react-native'

import { Category } from '@/components/category'

import { categories } from '@/utils/categories'

import { styles } from './styles'

type CategoriesProps = {
    selected: string,
    onChangeSelected: (category: string) => void,
}

export function Categories({ selected, onChangeSelected }: CategoriesProps) {
    function handleSelected(selected: string, name: string){
        if(selected === name){
            onChangeSelected("")
        } else {
            onChangeSelected(name)
        }
    }

    return (
        <FlatList
            style={styles.container}
            data={categories}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) =>
                <Category
                    name={item.name}
                    icon={item.icon}
                    isSelected={item.name === selected}
                    onPress={() => handleSelected(selected, item.name)}
                />
            }
            horizontal
            contentContainerStyle={styles.content}
            showsHorizontalScrollIndicator={false}
        />
    )
}