<template>
    <div class="bg-neutral-900 p-6 rounded-lg max-w-2xl mx-auto">
        <form class="flex flex-col gap-y-4" @submit="onSubmit">

            <div class="border-2 p-3 rounded-lg border-neutral-700">
                <label class="text-neutral-400">I want to lend</label>
                <div class="flex justify-between gap-2">
                    <FormField v-slot="{ componentField }" name="amount">
                        <FormItem class="w-full">
                            <FormControl>
                                <Input :class="inputsCssClasses" placeholder="0" v-bind="componentField" />
                            </FormControl>

                            <FormDescription>
                                {{ creditPrice }}
                            </FormDescription>

                            <FormMessage v-if="hasAttemptedSubmit" />
                        </FormItem>
                    </FormField>

                    <FormField name="token">
                        <FormItem>
                            <FormControl>
                                <SelectTokenModal field-name="token" />
                            </FormControl>

                            <FormMessage v-if="hasAttemptedSubmit" />
                        </FormItem>
                    </FormField>
                </div>
            </div>

            <FormField v-slot="{ componentField }" name="collateral">
                <FormItem class="border-2 p-3 rounded-lg border-neutral-700">
                    <FormLabel class="text-neutral-400">Collateral required to accept</FormLabel>

                    <FormControl>
                        <div class="flex gap-x-2">
                            <div v-if="!creditTokenValue">---</div>
                            <div v-else>{{ creditTokenValue.symbol }}</div>
                            <span>/</span>
                            <div v-if="!creditTokenValue">---</div>
                            <SelectTokenModal v-else field-name="collateral" />
                        </div>
                    </FormControl>

                    <FormMessage v-if="hasAttemptedSubmit" />
                </FormItem>
            </FormField>
            
            <FormField v-slot="{ componentField }" name="interest">
                <FormItem class="border-2 p-3 rounded-lg border-neutral-700">
                    <FormLabel class="text-neutral-400">I want to earn (%)</FormLabel>

                    <FormControl>
                        <Input :class="inputsCssClasses" placeholder="0" v-bind="componentField" />
                    </FormControl>

                    <FormMessage v-if="hasAttemptedSubmit" />
                </FormItem>
            </FormField>

            <div class="border-2 p-3 rounded-lg border-neutral-700 flex flex-col gap-y-2">
                <div class="flex justify-between">
                    <span class="text-neutral-400">Lending to Collateral Ratio</span>
                    <span>65%</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-neutral-400">Loan Duration</span>
                    <span>30 days</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-neutral-400">Estimated Gas Fee</span>
                    <span>~ $0.05</span>
                </div>
            </div>

            <pre>{{ values }}</pre>

            <Button type="submit" class="mt-4">
                {{ submitButtonText }}
            </Button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { useFieldValue, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { LpPair, UserAsset } from '~/classes/Asset'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { cn } from '~/lib/utils'

const hasAttemptedSubmit = ref(false)

const formSchema = toTypedSchema(z.object({
  amount: z.preprocess((val) => {
    if (typeof val === "string") {
        const trimmed = val.trim();
        if (trimmed === "") {
            return undefined
        }; // allow empty strings to fail validation
        const num = Number(trimmed);
        return isNaN(num) ? undefined : num;
      }
      return val;
    }, z.number().gt(0)),
  token: z.instanceof(UserAsset),
  interest: z.preprocess((val) => {
    if (typeof val === "string") {
        const trimmed = val.trim();
        if (trimmed === "") {
            return undefined
        }; // allow empty strings to fail validation
        const num = Number(trimmed);
        return isNaN(num) ? undefined : num;
      }
      return val;
    }, z.number().gt(0)),
    // TODO add validation for collateral
    collateral: z.instanceof(LpPair)
}))

const { handleSubmit, isSubmitting, validate, values } = useForm({
  validationSchema: formSchema,
  // TODO it's possible to specify default value using .default directly on the zod schema
  //  instead of needing to specify it here in initialValues
  initialValues: {
    amount: '',
    token: undefined,
    interest: '',
    collateral: new LpPair(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
    )
  },
})

const onSubmit = async () => {
    hasAttemptedSubmit.value = true

    const { valid } = await validate()

    if (!valid) {
        // TODO display error messages
        return
    }

    handleSubmit((values) => {
        console.log('Form submitted!', values)
    })
}

const submitButtonText = computed(() => {
  return isSubmitting.value ? 'Submitting...' : 'Submit'
})

const creditAmountValue = useFieldValue<number>('amount')
const creditTokenValue = useFieldValue<UserAsset>('token')

const creditTokenPrice = computed(() => {
    // TODO fetch dynamically price
    return 1.23
})

const creditPrice = computed(() => {
    if (!creditAmountValue.value || !creditTokenValue.value?.address) {
        return '$0'
    }

    return creditTokenPrice.value * creditAmountValue.value
})

const inputsCssClasses = cn(
    'p-0 border-none focus-visible:border-none focus-visible:ring-0 aria-invalid:border-none aria-invalid:border-transparent',
    'text-foreground h-[3rem] !text-3xl'
)
</script>
