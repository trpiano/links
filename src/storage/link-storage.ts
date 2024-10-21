import AsyncStorage from '@react-native-async-storage/async-storage'

const LINKS_STORAGE_KEY= "links-storage"

export type LinkStorageProps = {
    id: string,
    name: string,
    url: string,
    category: string,
}

async function getLinks(): Promise<LinkStorageProps[]> {
    const storage = await AsyncStorage.getItem(LINKS_STORAGE_KEY)
    const response = storage ? JSON.parse(storage) : []

    return response
}

async function saveLink(link: LinkStorageProps) {
    try{
        const storage = await getLinks()
        const updatedLinks = JSON.stringify([...storage, link])

        await AsyncStorage.setItem(LINKS_STORAGE_KEY, updatedLinks)
    } catch (error) {
        throw error
    }
}

async function removeLink(id: string){
    try{
        const storage = await getLinks()

        const updated = JSON.stringify(storage.filter(link => link.id !== id))

        await AsyncStorage.setItem(LINKS_STORAGE_KEY, updated)
    } catch (error) {
        throw error
    }
}

export const linkStorage = { getLinks, saveLink, removeLink}