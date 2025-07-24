<template>
    <div class="bg-neutral-900 p-6 rounded-lg max-w-2xl mx-auto">
        <form @submit="onSubmit">

            <div class="border-2 p-3 rounded-lg border-neutral-700">
                <label>I want to lend</label>
                <div class="flex justify-between">
                    <FormField v-slot="{ componentField }" name="amount">
                        <FormItem>
                            <FormControl>
                                <Input placeholder="23" v-bind="componentField" />
                            </FormControl>

                            <FormDescription>
                                $23.05
                            </FormDescription>

                            <FormMessage />
                        </FormItem>
                    </FormField>

                    <FormField name="token">
                        <FormItem>
                            <FormControl>
                                <SelectTokenModal @select="handleTokenSelect" />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    </FormField>
                </div>
            </div>
            
            <FormField v-slot="{ componentField }" name="interest">
                <FormItem>
                    <FormLabel>I want to earn (%)</FormLabel>

                    <FormControl>
                        <Input placeholder="6" v-bind="componentField" />
                    </FormControl>

                    <FormMessage />
                </FormItem>
            </FormField>

            <div>
                <div class="flex justify-between mt-4">
                    <span>Lending to Collateral Ratio</span>
                    <span>65%</span>
                </div>
                <div class="flex justify-between mt-4">
                    <span>Loan Duration</span>
                    <span>30 days</span>
                </div>
                <div class="flex justify-between mt-4">
                    <span>Estimated Gas Fee</span>
                    <span>~ $0.05</span>
                </div>
            </div>

            <Button type="submit" class="mt-4">
                {{ submitButtonText }}
            </Button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

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
  token: z.string(),
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
}))

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    amount: '',
    token: '',
    interest: undefined
  }
})

const onSubmit = form.handleSubmit((values) => {
  console.log('Form submitted!', values)
})

const submitButtonText = computed(() => {
  return form.isSubmitting ? 'Submitting...' : 'Submit'
})

const handleTokenSelect = (token: string) => {
    form.setFieldValue('token', token)
}
</script>
