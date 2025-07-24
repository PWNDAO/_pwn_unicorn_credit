<template>
    <Dialog>
        <DialogTrigger>
            <!-- TODO show currently selected token + arrow down-->
            Select Token
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Select a token</DialogTitle>
                <DialogDescription>

                </DialogDescription>


                <div>
                    Show available
                </div>

                <div>
                    <div v-for="token in userTokens.tokens" :key="token.address" @select="handleSelect(token)">
                        <div>
                            {{ token.name }}
                        </div>
                    </div>
                </div>

            </DialogHeader>
        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'

const emit = defineEmits<{
    (e: 'select', token: string): void
}>()

const handleSelect = (token: string) => {
    emit('select', token)
}

const userTokens = useUserTokens()
</script>
