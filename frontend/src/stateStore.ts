import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface MouseState {
    isDefault: boolean
    mouseenter: () => void
    mouseleave: () => void
}

export const useMouseStore = create<MouseState>()(
    devtools(
        persist(
        (set) => ({
            isDefault: true,
            mouseenter: () => set((state) => ({isDefault: false})),
            mouseleave: () => set((state) => ({isDefault: true})),
        }),
        {name: 'mouse-type',}
        )
    )
)



interface NotesState {
    unlockedGlobally: boolean
    unlock: () => void
    lock: () => void
}

export const useNotesStore = create<NotesState>()(
    devtools(
        persist(
        (set) => ({
            unlockedGlobally: false,
            unlock: () => set((state) => ({unlockedGlobally: true})),
            lock: () => set((state) => ({unlockedGlobally: false})),
        }),
        {name: 'notes-unlock-state-type',}
        )
    )
)


interface StorageState {
    size: number
    setsize: (setTo: number) => void
}

export const useStorageStore = create<StorageState>()(
    devtools(
        persist(
        (set) => ({
            size: 0,
            setsize: (setTo) => set((state) => ({ size: setTo })),
        }),
        {name: 'disk-size-type',}
        )
    )
)



interface NotesSizeState {
    size: number
    setsize: (setTo: number) => void
}

export const useNotesSizeStore = create<NotesSizeState>()(
    devtools(
        persist(
        (set) => ({
            size: 0,
            setsize: (setTo) => set((state) => ({ size: setTo })),
        }),
        {name: 'notes-size-type',}
        )
    )
)