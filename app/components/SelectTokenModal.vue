<template>
    <Dialog v-model:open="isOpen">
        <DialogTrigger>
            <!-- TODO show currently selected token + arrow down-->
             <Button v-if="!value?.address" type="button">
                Select Token
             </Button>
             <Button v-else variant="outline" type="button">
                {{ value?.name }}
             </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Select a token</DialogTitle>
                <DialogDescription>

                </DialogDescription>


                <div>
                    Show available
                </div>

                <div v-if="userTokens?.length">
                    <AssetRow v-for="token in userTokens" :key="token.address" :asset="token" @click="handleSelect(token)" />
                </div>

            </DialogHeader>
        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
import type { UserAsset } from '~/classes/Asset';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { useField } from 'vee-validate';

interface Props {
    fieldName: string
}
const props = defineProps<Props>()

const isOpen = ref(false)

const { setValue, value } = useField<UserAsset>(props.fieldName)

setInterval(() => {
    console.log('value', value.value)
}, 1000)

const handleSelect = (token: UserAsset) => {
    console.log('handleSelect', token)
    setValue(token)
    isOpen.value = false
}

const userTokensQuery = useUserTokens()
const userTokens = computed(() => userTokensQuery.tokens.value ?? [])
</script>
