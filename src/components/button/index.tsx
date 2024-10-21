import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

import { colors } from '@/styles/colors'

import { styles } from './styles'

type ButtonProps = TouchableOpacityProps & {
    title: string,
    disabled?: boolean
}

export function Button({ title, disabled, ...rest }: ButtonProps) {
    const backgroundColor = disabled ? colors.gray[400] : colors.green[300]

    return (
        <TouchableOpacity
            disabled={disabled}
            activeOpacity={0.7}
            style={[styles.container, { backgroundColor }]} {...rest}
        >
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    )
} 