import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const HomeLayout = () => {
    return (
        <>
            <Stack>
                <Stack.Screen name='index' options={{ headerShown: false }} />
                <Stack.Screen name='userDetails'  />

            </Stack>
            <StatusBar />
        </>
    )
}

export default HomeLayout