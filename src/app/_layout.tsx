import React from 'react'
import { Stack } from 'expo-router'

import { colors } from '../styles/colors'

export default function Layout() {
    const backgroundColor = colors.gray[900]

    return <Stack screenOptions={{
        headerShown: false,
        contentStyle: {
            backgroundColor,
        }
    }}/>
}
